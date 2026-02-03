import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  Image,
  Platform,
} from "react-native";
import tw from "twrnc";
import PageLayout from "../../components/PageLayout";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAccessToken } from "../contexts/AccessTokenContext";

type PrescriptionItem = {
  drug: string;
  qty: string;
  timing: string;
  notes: string;
};

type Appointment = {
  id: number;
  user_id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_start_time: string;
  appointment_end_time: string;
  appointment_status: string;
  appointment_type: string;
  payment_mode: string;
  prescription: PrescriptionItem[] | string | null;
  created_at: string;
  createdAt: string;
  updatedAt: string;
  checkupAppointment: any[];
};

type DocumentItem = {
  id: number;
  user_id: number;
  appointment_id: number;
  document_name: string;
  document_url: string;
  document_type: string;
  uploaded_at: string;
};

const tabs = ["Upcoming", "Cancelled", "Completed"];

type RootStackParamList = {
  FollowUpAppointment: {
    parentAppointment: Appointment;
  };
  Appointments: undefined;
};

export default function AppointmentsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { accessToken } = useAccessToken();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>("Upcoming");

  // Add Prescription Modal (Upcoming)
  const [modalVisible, setModalVisible] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState<number | null>(null);
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([
    { drug: "", qty: "", timing: "", notes: "" },
  ]);

  // View Prescription Modal (Completed)
  const [viewPrescriptionModal, setViewPrescriptionModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionItem[]>([]);

  // Documents Modal (for viewing uploaded images)
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [appointmentDocuments, setAppointmentDocuments] = useState<DocumentItem[]>([]);
  const [docLoading, setDocLoading] = useState(false);
  const [currentDocAppointmentId, setCurrentDocAppointmentId] = useState<number | null>(null);

  // Fullscreen image preview
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  // Preview of selected image for upload
  const [previewImageUri, setPreviewImageUri] = useState<string | null>(null);

  // Review Modal States
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewAppointmentId, setReviewAppointmentId] = useState<number | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://landing.docapp.co.in/api/appointment/list-appointments",
        {
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (err: any) {
      console.error("Fetch error:", err);
      Alert.alert("Error", "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Helper to parse prescription field (stringified or array)
  const parsePrescription = (p: any): PrescriptionItem[] => {
    if (!p) return [];
    if (typeof p === "string") {
      try {
        const parsed = JSON.parse(p);
        if (Array.isArray(parsed)) return parsed;
        return [];
      } catch {
        return [];
      }
    }
    if (Array.isArray(p)) return p;
    return [];
  };

  // DELETE appointment (only Upcoming)
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://landing.docapp.co.in/api/appointment/delete-appointment?appointment_id=${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.message?.toLowerCase().includes("deleted")) {
        Alert.alert("Success", "Appointment deleted successfully");
        fetchAppointments();
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  // UPDATE appointment (close + add prescription) - Upcoming only
  const handleUpdateAppointment = async () => {
    if (!currentAppointmentId) {
      Alert.alert("Error", "No appointment selected");
      return;
    }

    const cleaned = prescriptions.filter((p) => p.drug || p.qty || p.timing || p.notes);
    if (cleaned.length === 0) {
      Alert.alert("Validation", "Please add at least one prescription item.");
      return;
    }

    try {
      const response = await fetch(
        "https://landing.docapp.co.in/api/appointment/doctor-update-appointment",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            appointment_id: currentAppointmentId,
            appointment_status: "closed",
            prescription: cleaned,
          }),
        }
      );

      const data = await response.json();
      if (data.message?.toLowerCase().includes("updated")) {
        Alert.alert("Success", "Appointment updated successfully");
        setModalVisible(false);
        setPrescriptions([{ drug: "", qty: "", timing: "", notes: "" }]);
        setCurrentAppointmentId(null);
        fetchAppointments();
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  // PICK image and upload immediately (Upcoming only)
  const pickAndUploadImage = (appointmentId: number) => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
        selectionLimit: 1,
      },
      async (res: any) => {
        if (res.didCancel) return;
        if (res.errorCode) {
          Alert.alert("Error", res.errorMessage || "Image picker error");
          return;
        }

        const asset = res.assets && res.assets.length ? res.assets[0] : null;
        if (!asset || !asset.uri) {
          Alert.alert("Error", "No image selected");
          return;
        }

        // optional preview
        setPreviewImageUri(asset.uri);

        // Build formData
        const formData = new FormData();
        formData.append("appointment_id", String(appointmentId));
        formData.append("document", {
          uri: Platform.OS === "android" ? asset.uri : asset.uri.replace("file://", ""),
          name: asset.fileName || `image-${Date.now()}.jpg`,
          type: asset.type || "image/jpeg",
        } as any);

        try {
          const response = await fetch(
            "https://landing.docapp.co.in/api/appointment/upload-appointment-document",
            {
              method: "POST",
              credentials: "include",
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
              body: formData,
              // do not set Content-Type; fetch will set multipart boundary
            }
          );

          const data = await response.json();
          if (data.message?.toLowerCase().includes("uploaded")) {
            Alert.alert("Success", "Image uploaded successfully");
            setPreviewImageUri(null);
            // refresh documents for this appointment (optional)
            fetchAppointmentDocuments(appointmentId, true);
            fetchAppointments();
          } else {
            throw new Error(data.message || "Upload failed");
          }
        } catch (err: any) {
          Alert.alert("Error", err.message || "Failed to upload image");
        }
      }
    );
  };

  // Fetch documents for appointment (used by Upcoming & Completed view button)
  const fetchAppointmentDocuments = async (appointmentId: number, openModal = true) => {
    setDocLoading(true);
    setCurrentDocAppointmentId(appointmentId);
    try {
      const response = await fetch(
        `https://landing.docapp.co.in/api/appointment/get-document-for/${appointmentId}`,
        {
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setAppointmentDocuments(data);
        if (openModal) setDocumentModalVisible(true);
      } else {
        setAppointmentDocuments([]);
        if (openModal) {
          Alert.alert("No documents", "No documents found for this appointment");
        }
      }
    } catch (err: any) {
      console.error("Fetch docs error:", err);
      Alert.alert("Error", "Failed to load documents");
    } finally {
      setDocLoading(false);
    }
  };

  // Replace document
  const replaceDocument = (docId: number) => {
    if (!currentDocAppointmentId) {
      Alert.alert("Error", "No appointment selected");
      return;
    }

    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
        selectionLimit: 1,
      },
      async (res: any) => {
        if (res.didCancel) return;
        if (res.errorCode) {
          Alert.alert("Error", res.errorMessage || "Image picker error");
          return;
        }

        const asset = res.assets && res.assets.length ? res.assets[0] : null;
        if (!asset || !asset.uri) {
          Alert.alert("Error", "No image selected");
          return;
        }

        // Build formData
        const formData = new FormData();
        formData.append("document", {
          uri: Platform.OS === "android" ? asset.uri : asset.uri.replace("file://", ""),
          name: asset.fileName || `image-${Date.now()}.jpg`,
          type: asset.type || "image/jpeg",
        } as any);

        try {
          const response = await fetch(
            `https://landing.docapp.co.in/api/appointment/replace-document/${docId}`,
            {
              method: "PUT",
              credentials: "include",
              body: formData,
              // do not set Content-Type; fetch will set multipart boundary
            }
          );

          const data = await response.json();
          if (data.message?.toLowerCase().includes("updated")) {
            Alert.alert("Success", "Document replaced successfully");
            // Refresh documents
            fetchAppointmentDocuments(currentDocAppointmentId, false);
          } else {
            throw new Error(data.message || "Replace failed");
          }
        } catch (err: any) {
          Alert.alert("Error", err.message || "Failed to replace document");
        }
      }
    );
  };

  // Delete document
  const deleteDocument = async (docId: number) => {
    try {
      const response = await fetch(
        `https://landing.docapp.co.in/api/appointment/delete-document/${docId}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await response.json();
      if (data.message?.toLowerCase().includes("deleted")) {
        Alert.alert("Success", "Document deleted successfully");
        // Refresh documents
        if (currentDocAppointmentId) {
          fetchAppointmentDocuments(currentDocAppointmentId, false);
        }
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to delete document");
    }
  };

  // Submit doctor review (only for completed appointments)
  const submitDoctorReview = async () => {
    if (!reviewAppointmentId) {
      Alert.alert("Error", "No appointment selected");
      return;
    }
    if (!reviewText.trim()) {
      Alert.alert("Validation", "Review cannot be empty");
      return;
    }

    // Validate appointment is completed or closed
    const appt = appointments.find((a) => a.id === reviewAppointmentId);
    const status = (appt?.appointment_status || "").toLowerCase();
    if (!(status === "completed" || status === "closed")) {
      Alert.alert("Not Allowed", "You can only submit reviews for completed appointments.");
      return;
    }

    setReviewLoading(true);

    try {
      const response = await fetch(
        "https://landing.docapp.co.in/api/reviews/doctor-review-ratings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            appointment_id: String(reviewAppointmentId),
            review: reviewText.trim(),
          }),
        }
      );

      const data = await response.json();

      // adjust condition based on your API response (message or status)
      if (data.message?.toLowerCase().includes("review") || data.success) {
        Alert.alert("Success", "Review submitted successfully");
        setReviewModalVisible(false);
        setReviewText("");
        setReviewAppointmentId(null);
        fetchAppointments();
      } else {
        throw new Error(data.message || "Failed to submit review");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setReviewLoading(false);
    }
  };

  // Open follow-up screen
  const openFollowUpScreen = (appointment: Appointment) => {
    // Check if appointment already has a checkup
    if (appointment.checkupAppointment && appointment.checkupAppointment.length > 0) {
      Alert.alert("Already Booked", "A follow-up appointment has already been booked for this appointment.");
      return;
    }
    navigation.navigate("FollowUpAppointment", { parentAppointment: appointment });
  };

  // Filtered list for tabs
  const filteredAppointments = appointments.filter((appt) => {
    if (selectedTab === "Upcoming")
      return appt.appointment_status === "confirmed" || appt.appointment_status === "pending";
    if (selectedTab === "Cancelled") return appt.appointment_status === "cancelled";
    if (selectedTab === "Completed")
      return appt.appointment_status === "completed" || appt.appointment_status === "closed";
    return true;
  });

  if (loading) return <ActivityIndicator size="large" style={tw`mt-10`} />;

  return (
    <PageLayout title="My Appointmentses" headerBackgroundColor="#16a34a" scrollable={true}>
      {/* Tabs */}
      <View style={tw`flex-row bg-white px-4 py-3 border-b justify-between`}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={tw`px-4 py-2 rounded-full ${selectedTab === tab ? "bg-green-600" : "bg-gray-200"}`}
          >
            <Text style={tw`text-sm font-semibold ${selectedTab === tab ? "text-white" : "text-gray-700"}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Appointment List */}
      <ScrollView style={tw`p-4`}>
        {filteredAppointments.length === 0 ? (
          <Text style={tw`text-center mt-10 text-gray-500`}>No {selectedTab.toLowerCase()} appointments found</Text>
        ) : (
          filteredAppointments.map((item) => (
            <View key={item.id} style={tw`bg-white p-4 mb-4 rounded-xl shadow-sm border border-gray-200`}>
              <Text style={tw`text-lg font-bold text-green-700`}>Doctor ID: #{item.doctor_id}</Text>
              <Text style={tw`text-gray-800`}>Date: {new Date(item.appointment_date).toDateString()}</Text>
              <Text style={tw`text-gray-800`}>Time: {item.appointment_start_time} - {item.appointment_end_time}</Text>
              <Text style={tw`text-gray-800 capitalize`}>Type: {item.appointment_type}</Text>
              <Text style={tw`text-gray-800 capitalize`}>Status: {item.appointment_status}</Text>
              <Text style={tw`text-gray-800`}>Payment Mode: {item.payment_mode}</Text>

              {/* UPCOMING actions */}
              {selectedTab === "Upcoming" && (
                <>
                  {/* Close Appointment (Add Prescription) */}
                  {item.appointment_status !== "closed" && (
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentAppointmentId(item.id);
                        setPrescriptions([{ drug: "", qty: "", timing: "", notes: "" }]);
                        setModalVisible(true);
                      }}
                      style={tw`mt-3 bg-green-600 py-2 px-4 rounded-full`}
                    >
                      <Text style={tw`text-white text-center font-semibold`}>Close Appointment (Add Prescription)</Text>
                    </TouchableOpacity>
                  )}

                  {/* Upload Image (only Upcoming) */}
                  <TouchableOpacity
                    onPress={() => pickAndUploadImage(item.id)}
                    style={tw`mt-3 bg-purple-600 py-2 px-4 rounded-full`}
                  >
                    <Text style={tw`text-white text-center font-semibold`}>Upload Image</Text>
                  </TouchableOpacity>

                  {/* View Uploaded Images (Upcoming) */}
                  <TouchableOpacity
                    onPress={() => fetchAppointmentDocuments(item.id, true)}
                    style={tw`mt-3 bg-blue-500 py-2 px-4 rounded-full`}
                  >
                    <Text style={tw`text-white text-center font-semibold`}>View Uploaded Images</Text>
                  </TouchableOpacity>

                  {/* Preview if selected */}
                  {previewImageUri && (
                    <View style={tw`mt-3 items-center`}>
                      <Image source={{ uri: previewImageUri }} style={{ width: 120, height: 80, borderRadius: 8 }} />
                      <Text style={tw`text-sm text-gray-600 mt-1`}>Image selected (preview)</Text>
                    </View>
                  )}

                  {/* Delete (Upcoming only) */}
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert("Confirm", "Delete this appointment?", [
                        { text: "Cancel", style: "cancel" },
                        { text: "Delete", style: "destructive", onPress: () => handleDelete(item.id) },
                      ])
                    }
                    style={tw`mt-3 bg-red-500 py-2 px-4 rounded-full`}
                  >
                    <Text style={tw`text-white text-center font-semibold`}>Delete Appointment</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* COMPLETED actions (View Images + View Prescription + Write Review) */}
              {selectedTab === "Completed" && (
                <>
                  <TouchableOpacity
                    onPress={() => fetchAppointmentDocuments(item.id, true)}
                    style={tw`mt-3 bg-blue-500 py-2 px-4 rounded-full`}
                  >
                    <Text style={tw`text-white text-center font-semibold`}>View Uploaded Images</Text>
                  </TouchableOpacity>

                  {/* View prescription if present */}
                  {item.prescription && item.prescription !== "" && (
                    <TouchableOpacity
                      onPress={() => {
                        const pres = parsePrescription(item.prescription);
                        if (!pres.length) {
                          Alert.alert("No Prescription", "Prescription data is empty or invalid.");
                          return;
                        }
                        setSelectedPrescription(pres);
                        setViewPrescriptionModal(true);
                      }}
                      style={tw`mt-3 bg-indigo-600 py-2 px-4 rounded-full`}
                    >
                      <Text style={tw`text-white text-center font-semibold`}>View Prescription</Text>
                    </TouchableOpacity>
                  )}

                  {/* Write Review (only for completed/closed status) */}
                  {["completed", "closed"].includes(item.appointment_status.toLowerCase()) && (
                    <TouchableOpacity
                      onPress={() => {
                        setReviewAppointmentId(item.id);
                        setReviewText("");
                        setReviewModalVisible(true);
                      }}
                      style={tw`mt-3 bg-blue-700 py-2 px-4 rounded-full`}
                    >
                      <Text style={tw`text-white text-center font-semibold`}>Write Review</Text>
                    </TouchableOpacity>
                  )}

                  {/* Book Follow-up Appointment (only for completed/closed status) */}
                  {["completed", "closed"].includes(item.appointment_status.toLowerCase()) && (
                    <TouchableOpacity
                      onPress={() => openFollowUpScreen(item)}
                      style={tw`mt-3 bg-orange-500 py-2 px-4 rounded-full`}
                    >
                      <Text style={tw`text-white text-center font-semibold`}>
                        {item.checkupAppointment && item.checkupAppointment.length > 0
                          ? "Follow-up Already Booked"
                          : "Book Follow-up Appointment"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Prescription Modal (Upcoming) */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={tw`flex-1 justify-center bg-black/50 p-4`}>
          <View style={tw`bg-white p-5 rounded-2xl max-h-[85%]`}>
            <Text style={tw`text-xl font-bold mb-3 text-center`}>Add Prescription</Text>

            <ScrollView style={tw`mb-3`}>
              {prescriptions.map((pres, index) => (
                <View key={index} style={tw`mb-4 border p-3 rounded-lg`}>
                  <TextInput
                    placeholder="Drug"
                    value={pres.drug}
                    onChangeText={(text) => {
                      const arr = [...prescriptions];
                      arr[index].drug = text;
                      setPrescriptions(arr);
                    }}
                    style={tw`border-b mb-2 p-1`}
                  />
                  <TextInput
                    placeholder="Quantity"
                    value={pres.qty}
                    onChangeText={(text) => {
                      const arr = [...prescriptions];
                      arr[index].qty = text;
                      setPrescriptions(arr);
                    }}
                    style={tw`border-b mb-2 p-1`}
                  />
                  <TextInput
                    placeholder="Timing (e.g. morning, evening)"
                    value={pres.timing}
                    onChangeText={(text) => {
                      const arr = [...prescriptions];
                      arr[index].timing = text;
                      setPrescriptions(arr);
                    }}
                    style={tw`border-b mb-2 p-1`}
                  />
                  <TextInput
                    placeholder="Notes"
                    value={pres.notes}
                    onChangeText={(text) => {
                      const arr = [...prescriptions];
                      arr[index].notes = text;
                      setPrescriptions(arr);
                    }}
                    style={tw`border-b mb-2 p-1`}
                  />

                  {prescriptions.length > 1 && (
                    <TouchableOpacity
                      onPress={() => {
                        const arr = prescriptions.filter((_, i) => i !== index);
                        setPrescriptions(arr.length ? arr : [{ drug: "", qty: "", timing: "", notes: "" }]);
                      }}
                      style={tw`mt-2 bg-red-400 py-2 rounded-full`}
                    >
                      <Text style={tw`text-white text-center`}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setPrescriptions([...prescriptions, { drug: "", qty: "", timing: "", notes: "" }])}
              style={tw`bg-blue-500 py-2 rounded-full mb-3`}
            >
              <Text style={tw`text-white text-center`}>+ Add More</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleUpdateAppointment} style={tw`bg-green-600 py-2 rounded-full mb-2`}>
              <Text style={tw`text-white text-center font-semibold`}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`bg-gray-400 py-2 rounded-full`}>
              <Text style={tw`text-white text-center`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* View Prescription Modal (Completed) */}
      <Modal visible={viewPrescriptionModal} animationType="slide" transparent={true}>
        <View style={tw`flex-1 justify-center bg-black/50 p-4`}>
          <View style={tw`bg-white p-5 rounded-2xl max-h-[85%]`}>
            <Text style={tw`text-xl font-bold mb-3 text-center`}>Prescription</Text>

            <ScrollView style={tw`mb-3`}>
              <View style={tw`flex-row border-b border-gray-300 pb-2`}>
                <Text style={tw`w-1/4 font-semibold`}>Drug</Text>
                <Text style={tw`w-1/4 font-semibold`}>Qty</Text>
                <Text style={tw`w-1/4 font-semibold`}>Timing</Text>
                <Text style={tw`w-1/4 font-semibold`}>Notes</Text>
              </View>

              {selectedPrescription.map((pres, idx) => (
                <View key={idx} style={tw`flex-row border-b border-gray-200 py-2`}>
                  <Text style={tw`w-1/4`}>{pres.drug}</Text>
                  <Text style={tw`w-1/4`}>{pres.qty}</Text>
                  <Text style={tw`w-1/4`}>{pres.timing}</Text>
                  <Text style={tw`w-1/4`}>{pres.notes}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity onPress={() => setViewPrescriptionModal(false)} style={tw`bg-gray-400 py-2 rounded-full`}>
              <Text style={tw`text-white text-center`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Documents Modal (for uploaded images) */}
      <Modal visible={documentModalVisible} animationType="slide" transparent={true}>
        <View style={tw`flex-1 bg-black/50 justify-center p-4`}>
          <View style={tw`bg-white rounded-2xl p-4 max-h-[85%]`}>
            <Text style={tw`text-xl font-bold mb-3 text-center`}>Uploaded Images</Text>

            {docLoading ? (
              <ActivityIndicator />
            ) : appointmentDocuments.length === 0 ? (
              <Text style={tw`text-center text-gray-500`}>No images uploaded</Text>
            ) : (
              <ScrollView style={tw`mb-3`}>
                {appointmentDocuments.map((doc) => (
                  <View key={doc.id} style={tw`mb-4`}>
                    <Text style={tw`font-semibold mb-1`}>{doc.document_name}</Text>
                    <View style={tw`border rounded-lg overflow-hidden`}>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedImageUrl(doc.document_url);
                          setImagePreviewVisible(true);
                        }}
                      >
                        <Image
                          source={{ uri: doc.document_url }}
                          style={{ width: "100%", height: 220 }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={tw`text-xs text-gray-500 mt-1`}>Uploaded at: {new Date(doc.uploaded_at).toLocaleString()}</Text>
                    <TouchableOpacity
                      onPress={() => replaceDocument(doc.id)}
                      style={tw`mt-2 bg-orange-500 py-2 px-4 rounded-full`}
                    >
                      <Text style={tw`text-white text-center font-semibold`}>Replace Document</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert("Confirm", "Delete this document?", [
                          { text: "Cancel", style: "cancel" },
                          { text: "Delete", style: "destructive", onPress: () => deleteDocument(doc.id) },
                        ])
                      }
                      style={tw`mt-2 bg-red-500 py-2 px-4 rounded-full`}
                    >
                      <Text style={tw`text-white text-center font-semibold`}>Delete Document</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity onPress={() => setDocumentModalVisible(false)} style={tw`bg-gray-400 py-2 rounded-full`}>
              <Text style={tw`text-white text-center`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fullscreen Image Preview Modal */}
      <Modal visible={imagePreviewVisible} animationType="fade" transparent={true}>
        <View style={tw`flex-1 bg-black/90 justify-center items-center`}>
          <TouchableOpacity
            onPress={() => setImagePreviewVisible(false)}
            style={tw`absolute top-10 right-5 bg-gray-700 px-4 py-2 rounded-full`}
          >
            <Text style={tw`text-white text-lg`}>Close ✕</Text>
          </TouchableOpacity>

          {selectedImageUrl ? (
            <Image
              source={{ uri: selectedImageUrl }}
              style={{ width: "90%", height: "75%", borderRadius: 12 }}
              resizeMode="contain"
            />
          ) : (
            <Text style={tw`text-white`}>No image</Text>
          )}
        </View>
      </Modal>

      {/* Review Modal (Completed only) */}
      <Modal visible={reviewModalVisible} animationType="slide" transparent={true}>
        <View style={tw`flex-1 justify-center bg-black/50 p-4`}>
          <View style={tw`bg-white p-5 rounded-2xl max-h-[70%]`}>
            <Text style={tw`text-xl font-bold mb-3 text-center`}>Write Review</Text>

            <TextInput
              placeholder="Write your review here..."
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={5}
              style={tw`border p-3 mb-4 rounded-lg text-sm`}
            />

            <TouchableOpacity
              onPress={submitDoctorReview}
              style={tw`bg-green-600 py-2 rounded-full mb-2 items-center justify-center`}
              disabled={reviewLoading}
            >
              {reviewLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={tw`text-white text-center font-semibold`}>Submit Review</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setReviewModalVisible(false)} style={tw`bg-gray-400 py-2 rounded-full`}>
              <Text style={tw`text-white text-center`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </PageLayout>
  );
}

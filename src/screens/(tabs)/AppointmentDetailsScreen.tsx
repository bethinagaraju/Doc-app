import React, { useState } from "react";
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
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useAccessToken } from "../contexts/AccessTokenContext";
import ProfileTopBar from "../../components/ProfileTopBar";
import AppointmentCard from "../../components/AppointmentCard";
import { SafeAreaView } from "react-native-safe-area-context";

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

type RouteParams = {
  AppointmentDetails: {
    appointment: Appointment;
    selectedTab: string;
  };
};

export default function AppointmentDetailsScreen() {
  const route = useRoute<RouteProp<RouteParams, 'AppointmentDetails'>>();
  const { appointment, selectedTab } = route.params;
  const navigation = useNavigation<any>();
  const { accessToken } = useAccessToken();

  // Add Prescription Modal (Upcoming)
  const [modalVisible, setModalVisible] = useState(false);
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

  // Fullscreen image preview
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  // Preview of selected image for upload
  const [previewImageUri, setPreviewImageUri] = useState<string | null>(null);

  // Review Modal States
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  // Helper to parse prescription
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

  // DELETE appointment
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://api.docapp.co.in/api/appointment/delete-appointment?appointment_id=${id}`,
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
        navigation.goBack();
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  // UPDATE appointment (close + add prescription)
  const handleUpdateAppointment = async () => {
    const cleaned = prescriptions.filter((p) => p.drug || p.qty || p.timing || p.notes);
    if (cleaned.length === 0) {
      Alert.alert("Validation", "Please add at least one prescription item.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.docapp.co.in/api/appointment/doctor-update-appointment",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            appointment_id: appointment.id,
            appointment_status: "closed",
            prescription: cleaned,
          }),
        }
      );

      const data = await response.json();
      if (data.message?.toLowerCase().includes("updated")) {
        Alert.alert("Success", "Appointment updated successfully");
        setModalVisible(false);
        navigation.goBack();
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    }
  };

  // PICK image and upload immediately
  const pickAndUploadImage = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.8, selectionLimit: 1 },
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

        setPreviewImageUri(asset.uri);
        const formData = new FormData();
        formData.append("appointment_id", String(appointment.id));
        formData.append("document", {
          uri: Platform.OS === "android" ? asset.uri : asset.uri.replace("file://", ""),
          name: asset.fileName || `image-${Date.now()}.jpg`,
          type: asset.type || "image/jpeg",
        } as any);

        try {
          const response = await fetch(
            "https://api.docapp.co.in/api/appointment/upload-appointment-document",
            {
              method: "POST",
              credentials: "include",
              headers: { 'Authorization': `Bearer ${accessToken}` },
              body: formData,
            }
          );
          const data = await response.json();
          if (data.message?.toLowerCase().includes("uploaded")) {
            Alert.alert("Success", "Image uploaded successfully");
            setPreviewImageUri(null);
            fetchAppointmentDocuments(true);
          } else {
            throw new Error(data.message || "Upload failed");
          }
        } catch (err: any) {
          Alert.alert("Error", err.message || "Failed to upload image");
        }
      }
    );
  };

  // Fetch documents for appointment
  const fetchAppointmentDocuments = async (openModal = true) => {
    setDocLoading(true);
    try {
      const response = await fetch(
        `https://api.docapp.co.in/api/appointment/get-document-for/${appointment.id}`,
        {
          credentials: "include",
          headers: { 'Authorization': `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setAppointmentDocuments(data);
        if (openModal) setDocumentModalVisible(true);
      } else {
        setAppointmentDocuments([]);
        if (openModal) Alert.alert("No documents", "No documents found for this appointment");
      }
    } catch (err: any) {
      Alert.alert("Error", "Failed to load documents");
    } finally {
      setDocLoading(false);
    }
  };

  // Replace document
  const replaceDocument = (docId: number) => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.8, selectionLimit: 1 },
      async (res: any) => {
        if (res.didCancel) return;
        if (res.errorCode) return;
        const asset = res.assets && res.assets.length ? res.assets[0] : null;
        if (!asset || !asset.uri) return;

        const formData = new FormData();
        formData.append("document", {
          uri: Platform.OS === "android" ? asset.uri : asset.uri.replace("file://", ""),
          name: asset.fileName || `image-${Date.now()}.jpg`,
          type: asset.type || "image/jpeg",
        } as any);

        try {
          const response = await fetch(
            `https://api.docapp.co.in/api/appointment/replace-document/${docId}`,
            { method: "PUT", credentials: "include", body: formData }
          );
          const data = await response.json();
          if (data.message?.toLowerCase().includes("updated")) {
            Alert.alert("Success", "Document replaced successfully");
            fetchAppointmentDocuments(false);
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
        `https://api.docapp.co.in/api/appointment/delete-document/${docId}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await response.json();
      if (data.message?.toLowerCase().includes("deleted")) {
        Alert.alert("Success", "Document deleted successfully");
        fetchAppointmentDocuments(false);
      } else {
        throw new Error(data.message || "Delete failed");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to delete document");
    }
  };

  // Submit doctor review
  const submitDoctorReview = async () => {
    if (!reviewText.trim()) {
      Alert.alert("Validation", "Review cannot be empty");
      return;
    }

    setReviewLoading(true);
    try {
      const response = await fetch(
        "https://api.docapp.co.in/api/reviews/doctor-review-ratings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ appointment_id: appointment.id, review: reviewText.trim() }),
        }
      );
      const data = await response.json();
      if (data.message?.toLowerCase().includes("review") || data.success) {
        Alert.alert("Success", "Review submitted successfully");
        setReviewModalVisible(false);
        setReviewText("");
      } else {
        throw new Error(data.message || "Failed to submit review");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setReviewLoading(false);
    }
  };

  const openFollowUpScreen = () => {
    if (appointment.checkupAppointment && appointment.checkupAppointment.length > 0) {
      Alert.alert("Already Booked", "A follow-up appointment has already been booked.");
      return;
    }
    navigation.navigate("FollowUpAppointment", { parentAppointment: appointment });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ProfileTopBar />

      <ScrollView contentContainerStyle={tw`p-4 pb-12`}>
        {/* <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
            <Text style={tw`text-blue-600 font-bold text-lg`}>← Back</Text>
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-gray-800`}>Appointment Details</Text>
        </View> */}

        <AppointmentCard appointment={appointment as any} />

        <View style={tw`bg-white p-4 mb-4 rounded-[12px] border border-[#DAE1E7]`}>
          <Text style={tw`text-[16px] font-bold text-[#011D35] mb-2`}>Additional Info</Text>
          <View style={tw`flex-row justify-between py-2 border-b border-[#F0F3F6]`}>
            <Text style={tw`text-[#434653]`}>Appointment ID</Text>
            <Text style={tw`text-[#011D35] font-semibold`}>#{appointment.id}</Text>
          </View>
          <View style={tw`flex-row justify-between py-2 border-b border-[#F0F3F6]`}>
            <Text style={tw`text-[#434653]`}>Payment Mode</Text>
            <Text style={tw`text-[#011D35] font-semibold capitalize`}>{appointment.payment_mode || "Not specified"}</Text>
          </View>
          <View style={tw`flex-row justify-between py-2 border-b border-[#F0F3F6]`}>
            <Text style={tw`text-[#434653]`}>Appointment Date</Text>
            <Text style={tw`text-[#011D35] font-semibold`}>{new Date(appointment.appointment_date).toDateString()}</Text>
          </View>
          <View style={tw`flex-row justify-between py-2 border-b border-[#F0F3F6]`}>
            <Text style={tw`text-[#434653]`}>Appointment Time</Text>
            <Text style={tw`text-[#011D35] font-semibold`}>{appointment.appointment_start_time} - {appointment.appointment_end_time}</Text>
          </View>
          <View style={tw`flex-row justify-between py-2 border-b border-[#F0F3F6]`}>
            <Text style={tw`text-[#434653]`}>Status</Text>
            <Text style={tw`text-[#011D35] font-semibold capitalize`}>{appointment.appointment_status}</Text>
          </View>
          <View style={tw`flex-row justify-between py-2`}>
            <Text style={tw`text-[#434653]`}>Type</Text>
            <Text style={tw`text-[#011D35] font-semibold capitalize`}>{appointment.appointment_type}</Text>
          </View>
        </View>

        {selectedTab === "Upcoming" && (
          <View style={tw`mb-8`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Actions</Text>
            {appointment.appointment_status !== "closed" && (
              <TouchableOpacity
                onPress={() => {
                  setPrescriptions([{ drug: "", qty: "", timing: "", notes: "" }]);
                  setModalVisible(true);
                }}
                style={tw`bg-green-600 py-3 px-4 rounded-xl mb-3`}
              >
                <Text style={tw`text-white text-center font-bold`}>Close Appointment (Add Prescription)</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={pickAndUploadImage} style={tw`bg-purple-600 py-3 px-4 rounded-xl mb-3`}>
              <Text style={tw`text-white text-center font-bold`}>Upload Image</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => fetchAppointmentDocuments(true)} style={tw`bg-blue-500 py-3 px-4 rounded-xl mb-3`}>
              <Text style={tw`text-white text-center font-bold`}>View Uploaded Images</Text>
            </TouchableOpacity>

            {previewImageUri && (
              <View style={tw`mb-3 items-center`}>
                <Image source={{ uri: previewImageUri }} style={{ width: 120, height: 80, borderRadius: 8 }} />
                <Text style={tw`text-sm text-gray-600 mt-1`}>Image selected (preview)</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() =>
                Alert.alert("Confirm", "Delete this appointment?", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive", onPress: () => handleDelete(appointment.id) },
                ])
              }
              style={tw`bg-red-500 py-3 px-4 rounded-xl mb-3`}
            >
              <Text style={tw`text-white text-center font-bold`}>Delete Appointment</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === "Completed" && (
          <View style={tw`mb-8`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>Actions</Text>
            <TouchableOpacity onPress={() => fetchAppointmentDocuments(true)} style={tw`bg-blue-500 py-3 px-4 rounded-xl mb-3`}>
              <Text style={tw`text-white text-center font-bold`}>View Uploaded Images</Text>
            </TouchableOpacity>

            {appointment.prescription && appointment.prescription !== "" && (
              <TouchableOpacity
                onPress={() => {
                  const pres = parsePrescription(appointment.prescription);
                  if (!pres.length) {
                    Alert.alert("No Prescription", "Prescription data is empty or invalid.");
                    return;
                  }
                  setSelectedPrescription(pres);
                  setViewPrescriptionModal(true);
                }}
                style={tw`bg-indigo-600 py-3 px-4 rounded-xl mb-3`}
              >
                <Text style={tw`text-white text-center font-bold`}>View Prescription</Text>
              </TouchableOpacity>
            )}

            {["completed", "closed"].includes(appointment.appointment_status.toLowerCase()) && (
              <TouchableOpacity
                onPress={() => {
                  setReviewText("");
                  setReviewModalVisible(true);
                }}
                style={tw`bg-blue-700 py-3 px-4 rounded-xl mb-3`}
              >
                <Text style={tw`text-white text-center font-bold`}>Write Review</Text>
              </TouchableOpacity>
            )}

            {["completed", "closed"].includes(appointment.appointment_status.toLowerCase()) && (
              <TouchableOpacity onPress={openFollowUpScreen} style={tw`bg-orange-500 py-3 px-4 rounded-xl mb-3`}>
                <Text style={tw`text-white text-center font-bold`}>
                  {appointment.checkupAppointment && appointment.checkupAppointment.length > 0
                    ? "Follow-up Already Booked"
                    : "Book Follow-up Appointment"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* MODALS */}
      {/* Add Prescription Modal */}
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
            <TouchableOpacity onPress={() => setPrescriptions([...prescriptions, { drug: "", qty: "", timing: "", notes: "" }])} style={tw`bg-blue-500 py-2 rounded-full mb-3`}>
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

      {/* View Prescription Modal */}
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

      {/* Documents Modal */}
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
                        <Image source={{ uri: doc.document_url }} style={{ width: "100%", height: 220 }} resizeMode="cover" />
                      </TouchableOpacity>
                    </View>
                    <Text style={tw`text-xs text-gray-500 mt-1`}>Uploaded at: {new Date(doc.uploaded_at).toLocaleString()}</Text>
                    <TouchableOpacity onPress={() => replaceDocument(doc.id)} style={tw`mt-2 bg-orange-500 py-2 px-4 rounded-full`}>
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

      {/* Fullscreen Image Preview */}
      <Modal visible={imagePreviewVisible} animationType="fade" transparent={true}>
        <View style={tw`flex-1 bg-black/90 justify-center items-center`}>
          <TouchableOpacity onPress={() => setImagePreviewVisible(false)} style={tw`absolute top-10 right-5 bg-gray-700 px-4 py-2 rounded-full`}>
            <Text style={tw`text-white text-lg`}>Close ✕</Text>
          </TouchableOpacity>
          {selectedImageUrl ? (
            <Image source={{ uri: selectedImageUrl }} style={{ width: "90%", height: "75%", borderRadius: 12 }} resizeMode="contain" />
          ) : (
            <Text style={tw`text-white`}>No image</Text>
          )}
        </View>
      </Modal>

      {/* Review Modal */}
      <Modal visible={reviewModalVisible} animationType="slide" transparent={true}>
        <View style={tw`flex-1 justify-center bg-black/50 p-4`}>
          <View style={tw`bg-white p-5 rounded-2xl max-h-[70%]`}>
            <Text style={tw`text-xl font-bold mb-3 text-center`}>Write Reviews</Text>
            <TextInput
              placeholder="Write your review here..."
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={5}
              style={tw`border p-3 mb-4 rounded-lg text-sm`}
            />
            <TouchableOpacity onPress={submitDoctorReview} style={tw`bg-green-600 py-2 rounded-full mb-2 items-center justify-center`} disabled={reviewLoading}>
              {reviewLoading ? <ActivityIndicator color="#fff" /> : <Text style={tw`text-white text-center font-semibold`}>Submit Review</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setReviewModalVisible(false)} style={tw`bg-gray-400 py-2 rounded-full`}>
              <Text style={tw`text-white text-center`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

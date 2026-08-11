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
import PrimaryActionBanner from "../../Doctor/components/PrimaryActionBanner";
import PatientCard from "../../Doctor/components/PatientCard";
import PatientDocuments from "../../Doctor/components/PatientDocuments";
import PatientPrescriptionCard from "../../Doctor/components/PatientPrescriptionCard";
import AppointmentAdditionalInfoCard from "../../Doctor/components/AppointmentAdditionalInfoCard";

type PrescriptionItem = {
  drug: string;
  qty: string;
  timing: string;
  notes: string;
};

type Patient = {
  email?: string;
  username?: string;
  phone_number?: string;
  generalUser?: {
    gender?: string;
    date_of_birth?: string;
    profile_picture?: string;
  };
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
  patient?: Patient;
  patientName?: string;
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

  // Fetch documents on initial screen mount
  React.useEffect(() => {
    fetchAppointmentDocuments(false);
  }, []);

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

  // ADD/SAVE Prescription & Close Appointment
  const handleSavePrescription = async () => {
    const cleaned = prescriptions.filter((p) => p.drug || p.qty || p.timing || p.notes);
    if (cleaned.length === 0) {
      Alert.alert("Validation", "Please add at least one prescription item.");
      return;
    }

    Alert.alert(
      "Confirm Close Appointment",
      "Saving prescription will close this appointment. Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm & Save",
          onPress: async () => {
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
              console.log("doctor-update-appointment response:", data);
              if (data.success || data.status === "success" || data.message?.toLowerCase().includes("updated") || data.message?.toLowerCase().includes("success")) {
                Alert.alert("Success", "Prescription saved and appointment closed successfully.");
                appointment.prescription = cleaned;
                appointment.appointment_status = "closed";
                setModalVisible(false);
              } else {
                const errorMsg = data.message || data.error || (typeof data === "string" ? data : JSON.stringify(data));
                console.log("not saves " + errorMsg);
                throw new Error(errorMsg || "Save failed");
              }
            } catch (err: any) {
              console.log(err);
              Alert.alert("Error", err.message || "Something went wrong");
            }
          },
        },
      ]
    );
  };

  // CLOSE appointment explicitly
  const handleCloseAppointment = async () => {
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
            prescription: appointment.prescription || [],
          }),
        }
      );

      const data = await response.json();
      if (data.message?.toLowerCase().includes("updated") || data.success) {
        Alert.alert("Success", "Appointment closed successfully");
        navigation.goBack();
      } else {
        throw new Error(data.message || "Close failed");
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
      const payload = { appointment_id: appointment.id, review: reviewText.trim() };
      console.log("🚀 Submitting doctor review payload:", payload);

      const response = await fetch(
        "https://api.docapp.co.in/api/reviews/doctor-review-ratings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log("📥 Review Response from backend:", data);

      if (data.message?.toLowerCase().includes("review") || data.success) {
        Alert.alert("Success", "Review submitted successfully");
        setReviewModalVisible(false);
        setReviewText("");
      } else {
        throw new Error(data.message || "Failed to submit review");
      }
    } catch (err: any) {
      console.error("❌ Error submitting review:", err);
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

        <View style={tw`mb-4`}>
          <PrimaryActionBanner
            statusText={`${"UPCOMING"} • ${new Date(appointment.appointment_date).toLocaleDateString("en-GB")} ${appointment.appointment_start_time}`}
            patientName={appointment.patient?.username || appointment.patientName || `Patient #${appointment.user_id || appointment.id}`}
            onStartConsultation={() => handleStartConsultation()}
            onReschedule={() => handleReschedule()}
          />
        </View>

        <AppointmentCard appointment={appointment as any} />

        {(() => {
          const name = appointment.patient?.username || appointment.patientName || `User #${appointment.user_id}`;
          const id = `Patient ID: #${appointment.user_id || appointment.id}`;
          const avatar = appointment.patient?.generalUser?.profile_picture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150';

          let age = 'N/A';
          const dob = appointment.patient?.generalUser?.date_of_birth;
          if (dob) {
            const birthDate = new Date(dob);
            const today = new Date();
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              calculatedAge--;
            }
            if (!isNaN(calculatedAge)) {
              age = `${calculatedAge} yrs`;
            }
          }
          const gender = appointment.patient?.generalUser?.gender || 'N/A';
          const ageGenderStr = `${age} / ${gender}`;

          const apptDateStr = appointment.appointment_date
            ? new Date(appointment.appointment_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            : 'N/A';

          const formatTime = (timeStr?: string) => {
            if (!timeStr) return '';
            const parts = timeStr.split(':');
            if (parts.length >= 2) {
              let hours = parseInt(parts[0], 10);
              const minutes = parts[1];
              const ampm = hours >= 12 ? 'PM' : 'AM';
              hours = hours % 12 || 12;
              return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
            }
            return timeStr;
          };

          const calculateDuration = (startStr?: string, endStr?: string) => {
            if (!startStr || !endStr) return '';
            const startParts = startStr.split(':').map(Number);
            const endParts = endStr.split(':').map(Number);
            if (startParts.length >= 2 && endParts.length >= 2) {
              const startMinutes = startParts[0] * 60 + startParts[1];
              const endMinutes = endParts[0] * 60 + endParts[1];
              let diff = endMinutes - startMinutes;
              if (diff < 0) diff += 24 * 60; // handle midnight wrap if any
              if (diff >= 60) {
                const hrs = Math.floor(diff / 60);
                const mins = diff % 60;
                return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
              }
              return `${diff} mins`;
            }
            return '';
          };

          const durationFormatted = calculateDuration(appointment.appointment_start_time, appointment.appointment_end_time);

          const apptTimeStr = durationFormatted || 'N/A';

          return (
            <View style={tw`mb-4`}>
              <PatientCard
                patientName={name}
                patientId={id}
                avatarUrl={avatar}
                ageGender={ageGenderStr}
                appointmentIdDisplay={`#${appointment.id}`}
                appointmentTime={apptTimeStr}
                appointmentType={appointment.appointment_type || 'N/A'}
              />
            </View>
          );
        })()}



        <View style={tw`mb-4`}>
          <AppointmentAdditionalInfoCard
            appointmentId={appointment.id}
            paymentMode={appointment.payment_mode}
            appointmentDate={appointment.appointment_date}
            startTime={appointment.appointment_start_time}
            endTime={appointment.appointment_end_time}
            status={appointment.appointment_status}
            type={appointment.appointment_type}
          />
        </View>

        <View style={tw`mb-4`}>
          <PatientDocuments
            documents={appointmentDocuments}
            onUpload={() => pickAndUploadImage()}
            onView={(doc) => {
              if (doc.document_url) {
                setSelectedImageUrl(doc.document_url);
                setImagePreviewVisible(true);
              }
            }}
            onReplace={(docId) => replaceDocument(docId)}
            onDelete={(docId) => {
              Alert.alert("Confirm Delete", "Are you sure you want to delete this document?", [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteDocument(docId) },
              ]);
            }}
          />
        </View>

        <View style={tw`mb-4`}>
          <PatientPrescriptionCard
            prescriptionList={parsePrescription(appointment.prescription)}
            onAddPrescription={
              appointment.appointment_status !== "closed"
                ? () => {
                  setPrescriptions([{ drug: "", qty: "", timing: "", notes: "" }]);
                  setModalVisible(true);
                }
                : undefined
            }
            onViewPrescription={(items) => {
              setSelectedPrescription(items);
              setViewPrescriptionModal(true);
            }}
          />
        </View>

        {selectedTab === "Upcoming" && (
          <View
            style={[
              tw`w-full bg-white rounded-[12px] p-[24px] border border-[#DAE1E7] gap-[16px] mb-8`,
              {
                shadowColor: "#102A43",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 20,
                elevation: 4,
              },
            ]}
          >
            <Text style={tw`text-[20px] font-semibold text-[#011D35] font-['Inter'] leading-[28px]`}>
              Actions
            </Text>

            {/* Row of 2 buttons */}
            <View style={tw`flex-row gap-[12px]`}>
              {appointment.appointment_status !== "closed" && (
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert("Confirm", "Are you sure you want to close this appointment?", [
                      { text: "Cancel", style: "cancel" },
                      { text: "Close Appointment", style: "destructive", onPress: () => handleCloseAppointment() },
                    ])
                  }
                  style={tw`flex-1 bg-[#16A34A] py-3 px-4 rounded-[10px] items-center justify-center`}
                  activeOpacity={0.8}
                >
                  <Text style={tw`text-white font-semibold text-[14px] font-['Inter'] text-center`}>Close Appointment</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Confirm", "Delete this appointment?", [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: () => handleDelete(appointment.id) },
                  ])
                }
                style={tw`flex-1 bg-[#DC2626] py-3 px-4 rounded-[10px] items-center justify-center`}
                activeOpacity={0.8}
              >
                <Text style={tw`text-white font-semibold text-[14px] font-['Inter'] text-center`}>Delete Appointment</Text>
              </TouchableOpacity>
            </View>

            {/* 
            <TouchableOpacity onPress={pickAndUploadImage} style={tw`bg-purple-600 py-3 px-4 rounded-xl mb-3`}>
              <Text style={tw`text-white text-center font-bold`}>Upload Image</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => fetchAppointmentDocuments(true)} style={tw`bg-blue-500 py-3 px-4 rounded-xl mb-3`}>
              <Text style={tw`text-white text-center font-bold`}>View Uploaded Images</Text>
            </TouchableOpacity> */}

            {previewImageUri && (
              <View style={tw`items-center bg-[#FAFBFD] p-2 rounded-[8px] border border-[#DAE1E7]`}>
                <Image source={{ uri: previewImageUri }} style={{ width: 120, height: 80, borderRadius: 8 }} />
                <Text style={tw`text-[12px] text-[#434653] mt-1 font-['Inter']`}>Image selected (preview)</Text>
              </View>
            )}
          </View>
        )}

        {selectedTab === "Completed" && (
          <View
            style={[
              tw`w-full bg-white rounded-[12px] p-[24px] border border-[#DAE1E7] gap-[16px] mb-8`,
              {
                shadowColor: "#102A43",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 20,
                elevation: 4,
              },
            ]}
          >
            <Text style={tw`text-[20px] font-semibold text-[#011D35] font-['Inter'] leading-[28px]`}>
              Actions
            </Text>

            {/* Row 1: View Images & View Prescription */}
            {/* <View style={tw`flex-row gap-[12px]`}>
              <TouchableOpacity
                onPress={() => fetchAppointmentDocuments(true)}
                style={tw`flex-1 bg-[#124CB8] py-3 px-3 rounded-[10px] items-center justify-center`}
                activeOpacity={0.8}
              >
                <Text style={tw`text-white font-semibold text-[13px] font-['Inter'] text-center`}>View Images</Text>
              </TouchableOpacity>

              {appointment.prescription && appointment.prescription !== "" ? (
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
                  style={tw`flex-1 bg-[#4F46E5] py-3 px-3 rounded-[10px] items-center justify-center`}
                  activeOpacity={0.8}
                >
                  <Text style={tw`text-white font-semibold text-[13px] font-['Inter'] text-center`}>View Prescription</Text>
                </TouchableOpacity>
              ) : (
                <View style={tw`flex-1`} />
              )}
            </View> */}

            {/* Row 2: Write Review & Follow-up */}
            {["completed", "closed"].includes(appointment.appointment_status.toLowerCase()) && (
              <View style={tw`flex-row gap-[12px]`}>
                <TouchableOpacity
                  onPress={() => {
                    setReviewText("");
                    setReviewModalVisible(true);
                  }}
                  style={tw`flex-1 bg-[#2563EB] py-3 px-3 rounded-[10px] items-center justify-center`}
                  activeOpacity={0.8}
                >
                  <Text style={tw`text-white font-semibold text-[13px] font-['Inter'] text-center`}>Write Review</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={openFollowUpScreen}
                  style={tw`flex-1 bg-[#EA580C] py-3 px-3 rounded-[10px] items-center justify-center`}
                  activeOpacity={0.8}
                >
                  <Text style={tw`text-white font-semibold text-[13px] font-['Inter'] text-center`}>
                    {appointment.checkupAppointment && appointment.checkupAppointment.length > 0
                      ? "Follow-up Booked"
                      : "Book Follow-ups"}
                  </Text>
                </TouchableOpacity>

              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Add Prescription Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={tw`flex-1 justify-center bg-black/60 p-4`}>
          <View style={tw`bg-white p-6 rounded-[20px] max-h-[85%] border border-[#DAE1E7]`}>
            {/* Modal Header */}
            <View style={tw`flex-row justify-between items-center mb-4 pb-3 border-b border-[#F0F3F6]`}>
              <Text style={tw`text-[20px] font-bold text-[#011D35] font-['Inter']`}>
                Add Prescription
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`bg-[#F0F3F6] w-8 h-8 rounded-full justify-center items-center`}
              >
                <Text style={tw`text-[#434653] font-bold text-base`}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={tw`mb-4`} showsVerticalScrollIndicator={false}>
              {prescriptions.map((pres, index) => (
                <View
                  key={index}
                  style={tw`mb-4 bg-[#FAFBFD] border border-[#C3C6D5] p-4 rounded-[12px] gap-3`}
                >
                  <View style={tw`flex-row justify-between items-center mb-1`}>
                    <Text style={tw`text-[13px] font-semibold text-[#124CB8] font-['Inter'] uppercase tracking-wider`}>
                      Drug Item #{index + 1}
                    </Text>
                    {prescriptions.length > 1 && (
                      <TouchableOpacity
                        onPress={() => {
                          const arr = prescriptions.filter((_, i) => i !== index);
                          setPrescriptions(arr.length ? arr : [{ drug: "", qty: "", timing: "", notes: "" }]);
                        }}
                        style={tw`bg-[#FFEBEE] px-3 py-1 rounded-full`}
                      >
                        <Text style={tw`text-[#D32F2F] text-[12px] font-semibold`}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Drug Name Input */}
                  <View>
                    <Text style={tw`text-[12px] font-medium text-[#434653] mb-1 font-['Inter']`}>Drug Name</Text>
                    <TextInput
                      placeholder="e.g. Paracetamol 500mg"
                      placeholderTextColor="#A0AEC0"
                      value={pres.drug}
                      onChangeText={(text) => {
                        const arr = [...prescriptions];
                        arr[index].drug = text;
                        setPrescriptions(arr);
                      }}
                      style={tw`bg-white border border-[#DAE1E7] rounded-[8px] p-3 text-[14px] text-[#011D35] font-['Inter']`}
                    />
                  </View>

                  {/* Quantity & Timing Row */}
                  <View style={tw`flex-row gap-3`}>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-[12px] font-medium text-[#434653] mb-1 font-['Inter']`}>Quantity</Text>
                      <TextInput
                        placeholder="e.g. 10 Tablets"
                        placeholderTextColor="#A0AEC0"
                        value={pres.qty}
                        onChangeText={(text) => {
                          const arr = [...prescriptions];
                          arr[index].qty = text;
                          setPrescriptions(arr);
                        }}
                        style={tw`bg-white border border-[#DAE1E7] rounded-[8px] p-3 text-[14px] text-[#011D35] font-['Inter']`}
                      />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-[12px] font-medium text-[#434653] mb-1 font-['Inter']`}>Timing</Text>
                      <TextInput
                        placeholder="e.g. 1-0-1 (After meals)"
                        placeholderTextColor="#A0AEC0"
                        value={pres.timing}
                        onChangeText={(text) => {
                          const arr = [...prescriptions];
                          arr[index].timing = text;
                          setPrescriptions(arr);
                        }}
                        style={tw`bg-white border border-[#DAE1E7] rounded-[8px] p-3 text-[14px] text-[#011D35] font-['Inter']`}
                      />
                    </View>
                  </View>

                  {/* Notes Input */}
                  <View>
                    <Text style={tw`text-[12px] font-medium text-[#434653] mb-1 font-['Inter']`}>Notes / Instructions</Text>
                    <TextInput
                      placeholder="e.g. Take with warm water"
                      placeholderTextColor="#A0AEC0"
                      value={pres.notes}
                      onChangeText={(text) => {
                        const arr = [...prescriptions];
                        arr[index].notes = text;
                        setPrescriptions(arr);
                      }}
                      style={tw`bg-white border border-[#DAE1E7] rounded-[8px] p-3 text-[14px] text-[#011D35] font-['Inter']`}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Modal Buttons */}
            <TouchableOpacity
              onPress={() => setPrescriptions([...prescriptions, { drug: "", qty: "", timing: "", notes: "" }])}
              style={tw`bg-[#EEF4FF] border border-[#DBE9FF] py-3 rounded-[10px] mb-3 items-center`}
            >
              <Text style={tw`text-[#124CB8] font-semibold text-[14px] font-['Inter']`}>+ Add Another Drug</Text>
            </TouchableOpacity>

            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`flex-1 bg-[#F0F3F6] py-3 rounded-[10px] items-center`}
              >
                <Text style={tw`text-[#434653] font-semibold text-[14px] font-['Inter']`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSavePrescription}
                style={tw`flex-1 bg-[#124CB8] py-3 rounded-[10px] items-center`}
              >
                <Text style={tw`text-white font-semibold text-[14px] font-['Inter']`}>Save Prescription</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* View Prescription Modal */}
      <Modal visible={viewPrescriptionModal} animationType="slide" transparent={true}>
        <View style={tw`flex-1 justify-center bg-black/60 p-4`}>
          <View style={tw`bg-white p-6 rounded-[20px] max-h-[85%] border border-[#DAE1E7]`}>
            <View style={tw`flex-row justify-between items-center mb-4 pb-3 border-b border-[#F0F3F6]`}>
              <Text style={tw`text-[20px] font-bold text-[#011D35] font-['Inter']`}>
                Prescription Details
              </Text>
              <TouchableOpacity
                onPress={() => setViewPrescriptionModal(false)}
                style={tw`bg-[#F0F3F6] w-8 h-8 rounded-full justify-center items-center`}
              >
                <Text style={tw`text-[#434653] font-bold text-base`}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={tw`mb-4`} showsVerticalScrollIndicator={false}>
              {selectedPrescription.length === 0 ? (
                <Text style={tw`text-center text-[#434653] py-4`}>No prescription details found.</Text>
              ) : (
                selectedPrescription.map((pres, idx) => (
                  <View
                    key={idx}
                    style={tw`mb-3 bg-[#FAFBFD] border border-[#C3C6D5] p-4 rounded-[12px] gap-2`}
                  >
                    <View style={tw`flex-row justify-between items-center`}>
                      <Text style={tw`text-[16px] font-bold text-[#011D35] font-['Inter']`}>
                        {pres.drug || 'Unspecified Drug'}
                      </Text>
                      {pres.qty ? (
                        <View style={tw`bg-[#EEF4FF] px-3 py-1 rounded-full`}>
                          <Text style={tw`text-[#124CB8] text-[12px] font-semibold`}>{pres.qty}</Text>
                        </View>
                      ) : null}
                    </View>
                    {pres.timing ? (
                      <Text style={tw`text-[13px] text-[#434653] font-['Inter']`}>
                        <Text style={tw`font-semibold text-[#011D35]`}>Timing: </Text>
                        {pres.timing}
                      </Text>
                    ) : null}
                    {pres.notes ? (
                      <Text style={tw`text-[12px] text-[#707784] font-['Inter'] italic`}>
                        Note: {pres.notes}
                      </Text>
                    ) : null}
                  </View>
                ))
              )}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setViewPrescriptionModal(false)}
              style={tw`bg-[#F0F3F6] py-3 rounded-[10px] items-center`}
            >
              <Text style={tw`text-[#434653] font-semibold text-[14px] font-['Inter']`}>Close</Text>
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
        <View style={tw`flex-1 justify-center bg-black/60 p-4`}>
          <View style={tw`bg-white p-6 rounded-[20px] max-h-[70%] border border-[#DAE1E7]`}>
            <View style={tw`flex-row justify-between items-center mb-4 pb-3 border-b border-[#F0F3F6]`}>
              <Text style={tw`text-[20px] font-bold text-[#011D35] font-['Inter']`}>
                Write Review
              </Text>
              <TouchableOpacity
                onPress={() => setReviewModalVisible(false)}
                style={tw`bg-[#F0F3F6] w-8 h-8 rounded-full justify-center items-center`}
              >
                <Text style={tw`text-[#434653] font-bold text-base`}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={tw`text-[13px] font-medium text-[#434653] mb-2 font-['Inter']`}>
              Your feedback / clinical notes:
            </Text>
            <TextInput
              placeholder="Write your detailed review here..."
              placeholderTextColor="#A0AEC0"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              style={tw`bg-[#FAFBFD] border border-[#DAE1E7] p-4 mb-5 rounded-[12px] text-[14px] text-[#011D35] font-['Inter'] min-h-[120px]`}
            />

            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                onPress={() => setReviewModalVisible(false)}
                style={tw`flex-1 bg-[#F0F3F6] py-3 rounded-[10px] items-center`}
              >
                <Text style={tw`text-[#434653] font-semibold text-[14px] font-['Inter']`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={submitDoctorReview}
                style={tw`flex-1 bg-[#124CB8] py-3 rounded-[10px] items-center justify-center`}
                disabled={reviewLoading}
              >
                {reviewLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={tw`text-white font-semibold text-[14px] font-['Inter']`}>Submit Review</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

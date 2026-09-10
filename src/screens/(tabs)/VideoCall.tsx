



import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Mic,
  MicOff,
  SwitchCamera,
  PhoneOff,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
} from 'lucide-react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
  MediaStream,
} from 'react-native-webrtc';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, collection, onSnapshot, updateDoc } from 'firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import { useAccessToken } from '../contexts/AccessTokenContext';
import { PinchZoomImage } from '../../components/PinchZoomImage';

/* ---------------- CONFIG ---------------- */

const API_BASE_URL = 'https://api.docapp.co.in/api';

/** 🔧 TEMP HARD-CODED IDS (TESTING ONLY) */
const DOCTOR_ID = 36;
const PATIENT_ID = 33;

const firebaseConfig = {
  apiKey: 'AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw',
  authDomain: 'videocall-174e6.firebaseapp.com',
  projectId: 'videocall-174e6',
  storageBucket: 'videocall-174e6.firebasestorage.app',
  messagingSenderId: '965109245557',
  appId: '1:965109245557:web:eb5e5c760d3b41dbda7a3c',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const iceServers = {
  iceServers: [
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

/* ---------------- COMPONENT ---------------- */

export default function VideoCall({
  route,
  embeddedRole,
  embeddedApptId,
  embeddedCallId,
}: any) {
  /** ROLE & APPOINTMENT */
  const userRole = embeddedRole ?? route?.params?.userRole;
  const appointmentId = embeddedApptId ?? route?.params?.appointmentId;

  const navigation = useNavigation<any>();

  /** FIXED TEST IDS */
  const doctorId = DOCTOR_ID;
  const patientId = PATIENT_ID;
  const currentUserId = userRole === 'doctor' ? doctorId : patientId;

  const { accessToken } = useAccessToken();

  const pc = useRef<RTCPeerConnection | null>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callId, setCallId] = useState(embeddedCallId ?? '');
  const [status, setStatus] =
    useState<'idle' | 'incoming' | 'calling' | 'connected'>(embeddedCallId ? 'incoming' : 'idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // 📄 Split Screen Document States
  const [isSplitView, setIsSplitView] = useState(false);
  const [appointmentDocuments, setAppointmentDocuments] = useState<any[]>([]);
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [docLoading, setDocLoading] = useState(false);
  const [docZoom, setDocZoom] = useState(1.0);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1.0);

  // Document navigation & zoom handlers
  const handleSelectDoc = (index: number) => {
    setSelectedDocIndex(index);
    setDocZoom(1.0);
    setModalZoom(1.0);
  };

  const handleZoomIn = () => {
    setDocZoom(prev => Math.min(3.5, Number((prev + 0.5).toFixed(1))));
  };

  const handleZoomOut = () => {
    setDocZoom(prev => Math.max(1.0, Number((prev - 0.5).toFixed(1))));
  };

  const handleResetZoom = () => {
    setDocZoom(1.0);
  };

  const handleModalZoomIn = () => {
    setModalZoom(prev => Math.min(5.0, Number((prev + 0.5).toFixed(1))));
  };

  const handleModalZoomOut = () => {
    setModalZoom(prev => Math.max(1.0, Number((prev - 0.5).toFixed(1))));
  };

  const handleModalResetZoom = () => {
    setModalZoom(1.0);
  };

  // Fetch appointment-related documents
  const fetchAppointmentDocuments = async () => {
    if (!appointmentId || !accessToken) return;
    try {
      setDocLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/appointment/get-document-for/${appointmentId}`,
        {
          credentials: 'include',
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setAppointmentDocuments(data);
        setSelectedDocIndex(0);
        setDocZoom(1.0);
        setModalZoom(1.0);
      } else {
        setAppointmentDocuments([]);
      }
    } catch (err) {
      console.error('Failed to load appointment documents in VideoCall:', err);
    } finally {
      setDocLoading(false);
    }
  };

  const toggleSplitView = () => {
    if (!isSplitView) {
      fetchAppointmentDocuments();
    } else {
      setDocZoom(1.0);
      setIsDocModalOpen(false);
    }
    setIsSplitView(prev => !prev);
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(prev => !prev);
    }
  };

  const switchCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        // @ts-ignore
        if (typeof track._switchCamera === 'function') {
          track._switchCamera();
        }
      });
    }
  };

  const endCall = async () => {
    addLog('[User] Ended call');

    if (callId) {
      try {
        const callDoc = doc(db, 'call_history', callId);
        await updateDoc(callDoc, { callStatus: 'ended' });
      } catch (e) {
        console.log('Failed to update call status', e);
      }
    }

    pc.current?.close();
    pc.current = null;
    localStream?.getTracks().forEach(t => t.stop());
    setLocalStream(null);
    setRemoteStream(null);
    setStatus('idle');
    setCallId('');
    showToast('Call ended.');
    navigation.replace('CallCompleted');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const addLog = (msg: string) => {
    console.log(msg);
    setLogs(prev => [...prev, msg].slice(-15)); // keep last 15 logs
  };

  /* ---------------- DEBUG ---------------- */

  useEffect(() => {
    addLog(`[VideoCall INIT] Role: ${userRole}, Appt: ${appointmentId}`);
  }, []);

  /* ---------------- 🔔 REGISTER FCM TOKEN (TEMP) ---------------- */

  useEffect(() => {
    const registerFcmToken = async () => {
      try {
        await messaging().requestPermission();

        const token = await messaging().getToken();
        addLog(`[FCM] Token: ${token.substring(0, 10)}...`);

        await fetch(`${API_BASE_URL}/notifications/save-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            token,
            platform: 'mobile',
          }),
        });

        addLog('[FCM] Token registered with backend');
      } catch (err: any) {
        addLog(`[FCM] Error: ${err.message || 'registration failed'}`);
      }
    };

    if (accessToken) {
      registerFcmToken();
    }
  }, [accessToken]);

  /* ---------------- PEER ---------------- */

  const createPeer = () => {
    pc.current = new RTCPeerConnection(iceServers);

    pc.current.ontrack = event => {
      if (event.streams[0]) {
        addLog('[Peer] Remote track received');
        setRemoteStream(event.streams[0]);
        setStatus('connected');
      }
    };

    pc.current.onicecandidate = e => {
      if (!e.candidate || !callId) return;
      addLog('[Peer] Sending ICE candidate');

      fetch(
        userRole === 'doctor'
          ? `${API_BASE_URL}/call/add-offer-candidates`
          : `${API_BASE_URL}/call/add-answer-candidates`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            call_id: callId,
            [userRole === 'doctor'
              ? 'offer_candidate'
              : 'answer_candidate']: e.candidate,
          }),
        }
      );
    };
  };

  /* ---------------- MEDIA ---------------- */

  const startMedia = async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    setLocalStream(stream);
    stream.getTracks().forEach(track =>
      pc.current?.addTrack(track, stream)
    );
  };

  /* ---------------- PATIENT FCM LISTENER (MOVED TO GLOBAL OVERLAY) ---------------- */



  /* ---------------- DOCTOR START ---------------- */

  const startCall = async () => {
    addLog('[Doctor] Starting call...');
    createPeer();
    await startMedia();
    setStatus('calling');

    const offer = await pc.current!.createOffer();
    addLog('[Doctor] Offer created');
    await pc.current!.setLocalDescription(offer);

    const res = await fetch(`${API_BASE_URL}/call/initialise-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        appointment_id: appointmentId,
        offer,
        doctor_id: doctorId,
        patient_id: patientId,
      }),
    });

    const data = await res.json();
    addLog(`[Doctor] Call init success. ID: ${data.call_id}`);
    setCallId(data.call_id);

    const callDoc = doc(db, 'call_history', data.call_id);

    onSnapshot(callDoc, snap => {
      const d = snap.data();

      if (d?.callStatus === 'declined') {
        showToast('Call was DECLINED by patient.');
        addLog('[Doctor] Call was DECLINED by patient.');
        setStatus('idle');
        navigation.replace('CallCompleted');
      } else if (d?.callStatus === 'accepted') {
        showToast('Call was ACCEPTED by patient.');
        addLog('[Doctor] Call was ACCEPTED by patient.');
      } else if (d?.callStatus === 'ended') {
        showToast('Call ended by patient.');
        addLog('[Doctor] Call ended by patient.');
        setStatus('idle');
        navigation.replace('CallCompleted');
      }

      if (d?.answer && !pc.current?.currentRemoteDescription) {
        pc.current?.setRemoteDescription(
          new RTCSessionDescription(d.answer)
        );
      }
    });

    onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
      snap.docChanges().forEach(c => {
        if (c.type === 'added') {
          pc.current?.addIceCandidate(
            new RTCIceCandidate(c.doc.data())
          );
        }
      });
    });
  };

  /* ---------------- PATIENT ACCEPT ---------------- */

  const acceptCall = async () => {
    addLog('[Patient] Accepting call...');
    createPeer();
    setStatus('calling');

    const callDoc = doc(db, 'call_history', callId);

    const unsub = onSnapshot(callDoc, async snap => {
      const data = snap.data();

      if (data?.callStatus === 'ended') {
        showToast('Call ended by doctor.');
        addLog('[Patient] Call ended by doctor.');
        setStatus('idle');
        navigation.replace('CallCompleted');
      }

      if (!data?.offer) return;

      unsub();

      await pc.current!.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );
      addLog('[Patient] Set remote description');

      await startMedia();

      const answer = await pc.current!.createAnswer();
      addLog('[Patient] Answer created');
      await pc.current!.setLocalDescription(answer);

      await fetch(`${API_BASE_URL}/call/recieve-call`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          call_id: callId,
          answer,
          patient_id: patientId,
        }),
      });
    });
  };

  /* ---------------- UI ---------------- */

  const currentDoc = appointmentDocuments[selectedDocIndex];

  return (
    <View style={styles.container}>
      {/* 📄 FULLSCREEN DOCUMENT ZOOM MODAL */}
      <Modal
        visible={isDocModalOpen}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setIsDocModalOpen(false)}
      >
        <View style={styles.modalFullContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderLeft}>
              <View style={styles.docIconPill}>
                <FileText size={16} color="#38BDF8" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalHeaderTitle} numberOfLines={1}>
                  {currentDoc?.document_name || `Document #${selectedDocIndex + 1}`}
                </Text>
                {appointmentDocuments.length > 0 && (
                  <Text style={styles.modalHeaderSubtitle}>
                    Document {selectedDocIndex + 1} of {appointmentDocuments.length}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.modalHeaderRight}>
              {appointmentDocuments.length > 1 && (
                <View style={styles.docNavGroup}>
                  <TouchableOpacity
                    onPress={() => handleSelectDoc(Math.max(0, selectedDocIndex - 1))}
                    disabled={selectedDocIndex === 0}
                    style={[styles.docNavBtn, selectedDocIndex === 0 && { opacity: 0.4 }]}
                  >
                    <ChevronLeft size={20} color="#FFF" />
                  </TouchableOpacity>

                  <Text style={styles.docCounterText}>
                    {selectedDocIndex + 1}/{appointmentDocuments.length}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      handleSelectDoc(
                        Math.min(appointmentDocuments.length - 1, selectedDocIndex + 1)
                      )
                    }
                    disabled={selectedDocIndex === appointmentDocuments.length - 1}
                    style={[
                      styles.docNavBtn,
                      selectedDocIndex === appointmentDocuments.length - 1 && { opacity: 0.4 },
                    ]}
                  >
                    <ChevronRight size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                onPress={() => setIsDocModalOpen(false)}
                activeOpacity={0.7}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Modal Zoomable Image View with 2-Finger Pinch Zoom */}
          <View style={styles.modalImageWrapper}>
            {currentDoc?.document_url ? (
              <PinchZoomImage
                uri={currentDoc.document_url}
                minScale={1.0}
                maxScale={5.0}
                controlledScale={modalZoom}
                onScaleChange={setModalZoom}
                style={styles.modalImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.docEmptyWrap}>
                <Text style={styles.docEmptySubtitle}>No document preview available</Text>
              </View>
            )}

            {/* Floating Zoom Control Bar inside Modal */}
            <View style={styles.modalFloatingZoomBar}>
              <TouchableOpacity
                style={styles.zoomControlBtn}
                onPress={handleModalZoomOut}
                disabled={modalZoom <= 1.0}
              >
                <ZoomOut size={18} color={modalZoom <= 1.0 ? '#64748B' : '#FFF'} />
              </TouchableOpacity>

              <View style={styles.zoomLevelBadge}>
                <Text style={styles.zoomLevelText}>{modalZoom.toFixed(1)}x</Text>
              </View>

              <TouchableOpacity
                style={styles.zoomControlBtn}
                onPress={handleModalZoomIn}
                disabled={modalZoom >= 5.0}
              >
                <ZoomIn size={18} color={modalZoom >= 5.0 ? '#64748B' : '#FFF'} />
              </TouchableOpacity>

              {modalZoom > 1.0 && (
                <TouchableOpacity
                  style={[styles.zoomControlBtn, { marginLeft: 4 }]}
                  onPress={handleModalResetZoom}
                >
                  <RotateCcw size={16} color="#38BDF8" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Modal Bottom Thumbnail Carousel */}
          {appointmentDocuments.length > 1 && (
            <View style={styles.modalThumbnailBar}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.thumbnailStripContent}
              >
                {appointmentDocuments.map((doc, idx) => (
                  <TouchableOpacity
                    key={doc.id || idx}
                    activeOpacity={0.8}
                    onPress={() => handleSelectDoc(idx)}
                    style={[
                      styles.modalThumbnailCard,
                      idx === selectedDocIndex && styles.thumbnailCardActive,
                    ]}
                  >
                    <Image
                      source={{ uri: doc.document_url }}
                      style={styles.thumbnailImg}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>

      {/* 📄 SPLIT SCREEN: UPPER HALF (DOCUMENTS VIEWER) */}
      {isSplitView && (
        <View style={styles.splitDocContainer}>
          {/* Document Header Bar */}
          <View style={styles.docHeader}>
            <View style={styles.docHeaderLeft}>
              <View style={styles.docIconPill}>
                <FileText size={15} color="#38BDF8" />
              </View>
              <Text style={styles.docHeaderTitle}>
                Patient Docs {appointmentDocuments.length > 0 ? `(${appointmentDocuments.length})` : ''}
              </Text>
            </View>

            <View style={styles.docHeaderRight}>
              {appointmentDocuments.length > 1 && (
                <View style={styles.docNavGroup}>
                  <TouchableOpacity
                    onPress={() => handleSelectDoc(Math.max(0, selectedDocIndex - 1))}
                    disabled={selectedDocIndex === 0}
                    style={[styles.docNavBtn, selectedDocIndex === 0 && { opacity: 0.4 }]}
                  >
                    <ChevronLeft size={18} color="#FFF" />
                  </TouchableOpacity>

                  <Text style={styles.docCounterText}>
                    {selectedDocIndex + 1}/{appointmentDocuments.length}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      handleSelectDoc(
                        Math.min(appointmentDocuments.length - 1, selectedDocIndex + 1)
                      )
                    }
                    disabled={selectedDocIndex === appointmentDocuments.length - 1}
                    style={[
                      styles.docNavBtn,
                      selectedDocIndex === appointmentDocuments.length - 1 && { opacity: 0.4 },
                    ]}
                  >
                    <ChevronRight size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
              )}

              {/* Fullscreen Modal Expand Button */}
              {appointmentDocuments.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setModalZoom(docZoom > 1 ? docZoom : 1.0);
                    setIsDocModalOpen(true);
                  }}
                  activeOpacity={0.7}
                  style={styles.expandDocBtn}
                >
                  <Maximize2 size={16} color="#38BDF8" />
                </TouchableOpacity>
              )}

              {/* Close Split View */}
              <TouchableOpacity
                onPress={toggleSplitView}
                activeOpacity={0.7}
                style={styles.closeDocBtn}
              >
                <X size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Document Body */}
          <View style={styles.docBody}>
            {docLoading ? (
              <View style={styles.docLoadingWrap}>
                <ActivityIndicator size="large" color="#38BDF8" />
                <Text style={styles.docLoadingText}>Loading appointment documents...</Text>
              </View>
            ) : appointmentDocuments.length === 0 ? (
              <View style={styles.docEmptyWrap}>
                <View style={styles.docEmptyIcon}>
                  <ImageIcon size={32} color="#64748B" />
                </View>
                <Text style={styles.docEmptyTitle}>No Documents Found</Text>
                <Text style={styles.docEmptySubtitle}>
                  No documents were uploaded by the patient for this appointment.
                </Text>
              </View>
            ) : (
              <View style={styles.docActiveView}>
                {/* Document Name Pill */}
                <View style={styles.docNamePill}>
                  <Text style={styles.docNameText} numberOfLines={1}>
                    {currentDoc?.document_name || `Document #${selectedDocIndex + 1}.jpg`}
                  </Text>
                </View>

                {/* Main Preview Image with 2-Finger Pinch Zoom and Pan */}
                <View style={styles.docImageContainer}>
                  {currentDoc?.document_url ? (
                    <PinchZoomImage
                      uri={currentDoc.document_url}
                      minScale={1.0}
                      maxScale={4.0}
                      controlledScale={docZoom}
                      onScaleChange={setDocZoom}
                      onPress={() => {
                        setModalZoom(docZoom > 1 ? docZoom : 1.0);
                        setIsDocModalOpen(true);
                      }}
                      style={styles.docMainImage}
                      resizeMode="contain"
                    />

                  ) : (
                    <View style={styles.docEmptyWrap}>
                      <Text style={styles.docEmptySubtitle}>No image preview available</Text>
                    </View>
                  )}

                  {/* Floating Zoom Control Pill in Split View */}
                  {currentDoc?.document_url && (
                    <View style={styles.splitZoomControlPill}>
                      <TouchableOpacity
                        style={styles.splitZoomBtn}
                        onPress={handleZoomOut}
                        disabled={docZoom <= 1.0}
                      >
                        <ZoomOut size={14} color={docZoom <= 1.0 ? '#64748B' : '#FFF'} />
                      </TouchableOpacity>

                      <View style={styles.splitZoomTextWrap}>
                        <Text style={styles.splitZoomText}>{docZoom.toFixed(1)}x</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.splitZoomBtn}
                        onPress={handleZoomIn}
                        disabled={docZoom >= 3.5}
                      >
                        <ZoomIn size={14} color={docZoom >= 3.5 ? '#64748B' : '#FFF'} />
                      </TouchableOpacity>

                      {docZoom > 1.0 && (
                        <TouchableOpacity
                          style={styles.splitZoomBtn}
                          onPress={handleResetZoom}
                        >
                          <RotateCcw size={13} color="#38BDF8" />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={[styles.splitZoomBtn, { borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.15)', paddingLeft: 6, marginLeft: 2 }]}
                        onPress={() => {
                          setModalZoom(docZoom > 1 ? docZoom : 1.0);
                          setIsDocModalOpen(true);
                        }}
                      >
                        <Maximize2 size={13} color="#38BDF8" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Thumbnail Strip (if multiple) */}
                {appointmentDocuments.length > 1 && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.thumbnailStrip}
                    contentContainerStyle={styles.thumbnailStripContent}
                  >
                    {appointmentDocuments.map((doc, idx) => (
                      <TouchableOpacity
                        key={doc.id || idx}
                        activeOpacity={0.8}
                        onPress={() => handleSelectDoc(idx)}
                        style={[
                          styles.thumbnailCard,
                          idx === selectedDocIndex && styles.thumbnailCardActive,
                        ]}
                      >
                        <Image
                          source={{ uri: doc.document_url }}
                          style={styles.thumbnailImg}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>
            )}
          </View>
        </View>
      )}

      {/* 📹 VIDEO CALL CONTAINER (LOWER HALF WHEN SPLIT, FULLSCREEN OTHERWISE) */}
      <View style={[styles.videoWrapper, isSplitView && styles.splitVideoWrapper]}>
        {/* Remote Video (Background) */}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
            objectFit="cover"
          />
        )}
        {!remoteStream && (
          <View style={styles.placeholderBackground}>
            {status === 'calling' ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Text style={{ color: '#aaa' }}>{status === 'idle' ? 'Ready' : 'Waiting...'}</Text>
            )}
          </View>
        )}

        {/* Atmospheric Gradient */}
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.3)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Top Status Bar */}
        <View style={[styles.topBar, isSplitView && styles.splitTopBar]}>
          <View style={styles.statusPill}>
            <View style={styles.redDot} />
            <Text style={styles.statusText}>Consultation</Text>
          </View>

          <TouchableOpacity
            style={[styles.docsButton, isSplitView && styles.docsButtonActive]}
            onPress={toggleSplitView}
            activeOpacity={0.8}
          >
            <FileText size={16} color={isSplitView ? '#38BDF8' : '#FFF'} />
            <Text style={[styles.docsText, isSplitView && { color: '#38BDF8', fontWeight: 'bold' }]}>
              {isSplitView ? 'Hide Docs' : 'Documents'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logs Overlay */}
        {logs.length > 0 && !isSplitView && (
          <View style={styles.logsContainer}>
            {logs.map((l, i) => (
              <Text key={i} style={styles.logText}>{l}</Text>
            ))}
          </View>
        )}

        {/* Temporary Toast Overlay */}
        {toastMessage && (
          <View style={[styles.toastContainer, isSplitView && { top: 60 }]}>
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}

        {/* PIP Local Video */}
        {localStream && (
          <View style={[styles.pipContainer, isSplitView && styles.splitPipContainer]}>
            <RTCView
              streamURL={localStream.toURL()}
              style={styles.localVideo}
              objectFit="cover"
              mirror={userRole === 'patient'}
              zOrder={1}
              zOrderMediaOverlay={true}
            />
            <View style={styles.pipOverlay}>
              <Text style={styles.pipText}>You</Text>
            </View>
          </View>
        )}

        {/* Floating Bottom Controls */}
        <View style={[styles.bottomControlsContainer, isSplitView && styles.splitBottomControls]}>
          <View style={[styles.mainControlBar, isSplitView && styles.splitMainControlBar]}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleMute}>
              {isMuted ? <MicOff size={20} color="#BA1A1A" /> : <Mic size={20} color="#FFF" />}
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton} onPress={switchCamera}>
              <SwitchCamera size={20} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconButton, styles.endCallButton]}
              onPress={endCall}
            >
              <PhoneOff size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons (For testing/dev flow) */}
        <View style={styles.devActions}>
          {userRole === 'doctor' && status === 'idle' && (
            <Button title="Start Call" onPress={startCall} />
          )}
          {userRole === 'patient' && status === 'incoming' && (
            <Button title="Accept Call" onPress={acceptCall} />
          )}
        </View>
      </View>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoWrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000',
  },
  splitVideoWrapper: {
    flex: 1,
    height: '52%',
  },
  remoteVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  placeholderBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  topBar: {
    position: 'absolute',
    top: 48,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    zIndex: 10,
  },
  splitTopBar: {
    top: 12,
    height: 48,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 9999,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  statusText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  docsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 9999,
    gap: 6,
  },
  docsButtonActive: {
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
    borderColor: '#38BDF8',
  },
  docsText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  pipContainer: {
    position: 'absolute',
    right: 16,
    top: 120,
    width: 108,
    height: 144,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1.5,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    zIndex: 10,
  },
  splitPipContainer: {
    top: 12,
    right: 12,
    width: 88,
    height: 116,
    borderRadius: 12,
  },
  localVideo: {
    width: '100%',
    height: '100%',
  },
  pipOverlay: {
    position: 'absolute',
    left: 6,
    bottom: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  pipText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  bottomControlsContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  splitBottomControls: {
    bottom: 16,
  },
  mainControlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderRadius: 32,
    padding: 10,
    width: 310,
    height: 74,
  },
  splitMainControlBar: {
    height: 64,
    padding: 8,
    width: 280,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  devActions: {
    position: 'absolute',
    top: '40%',
    width: '100%',
    alignItems: 'center',
    zIndex: 20,
  },
  logsContainer: {
    position: 'absolute',
    top: 120,
    left: 16,
    width: '55%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 8,
    zIndex: 20,
  },
  logText: {
    color: '#38BDF8',
    fontSize: 9,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  toastContainer: {
    position: 'absolute',
    top: 110,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  toastText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '600',
  },

  /* 📄 SPLIT SCREEN DOCUMENT VIEWER STYLES */
  splitDocContainer: {
    height: '48%',
    backgroundColor: '#0F172A',
    borderBottomWidth: 2,
    borderBottomColor: '#1E293B',
    overflow: 'hidden',
    zIndex: 30,
  },
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  docHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  docIconPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docHeaderTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  docHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  docNavGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 4,
  },
  docNavBtn: {
    padding: 3,
  },
  docCounterText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  expandDocBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeDocBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  docLoadingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  docLoadingText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  docEmptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  docEmptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  docEmptyTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  docEmptySubtitle: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  docActiveView: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  docNamePill: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderColor: '#334155',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    maxWidth: '85%',
  },
  docNameText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  docImageContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginVertical: 4,
  },
  splitDocScrollView: {
    width: '100%',
    height: '100%',
  },
  splitDocScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splitDocImageTouch: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docMainImage: {
    width: '100%',
    height: '100%',
  },
  splitZoomControlPill: {
    position: 'absolute',
    bottom: 8,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    zIndex: 35,
  },
  splitZoomBtn: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splitZoomTextWrap: {
    paddingHorizontal: 4,
  },
  splitZoomText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },
  thumbnailStrip: {
    maxHeight: 46,
    width: '100%',
  },
  thumbnailStripContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  thumbnailCard: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: '#1E293B',
  },
  thumbnailCardActive: {
    borderColor: '#38BDF8',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },

  /* 🔍 FULLSCREEN MODAL VIEWER STYLES */
  modalFullContainer: {
    flex: 1,
    backgroundColor: '#020617',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 48,
    paddingBottom: 14,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    zIndex: 20,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  modalHeaderTitle: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },
  modalHeaderSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  modalHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollView: {
    flex: 1,
    width: '100%',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalImage: {
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').height * 0.72,
  },
  modalFloatingZoomBar: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    zIndex: 30,
  },
  zoomControlBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomLevelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 44,
    alignItems: 'center',
  },
  zoomLevelText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  modalThumbnailBar: {
    height: 64,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    justifyContent: 'center',
  },
  modalThumbnailCard: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: '#1E293B',
  },
});


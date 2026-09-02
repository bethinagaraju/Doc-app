


// // // // // // // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // // // // // // import {
// // // // // // // // // // // //   View,
// // // // // // // // // // // //   Text,
// // // // // // // // // // // //   Button,
// // // // // // // // // // // //   StyleSheet,
// // // // // // // // // // // //   Alert,
// // // // // // // // // // // //   ActivityIndicator
// // // // // // // // // // // // } from 'react-native';
// // // // // // // // // // // // import {
// // // // // // // // // // // //   RTCPeerConnection,
// // // // // // // // // // // //   RTCIceCandidate,
// // // // // // // // // // // //   RTCSessionDescription,
// // // // // // // // // // // //   RTCView,
// // // // // // // // // // // //   mediaDevices,
// // // // // // // // // // // //   MediaStream,
// // // // // // // // // // // //   MediaStreamTrack
// // // // // // // // // // // // } from 'react-native-webrtc';
// // // // // // // // // // // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // // // // // // // // // // import { getFirestore, collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
// // // // // // // // // // // // import messaging from '@react-native-firebase/messaging';

// // // // // // // // // // // // // --- YOUR CONFIGURATION ---
// // // // // // // // // // // // const API_BASE_URL = "http://10.0.2.2:3000/api"; 
// // // // // // // // // // // // const AUTH_TOKEN = "YOUR_LOGGED_IN_USER_TOKEN"; // TODO: Replace with real token from Login

// // // // // // // // // // // // // ✅ YOUR REAL FIREBASE CONFIG
// // // // // // // // // // // // const firebaseConfig = {
// // // // // // // // // // // //   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
// // // // // // // // // // // //   authDomain: "videocall-174e6.firebaseapp.com",
// // // // // // // // // // // //   projectId: "videocall-174e6",
// // // // // // // // // // // //   storageBucket: "videocall-174e6.firebasestorage.app",
// // // // // // // // // // // //   messagingSenderId: "965109245557",
// // // // // // // // // // // //   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c",
// // // // // // // // // // // //   measurementId: "G-N1W0W2C8X0"
// // // // // // // // // // // // };

// // // // // // // // // // // // // Initialize Firebase (Prevent re-initialization error)
// // // // // // // // // // // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // // // // // // // // // // const db = getFirestore(app);

// // // // // // // // // // // // const servers = {
// // // // // // // // // // // //   iceServers: [
// // // // // // // // // // // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
// // // // // // // // // // // //   ],
// // // // // // // // // // // // };

// // // // // // // // // // // // interface VideoCallProps {
// // // // // // // // // // // //   route?: any;
// // // // // // // // // // // //   embeddedRole?: 'doctor' | 'patient';
// // // // // // // // // // // //   embeddedApptId?: string;
// // // // // // // // // // // // }

// // // // // // // // // // // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: VideoCallProps): JSX.Element {
// // // // // // // // // // // //   // Determine Role and ID safely
// // // // // // // // // // // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor'; 
// // // // // // // // // // // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';

// // // // // // // // // // // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // // // // // // // // // // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // // // // // // // // // // //   const [callId, setCallId] = useState<string>('');
// // // // // // // // // // // //   const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // // // // // // // // // // //   const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

// // // // // // // // // // // //   // 1. SETUP NOTIFICATION LISTENER (For Patient)
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (userRole === 'patient') {
// // // // // // // // // // // //         const unsubscribe = messaging().onMessage(async remoteMessage => {
// // // // // // // // // // // //             console.log('FCM Message Received:', remoteMessage);
// // // // // // // // // // // //             if (remoteMessage.data?.action === 'INCOMING_CALL') {
// // // // // // // // // // // //                 setCallId(remoteMessage.data.call_id);
// // // // // // // // // // // //                 setCallStatus('incoming'); 
// // // // // // // // // // // //             }
// // // // // // // // // // // //         });
// // // // // // // // // // // //         return unsubscribe;
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }, [userRole]);

// // // // // // // // // // // //   // 2. CLEANUP ON UNMOUNT
// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //        if (localStream) {
// // // // // // // // // // // //            localStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
// // // // // // // // // // // //            localStream.release();
// // // // // // // // // // // //        }
// // // // // // // // // // // //        pc.current.close();
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // 3. START CAMERA
// // // // // // // // // // // //   const startWebcam = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //         const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// // // // // // // // // // // //         setLocalStream(stream as MediaStream);

// // // // // // // // // // // //         stream.getTracks().forEach((track: MediaStreamTrack) => {
// // // // // // // // // // // //           pc.current.addTrack(track, stream);
// // // // // // // // // // // //         });

// // // // // // // // // // // //         pc.current.ontrack = (event: any) => {
// // // // // // // // // // // //              if(event.streams && event.streams[0]) {
// // // // // // // // // // // //                  setRemoteStream(event.streams[0]);
// // // // // // // // // // // //                  setCallStatus('connected');
// // // // // // // // // // // //              }
// // // // // // // // // // // //         };
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //         console.error("Camera Error:", err);
// // // // // // // // // // // //         Alert.alert("Error", "Camera permission denied or not available");
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // 4. DOCTOR: START CALL
// // // // // // // // // // // //   const initiateCall = async () => {
// // // // // // // // // // // //     await startWebcam();
// // // // // // // // // // // //     setCallStatus('calling');

// // // // // // // // // // // //     // Create Offer
// // // // // // // // // // // //     const offer = await pc.current.createOffer();
// // // // // // // // // // // //     await pc.current.setLocalDescription(offer);

// // // // // // // // // // // //     try {
// // // // // // // // // // // //         // Send to Backend
// // // // // // // // // // // //         const response = await fetch(`${API_BASE_URL}/initialise-call`, {
// // // // // // // // // // // //             method: 'POST',
// // // // // // // // // // // //             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AUTH_TOKEN}` },
// // // // // // // // // // // //             body: JSON.stringify({
// // // // // // // // // // // //                 appointment_id: appointmentId,
// // // // // // // // // // // //                 offer: { sdp: offer.sdp, type: offer.type }
// // // // // // // // // // // //             })
// // // // // // // // // // // //         });

// // // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // // //         if(data.error) throw new Error(data.error);

// // // // // // // // // // // //         const newCallId = data.call_id;
// // // // // // // // // // // //         setCallId(newCallId);

// // // // // // // // // // // //         // Listen for Answer (Direct to Firestore)
// // // // // // // // // // // //         const callDoc = doc(db, 'call_history', newCallId);
// // // // // // // // // // // //         onSnapshot(callDoc, (snapshot) => {
// // // // // // // // // // // //             const d = snapshot.data();
// // // // // // // // // // // //             if (!pc.current.currentRemoteDescription && d?.answer) {
// // // // // // // // // // // //                 const answer = new RTCSessionDescription(d.answer);
// // // // // // // // // // // //                 pc.current.setRemoteDescription(answer);
// // // // // // // // // // // //             }
// // // // // // // // // // // //         });

// // // // // // // // // // // //         // Listen for Candidates
// // // // // // // // // // // //         const ansCandsRef = collection(callDoc, 'answerCandidates');
// // // // // // // // // // // //         onSnapshot(ansCandsRef, (snapshot) => {
// // // // // // // // // // // //             snapshot.docChanges().forEach((change) => {
// // // // // // // // // // // //                 if (change.type === 'added') {
// // // // // // // // // // // //                     const candidate = new RTCIceCandidate(change.doc.data());
// // // // // // // // // // // //                     pc.current.addIceCandidate(candidate);
// // // // // // // // // // // //                 }
// // // // // // // // // // // //             });
// // // // // // // // // // // //         });

// // // // // // // // // // // //         // ICE Candidate Handler
// // // // // // // // // // // //         pc.current.onicecandidate = async (event: any) => {
// // // // // // // // // // // //             if (event.candidate) {
// // // // // // // // // // // //                 await fetch(`${API_BASE_URL}/add-offer-candidates`, {
// // // // // // // // // // // //                     method: 'POST',
// // // // // // // // // // // //                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AUTH_TOKEN}` },
// // // // // // // // // // // //                     body: JSON.stringify({
// // // // // // // // // // // //                         call_id: newCallId,
// // // // // // // // // // // //                         offer_candidate: {
// // // // // // // // // // // //                             candidate: event.candidate.candidate,
// // // // // // // // // // // //                             sdpMid: event.candidate.sdpMid,
// // // // // // // // // // // //                             sdpMLineIndex: event.candidate.sdpMLineIndex
// // // // // // // // // // // //                         }
// // // // // // // // // // // //                     })
// // // // // // // // // // // //                 });
// // // // // // // // // // // //             }
// // // // // // // // // // // //         };

// // // // // // // // // // // //     } catch (err: any) {
// // // // // // // // // // // //         Alert.alert("Error", err.message || "Could not start call");
// // // // // // // // // // // //         setCallStatus('idle');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // 5. PATIENT: ACCEPT CALL
// // // // // // // // // // // //   const acceptIncomingCall = async () => {
// // // // // // // // // // // //     if (!callId) return;
// // // // // // // // // // // //     await startWebcam();

// // // // // // // // // // // //     const callDoc = doc(db, 'call_history', callId);
// // // // // // // // // // // //     const snapshot = await getDoc(callDoc);
// // // // // // // // // // // //     const data = snapshot.data();

// // // // // // // // // // // //     if(!data) return Alert.alert("Error", "Call data not found");

// // // // // // // // // // // //     // Set Remote Description (Doctor's Offer)
// // // // // // // // // // // //     await pc.current.setRemoteDescription(new RTCSessionDescription(data.offer));

// // // // // // // // // // // //     // Create Answer
// // // // // // // // // // // //     const answer = await pc.current.createAnswer();
// // // // // // // // // // // //     await pc.current.setLocalDescription(answer);

// // // // // // // // // // // //     // Send Answer to Backend
// // // // // // // // // // // //     await fetch(`${API_BASE_URL}/recieve-call`, {
// // // // // // // // // // // //         method: 'PUT',
// // // // // // // // // // // //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AUTH_TOKEN}` },
// // // // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // // // //             call_id: callId,
// // // // // // // // // // // //             answer: { sdp: answer.sdp, type: answer.type }
// // // // // // // // // // // //         })
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // Listen for Candidates
// // // // // // // // // // // //     const offCandsRef = collection(callDoc, 'offerCandidates');
// // // // // // // // // // // //     onSnapshot(offCandsRef, (snapshot) => {
// // // // // // // // // // // //         snapshot.docChanges().forEach((change) => {
// // // // // // // // // // // //             if (change.type === 'added') {
// // // // // // // // // // // //                 const candidate = new RTCIceCandidate(change.doc.data());
// // // // // // // // // // // //                 pc.current.addIceCandidate(candidate);
// // // // // // // // // // // //             }
// // // // // // // // // // // //         });
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // ICE Candidate Handler (Answer side)
// // // // // // // // // // // //     pc.current.onicecandidate = async (event: any) => {
// // // // // // // // // // // //         if (event.candidate) {
// // // // // // // // // // // //             await fetch(`${API_BASE_URL}/add-answer-candidates`, {
// // // // // // // // // // // //                 method: 'POST',
// // // // // // // // // // // //                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AUTH_TOKEN}` },
// // // // // // // // // // // //                 body: JSON.stringify({
// // // // // // // // // // // //                     call_id: callId,
// // // // // // // // // // // //                     answer_candidate: {
// // // // // // // // // // // //                         candidate: event.candidate.candidate,
// // // // // // // // // // // //                         sdpMid: event.candidate.sdpMid,
// // // // // // // // // // // //                         sdpMLineIndex: event.candidate.sdpMLineIndex
// // // // // // // // // // // //                     }
// // // // // // // // // // // //                 })
// // // // // // // // // // // //             });
// // // // // // // // // // // //         }
// // // // // // // // // // // //     };

// // // // // // // // // // // //     setCallStatus('connected');
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <View style={styles.container}>
// // // // // // // // // // // //        <View style={styles.header}>
// // // // // // // // // // // //           <Text style={styles.headerText}>
// // // // // // // // // // // //               Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'} 
// // // // // // // // // // // //               {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// // // // // // // // // // // //           </Text>
// // // // // // // // // // // //        </View>

// // // // // // // // // // // //       <View style={styles.videoWrapper}>
// // // // // // // // // // // //         {/* Remote Video (Full Size) */}
// // // // // // // // // // // //         {remoteStream ? (
// // // // // // // // // // // //             <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} objectFit="cover" />
// // // // // // // // // // // //         ) : (
// // // // // // // // // // // //             <View style={styles.placeholder}>
// // // // // // // // // // // //                 {callStatus === 'calling' && <ActivityIndicator size="large" color="#ffffff" />}
// // // // // // // // // // // //                 <Text style={{color: '#999', marginTop: 10}}>
// // // // // // // // // // // //                     {callStatus === 'idle' ? 'Ready to Call' : 'Waiting for Video...'}
// // // // // // // // // // // //                 </Text>
// // // // // // // // // // // //             </View>
// // // // // // // // // // // //         )}

// // // // // // // // // // // //         {/* Local Video (Picture in Picture) */}
// // // // // // // // // // // //         {localStream && (
// // // // // // // // // // // //              <RTCView streamURL={localStream.toURL()} style={styles.localVideo} objectFit="cover" zOrder={1} />
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       </View>

// // // // // // // // // // // //       <View style={styles.controls}>
// // // // // // // // // // // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // // // // // // // // // // //              <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
// // // // // // // // // // // //         )}

// // // // // // // // // // // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // // // // // // // // // // //              <View style={{flexDirection: 'row', gap: 20}}>
// // // // // // // // // // // //                  <Button title="Reject" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // // // // // // // //                  <Button title="Accept Call" onPress={acceptIncomingCall} color="#22C55E" />
// // // // // // // // // // // //              </View>
// // // // // // // // // // // //         )}

// // // // // // // // // // // //         {callStatus === 'connected' && (
// // // // // // // // // // // //              <Button title="End Call" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       </View>
// // // // // // // // // // // //     </View>
// // // // // // // // // // // //   );
// // // // // // // // // // // // }

// // // // // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // // // // //   container: { height: 500, backgroundColor: '#111', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
// // // // // // // // // // // //   header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
// // // // // // // // // // // //   headerText: { color: 'white', fontWeight: 'bold' },
// // // // // // // // // // // //   videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
// // // // // // // // // // // //   localVideo: { 
// // // // // // // // // // // //       position: 'absolute', top: 15, right: 15, 
// // // // // // // // // // // //       width: 100, height: 140, 
// // // // // // // // // // // //       backgroundColor: '#333', borderRadius: 8, borderWidth: 1, borderColor: '#fff' 
// // // // // // // // // // // //   },
// // // // // // // // // // // //   remoteVideo: { width: '100%', height: '100%' },
// // // // // // // // // // // //   placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111'},
// // // // // // // // // // // //   controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' },
// // // // // // // // // // // // });


// // // // // // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // // // // // import {
// // // // // // // // // // //   View,
// // // // // // // // // // //   Text,
// // // // // // // // // // //   Button,
// // // // // // // // // // //   StyleSheet,
// // // // // // // // // // //   Alert,
// // // // // // // // // // //   ActivityIndicator
// // // // // // // // // // // } from 'react-native';
// // // // // // // // // // // import {
// // // // // // // // // // //   RTCPeerConnection,
// // // // // // // // // // //   RTCIceCandidate,
// // // // // // // // // // //   RTCSessionDescription,
// // // // // // // // // // //   RTCView,
// // // // // // // // // // //   mediaDevices,
// // // // // // // // // // //   MediaStream,
// // // // // // // // // // //   MediaStreamTrack
// // // // // // // // // // // } from 'react-native-webrtc';
// // // // // // // // // // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // // // // // // // // // import { getFirestore, collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
// // // // // // // // // // // import messaging from '@react-native-firebase/messaging';
// // // // // // // // // // // import { useUser } from '../contexts/UserContext';

// // // // // // // // // // // // --- YOUR CONFIGURATION ---
// // // // // // // // // // // const API_BASE_URL = "https://api.docapp.co.in/api";

// // // // // // // // // // // // ✅ YOUR REAL FIREBASE CONFIG
// // // // // // // // // // // const firebaseConfig = {
// // // // // // // // // // //   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
// // // // // // // // // // //   authDomain: "videocall-174e6.firebaseapp.com",
// // // // // // // // // // //   projectId: "videocall-174e6",
// // // // // // // // // // //   storageBucket: "videocall-174e6.firebasestorage.app",
// // // // // // // // // // //   messagingSenderId: "965109245557",
// // // // // // // // // // //   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c",
// // // // // // // // // // //   measurementId: "G-N1W0W2C8X0"
// // // // // // // // // // // };

// // // // // // // // // // // // Initialize Firebase
// // // // // // // // // // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // // // // // // // // // const db = getFirestore(app);

// // // // // // // // // // // const servers = {
// // // // // // // // // // //   iceServers: [
// // // // // // // // // // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
// // // // // // // // // // //   ],
// // // // // // // // // // // };

// // // // // // // // // // // interface VideoCallProps {
// // // // // // // // // // //   route?: any;
// // // // // // // // // // //   embeddedRole?: 'doctor' | 'patient';
// // // // // // // // // // //   embeddedApptId?: string;
// // // // // // // // // // // }

// // // // // // // // // // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: VideoCallProps) {
// // // // // // // // // // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor'; 
// // // // // // // // // // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';
// // // // // // // // // // //   const { user } = useUser();

// // // // // // // // // // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // // // // // // // // // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // // // // // // // // // //   const [callId, setCallId] = useState<string>('');
// // // // // // // // // // //   const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // // // // // // // // // //   const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

// // // // // // // // // // //   // 1. SETUP NOTIFICATION LISTENER
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     if (userRole === 'patient') {
// // // // // // // // // // //         const unsubscribe = messaging().onMessage(async remoteMessage => {
// // // // // // // // // // //             console.log('FCM Message Received:', remoteMessage);
// // // // // // // // // // //             if (remoteMessage.data?.action === 'INCOMING_CALL') {
// // // // // // // // // // //                 setCallId(remoteMessage.data.call_id);
// // // // // // // // // // //                 setCallStatus('incoming'); 
// // // // // // // // // // //             }
// // // // // // // // // // //         });
// // // // // // // // // // //         return unsubscribe;
// // // // // // // // // // //     }
// // // // // // // // // // //   }, [userRole]);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     return () => {
// // // // // // // // // // //        if (localStream) {
// // // // // // // // // // //            localStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
// // // // // // // // // // //            localStream.release();
// // // // // // // // // // //        }
// // // // // // // // // // //        pc.current.close();
// // // // // // // // // // //     };
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   // --- NEW: REGISTER DEVICE FUNCTION ---
// // // // // // // // // // //   const registerDevice = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       if(userRole === 'doctor') {
// // // // // // // // // // //         Alert.alert("Info", "Only Patients usually need to register for incoming calls in this demo.");
// // // // // // // // // // //         return;
// // // // // // // // // // //       }

// // // // // // // // // // //       await messaging().requestPermission();
// // // // // // // // // // //       const fcmToken = await messaging().getToken();
// // // // // // // // // // //       console.log("My FCM Token:", fcmToken);

// // // // // // // // // // //       // HARDCODED ID FOR TESTING (Patient = 101)
// // // // // // // // // // //       const TEST_USER_ID = "101"; 

// // // // // // // // // // //       const response = await fetch(`${API_BASE_URL}/save-fcm-token`, { 
// // // // // // // // // // //           method: 'POST',
// // // // // // // // // // //           headers: { 
// // // // // // // // // // //               'Content-Type': 'application/json'
// // // // // // // // // // //           },
// // // // // // // // // // //           body: JSON.stringify({
// // // // // // // // // // //               token: fcmToken,
// // // // // // // // // // //               user_id: TEST_USER_ID,
// // // // // // // // // // //               device_type: 'android'
// // // // // // // // // // //           })
// // // // // // // // // // //       });

// // // // // // // // // // //       if(response.ok) {
// // // // // // // // // // //           Alert.alert("Success", `Device Registered for User ID: ${TEST_USER_ID}`);
// // // // // // // // // // //       } else {
// // // // // // // // // // //           const text = await response.text();
// // // // // // // // // // //           Alert.alert("Backend Error", text);
// // // // // // // // // // //       }

// // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // //       Alert.alert("Error", error.message);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const startWebcam = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //         const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// // // // // // // // // // //         setLocalStream(stream as MediaStream);
// // // // // // // // // // //         stream.getTracks().forEach((track: MediaStreamTrack) => {
// // // // // // // // // // //           pc.current.addTrack(track, stream);
// // // // // // // // // // //         });
// // // // // // // // // // //         pc.current.ontrack = (event: any) => {
// // // // // // // // // // //              if(event.streams && event.streams[0]) {
// // // // // // // // // // //                  setRemoteStream(event.streams[0]);
// // // // // // // // // // //                  setCallStatus('connected');
// // // // // // // // // // //              }
// // // // // // // // // // //         };
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //         Alert.alert("Error", "Camera permission denied");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const initiateCall = async () => {
// // // // // // // // // // //     await startWebcam();
// // // // // // // // // // //     setCallStatus('calling');
// // // // // // // // // // //     const offer = await pc.current.createOffer();
// // // // // // // // // // //     await pc.current.setLocalDescription(offer);

// // // // // // // // // // //     try {
// // // // // // // // // // //         const response = await fetch(`${API_BASE_URL}/initialise-call`, {
// // // // // // // // // // //             method: 'POST',
// // // // // // // // // // //             headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // //             body: JSON.stringify({
// // // // // // // // // // //                 appointment_id: appointmentId,
// // // // // // // // // // //                 offer: { sdp: offer.sdp, type: offer.type }
// // // // // // // // // // //             })
// // // // // // // // // // //         });

// // // // // // // // // // //         const data = await response.json();
// // // // // // // // // // //         if(data.error) throw new Error(data.error);

// // // // // // // // // // //         const newCallId = data.call_id;
// // // // // // // // // // //         setCallId(newCallId);

// // // // // // // // // // //         const callDoc = doc(db, 'call_history', newCallId);
// // // // // // // // // // //         onSnapshot(callDoc, (snapshot) => {
// // // // // // // // // // //             const d = snapshot.data();
// // // // // // // // // // //             if (!pc.current.currentRemoteDescription && d?.answer) {
// // // // // // // // // // //                 const answer = new RTCSessionDescription(d.answer);
// // // // // // // // // // //                 pc.current.setRemoteDescription(answer);
// // // // // // // // // // //             }
// // // // // // // // // // //         });

// // // // // // // // // // //         const ansCandsRef = collection(callDoc, 'answerCandidates');
// // // // // // // // // // //         onSnapshot(ansCandsRef, (snapshot) => {
// // // // // // // // // // //             snapshot.docChanges().forEach((change) => {
// // // // // // // // // // //                 if (change.type === 'added') {
// // // // // // // // // // //                     const candidate = new RTCIceCandidate(change.doc.data());
// // // // // // // // // // //                     pc.current.addIceCandidate(candidate);
// // // // // // // // // // //                 }
// // // // // // // // // // //             });
// // // // // // // // // // //         });

// // // // // // // // // // //         pc.current.onicecandidate = async (event: any) => {
// // // // // // // // // // //             if (event.candidate) {
// // // // // // // // // // //                 await fetch(`${API_BASE_URL}/add-offer-candidates`, {
// // // // // // // // // // //                     method: 'POST',
// // // // // // // // // // //                     headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // //                     body: JSON.stringify({
// // // // // // // // // // //                         call_id: newCallId,
// // // // // // // // // // //                         offer_candidate: {
// // // // // // // // // // //                             candidate: event.candidate.candidate,
// // // // // // // // // // //                             sdpMid: event.candidate.sdpMid,
// // // // // // // // // // //                             sdpMLineIndex: event.candidate.sdpMLineIndex
// // // // // // // // // // //                         }
// // // // // // // // // // //                     })
// // // // // // // // // // //                 });
// // // // // // // // // // //             }
// // // // // // // // // // //         };

// // // // // // // // // // //     } catch (err: any) {
// // // // // // // // // // //         Alert.alert("Error", err.message);
// // // // // // // // // // //         setCallStatus('idle');
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const acceptIncomingCall = async () => {
// // // // // // // // // // //     if (!callId) return;
// // // // // // // // // // //     await startWebcam();

// // // // // // // // // // //     const callDoc = doc(db, 'call_history', callId);
// // // // // // // // // // //     const snapshot = await getDoc(callDoc);
// // // // // // // // // // //     const data = snapshot.data();

// // // // // // // // // // //     if(!data) return Alert.alert("Error", "Call data not found");

// // // // // // // // // // //     await pc.current.setRemoteDescription(new RTCSessionDescription(data.offer));
// // // // // // // // // // //     const answer = await pc.current.createAnswer();
// // // // // // // // // // //     await pc.current.setLocalDescription(answer);

// // // // // // // // // // //     await fetch(`${API_BASE_URL}/recieve-call`, {
// // // // // // // // // // //         method: 'PUT',
// // // // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // // //             call_id: callId,
// // // // // // // // // // //             answer: { sdp: answer.sdp, type: answer.type }
// // // // // // // // // // //         })
// // // // // // // // // // //     });

// // // // // // // // // // //     const offCandsRef = collection(callDoc, 'offerCandidates');
// // // // // // // // // // //     onSnapshot(offCandsRef, (snapshot) => {
// // // // // // // // // // //         snapshot.docChanges().forEach((change) => {
// // // // // // // // // // //             if (change.type === 'added') {
// // // // // // // // // // //                 const candidate = new RTCIceCandidate(change.doc.data());
// // // // // // // // // // //                 pc.current.addIceCandidate(candidate);
// // // // // // // // // // //             }
// // // // // // // // // // //         });
// // // // // // // // // // //     });

// // // // // // // // // // //     pc.current.onicecandidate = async (event: any) => {
// // // // // // // // // // //         if (event.candidate) {
// // // // // // // // // // //             await fetch(`${API_BASE_URL}/add-answer-candidates`, {
// // // // // // // // // // //                 method: 'POST',
// // // // // // // // // // //                 headers: { 'Content-Type': 'application/json' },
// // // // // // // // // // //                 body: JSON.stringify({
// // // // // // // // // // //                     call_id: callId,
// // // // // // // // // // //                     answer_candidate: {
// // // // // // // // // // //                         candidate: event.candidate.candidate,
// // // // // // // // // // //                         sdpMid: event.candidate.sdpMid,
// // // // // // // // // // //                         sdpMLineIndex: event.candidate.sdpMLineIndex
// // // // // // // // // // //                     }
// // // // // // // // // // //                 })
// // // // // // // // // // //             });
// // // // // // // // // // //         }
// // // // // // // // // // //     };

// // // // // // // // // // //     setCallStatus('connected');
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <View style={styles.container}>
// // // // // // // // // // //        <View style={styles.header}>
// // // // // // // // // // //           <Text style={styles.headerText}>
// // // // // // // // // // //               Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'} 
// // // // // // // // // // //               {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// // // // // // // // // // //           </Text>
// // // // // // // // // // //        </View>

// // // // // // // // // // //       <View style={styles.videoWrapper}>
// // // // // // // // // // //         {remoteStream ? (
// // // // // // // // // // //             <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} objectFit="cover" />
// // // // // // // // // // //         ) : (
// // // // // // // // // // //             <View style={styles.placeholder}>
// // // // // // // // // // //                 {callStatus === 'calling' && <ActivityIndicator size="large" color="#ffffff" />}
// // // // // // // // // // //                 <Text style={{color: '#999', marginTop: 10}}>
// // // // // // // // // // //                     {callStatus === 'idle' ? 'Ready to Call' : 'Waiting for Video...'}
// // // // // // // // // // //                 </Text>
// // // // // // // // // // //             </View>
// // // // // // // // // // //         )}
// // // // // // // // // // //         {localStream && (
// // // // // // // // // // //              <RTCView streamURL={localStream.toURL()} style={styles.localVideo} objectFit="cover" zOrder={1} />
// // // // // // // // // // //         )}
// // // // // // // // // // //       </View>

// // // // // // // // // // //       <View style={styles.controls}>
// // // // // // // // // // //         {/* 👇 THIS IS THE NEW BUTTON YOU NEED */}
// // // // // // // // // // //         {userRole === 'patient' && (
// // // // // // // // // // //            <View style={{marginBottom: 10, width: '100%'}}>
// // // // // // // // // // //               <Button title="DEBUG: Register Device (Step 1)" onPress={registerDevice} color="#555" />
// // // // // // // // // // //            </View>
// // // // // // // // // // //         )}

// // // // // // // // // // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // // // // // // // // // //              <Button title="Start Call (Step 2)" onPress={initiateCall} color="#4ADE80" />
// // // // // // // // // // //         )}

// // // // // // // // // // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // // // // // // // // // //              <View style={{flexDirection: 'row', gap: 20}}>
// // // // // // // // // // //                  <Button title="Reject" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // // // // // // //                  <Button title="Accept Call" onPress={acceptIncomingCall} color="#22C55E" />
// // // // // // // // // // //              </View>
// // // // // // // // // // //         )}

// // // // // // // // // // //         {callStatus === 'connected' && (
// // // // // // // // // // //              <Button title="End Call" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // // // // // // //         )}
// // // // // // // // // // //       </View>
// // // // // // // // // // //     </View>
// // // // // // // // // // //   );
// // // // // // // // // // // }

// // // // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // // // //   container: { height: 500, backgroundColor: '#111', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
// // // // // // // // // // //   header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
// // // // // // // // // // //   headerText: { color: 'white', fontWeight: 'bold' },
// // // // // // // // // // //   videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
// // // // // // // // // // //   localVideo: { 
// // // // // // // // // // //       position: 'absolute', top: 15, right: 15, 
// // // // // // // // // // //       width: 100, height: 140, 
// // // // // // // // // // //       backgroundColor: '#333', borderRadius: 8, borderWidth: 1, borderColor: '#fff' 
// // // // // // // // // // //   },
// // // // // // // // // // //   remoteVideo: { width: '100%', height: '100%' },
// // // // // // // // // // //   placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111'},
// // // // // // // // // // //   controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' },
// // // // // // // // // // // });











// // // // // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // // // // import {
// // // // // // // // // //   View,
// // // // // // // // // //   Text,
// // // // // // // // // //   Button,
// // // // // // // // // //   StyleSheet,
// // // // // // // // // //   Alert,
// // // // // // // // // //   ActivityIndicator,
// // // // // // // // // //   TouchableOpacity
// // // // // // // // // // } from 'react-native';
// // // // // // // // // // import {
// // // // // // // // // //   RTCPeerConnection,
// // // // // // // // // //   RTCIceCandidate,
// // // // // // // // // //   RTCSessionDescription,
// // // // // // // // // //   RTCView,
// // // // // // // // // //   mediaDevices,
// // // // // // // // // //   MediaStream,
// // // // // // // // // //   MediaStreamTrack
// // // // // // // // // // } from 'react-native-webrtc';
// // // // // // // // // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // // // // // // // // import { getFirestore, collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
// // // // // // // // // // import messaging from '@react-native-firebase/messaging';
// // // // // // // // // // // import { useUser } from '../contexts/UserContext'; // Uncomment if you use this

// // // // // // // // // // // --- YOUR CONFIGURATION ---
// // // // // // // // // // const API_BASE_URL = "https://api.docapp.co.in/api";

// // // // // // // // // // // ✅ YOUR REAL FIREBASE CONFIG
// // // // // // // // // // const firebaseConfig = {
// // // // // // // // // //   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
// // // // // // // // // //   authDomain: "videocall-174e6.firebaseapp.com",
// // // // // // // // // //   projectId: "videocall-174e6",
// // // // // // // // // //   storageBucket: "videocall-174e6.firebasestorage.app",
// // // // // // // // // //   messagingSenderId: "965109245557",
// // // // // // // // // //   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c",
// // // // // // // // // //   measurementId: "G-N1W0W2C8X0"
// // // // // // // // // // };

// // // // // // // // // // // Initialize Firebase
// // // // // // // // // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // // // // // // // // const db = getFirestore(app);

// // // // // // // // // // const servers = {
// // // // // // // // // //   iceServers: [
// // // // // // // // // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
// // // // // // // // // //   ],
// // // // // // // // // // };

// // // // // // // // // // interface VideoCallProps {
// // // // // // // // // //   route?: any;
// // // // // // // // // //   embeddedRole?: 'doctor' | 'patient';
// // // // // // // // // //   embeddedApptId?: string;
// // // // // // // // // // }

// // // // // // // // // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: VideoCallProps) {
// // // // // // // // // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor'; 
// // // // // // // // // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';
// // // // // // // // // //   // const { user } = useUser(); // Uncomment if needed

// // // // // // // // // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // // // // // // // // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // // // // // // // // //   const [callId, setCallId] = useState<string>('');
// // // // // // // // // //   const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // // // // // // // // //   const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

// // // // // // // // // //   // 1. SETUP NOTIFICATION LISTENER
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (userRole === 'patient') {
// // // // // // // // // //         const unsubscribe = messaging().onMessage(async remoteMessage => {
// // // // // // // // // //             console.log('FCM Message Received:', remoteMessage);
// // // // // // // // // //             if (remoteMessage.data?.action === 'INCOMING_CALL') {
// // // // // // // // // //                 setCallId(remoteMessage.data.call_id);
// // // // // // // // // //                 setCallStatus('incoming'); 
// // // // // // // // // //             }
// // // // // // // // // //         });
// // // // // // // // // //         return unsubscribe;
// // // // // // // // // //     }
// // // // // // // // // //   }, [userRole]);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     return () => {
// // // // // // // // // //        if (localStream) {
// // // // // // // // // //            localStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
// // // // // // // // // //            localStream.release();
// // // // // // // // // //        }
// // // // // // // // // //        pc.current.close();
// // // // // // // // // //     };
// // // // // // // // // //   }, []);

// // // // // // // // // //   // --- NEW: REGISTER DEVICE FUNCTION (FIXED ENDPOINT) ---
// // // // // // // // // //   const registerDevice = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       if(userRole === 'doctor') {
// // // // // // // // // //         Alert.alert("Info", "Only Patients usually need to register for incoming calls in this demo.");
// // // // // // // // // //         return;
// // // // // // // // // //       }

// // // // // // // // // //       await messaging().requestPermission();
// // // // // // // // // //       const fcmToken = await messaging().getToken();
// // // // // // // // // //       console.log("My FCM Token:", fcmToken);

// // // // // // // // // //       // HARDCODED ID FOR TESTING (Patient = 101)
// // // // // // // // // //       const TEST_USER_ID = "33"; 

// // // // // // // // // //       // ✅ FIXED: Updated to match your backend docs (/notifications/save-token)
// // // // // // // // // //       const response = await fetch(`${API_BASE_URL}/notifications/save-token`, { 
// // // // // // // // // //           method: 'POST',
// // // // // // // // // //           headers: { 
// // // // // // // // // //               'Content-Type': 'application/json'
// // // // // // // // // //               // 'Authorization': `Bearer ${user.token}` // Add this back if you have the token
// // // // // // // // // //           },
// // // // // // // // // //           body: JSON.stringify({
// // // // // // // // // //               token: fcmToken,
// // // // // // // // // //               user_id: TEST_USER_ID, // Ensure backend handles this field (or uses auth token)
// // // // // // // // // //               platform: 'android'    // Changed 'device_type' to 'platform' based on your docs
// // // // // // // // // //           })
// // // // // // // // // //       });

// // // // // // // // // //       if(response.ok) {
// // // // // // // // // //           Alert.alert("Success", `Device Registered for User ID: ${TEST_USER_ID}`);
// // // // // // // // // //       } else {
// // // // // // // // // //           const text = await response.text();
// // // // // // // // // //           // Alert.alert("Backend Error", text); 
// // // // // // // // // //           // Sometimes HTML error pages are too long for alerts, log it instead:
// // // // // // // // // //           console.log("Backend Error:", text);
// // // // // // // // // //           Alert.alert("Error", "Check console for details (likely 404 or 500)");
// // // // // // // // // //       }

// // // // // // // // // //     } catch (error: any) {
// // // // // // // // // //       Alert.alert("Error", error.message);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const startWebcam = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //         const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// // // // // // // // // //         setLocalStream(stream as MediaStream);
// // // // // // // // // //         stream.getTracks().forEach((track: MediaStreamTrack) => {
// // // // // // // // // //           pc.current.addTrack(track, stream);
// // // // // // // // // //         });
// // // // // // // // // //         pc.current.ontrack = (event: any) => {
// // // // // // // // // //              if(event.streams && event.streams[0]) {
// // // // // // // // // //                  setRemoteStream(event.streams[0]);
// // // // // // // // // //                  setCallStatus('connected');
// // // // // // // // // //              }
// // // // // // // // // //         };
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //         Alert.alert("Error", "Camera permission denied");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const initiateCall = async () => {
// // // // // // // // // //     await startWebcam();
// // // // // // // // // //     setCallStatus('calling');
// // // // // // // // // //     const offer = await pc.current.createOffer();
// // // // // // // // // //     await pc.current.setLocalDescription(offer);

// // // // // // // // // //     try {
// // // // // // // // // //         // ✅ FIXED: Added /call prefix
// // // // // // // // // //         const response = await fetch(`${API_BASE_URL}/call/initialise-call`, {
// // // // // // // // // //             method: 'POST',
// // // // // // // // // //             headers: { 'Content-Type': 'application/json' },
// // // // // // // // // //             body: JSON.stringify({
// // // // // // // // // //                 appointment_id: appointmentId,
// // // // // // // // // //                 offer: { sdp: offer.sdp, type: offer.type }
// // // // // // // // // //             })
// // // // // // // // // //         });

// // // // // // // // // //         const data = await response.json();
// // // // // // // // // //         if(data.error) throw new Error(data.error);

// // // // // // // // // //         const newCallId = data.call_id;
// // // // // // // // // //         setCallId(newCallId);

// // // // // // // // // //         const callDoc = doc(db, 'call_history', newCallId);
// // // // // // // // // //         onSnapshot(callDoc, (snapshot) => {
// // // // // // // // // //             const d = snapshot.data();
// // // // // // // // // //             if (!pc.current.currentRemoteDescription && d?.answer) {
// // // // // // // // // //                 const answer = new RTCSessionDescription(d.answer);
// // // // // // // // // //                 pc.current.setRemoteDescription(answer);
// // // // // // // // // //             }
// // // // // // // // // //         });

// // // // // // // // // //         const ansCandsRef = collection(callDoc, 'answerCandidates');
// // // // // // // // // //         onSnapshot(ansCandsRef, (snapshot) => {
// // // // // // // // // //             snapshot.docChanges().forEach((change) => {
// // // // // // // // // //                 if (change.type === 'added') {
// // // // // // // // // //                     const candidate = new RTCIceCandidate(change.doc.data());
// // // // // // // // // //                     pc.current.addIceCandidate(candidate);
// // // // // // // // // //                 }
// // // // // // // // // //             });
// // // // // // // // // //         });

// // // // // // // // // //         pc.current.onicecandidate = async (event: any) => {
// // // // // // // // // //             if (event.candidate) {
// // // // // // // // // //                 // ✅ FIXED: Added /call prefix
// // // // // // // // // //                 await fetch(`${API_BASE_URL}/call/add-offer-candidates`, {
// // // // // // // // // //                     method: 'POST',
// // // // // // // // // //                     headers: { 'Content-Type': 'application/json' },
// // // // // // // // // //                     body: JSON.stringify({
// // // // // // // // // //                         call_id: newCallId,
// // // // // // // // // //                         offer_candidate: {
// // // // // // // // // //                             candidate: event.candidate.candidate,
// // // // // // // // // //                             sdpMid: event.candidate.sdpMid,
// // // // // // // // // //                             sdpMLineIndex: event.candidate.sdpMLineIndex
// // // // // // // // // //                         }
// // // // // // // // // //                     })
// // // // // // // // // //                 });
// // // // // // // // // //             }
// // // // // // // // // //         };

// // // // // // // // // //     } catch (err: any) {
// // // // // // // // // //         Alert.alert("Error", err.message);
// // // // // // // // // //         setCallStatus('idle');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const acceptIncomingCall = async () => {
// // // // // // // // // //     if (!callId) return;
// // // // // // // // // //     await startWebcam();

// // // // // // // // // //     const callDoc = doc(db, 'call_history', callId);
// // // // // // // // // //     const snapshot = await getDoc(callDoc);
// // // // // // // // // //     const data = snapshot.data();

// // // // // // // // // //     if(!data) return Alert.alert("Error", "Call data not found");

// // // // // // // // // //     await pc.current.setRemoteDescription(new RTCSessionDescription(data.offer));
// // // // // // // // // //     const answer = await pc.current.createAnswer();
// // // // // // // // // //     await pc.current.setLocalDescription(answer);

// // // // // // // // // //     // ✅ FIXED: Added /call prefix
// // // // // // // // // //     await fetch(`${API_BASE_URL}/call/recieve-call`, {
// // // // // // // // // //         method: 'PUT',
// // // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // //             call_id: callId,
// // // // // // // // // //             answer: { sdp: answer.sdp, type: answer.type }
// // // // // // // // // //         })
// // // // // // // // // //     });

// // // // // // // // // //     const offCandsRef = collection(callDoc, 'offerCandidates');
// // // // // // // // // //     onSnapshot(offCandsRef, (snapshot) => {
// // // // // // // // // //         snapshot.docChanges().forEach((change) => {
// // // // // // // // // //             if (change.type === 'added') {
// // // // // // // // // //                 const candidate = new RTCIceCandidate(change.doc.data());
// // // // // // // // // //                 pc.current.addIceCandidate(candidate);
// // // // // // // // // //             }
// // // // // // // // // //         });
// // // // // // // // // //     });

// // // // // // // // // //     pc.current.onicecandidate = async (event: any) => {
// // // // // // // // // //         if (event.candidate) {
// // // // // // // // // //             // ✅ FIXED: Added /call prefix
// // // // // // // // // //             await fetch(`${API_BASE_URL}/call/add-answer-candidates`, {
// // // // // // // // // //                 method: 'POST',
// // // // // // // // // //                 headers: { 'Content-Type': 'application/json' },
// // // // // // // // // //                 body: JSON.stringify({
// // // // // // // // // //                     call_id: callId,
// // // // // // // // // //                     answer_candidate: {
// // // // // // // // // //                         candidate: event.candidate.candidate,
// // // // // // // // // //                         sdpMid: event.candidate.sdpMid,
// // // // // // // // // //                         sdpMLineIndex: event.candidate.sdpMLineIndex
// // // // // // // // // //                     }
// // // // // // // // // //                 })
// // // // // // // // // //             });
// // // // // // // // // //         }
// // // // // // // // // //     };

// // // // // // // // // //     setCallStatus('connected');
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <View style={styles.container}>
// // // // // // // // // //        <View style={styles.header}>
// // // // // // // // // //           <Text style={styles.headerText}>
// // // // // // // // // //               Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'} 
// // // // // // // // // //               {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// // // // // // // // // //           </Text>
// // // // // // // // // //        </View>

// // // // // // // // // //       <View style={styles.videoWrapper}>
// // // // // // // // // //         {remoteStream ? (
// // // // // // // // // //             <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} objectFit="cover" />
// // // // // // // // // //         ) : (
// // // // // // // // // //             <View style={styles.placeholder}>
// // // // // // // // // //                 {callStatus === 'calling' && <ActivityIndicator size="large" color="#ffffff" />}
// // // // // // // // // //                 <Text style={{color: '#999', marginTop: 10}}>
// // // // // // // // // //                     {callStatus === 'idle' ? 'Ready to Call' : 'Waiting for Video...'}
// // // // // // // // // //                 </Text>
// // // // // // // // // //             </View>
// // // // // // // // // //         )}
// // // // // // // // // //         {localStream && (
// // // // // // // // // //              <RTCView streamURL={localStream.toURL()} style={styles.localVideo} objectFit="cover" zOrder={1} />
// // // // // // // // // //         )}
// // // // // // // // // //       </View>

// // // // // // // // // //       <View style={styles.controls}>
// // // // // // // // // //         {/* BUTTON: Register Device */}
// // // // // // // // // //         {userRole === 'patient' && (
// // // // // // // // // //            <View style={{marginBottom: 10, width: '100%'}}>
// // // // // // // // // //               <Button title="DEBUG: Register Device" onPress={registerDevice} color="#555" />
// // // // // // // // // //            </View>
// // // // // // // // // //         )}

// // // // // // // // // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // // // // // // // // //              <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
// // // // // // // // // //         )}

// // // // // // // // // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // // // // // // // // //              <View style={{flexDirection: 'row', gap: 20}}>
// // // // // // // // // //                  <Button title="Reject" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // // // // // //                  <Button title="Accept Call" onPress={acceptIncomingCall} color="#22C55E" />
// // // // // // // // // //              </View>
// // // // // // // // // //         )}

// // // // // // // // // //         {callStatus === 'connected' && (
// // // // // // // // // //              <Button title="End Call" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // // // // // //         )}
// // // // // // // // // //       </View>
// // // // // // // // // //     </View>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // // //   container: { height: 500, backgroundColor: '#111', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
// // // // // // // // // //   header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
// // // // // // // // // //   headerText: { color: 'white', fontWeight: 'bold' },
// // // // // // // // // //   videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
// // // // // // // // // //   localVideo: { 
// // // // // // // // // //       position: 'absolute', top: 15, right: 15, 
// // // // // // // // // //       width: 100, height: 140, 
// // // // // // // // // //       backgroundColor: '#333', borderRadius: 8, borderWidth: 1, borderColor: '#fff' 
// // // // // // // // // //   },
// // // // // // // // // //   remoteVideo: { width: '100%', height: '100%' },
// // // // // // // // // //   placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111'},
// // // // // // // // // //   controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' },
// // // // // // // // // // });

// // // // // // // // // //////////////////////

// // // // // // // // // //ORIGINAL CODE

// // // // // // // // // //////////////









// // // // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // // // import {
// // // // // // // // //   View,
// // // // // // // // //   Text,
// // // // // // // // //   Button,
// // // // // // // // //   StyleSheet,
// // // // // // // // //   Alert,
// // // // // // // // //   ActivityIndicator,
// // // // // // // // //   TouchableOpacity
// // // // // // // // // } from 'react-native';
// // // // // // // // // import {
// // // // // // // // //   RTCPeerConnection,
// // // // // // // // //   RTCIceCandidate,
// // // // // // // // //   RTCSessionDescription,
// // // // // // // // //   RTCView,
// // // // // // // // //   mediaDevices,
// // // // // // // // //   MediaStream,
// // // // // // // // //   MediaStreamTrack
// // // // // // // // // } from 'react-native-webrtc';
// // // // // // // // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // // // // // // // import { getFirestore, collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
// // // // // // // // // import messaging from '@react-native-firebase/messaging';

// // // // // // // // // const API_BASE_URL = "https://api.docapp.co.in/api";

// // // // // // // // // /* ---------- Firebase ---------- */
// // // // // // // // // const firebaseConfig = {
// // // // // // // // //   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
// // // // // // // // //   authDomain: "videocall-174e6.firebaseapp.com",
// // // // // // // // //   projectId: "videocall-174e6",
// // // // // // // // //   storageBucket: "videocall-174e6.firebasestorage.app",
// // // // // // // // //   messagingSenderId: "965109245557",
// // // // // // // // //   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c"
// // // // // // // // // };

// // // // // // // // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // // // // // // // const db = getFirestore(app);

// // // // // // // // // /* ---------- WebRTC ---------- */
// // // // // // // // // const servers = {
// // // // // // // // //   iceServers: [
// // // // // // // // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
// // // // // // // // //   ],
// // // // // // // // // };

// // // // // // // // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: any) {
// // // // // // // // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor';
// // // // // // // // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';

// // // // // // // // //   const pc = useRef<RTCPeerConnection | null>(null);

// // // // // // // // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // // // // // // // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // // // // // // // //   const [callId, setCallId] = useState('');
// // // // // // // // //   const [callStatus, setCallStatus] =
// // // // // // // // //     useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // // // // // // // //   /* ---------- PeerConnection ---------- */
// // // // // // // // //   const createPeerConnection = () => {
// // // // // // // // //     pc.current = new RTCPeerConnection(servers);

// // // // // // // // //     pc.current.ontrack = (event: any) => {
// // // // // // // // //       if (event.streams?.[0]) {
// // // // // // // // //         setRemoteStream(event.streams[0]);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     pc.current.oniceconnectionstatechange = () => {
// // // // // // // // //       const state = pc.current?.iceConnectionState;
// // // // // // // // //       console.log('ICE STATE:', state);
// // // // // // // // //       if (state === 'connected' || state === 'completed') {
// // // // // // // // //         setCallStatus('connected');
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //   };

// // // // // // // // //   /* ---------- Media ---------- */
// // // // // // // // //   const startWebcam = async () => {
// // // // // // // // //     const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// // // // // // // // //     setLocalStream(stream as MediaStream);
// // // // // // // // //     stream.getTracks().forEach((track: MediaStreamTrack) => {
// // // // // // // // //       pc.current?.addTrack(track, stream);
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   /* ---------- FCM (patient) ---------- */
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (userRole !== 'patient') return;

// // // // // // // // //     return messaging().onMessage(async remoteMessage => {
// // // // // // // // //       console.log('FCM Message Received:', remoteMessage);
// // // // // // // // //       if (remoteMessage.data?.action === 'INCOMING_CALL') {
// // // // // // // // //         setCallId(remoteMessage.data.call_id);
// // // // // // // // //         setCallStatus('incoming');
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   }, [userRole]);

// // // // // // // // //   /* ---------- Doctor: Start Call ---------- */
// // // // // // // // //   const initiateCall = async () => {
// // // // // // // // //     createPeerConnection();
// // // // // // // // //     await startWebcam();
// // // // // // // // //     setCallStatus('calling');

// // // // // // // // //     const offer = await pc.current!.createOffer();
// // // // // // // // //     await pc.current!.setLocalDescription(offer);

// // // // // // // // //     const res = await fetch(`${API_BASE_URL}/call/initialise-call`, {
// // // // // // // // //       method: 'POST',
// // // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // // //       body: JSON.stringify({ appointment_id: appointmentId, offer })
// // // // // // // // //     });

// // // // // // // // //     const data = await res.json();
// // // // // // // // //     setCallId(data.call_id);

// // // // // // // // //     const callDoc = doc(db, 'call_history', data.call_id);

// // // // // // // // //     onSnapshot(callDoc, snap => {
// // // // // // // // //       const d = snap.data();
// // // // // // // // //       if (d?.answer && !pc.current?.currentRemoteDescription) {
// // // // // // // // //         pc.current?.setRemoteDescription(new RTCSessionDescription(d.answer));
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
// // // // // // // // //       snap.docChanges().forEach(c => {
// // // // // // // // //         if (c.type === 'added') {
// // // // // // // // //           pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // // // // // //         }
// // // // // // // // //       });
// // // // // // // // //     });

// // // // // // // // //     pc.current!.onicecandidate = e => {
// // // // // // // // //       if (e.candidate) {
// // // // // // // // //         fetch(`${API_BASE_URL}/call/add-offer-candidates`, {
// // // // // // // // //           method: 'POST',
// // // // // // // // //           headers: { 'Content-Type': 'application/json' },
// // // // // // // // //           body: JSON.stringify({
// // // // // // // // //             call_id: data.call_id,
// // // // // // // // //             offer_candidate: e.candidate
// // // // // // // // //           })
// // // // // // // // //         });
// // // // // // // // //       }
// // // // // // // // //     };
// // // // // // // // //   };

// // // // // // // // //   /* ---------- Patient: Accept Call ---------- */
// // // // // // // // // //   const acceptIncomingCall = async () => {
// // // // // // // // // //     createPeerConnection();

// // // // // // // // // //     const callDoc = doc(db, 'call_history', callId);
// // // // // // // // // //     const snap = await getDoc(callDoc);
// // // // // // // // // //     const data = snap.data();

// // // // // // // // // //     await pc.current!.setRemoteDescription(
// // // // // // // // // //       new RTCSessionDescription(data!.offer)
// // // // // // // // // //     );

// // // // // // // // // //     await startWebcam();

// // // // // // // // // //     const answer = await pc.current!.createAnswer();
// // // // // // // // // //     await pc.current!.setLocalDescription(answer);

// // // // // // // // // //     await fetch(`${API_BASE_URL}/call/recieve-call`, {
// // // // // // // // // //       method: 'PUT',
// // // // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // // // //       body: JSON.stringify({ call_id: callId, answer })
// // // // // // // // // //     });

// // // // // // // // // //     onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
// // // // // // // // // //       snap.docChanges().forEach(c => {
// // // // // // // // // //         if (c.type === 'added') {
// // // // // // // // // //           pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // // // // // // //         }
// // // // // // // // // //       });
// // // // // // // // // //     });

// // // // // // // // // //     pc.current!.onicecandidate = e => {
// // // // // // // // // //       if (e.candidate) {
// // // // // // // // // //         fetch(`${API_BASE_URL}/call/add-answer-candidates`, {
// // // // // // // // // //           method: 'POST',
// // // // // // // // // //           headers: { 'Content-Type': 'application/json' },
// // // // // // // // // //           body: JSON.stringify({
// // // // // // // // // //             call_id: callId,
// // // // // // // // // //             answer_candidate: e.candidate
// // // // // // // // // //           })
// // // // // // // // // //         });
// // // // // // // // // //       }
// // // // // // // // // //     };
// // // // // // // // // //   };

// // // // // // // // // const acceptIncomingCall = async () => {
// // // // // // // // //   if (!callId) {
// // // // // // // // //     Alert.alert("Error", "Call ID missing. Try again.");
// // // // // // // // //     return;
// // // // // // // // //   }

// // // // // // // // //   const callDoc = doc(db, 'call_history', callId);
// // // // // // // // //   const snap = await getDoc(callDoc);

// // // // // // // // //   if (!snap.exists()) {
// // // // // // // // //     Alert.alert("Error", "Call data not found yet. Please wait.");
// // // // // // // // //     return;
// // // // // // // // //   }

// // // // // // // // //   const data = snap.data();

// // // // // // // // //   if (!data?.offer) {
// // // // // // // // //     Alert.alert("Error", "Offer not ready yet. Please wait.");
// // // // // // // // //     return;
// // // // // // // // //   }

// // // // // // // // //   createPeerConnection();

// // // // // // // // //   await pc.current!.setRemoteDescription(
// // // // // // // // //     new RTCSessionDescription(data.offer)
// // // // // // // // //   );

// // // // // // // // //   await startWebcam();

// // // // // // // // //   const answer = await pc.current!.createAnswer();
// // // // // // // // //   await pc.current!.setLocalDescription(answer);

// // // // // // // // //   await fetch(`${API_BASE_URL}/call/recieve-call`, {
// // // // // // // // //     method: 'PUT',
// // // // // // // // //     headers: { 'Content-Type': 'application/json' },
// // // // // // // // //     body: JSON.stringify({ call_id: callId, answer })
// // // // // // // // //   });

// // // // // // // // //   onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
// // // // // // // // //     snap.docChanges().forEach(c => {
// // // // // // // // //       if (c.type === 'added') {
// // // // // // // // //         pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   });

// // // // // // // // //   pc.current!.onicecandidate = e => {
// // // // // // // // //     if (e.candidate) {
// // // // // // // // //       fetch(`${API_BASE_URL}/call/add-answer-candidates`, {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // // //         body: JSON.stringify({
// // // // // // // // //           call_id: callId,
// // // // // // // // //           answer_candidate: e.candidate
// // // // // // // // //         })
// // // // // // // // //       });
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // // };



// // // // // // // // //   /* ---------- UI (UNCHANGED) ---------- */
// // // // // // // // //   return (
// // // // // // // // //     <View style={styles.container}>
// // // // // // // // //       <View style={styles.header}>
// // // // // // // // //         <Text style={styles.headerText}>
// // // // // // // // //           Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'}
// // // // // // // // //           {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// // // // // // // // //         </Text>
// // // // // // // // //       </View>

// // // // // // // // //       <View style={styles.videoWrapper}>
// // // // // // // // //         {remoteStream ? (
// // // // // // // // //           <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} objectFit="cover" />
// // // // // // // // //         ) : (
// // // // // // // // //           <View style={styles.placeholder}>
// // // // // // // // //             {callStatus === 'calling' && <ActivityIndicator size="large" color="#ffffff" />}
// // // // // // // // //             <Text style={{ color: '#999', marginTop: 10 }}>
// // // // // // // // //               {callStatus === 'idle' ? 'Ready to Call' : 'Waiting for Video...'}
// // // // // // // // //             </Text>
// // // // // // // // //           </View>
// // // // // // // // //         )}

// // // // // // // // //         {localStream && (
// // // // // // // // //           <RTCView streamURL={localStream.toURL()} style={styles.localVideo} objectFit="cover" zOrder={1} />
// // // // // // // // //         )}
// // // // // // // // //       </View>

// // // // // // // // //       <View style={styles.controls}>
// // // // // // // // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // // // // // // // //           <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
// // // // // // // // //         )}

// // // // // // // // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // // // // // // // //           <View style={{ flexDirection: 'row', gap: 20 }}>
// // // // // // // // //             <Button title="Reject" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // // // // //             <Button title="Accept Call" onPress={acceptIncomingCall} color="#22C55E" />
// // // // // // // // //           </View>
// // // // // // // // //         )}

// // // // // // // // //         {callStatus === 'connected' && (
// // // // // // // // //           <Button title="End Call" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // // // // //         )}
// // // // // // // // //       </View>
// // // // // // // // //     </View>
// // // // // // // // //   );
// // // // // // // // // }

// // // // // // // // // /* ---------- Styles (UNCHANGED) ---------- */
// // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // //   container: { height: 500, backgroundColor: '#111', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
// // // // // // // // //   header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
// // // // // // // // //   headerText: { color: 'white', fontWeight: 'bold' },
// // // // // // // // //   videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
// // // // // // // // //   localVideo: {
// // // // // // // // //     position: 'absolute',
// // // // // // // // //     top: 15,
// // // // // // // // //     right: 15,
// // // // // // // // //     width: 100,
// // // // // // // // //     height: 140,
// // // // // // // // //     backgroundColor: '#333',
// // // // // // // // //     borderRadius: 8,
// // // // // // // // //     borderWidth: 1,
// // // // // // // // //     borderColor: '#fff'
// // // // // // // // //   },
// // // // // // // // //   remoteVideo: { width: '100%', height: '100%' },
// // // // // // // // //   placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
// // // // // // // // //   controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' }
// // // // // // // // // });














// // // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // // import {
// // // // // // // //   View,
// // // // // // // //   Text,
// // // // // // // //   Button,
// // // // // // // //   StyleSheet,
// // // // // // // //   Alert,
// // // // // // // //   ActivityIndicator
// // // // // // // // } from 'react-native';
// // // // // // // // import {
// // // // // // // //   RTCPeerConnection,
// // // // // // // //   RTCIceCandidate,
// // // // // // // //   RTCSessionDescription,
// // // // // // // //   RTCView,
// // // // // // // //   mediaDevices,
// // // // // // // //   MediaStream,
// // // // // // // //   MediaStreamTrack
// // // // // // // // } from 'react-native-webrtc';
// // // // // // // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // // // // // // import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore';
// // // // // // // // import messaging from '@react-native-firebase/messaging';

// // // // // // // // const API_BASE_URL = "https://api.docapp.co.in/api";

// // // // // // // // /* ---------- Firebase ---------- */
// // // // // // // // const firebaseConfig = {
// // // // // // // //   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
// // // // // // // //   authDomain: "videocall-174e6.firebaseapp.com",
// // // // // // // //   projectId: "videocall-174e6",
// // // // // // // //   storageBucket: "videocall-174e6.firebasestorage.app",
// // // // // // // //   messagingSenderId: "965109245557",
// // // // // // // //   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c"
// // // // // // // // };

// // // // // // // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // // // // // // const db = getFirestore(app);

// // // // // // // // /* ---------- WebRTC ---------- */
// // // // // // // // const servers = {
// // // // // // // //   iceServers: [
// // // // // // // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
// // // // // // // //   ]
// // // // // // // // };

// // // // // // // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: any) {
// // // // // // // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor';
// // // // // // // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';

// // // // // // // //   const pc = useRef<RTCPeerConnection | null>(null);

// // // // // // // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // // // // // // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // // // // // // //   const [callId, setCallId] = useState('');
// // // // // // // //   const [callStatus, setCallStatus] =
// // // // // // // //     useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // // // // // // //   /* ---------- PeerConnection ---------- */
// // // // // // // //   const createPeerConnection = () => {
// // // // // // // //     pc.current = new RTCPeerConnection(servers);

// // // // // // // //     pc.current.ontrack = (event: any) => {
// // // // // // // //       if (event.streams?.[0]) {
// // // // // // // //         setRemoteStream(event.streams[0]);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     pc.current.onicecandidate = e => {
// // // // // // // //       if (!e.candidate || !callId) return;

// // // // // // // //       fetch(`${API_BASE_URL}/call/add-answer-candidates`, {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // //         body: JSON.stringify({
// // // // // // // //           call_id: callId,
// // // // // // // //           answer_candidate: e.candidate
// // // // // // // //         })
// // // // // // // //       });
// // // // // // // //     };

// // // // // // // //     pc.current.oniceconnectionstatechange = () => {
// // // // // // // //       const state = pc.current?.iceConnectionState;
// // // // // // // //       console.log('ICE STATE:', state);
// // // // // // // //       if (state === 'connected' || state === 'completed') {
// // // // // // // //         setCallStatus('connected');
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //   };

// // // // // // // //   /* ---------- Media ---------- */
// // // // // // // //   const startWebcam = async () => {
// // // // // // // //     const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// // // // // // // //     setLocalStream(stream as MediaStream);
// // // // // // // //     stream.getTracks().forEach((track: MediaStreamTrack) => {
// // // // // // // //       pc.current?.addTrack(track, stream);
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   /* ---------- FCM (patient) ---------- */
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (userRole !== 'patient') return;

// // // // // // // //     return messaging().onMessage(async msg => {
// // // // // // // //       if (msg.data?.action === 'INCOMING_CALL') {
// // // // // // // //         setCallId(msg.data.call_id);
// // // // // // // //         setCallStatus('incoming');
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //   }, [userRole]);

// // // // // // // //   /* ---------- Doctor: Start Call ---------- */
// // // // // // // //   const initiateCall = async () => {
// // // // // // // //     createPeerConnection();
// // // // // // // //     await startWebcam();
// // // // // // // //     setCallStatus('calling');

// // // // // // // //     const offer = await pc.current!.createOffer();
// // // // // // // //     await pc.current!.setLocalDescription(offer);

// // // // // // // //     const res = await fetch(`${API_BASE_URL}/call/initialise-call`, {
// // // // // // // //       method: 'POST',
// // // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // // //       body: JSON.stringify({ appointment_id: appointmentId, offer })
// // // // // // // //     });

// // // // // // // //     const data = await res.json();
// // // // // // // //     setCallId(data.call_id);

// // // // // // // //     const callDoc = doc(db, 'call_history', data.call_id);

// // // // // // // //     onSnapshot(callDoc, snap => {
// // // // // // // //       const d = snap.data();
// // // // // // // //       if (d?.answer && !pc.current?.currentRemoteDescription) {
// // // // // // // //         pc.current?.setRemoteDescription(new RTCSessionDescription(d.answer));
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
// // // // // // // //       snap.docChanges().forEach(c => {
// // // // // // // //         if (c.type === 'added') {
// // // // // // // //           pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // // // // //         }
// // // // // // // //       });
// // // // // // // //     });

// // // // // // // //     pc.current!.onicecandidate = e => {
// // // // // // // //       if (!e.candidate) return;

// // // // // // // //       fetch(`${API_BASE_URL}/call/add-offer-candidates`, {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // //         body: JSON.stringify({
// // // // // // // //           call_id: data.call_id,
// // // // // // // //           offer_candidate: e.candidate
// // // // // // // //         })
// // // // // // // //       });
// // // // // // // //     };
// // // // // // // //   };

// // // // // // // //   /* ---------- Patient: Accept Call (FIXED) ---------- */
// // // // // // // //   const acceptIncomingCall = async () => {
// // // // // // // //     if (!callId) {
// // // // // // // //       Alert.alert("Error", "Call ID missing");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     createPeerConnection();
// // // // // // // //     setCallStatus('calling');

// // // // // // // //     const callDoc = doc(db, 'call_history', callId);

// // // // // // // //     const unsub = onSnapshot(callDoc, async snap => {
// // // // // // // //       const data = snap.data();
// // // // // // // //       if (!data?.offer) return;

// // // // // // // //       unsub();

// // // // // // // //       await pc.current!.setRemoteDescription(
// // // // // // // //         new RTCSessionDescription(data.offer)
// // // // // // // //       );

// // // // // // // //       await startWebcam();

// // // // // // // //       const answer = await pc.current!.createAnswer();
// // // // // // // //       await pc.current!.setLocalDescription(answer);

// // // // // // // //       await fetch(`${API_BASE_URL}/call/recieve-call`, {
// // // // // // // //         method: 'PUT',
// // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // //         body: JSON.stringify({ call_id: callId, answer })
// // // // // // // //       });

// // // // // // // //       onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
// // // // // // // //         snap.docChanges().forEach(c => {
// // // // // // // //           if (c.type === 'added') {
// // // // // // // //             pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // // // // //           }
// // // // // // // //         });
// // // // // // // //       });
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   /* ---------- UI (UNCHANGED) ---------- */
// // // // // // // //   return (
// // // // // // // //     <View style={styles.container}>
// // // // // // // //       <View style={styles.header}>
// // // // // // // //         <Text style={styles.headerText}>
// // // // // // // //           Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'}
// // // // // // // //           {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// // // // // // // //         </Text>
// // // // // // // //       </View>

// // // // // // // //       <View style={styles.videoWrapper}>
// // // // // // // //         {remoteStream ? (
// // // // // // // //           <RTCView
// // // // // // // //             streamURL={remoteStream.toURL()}
// // // // // // // //             style={styles.remoteVideo}
// // // // // // // //             objectFit="cover"
// // // // // // // //           />
// // // // // // // //         ) : (
// // // // // // // //           <View style={styles.placeholder}>
// // // // // // // //             {callStatus === 'calling' && (
// // // // // // // //               <ActivityIndicator size="large" color="#ffffff" />
// // // // // // // //             )}
// // // // // // // //             <Text style={{ color: '#999', marginTop: 10 }}>
// // // // // // // //               {callStatus === 'idle'
// // // // // // // //                 ? 'Ready to Call'
// // // // // // // //                 : 'Waiting for Video...'}
// // // // // // // //             </Text>
// // // // // // // //           </View>
// // // // // // // //         )}

// // // // // // // //         {localStream && (
// // // // // // // //           <RTCView
// // // // // // // //             streamURL={localStream.toURL()}
// // // // // // // //             style={styles.localVideo}
// // // // // // // //             objectFit="cover"
// // // // // // // //             zOrder={1}
// // // // // // // //           />
// // // // // // // //         )}
// // // // // // // //       </View>

// // // // // // // //       <View style={styles.controls}>
// // // // // // // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // // // // // // //           <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
// // // // // // // //         )}

// // // // // // // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // // // // // // //           <View style={{ flexDirection: 'row', gap: 20 }}>
// // // // // // // //             <Button
// // // // // // // //               title="Reject"
// // // // // // // //               onPress={() => setCallStatus('idle')}
// // // // // // // //               color="#EF4444"
// // // // // // // //             />
// // // // // // // //             <Button
// // // // // // // //               title="Accept Call"
// // // // // // // //               onPress={acceptIncomingCall}
// // // // // // // //               color="#22C55E"
// // // // // // // //             />
// // // // // // // //           </View>
// // // // // // // //         )}

// // // // // // // //         {callStatus === 'connected' && (
// // // // // // // //           <Button title="End Call" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // // // //         )}
// // // // // // // //       </View>
// // // // // // // //     </View>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // /* ---------- Styles (UNCHANGED) ---------- */
// // // // // // // // const styles = StyleSheet.create({
// // // // // // // //   container: {
// // // // // // // //     height: 500,
// // // // // // // //     backgroundColor: '#111',
// // // // // // // //     borderRadius: 12,
// // // // // // // //     overflow: 'hidden',
// // // // // // // //     borderWidth: 1,
// // // // // // // //     borderColor: '#333'
// // // // // // // //   },
// // // // // // // //   header: {
// // // // // // // //     padding: 12,
// // // // // // // //     backgroundColor: '#222',
// // // // // // // //     alignItems: 'center'
// // // // // // // //   },
// // // // // // // //   headerText: {
// // // // // // // //     color: 'white',
// // // // // // // //     fontWeight: 'bold'
// // // // // // // //   },
// // // // // // // //   videoWrapper: {
// // // // // // // //     flex: 1,
// // // // // // // //     position: 'relative',
// // // // // // // //     backgroundColor: '#000'
// // // // // // // //   },
// // // // // // // //   localVideo: {
// // // // // // // //     position: 'absolute',
// // // // // // // //     top: 15,
// // // // // // // //     right: 15,
// // // // // // // //     width: 100,
// // // // // // // //     height: 140,
// // // // // // // //     backgroundColor: '#333',
// // // // // // // //     borderRadius: 8,
// // // // // // // //     borderWidth: 1,
// // // // // // // //     borderColor: '#fff'
// // // // // // // //   },
// // // // // // // //   remoteVideo: { width: '100%', height: '100%' },
// // // // // // // //   placeholder: {
// // // // // // // //     flex: 1,
// // // // // // // //     justifyContent: 'center',
// // // // // // // //     alignItems: 'center',
// // // // // // // //     backgroundColor: '#111'
// // // // // // // //   },
// // // // // // // //   controls: {
// // // // // // // //     padding: 20,
// // // // // // // //     alignItems: 'center',
// // // // // // // //     backgroundColor: '#222'
// // // // // // // //   }
// // // // // // // // });




// // // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // // import {
// // // // // // //   View,
// // // // // // //   Text,
// // // // // // //   Button,
// // // // // // //   StyleSheet,
// // // // // // //   Alert,
// // // // // // //   ActivityIndicator
// // // // // // // } from 'react-native';
// // // // // // // import {
// // // // // // //   RTCPeerConnection,
// // // // // // //   RTCIceCandidate,
// // // // // // //   RTCSessionDescription,
// // // // // // //   RTCView,
// // // // // // //   mediaDevices,
// // // // // // //   MediaStream,
// // // // // // //   MediaStreamTrack
// // // // // // // } from 'react-native-webrtc';
// // // // // // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // // // // // import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore';
// // // // // // // import messaging from '@react-native-firebase/messaging';

// // // // // // // const API_BASE_URL = "https://api.docapp.co.in/api";

// // // // // // // /* ---------- Firebase ---------- */
// // // // // // // const firebaseConfig = {
// // // // // // //   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
// // // // // // //   authDomain: "videocall-174e6.firebaseapp.com",
// // // // // // //   projectId: "videocall-174e6",
// // // // // // //   storageBucket: "videocall-174e6.firebasestorage.app",
// // // // // // //   messagingSenderId: "965109245557",
// // // // // // //   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c"
// // // // // // // };

// // // // // // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // // // // // const db = getFirestore(app);

// // // // // // // /* ---------- WebRTC ---------- */
// // // // // // // const servers = {
// // // // // // //   iceServers: [
// // // // // // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
// // // // // // //   ]
// // // // // // // };

// // // // // // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: any) {
// // // // // // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor';
// // // // // // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';

// // // // // // //   const pc = useRef<RTCPeerConnection | null>(null);

// // // // // // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // // // // // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // // // // // //   const [callId, setCallId] = useState('');
// // // // // // //   const [callStatus, setCallStatus] =
// // // // // // //     useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // // // // // //   /* ---------- PeerConnection ---------- */
// // // // // // //   const createPeerConnection = () => {
// // // // // // //     pc.current = new RTCPeerConnection(servers);

// // // // // // //     pc.current.ontrack = (event: any) => {
// // // // // // //       if (event.streams?.[0]) {
// // // // // // //         setRemoteStream(event.streams[0]);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     pc.current.onicecandidate = e => {
// // // // // // //       if (!e.candidate || !callId) return;

// // // // // // //       const url =
// // // // // // //         userRole === 'doctor'
// // // // // // //           ? `${API_BASE_URL}/call/add-offer-candidates`
// // // // // // //           : `${API_BASE_URL}/call/add-answer-candidates`;

// // // // // // //       const payload =
// // // // // // //         userRole === 'doctor'
// // // // // // //           ? { call_id: callId, offer_candidate: e.candidate }
// // // // // // //           : { call_id: callId, answer_candidate: e.candidate };

// // // // // // //       fetch(url, {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify(payload)
// // // // // // //       });
// // // // // // //     };

// // // // // // //     pc.current.oniceconnectionstatechange = () => {
// // // // // // //       const state = pc.current?.iceConnectionState;
// // // // // // //       console.log('ICE STATE:', state);
// // // // // // //       if (state === 'connected' || state === 'completed') {
// // // // // // //         setCallStatus('connected');
// // // // // // //       }
// // // // // // //     };
// // // // // // //   };

// // // // // // //   /* ---------- Media ---------- */
// // // // // // //   const startWebcam = async () => {
// // // // // // //     const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// // // // // // //     setLocalStream(stream as MediaStream);
// // // // // // //     stream.getTracks().forEach((track: MediaStreamTrack) => {
// // // // // // //       pc.current?.addTrack(track, stream);
// // // // // // //     });
// // // // // // //   };

// // // // // // //   /* ---------- FCM (patient) ---------- */
// // // // // // //   useEffect(() => {
// // // // // // //     if (userRole !== 'patient') return;

// // // // // // //     return messaging().onMessage(async msg => {
// // // // // // //       if (msg.data?.action === 'INCOMING_CALL') {
// // // // // // //         setCallId(msg.data.call_id);
// // // // // // //         setCallStatus('incoming');
// // // // // // //       }
// // // // // // //     });
// // // // // // //   }, [userRole]);

// // // // // // //   /* ---------- Doctor: Start Call ---------- */
// // // // // // //   const initiateCall = async () => {
// // // // // // //     createPeerConnection();
// // // // // // //     await startWebcam();
// // // // // // //     setCallStatus('calling');

// // // // // // //     const offer = await pc.current!.createOffer();
// // // // // // //     await pc.current!.setLocalDescription(offer);

// // // // // // //     const res = await fetch(`${API_BASE_URL}/call/initialise-call`, {
// // // // // // //       method: 'POST',
// // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // //       body: JSON.stringify({ appointment_id: appointmentId, offer })
// // // // // // //     });

// // // // // // //     const data = await res.json();
// // // // // // //     setCallId(data.call_id);

// // // // // // //     const callDoc = doc(db, 'call_history', data.call_id);

// // // // // // //     onSnapshot(callDoc, snap => {
// // // // // // //       const d = snap.data();
// // // // // // //       if (d?.answer && !pc.current?.currentRemoteDescription) {
// // // // // // //         pc.current?.setRemoteDescription(new RTCSessionDescription(d.answer));
// // // // // // //       }
// // // // // // //     });

// // // // // // //     onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
// // // // // // //       snap.docChanges().forEach(c => {
// // // // // // //         if (c.type === 'added') {
// // // // // // //           pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // // // //         }
// // // // // // //       });
// // // // // // //     });
// // // // // // //   };

// // // // // // //   /* ---------- Patient: Accept Call ---------- */
// // // // // // //   const acceptIncomingCall = async () => {
// // // // // // //     if (!callId) {
// // // // // // //       Alert.alert("Error", "Call ID missing");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     createPeerConnection();
// // // // // // //     setCallStatus('calling');

// // // // // // //     const callDoc = doc(db, 'call_history', callId);

// // // // // // //     const unsub = onSnapshot(callDoc, async snap => {
// // // // // // //       const data = snap.data();
// // // // // // //       if (!data?.offer) return;

// // // // // // //       unsub();

// // // // // // //       await pc.current!.setRemoteDescription(
// // // // // // //         new RTCSessionDescription(data.offer)
// // // // // // //       );

// // // // // // //       await startWebcam();

// // // // // // //       const answer = await pc.current!.createAnswer();
// // // // // // //       await pc.current!.setLocalDescription(answer);

// // // // // // //       await fetch(`${API_BASE_URL}/call/recieve-call`, {
// // // // // // //         method: 'PUT',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({ call_id: callId, answer })
// // // // // // //       });

// // // // // // //       onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
// // // // // // //         snap.docChanges().forEach(c => {
// // // // // // //           if (c.type === 'added') {
// // // // // // //             pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // // // //           }
// // // // // // //         });
// // // // // // //       });
// // // // // // //     });
// // // // // // //   };

// // // // // // //   /* ---------- UI (UNCHANGED) ---------- */
// // // // // // //   return (
// // // // // // //     <View style={styles.container}>
// // // // // // //       <View style={styles.header}>
// // // // // // //         <Text style={styles.headerText}>
// // // // // // //           Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'}
// // // // // // //           {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// // // // // // //         </Text>
// // // // // // //       </View>

// // // // // // //       <View style={styles.videoWrapper}>
// // // // // // //         {remoteStream ? (
// // // // // // //           <RTCView
// // // // // // //             streamURL={remoteStream.toURL()}
// // // // // // //             style={styles.remoteVideo}
// // // // // // //             objectFit="cover"
// // // // // // //           />
// // // // // // //         ) : (
// // // // // // //           <View style={styles.placeholder}>
// // // // // // //             {callStatus === 'calling' && (
// // // // // // //               <ActivityIndicator size="large" color="#ffffff" />
// // // // // // //             )}
// // // // // // //             <Text style={{ color: '#999', marginTop: 10 }}>
// // // // // // //               {callStatus === 'idle'
// // // // // // //                 ? 'Ready to Call'
// // // // // // //                 : 'Waiting for Video...'}
// // // // // // //             </Text>
// // // // // // //           </View>
// // // // // // //         )}

// // // // // // //         {localStream && (
// // // // // // //           <RTCView
// // // // // // //             streamURL={localStream.toURL()}
// // // // // // //             style={styles.localVideo}
// // // // // // //             objectFit="cover"
// // // // // // //             zOrder={1}
// // // // // // //           />
// // // // // // //         )}
// // // // // // //       </View>

// // // // // // //       <View style={styles.controls}>
// // // // // // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // // // // // //           <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
// // // // // // //         )}

// // // // // // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // // // // // //           <View style={{ flexDirection: 'row', gap: 20 }}>
// // // // // // //             <Button
// // // // // // //               title="Reject"
// // // // // // //               onPress={() => setCallStatus('idle')}
// // // // // // //               color="#EF4444"
// // // // // // //             />
// // // // // // //             <Button
// // // // // // //               title="Accept Call"
// // // // // // //               onPress={acceptIncomingCall}
// // // // // // //               color="#22C55E"
// // // // // // //             />
// // // // // // //           </View>
// // // // // // //         )}

// // // // // // //         {callStatus === 'connected' && (
// // // // // // //           <Button
// // // // // // //             title="End Call"
// // // // // // //             onPress={() => setCallStatus('idle')}
// // // // // // //             color="#EF4444"
// // // // // // //           />
// // // // // // //         )}
// // // // // // //       </View>
// // // // // // //     </View>
// // // // // // //   );
// // // // // // // }

// // // // // // // /* ---------- Styles (UNCHANGED) ---------- */
// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: {
// // // // // // //     height: 500,
// // // // // // //     backgroundColor: '#111',
// // // // // // //     borderRadius: 12,
// // // // // // //     overflow: 'hidden',
// // // // // // //     borderWidth: 1,
// // // // // // //     borderColor: '#333'
// // // // // // //   },
// // // // // // //   header: {
// // // // // // //     padding: 12,
// // // // // // //     backgroundColor: '#222',
// // // // // // //     alignItems: 'center'
// // // // // // //   },
// // // // // // //   headerText: {
// // // // // // //     color: 'white',
// // // // // // //     fontWeight: 'bold'
// // // // // // //   },
// // // // // // //   videoWrapper: {
// // // // // // //     flex: 1,
// // // // // // //     position: 'relative',
// // // // // // //     backgroundColor: '#000'
// // // // // // //   },
// // // // // // //   localVideo: {
// // // // // // //     position: 'absolute',
// // // // // // //     top: 15,
// // // // // // //     right: 15,
// // // // // // //     width: 100,
// // // // // // //     height: 140,
// // // // // // //     backgroundColor: '#333',
// // // // // // //     borderRadius: 8,
// // // // // // //     borderWidth: 1,
// // // // // // //     borderColor: '#fff'
// // // // // // //   },
// // // // // // //   remoteVideo: { width: '100%', height: '100%' },
// // // // // // //   placeholder: {
// // // // // // //     flex: 1,
// // // // // // //     justifyContent: 'center',
// // // // // // //     alignItems: 'center',
// // // // // // //     backgroundColor: '#111'
// // // // // // //   },
// // // // // // //   controls: {
// // // // // // //     padding: 20,
// // // // // // //     alignItems: 'center',
// // // // // // //     backgroundColor: '#222'
// // // // // // //   }
// // // // // // // });







// // // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   Button,
// // // // // //   StyleSheet,
// // // // // //   Alert,
// // // // // //   ActivityIndicator
// // // // // // } from 'react-native';
// // // // // // import {
// // // // // //   RTCPeerConnection,
// // // // // //   RTCIceCandidate,
// // // // // //   RTCSessionDescription,
// // // // // //   RTCView,
// // // // // //   mediaDevices,
// // // // // //   MediaStream,
// // // // // //   MediaStreamTrack
// // // // // // } from 'react-native-webrtc';
// // // // // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // // // // import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore';
// // // // // // import messaging from '@react-native-firebase/messaging';

// // // // // // const API_BASE_URL = "https://api.docapp.co.in/api";

// // // // // // /* ---------- Firebase ---------- */
// // // // // // const firebaseConfig = {
// // // // // //   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
// // // // // //   authDomain: "videocall-174e6.firebaseapp.com",
// // // // // //   projectId: "videocall-174e6",
// // // // // //   storageBucket: "videocall-174e6.firebasestorage.app",
// // // // // //   messagingSenderId: "965109245557",
// // // // // //   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c"
// // // // // // };

// // // // // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // // // // const db = getFirestore(app);

// // // // // // /* ---------- WebRTC ---------- */
// // // // // // const servers = {
// // // // // //   iceServers: [
// // // // // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
// // // // // //   ]
// // // // // // };

// // // // // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: any) {
// // // // // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor';
// // // // // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';

// // // // // //   // ⚠️ Use REAL patient id from route / auth
// // // // // //   const patientUserId = route?.params?.userId || '33';

// // // // // //   const pc = useRef<RTCPeerConnection | null>(null);

// // // // // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // // // // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // // // // //   const [callId, setCallId] = useState('');
// // // // // //   const [callStatus, setCallStatus] =
// // // // // //     useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // // // // //   /* ---------- ✅ PATIENT DEVICE REGISTRATION (ADDED) ---------- */
// // // // // //   const registerPatientDevice = async () => {
// // // // // //     try {
// // // // // //       if (userRole !== 'patient') return;

// // // // // //       await messaging().requestPermission();
// // // // // //       const fcmToken = await messaging().getToken();

// // // // // //       console.log('Patient FCM Token:', fcmToken);

// // // // // //       await fetch(`${API_BASE_URL}/notifications/save-token`, {
// // // // // //         method: 'POST',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify({
// // // // // //           user_id: patientUserId,
// // // // // //           token: fcmToken,
// // // // // //           platform: 'android'
// // // // // //         })
// // // // // //       });

// // // // // //       console.log('Patient device registered successfully');
// // // // // //     } catch (err) {
// // // // // //       console.log('FCM registration error:', err);
// // // // // //     }
// // // // // //   };

// // // // // //   // 🔥 Auto-register when patient opens this screen
// // // // // //   useEffect(() => {
// // // // // //     if (userRole === 'patient') {
// // // // // //       registerPatientDevice();
// // // // // //     }
// // // // // //   }, [userRole]);

// // // // // //   /* ---------- PeerConnection ---------- */
// // // // // //   const createPeerConnection = () => {
// // // // // //     pc.current = new RTCPeerConnection(servers);

// // // // // //     pc.current.ontrack = (event: any) => {
// // // // // //       if (event.streams?.[0]) {
// // // // // //         setRemoteStream(event.streams[0]);
// // // // // //       }
// // // // // //     };

// // // // // //     pc.current.onicecandidate = e => {
// // // // // //       if (!e.candidate || !callId) return;

// // // // // //       const url =
// // // // // //         userRole === 'doctor'
// // // // // //           ? `${API_BASE_URL}/call/add-offer-candidates`
// // // // // //           : `${API_BASE_URL}/call/add-answer-candidates`;

// // // // // //       const payload =
// // // // // //         userRole === 'doctor'
// // // // // //           ? { call_id: callId, offer_candidate: e.candidate }
// // // // // //           : { call_id: callId, answer_candidate: e.candidate };

// // // // // //       fetch(url, {
// // // // // //         method: 'POST',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify(payload)
// // // // // //       });
// // // // // //     };

// // // // // //     pc.current.oniceconnectionstatechange = () => {
// // // // // //       const state = pc.current?.iceConnectionState;
// // // // // //       console.log('ICE STATE:', state);
// // // // // //       if (state === 'connected' || state === 'completed') {
// // // // // //         setCallStatus('connected');
// // // // // //       }
// // // // // //     };
// // // // // //   };

// // // // // //   /* ---------- Media ---------- */
// // // // // //   const startWebcam = async () => {
// // // // // //     const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// // // // // //     setLocalStream(stream as MediaStream);
// // // // // //     stream.getTracks().forEach((track: MediaStreamTrack) => {
// // // // // //       pc.current?.addTrack(track, stream);
// // // // // //     });
// // // // // //   };

// // // // // //   /* ---------- FCM Incoming Call ---------- */
// // // // // //   useEffect(() => {
// // // // // //     if (userRole !== 'patient') return;

// // // // // //     return messaging().onMessage(async msg => {
// // // // // //       if (msg.data?.action === 'INCOMING_CALL') {
// // // // // //         setCallId(msg.data.call_id);
// // // // // //         setCallStatus('incoming');
// // // // // //       }
// // // // // //     });
// // // // // //   }, [userRole]);

// // // // // //   /* ---------- Doctor: Start Call ---------- */
// // // // // //   const initiateCall = async () => {
// // // // // //     createPeerConnection();
// // // // // //     await startWebcam();
// // // // // //     setCallStatus('calling');

// // // // // //     const offer = await pc.current!.createOffer();
// // // // // //     await pc.current!.setLocalDescription(offer);

// // // // // //     const res = await fetch(`${API_BASE_URL}/call/initialise-call`, {
// // // // // //       method: 'POST',
// // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // //       body: JSON.stringify({ appointment_id: appointmentId, offer })
// // // // // //     });

// // // // // //     const data = await res.json();
// // // // // //     setCallId(data.call_id);

// // // // // //     const callDoc = doc(db, 'call_history', data.call_id);

// // // // // //     onSnapshot(callDoc, snap => {
// // // // // //       const d = snap.data();
// // // // // //       if (d?.answer && !pc.current?.currentRemoteDescription) {
// // // // // //         pc.current?.setRemoteDescription(new RTCSessionDescription(d.answer));
// // // // // //       }
// // // // // //     });

// // // // // //     onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
// // // // // //       snap.docChanges().forEach(c => {
// // // // // //         if (c.type === 'added') {
// // // // // //           pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // // //         }
// // // // // //       });
// // // // // //     });
// // // // // //   };

// // // // // //   /* ---------- Patient: Accept Call ---------- */
// // // // // //   const acceptIncomingCall = async () => {
// // // // // //     if (!callId) return;

// // // // // //     createPeerConnection();
// // // // // //     setCallStatus('calling');

// // // // // //     const callDoc = doc(db, 'call_history', callId);

// // // // // //     const unsub = onSnapshot(callDoc, async snap => {
// // // // // //       const data = snap.data();
// // // // // //       if (!data?.offer) return;

// // // // // //       unsub();

// // // // // //       await pc.current!.setRemoteDescription(
// // // // // //         new RTCSessionDescription(data.offer)
// // // // // //       );

// // // // // //       await startWebcam();

// // // // // //       const answer = await pc.current!.createAnswer();
// // // // // //       await pc.current!.setLocalDescription(answer);

// // // // // //       await fetch(`${API_BASE_URL}/call/recieve-call`, {
// // // // // //         method: 'PUT',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify({ call_id: callId, answer })
// // // // // //       });

// // // // // //       onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
// // // // // //         snap.docChanges().forEach(c => {
// // // // // //           if (c.type === 'added') {
// // // // // //             pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // // //           }
// // // // // //         });
// // // // // //       });
// // // // // //     });
// // // // // //   };

// // // // // //   /* ---------- UI (UNCHANGED) ---------- */
// // // // // //   return (
// // // // // //     <View style={styles.container}>
// // // // // //       <View style={styles.header}>
// // // // // //         <Text style={styles.headerText}>
// // // // // //           Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'}
// // // // // //           {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// // // // // //         </Text>
// // // // // //       </View>

// // // // // //       <View style={styles.videoWrapper}>
// // // // // //         {remoteStream ? (
// // // // // //           <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} objectFit="cover" />
// // // // // //         ) : (
// // // // // //           <View style={styles.placeholder}>
// // // // // //             {callStatus === 'calling' && <ActivityIndicator size="large" color="#ffffff" />}
// // // // // //             <Text style={{ color: '#999', marginTop: 10 }}>
// // // // // //               {callStatus === 'idle' ? 'Ready to Call' : 'Waiting for Video...'}
// // // // // //             </Text>
// // // // // //           </View>
// // // // // //         )}

// // // // // //         {localStream && (
// // // // // //           <RTCView streamURL={localStream.toURL()} style={styles.localVideo} objectFit="cover" zOrder={1} />
// // // // // //         )}
// // // // // //       </View>

// // // // // //       <View style={styles.controls}>
// // // // // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // // // // //           <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
// // // // // //         )}

// // // // // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // // // // //           <View style={{ flexDirection: 'row', gap: 20 }}>
// // // // // //             <Button title="Reject" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // //             <Button title="Accept Call" onPress={acceptIncomingCall} color="#22C55E" />
// // // // // //           </View>
// // // // // //         )}

// // // // // //         {callStatus === 'connected' && (
// // // // // //           <Button title="End Call" onPress={() => setCallStatus('idle')} color="#EF4444" />
// // // // // //         )}
// // // // // //       </View>
// // // // // //     </View>
// // // // // //   );
// // // // // // }

// // // // // // /* ---------- Styles (UNCHANGED) ---------- */
// // // // // // const styles = StyleSheet.create({
// // // // // //   container: { height: 500, backgroundColor: '#111', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
// // // // // //   header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
// // // // // //   headerText: { color: 'white', fontWeight: 'bold' },
// // // // // //   videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
// // // // // //   localVideo: {
// // // // // //     position: 'absolute',
// // // // // //     top: 15,
// // // // // //     right: 15,
// // // // // //     width: 100,
// // // // // //     height: 140,
// // // // // //     backgroundColor: '#333',
// // // // // //     borderRadius: 8,
// // // // // //     borderWidth: 1,
// // // // // //     borderColor: '#fff'
// // // // // //   },
// // // // // //   remoteVideo: { width: '100%', height: '100%' },
// // // // // //   placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
// // // // // //   controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' }
// // // // // // });






// // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   Button,
// // // // //   StyleSheet,
// // // // //   ActivityIndicator
// // // // // } from 'react-native';
// // // // // import {
// // // // //   RTCPeerConnection,
// // // // //   RTCIceCandidate,
// // // // //   RTCSessionDescription,
// // // // //   RTCView,
// // // // //   mediaDevices,
// // // // //   MediaStream,
// // // // //   MediaStreamTrack
// // // // // } from 'react-native-webrtc';
// // // // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // // // import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore';
// // // // // import messaging from '@react-native-firebase/messaging';

// // // // // const API_BASE_URL = 'https://api.docapp.co.in/api';

// // // // // /* ---------- Firebase ---------- */
// // // // // const firebaseConfig = {
// // // // //   apiKey: 'AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw',
// // // // //   authDomain: 'videocall-174e6.firebaseapp.com',
// // // // //   projectId: 'videocall-174e6',
// // // // //   storageBucket: 'videocall-174e6.firebasestorage.app',
// // // // //   messagingSenderId: '965109245557',
// // // // //   appId: '1:965109245557:web:eb5e5c760d3b41dbda7a3c'
// // // // // };

// // // // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // // // const db = getFirestore(app);

// // // // // /* ---------- WebRTC ---------- */
// // // // // const servers = {
// // // // //   iceServers: [
// // // // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
// // // // //   ]
// // // // // };

// // // // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: any) {
// // // // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor';
// // // // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';
// // // // //   const patientUserId = route?.params?.userId || '33';

// // // // //   const pc = useRef<RTCPeerConnection | null>(null);

// // // // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // // // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // // // //   const [callId, setCallId] = useState('');
// // // // //   const [callStatus, setCallStatus] =
// // // // //     useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // // // //   /* ---------- PATIENT DEVICE REGISTRATION ---------- */
// // // // //   useEffect(() => {
// // // // //     if (userRole !== 'patient') return;

// // // // //     const register = async () => {
// // // // //       await messaging().requestPermission();
// // // // //       const token = await messaging().getToken();

// // // // //       await fetch(`${API_BASE_URL}/notifications/save-token`, {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify({
// // // // //           user_id: patientUserId,
// // // // //           token,
// // // // //           platform: 'android'
// // // // //         })
// // // // //       });

// // // // //       console.log('Patient device registered');
// // // // //     };

// // // // //     register();
// // // // //   }, [userRole]);

// // // // //   /* ---------- PeerConnection ---------- */
// // // // //   const createPeerConnection = () => {
// // // // //     pc.current = new RTCPeerConnection(servers);

// // // // //     pc.current.ontrack = (event: any) => {
// // // // //       if (event.streams?.[0]) {
// // // // //         setRemoteStream(event.streams[0]);

// // // // //         // ✅ THIS IS THE REAL CONNECTION SIGNAL
// // // // //         setCallStatus('connected');
// // // // //       }
// // // // //     };

// // // // //     pc.current.onicecandidate = e => {
// // // // //       if (!e.candidate || !callId) return;

// // // // //       const url =
// // // // //         userRole === 'doctor'
// // // // //           ? `${API_BASE_URL}/call/add-offer-candidates`
// // // // //           : `${API_BASE_URL}/call/add-answer-candidates`;

// // // // //       const payload =
// // // // //         userRole === 'doctor'
// // // // //           ? { call_id: callId, offer_candidate: e.candidate }
// // // // //           : { call_id: callId, answer_candidate: e.candidate };

// // // // //       fetch(url, {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify(payload)
// // // // //       });
// // // // //     };

// // // // //     pc.current.oniceconnectionstatechange = () => {
// // // // //       console.log('ICE STATE:', pc.current?.iceConnectionState);
// // // // //     };
// // // // //   };

// // // // //   /* ---------- Media ---------- */
// // // // //   const startWebcam = async () => {
// // // // //     const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// // // // //     setLocalStream(stream as MediaStream);

// // // // //     stream.getTracks().forEach((track: MediaStreamTrack) => {
// // // // //       pc.current?.addTrack(track, stream);
// // // // //     });
// // // // //   };

// // // // //   /* ---------- FCM Incoming Call ---------- */
// // // // //   useEffect(() => {
// // // // //     if (userRole !== 'patient') return;

// // // // //     return messaging().onMessage(async msg => {
// // // // //       if (msg.data?.action === 'INCOMING_CALL') {
// // // // //         setCallId(msg.data.call_id);
// // // // //         setCallStatus('incoming');
// // // // //       }
// // // // //     });
// // // // //   }, [userRole]);

// // // // //   /* ---------- Doctor: Start Call ---------- */
// // // // //   const initiateCall = async () => {
// // // // //     createPeerConnection();
// // // // //     await startWebcam();
// // // // //     setCallStatus('calling');

// // // // //     const offer = await pc.current!.createOffer();
// // // // //     await pc.current!.setLocalDescription(offer);

// // // // //     const res = await fetch(`${API_BASE_URL}/call/initialise-call`, {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ appointment_id: appointmentId, offer })
// // // // //     });

// // // // //     const data = await res.json();
// // // // //     setCallId(data.call_id);

// // // // //     const callDoc = doc(db, 'call_history', data.call_id);

// // // // //     onSnapshot(callDoc, snap => {
// // // // //       const d = snap.data();
// // // // //       if (d?.answer && !pc.current?.currentRemoteDescription) {
// // // // //         pc.current?.setRemoteDescription(new RTCSessionDescription(d.answer));
// // // // //       }
// // // // //     });

// // // // //     onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
// // // // //       snap.docChanges().forEach(c => {
// // // // //         if (c.type === 'added') {
// // // // //           pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // //         }
// // // // //       });
// // // // //     });
// // // // //   };

// // // // //   /* ---------- Patient: Accept Call ---------- */
// // // // //   const acceptIncomingCall = async () => {
// // // // //     if (!callId) return;

// // // // //     createPeerConnection();
// // // // //     setCallStatus('calling');

// // // // //     const callDoc = doc(db, 'call_history', callId);

// // // // //     const unsub = onSnapshot(callDoc, async snap => {
// // // // //       const data = snap.data();
// // // // //       if (!data?.offer) return;

// // // // //       unsub();

// // // // //       await pc.current!.setRemoteDescription(
// // // // //         new RTCSessionDescription(data.offer)
// // // // //       );

// // // // //       await startWebcam();

// // // // //       const answer = await pc.current!.createAnswer();
// // // // //       await pc.current!.setLocalDescription(answer);

// // // // //       await fetch(`${API_BASE_URL}/call/recieve-call`, {
// // // // //         method: 'PUT',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify({ call_id: callId, answer })
// // // // //       });

// // // // //       onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
// // // // //         snap.docChanges().forEach(c => {
// // // // //           if (c.type === 'added') {
// // // // //             pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // // //           }
// // // // //         });
// // // // //       });
// // // // //     });
// // // // //   };

// // // // //   /* ---------- UI (UNCHANGED) ---------- */
// // // // //   return (
// // // // //     <View style={styles.container}>
// // // // //       <View style={styles.header}>
// // // // //         <Text style={styles.headerText}>
// // // // //           Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'}
// // // // //           {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// // // // //         </Text>
// // // // //       </View>

// // // // //       <View style={styles.videoWrapper}>
// // // // //         {remoteStream ? (
// // // // //           <RTCView
// // // // //             streamURL={remoteStream.toURL()}
// // // // //             style={styles.remoteVideo}
// // // // //             objectFit="cover"
// // // // //           />
// // // // //         ) : (
// // // // //           <View style={styles.placeholder}>
// // // // //             {callStatus === 'calling' && (
// // // // //               <ActivityIndicator size="large" color="#ffffff" />
// // // // //             )}
// // // // //             <Text style={{ color: '#999', marginTop: 10 }}>
// // // // //               {callStatus === 'idle'
// // // // //                 ? 'Ready to Call'
// // // // //                 : 'Waiting for Video...'}
// // // // //             </Text>
// // // // //           </View>
// // // // //         )}

// // // // //         {localStream && (
// // // // //           <RTCView
// // // // //             streamURL={localStream.toURL()}
// // // // //             style={styles.localVideo}
// // // // //             objectFit="cover"
// // // // //             zOrder={1}
// // // // //           />
// // // // //         )}
// // // // //       </View>

// // // // //       <View style={styles.controls}>
// // // // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // // // //           <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
// // // // //         )}

// // // // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // // // //           <View style={{ flexDirection: 'row', gap: 20 }}>
// // // // //             <Button
// // // // //               title="Reject"
// // // // //               onPress={() => setCallStatus('idle')}
// // // // //               color="#EF4444"
// // // // //             />
// // // // //             <Button
// // // // //               title="Accept Call"
// // // // //               onPress={acceptIncomingCall}
// // // // //               color="#22C55E"
// // // // //             />
// // // // //           </View>
// // // // //         )}

// // // // //         {callStatus === 'connected' && (
// // // // //           <Button
// // // // //             title="End Call"
// // // // //             onPress={() => setCallStatus('idle')}
// // // // //             color="#EF4444"
// // // // //           />
// // // // //         )}
// // // // //       </View>
// // // // //     </View>
// // // // //   );
// // // // // }

// // // // // /* ---------- Styles (UNCHANGED) ---------- */
// // // // // const styles = StyleSheet.create({
// // // // //   container: {
// // // // //     height: 500,
// // // // //     backgroundColor: '#111',
// // // // //     borderRadius: 12,
// // // // //     overflow: 'hidden',
// // // // //     borderWidth: 1,
// // // // //     borderColor: '#333'
// // // // //   },
// // // // //   header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
// // // // //   headerText: { color: 'white', fontWeight: 'bold' },
// // // // //   videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
// // // // //   localVideo: {
// // // // //     position: 'absolute',
// // // // //     top: 15,
// // // // //     right: 15,
// // // // //     width: 100,
// // // // //     height: 140,
// // // // //     backgroundColor: '#333',
// // // // //     borderRadius: 8,
// // // // //     borderWidth: 1,
// // // // //     borderColor: '#fff'
// // // // //   },
// // // // //   remoteVideo: { width: '100%', height: '100%' },
// // // // //   placeholder: {
// // // // //     flex: 1,
// // // // //     justifyContent: 'center',
// // // // //     alignItems: 'center',
// // // // //     backgroundColor: '#111'
// // // // //   },
// // // // //   controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' }
// // // // // });







// // // // import React, { useState, useRef, useEffect } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   Button,
// // // //   StyleSheet,
// // // //   ActivityIndicator
// // // // } from 'react-native';
// // // // import {
// // // //   RTCPeerConnection,
// // // //   RTCIceCandidate,
// // // //   RTCSessionDescription,
// // // //   RTCView,
// // // //   mediaDevices,
// // // //   MediaStream,
// // // //   MediaStreamTrack
// // // // } from 'react-native-webrtc';
// // // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // // import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore';
// // // // import messaging from '@react-native-firebase/messaging';
// // // // import { useAccessToken } from '../contexts/AccessTokenContext';

// // // // const API_BASE_URL = 'https://api.docapp.co.in/api';

// // // // /* ---------- Firebase ---------- */
// // // // const firebaseConfig = {
// // // //   apiKey: 'AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw',
// // // //   authDomain: 'videocall-174e6.firebaseapp.com',
// // // //   projectId: 'videocall-174e6',
// // // //   storageBucket: 'videocall-174e6.firebasestorage.app',
// // // //   messagingSenderId: '965109245557',
// // // //   appId: '1:965109245557:web:eb5e5c760d3b41dbda7a3c'
// // // // };

// // // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // // const db = getFirestore(app);

// // // // /* ---------- WebRTC ---------- */
// // // // const servers = {
// // // //   iceServers: [
// // // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
// // // //   ]
// // // // };

// // // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: any) {
// // // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor';
// // // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';
// // // //   const patientUserId = route?.params?.userId || '33';

// // // //   const pc = useRef<RTCPeerConnection | null>(null);

// // // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // // //   const [callId, setCallId] = useState('');
// // // //   const [callStatus, setCallStatus] =
// // // //     useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // // //   const { accessToken } = useAccessToken();

// // // //   /* ---------- PATIENT DEVICE REGISTRATION ---------- */
// // // //   useEffect(() => {
// // // //     if (userRole !== 'patient') return;

// // // //     const register = async () => {
// // // //       await messaging().requestPermission();
// // // //       const token = await messaging().getToken();

// // // //       await fetch(`${API_BASE_URL}/notifications/save-token`, {
// // // //         method: 'POST',
// // // //         headers: { 
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': `Bearer ${accessToken}`,
// // // //         },
// // // //         body: JSON.stringify({
// // // //           user_id: patientUserId,
// // // //           token,
// // // //           platform: 'android'
// // // //         })
// // // //       });
// // // //     };

// // // //     register();
// // // //   }, [userRole]);

// // // //   /* ---------- PeerConnection ---------- */
// // // //   const createPeerConnection = () => {
// // // //     pc.current = new RTCPeerConnection(servers);

// // // //     pc.current.ontrack = event => {
// // // //       if (event.streams?.[0]) {
// // // //         setRemoteStream(event.streams[0]);
// // // //         setCallStatus('connected'); // ✅ REAL connection signal
// // // //       }
// // // //     };

// // // //     pc.current.onicecandidate = e => {
// // // //       if (!e.candidate || !callId) return;

// // // //       const url =
// // // //         userRole === 'doctor'
// // // //           ? `${API_BASE_URL}/call/add-offer-candidates`
// // // //           : `${API_BASE_URL}/call/add-answer-candidates`;

// // // //       const payload =
// // // //         userRole === 'doctor'
// // // //           ? { call_id: callId, offer_candidate: e.candidate }
// // // //           : { call_id: callId, answer_candidate: e.candidate };

// // // //       fetch(url, {
// // // //         method: 'POST',
// // // //         headers: { 
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': `Bearer ${accessToken}`,
// // // //         },
// // // //         body: JSON.stringify(payload)
// // // //       });
// // // //     };
// // // //   };

// // // //   /* ---------- Media (MUST be before SDP) ---------- */
// // // //   const startWebcam = async () => {
// // // //     const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// // // //     setLocalStream(stream as MediaStream);

// // // //     stream.getTracks().forEach((track: MediaStreamTrack) => {
// // // //       pc.current?.addTrack(track, stream);
// // // //     });
// // // //   };

// // // //   /* ---------- FCM Incoming Call ---------- */
// // // //   useEffect(() => {
// // // //     if (userRole !== 'patient') return;

// // // //     return messaging().onMessage(msg => {
// // // //       if (msg.data?.action === 'INCOMING_CALL') {
// // // //         setCallId(msg.data.call_id);
// // // //         setCallStatus('incoming');
// // // //       }
// // // //     });
// // // //   }, [userRole]);

// // // //   /* ---------- Doctor: Start Call ---------- */
// // // //   const initiateCall = async () => {
// // // //     createPeerConnection();

// // // //     // ✅ MUST attach tracks BEFORE offer
// // // //     await startWebcam();

// // // //     setCallStatus('calling');

// // // //     const offer = await pc.current!.createOffer({
// // // //       offerToReceiveAudio: true,
// // // //       offerToReceiveVideo: true
// // // //     });

// // // //     await pc.current!.setLocalDescription(offer);

// // // //     const res = await fetch(`${API_BASE_URL}/call/initialise-call`, {
// // // //       method: 'POST',
// // // //       headers: { 
// // // //         'Content-Type': 'application/json',
// // // //         'Authorization': `Bearer ${accessToken}`,
// // // //       },
// // // //       body: JSON.stringify({ appointment_id: appointmentId, offer })
// // // //     });

// // // //     const data = await res.json();
// // // //     setCallId(data.call_id);

// // // //     const callDoc = doc(db, 'call_history', data.call_id);

// // // //     onSnapshot(callDoc, snap => {
// // // //       const d = snap.data();
// // // //       if (d?.answer && !pc.current?.currentRemoteDescription) {
// // // //         pc.current?.setRemoteDescription(
// // // //           new RTCSessionDescription(d.answer)
// // // //         );
// // // //       }
// // // //     });

// // // //     onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
// // // //       snap.docChanges().forEach(c => {
// // // //         if (c.type === 'added') {
// // // //           pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // //         }
// // // //       });
// // // //     });
// // // //   };

// // // //   /* ---------- Patient: Accept Call ---------- */
// // // //   const acceptIncomingCall = async () => {
// // // //     if (!callId) return;

// // // //     createPeerConnection();
// // // //     setCallStatus('calling');

// // // //     const callDoc = doc(db, 'call_history', callId);

// // // //     const unsub = onSnapshot(callDoc, async snap => {
// // // //       const data = snap.data();
// // // //       if (!data?.offer) return;

// // // //       unsub();

// // // //       await pc.current!.setRemoteDescription(
// // // //         new RTCSessionDescription(data.offer)
// // // //       );

// // // //       // ✅ Attach tracks BEFORE answer
// // // //       await startWebcam();

// // // //       const answer = await pc.current!.createAnswer();
// // // //       await pc.current!.setLocalDescription(answer);

// // // //       await fetch(`${API_BASE_URL}/call/recieve-call`, {
// // // //         method: 'PUT',
// // // //         headers: { 
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': `Bearer ${accessToken}`,
// // // //         },
// // // //         body: JSON.stringify({ call_id: callId, answer })
// // // //       });

// // // //       onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
// // // //         snap.docChanges().forEach(c => {
// // // //           if (c.type === 'added') {
// // // //             pc.current?.addIceCandidate(new RTCIceCandidate(c.doc.data()));
// // // //           }
// // // //         });
// // // //       });
// // // //     });
// // // //   };

// // // //   /* ---------- UI (UNCHANGED) ---------- */
// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <View style={styles.header}>
// // // //         <Text style={styles.headerText}>
// // // //           Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'}
// // // //           {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// // // //         </Text>
// // // //       </View>

// // // //       <View style={styles.videoWrapper}>
// // // //         {remoteStream ? (
// // // //           <RTCView
// // // //             streamURL={remoteStream.toURL()}
// // // //             style={styles.remoteVideo}
// // // //             objectFit="cover"
// // // //           />
// // // //         ) : (
// // // //           <View style={styles.placeholder}>
// // // //             {callStatus === 'calling' && (
// // // //               <ActivityIndicator size="large" color="#ffffff" />
// // // //             )}
// // // //             <Text style={{ color: '#999', marginTop: 10 }}>
// // // //               {callStatus === 'idle'
// // // //                 ? 'Ready to Call'
// // // //                 : 'Waiting for Video...'}
// // // //             </Text>
// // // //           </View>
// // // //         )}

// // // //         {localStream && (
// // // //           <RTCView
// // // //             streamURL={localStream.toURL()}
// // // //             style={styles.localVideo}
// // // //             objectFit="cover"
// // // //             zOrder={1}
// // // //           />
// // // //         )}
// // // //       </View>

// // // //       <View style={styles.controls}>
// // // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // // //           <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
// // // //         )}

// // // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // // //           <View style={{ flexDirection: 'row', gap: 20 }}>
// // // //             <Button
// // // //               title="Reject"
// // // //               onPress={() => setCallStatus('idle')}
// // // //               color="#EF4444"
// // // //             />
// // // //             <Button
// // // //               title="Accept Call"
// // // //               onPress={acceptIncomingCall}
// // // //               color="#22C55E"
// // // //             />
// // // //           </View>
// // // //         )}

// // // //         {callStatus === 'connected' && (
// // // //           <Button
// // // //             title="End Call"
// // // //             onPress={() => setCallStatus('idle')}
// // // //             color="#EF4444"
// // // //           />
// // // //         )}
// // // //       </View>
// // // //     </View>
// // // //   );
// // // // }

// // // // /* ---------- Styles (UNCHANGED) ---------- */
// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     height: 500,
// // // //     backgroundColor: '#111',
// // // //     borderRadius: 12,
// // // //     overflow: 'hidden',
// // // //     borderWidth: 1,
// // // //     borderColor: '#333'
// // // //   },
// // // //   header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
// // // //   headerText: { color: 'white', fontWeight: 'bold' },
// // // //   videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
// // // //   localVideo: {
// // // //     position: 'absolute',
// // // //     top: 15,
// // // //     right: 15,
// // // //     width: 100,
// // // //     height: 140,
// // // //     backgroundColor: '#333',
// // // //     borderRadius: 8,
// // // //     borderWidth: 1,
// // // //     borderColor: '#fff'
// // // //   },
// // // //   remoteVideo: { width: '100%', height: '100%' },
// // // //   placeholder: {
// // // //     flex: 1,
// // // //     justifyContent: 'center',
// // // //     alignItems: 'center',
// // // //     backgroundColor: '#111'
// // // //   },
// // // //   controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' }
// // // // });









// // // import React, { useState, useRef, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   Button,
// // //   StyleSheet,
// // //   ActivityIndicator,
// // // } from 'react-native';
// // // import {
// // //   RTCPeerConnection,
// // //   RTCIceCandidate,
// // //   RTCSessionDescription,
// // //   RTCView,
// // //   mediaDevices,
// // //   MediaStream,
// // //   MediaStreamTrack,
// // // } from 'react-native-webrtc';
// // // import { initializeApp, getApps, getApp } from 'firebase/app';
// // // import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore';
// // // import messaging from '@react-native-firebase/messaging';
// // // import { useAccessToken } from '../contexts/AccessTokenContext';

// // // const API_BASE_URL = 'https://api.docapp.co.in/api';

// // // /* ---------------- Firebase ---------------- */
// // // const firebaseConfig = {
// // //   apiKey: 'AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw',
// // //   authDomain: 'videocall-174e6.firebaseapp.com',
// // //   projectId: 'videocall-174e6',
// // //   storageBucket: 'videocall-174e6.firebasestorage.app',
// // //   messagingSenderId: '965109245557',
// // //   appId: '1:965109245557:web:eb5e5c760d3b41dbda7a3c',
// // // };

// // // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // // const db = getFirestore(app);

// // // /* ---------------- WebRTC ---------------- */
// // // const rtcConfig = {
// // //   iceServers: [
// // //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
// // //   ],
// // //   sdpSemantics: 'unified-plan', // 🔥 REQUIRED
// // // };

// // // export default function VideoCall({ route, embeddedRole, embeddedApptId }: any) {
// // //   const userRole = route?.params?.userRole || embeddedRole || 'doctor';
// // //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';
// // //   const patientUserId = route?.params?.userId || '33';

// // //   const pc = useRef<RTCPeerConnection | null>(null);
// // //   const remoteMedia = useRef<MediaStream | null>(null);

// // //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// // //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// // //   const [callId, setCallId] = useState('');
// // //   const [callStatus, setCallStatus] =
// // //     useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// // //   const { accessToken } = useAccessToken();

// // //   /* ---------------- Register Patient FCM ---------------- */
// // //   useEffect(() => {
// // //     if (userRole !== 'patient') return;

// // //     (async () => {
// // //       await messaging().requestPermission();
// // //       const token = await messaging().getToken();

// // //       await fetch(`${API_BASE_URL}/notifications/save-token`, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           Authorization: `Bearer ${accessToken}`,
// // //         },
// // //         body: JSON.stringify({
// // //           user_id: patientUserId,
// // //           token,
// // //           platform: 'android',
// // //         }),
// // //       });
// // //     })();
// // //   }, [userRole]);

// // //   /* ---------------- PeerConnection (ONLY ONCE) ---------------- */
// // //   const createPeerConnection = () => {
// // //     if (pc.current) return;

// // //     pc.current = new RTCPeerConnection(rtcConfig);

// // //     remoteMedia.current = new MediaStream();
// // //     setRemoteStream(remoteMedia.current);

// // //     pc.current.ontrack = event => {
// // //       console.log('REMOTE TRACK:', event.track.kind);
// // //       remoteMedia.current?.addTrack(event.track);
// // //       setCallStatus('connected');
// // //     };

// // //     pc.current.onicecandidate = e => {
// // //       if (!e.candidate || !callId) return;

// // //       const url =
// // //         userRole === 'doctor'
// // //           ? `${API_BASE_URL}/call/add-offer-candidates`
// // //           : `${API_BASE_URL}/call/add-answer-candidates`;

// // //       const payload =
// // //         userRole === 'doctor'
// // //           ? { call_id: callId, offer_candidate: e.candidate }
// // //           : { call_id: callId, answer_candidate: e.candidate };

// // //       fetch(url, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           Authorization: `Bearer ${accessToken}`,
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });
// // //     };
// // //   };

// // //   /* ---------------- Media ---------------- */
// // //   const startWebcam = async () => {
// // //     if (localStream) return;

// // //     const stream = await mediaDevices.getUserMedia({
// // //       audio: true,
// // //       video: { facingMode: 'user' },
// // //     });

// // //     setLocalStream(stream);

// // //     stream.getTracks().forEach((track: MediaStreamTrack) => {
// // //       pc.current?.addTrack(track, stream);
// // //     });
// // //   };

// // //   /* ---------------- Incoming Call (Patient) ---------------- */
// // //   useEffect(() => {
// // //     if (userRole !== 'patient') return;

// // //     return messaging().onMessage(msg => {
// // //       if (msg.data?.action === 'INCOMING_CALL') {
// // //         setCallId(msg.data.call_id);
// // //         setCallStatus('incoming');
// // //       }
// // //     });
// // //   }, [userRole]);

// // //   /* ---------------- Doctor: Start Call ---------------- */
// // //   const initiateCall = async () => {
// // //     createPeerConnection();
// // //     await startWebcam();

// // //     setCallStatus('calling');

// // //     const offer = await pc.current!.createOffer();
// // //     await pc.current!.setLocalDescription(offer);

// // //     const res = await fetch(`${API_BASE_URL}/call/initialise-call`, {
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         Authorization: `Bearer ${accessToken}`,
// // //       },
// // //       body: JSON.stringify({ appointment_id: appointmentId, offer }),
// // //     });

// // //     const data = await res.json();
// // //     setCallId(data.call_id);

// // //     const callDoc = doc(db, 'call_history', data.call_id);

// // //     onSnapshot(callDoc, snap => {
// // //       const d = snap.data();
// // //       if (d?.answer && !pc.current?.currentRemoteDescription) {
// // //         pc.current?.setRemoteDescription(
// // //           new RTCSessionDescription(d.answer)
// // //         );
// // //       }
// // //     });

// // //     onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
// // //       snap.docChanges().forEach(c => {
// // //         if (c.type === 'added') {
// // //           pc.current?.addIceCandidate(
// // //             new RTCIceCandidate(c.doc.data())
// // //           );
// // //         }
// // //       });
// // //     });
// // //   };

// // //   /* ---------------- Patient: Accept Call ---------------- */
// // //   const acceptIncomingCall = async () => {
// // //     if (!callId) return;

// // //     createPeerConnection();
// // //     setCallStatus('calling');

// // //     const callDoc = doc(db, 'call_history', callId);

// // //     const unsub = onSnapshot(callDoc, async snap => {
// // //       const data = snap.data();
// // //       if (!data?.offer) return;

// // //       unsub();

// // //       await pc.current!.setRemoteDescription(
// // //         new RTCSessionDescription(data.offer)
// // //       );

// // //       await startWebcam();

// // //       const answer = await pc.current!.createAnswer();
// // //       await pc.current!.setLocalDescription(answer);

// // //       await fetch(`${API_BASE_URL}/call/recieve-call`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           Authorization: `Bearer ${accessToken}`,
// // //         },
// // //         body: JSON.stringify({ call_id: callId, answer }),
// // //       });

// // //       onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
// // //         snap.docChanges().forEach(c => {
// // //           if (c.type === 'added') {
// // //             pc.current?.addIceCandidate(
// // //               new RTCIceCandidate(c.doc.data())
// // //             );
// // //           }
// // //         });
// // //       });
// // //     });
// // //   };

// // //   /* ---------------- UI ---------------- */
// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.header}>
// // //         {userRole.toUpperCase()} | {callStatus}
// // //       </Text>

// // //       <View style={styles.videoWrapper}>
// // //         {remoteStream ? (
// // //           <RTCView
// // //             streamURL={remoteStream.toURL()}
// // //             style={styles.remoteVideo}
// // //             objectFit="cover"
// // //           />
// // //         ) : (
// // //           <ActivityIndicator size="large" color="#fff" />
// // //         )}

// // //         {localStream && (
// // //           <RTCView
// // //             streamURL={localStream.toURL()}
// // //             style={styles.localVideo}
// // //             objectFit="cover"
// // //             zOrder={1}
// // //           />
// // //         )}
// // //       </View>

// // //       <View style={styles.controls}>
// // //         {userRole === 'doctor' && callStatus === 'idle' && (
// // //           <Button title="Start Call" onPress={initiateCall} />
// // //         )}

// // //         {userRole === 'patient' && callStatus === 'incoming' && (
// // //           <Button title="Accept Call" onPress={acceptIncomingCall} />
// // //         )}
// // //       </View>
// // //     </View>
// // //   );
// // // }

// // // /* ---------------- Styles ---------------- */
// // // const styles = StyleSheet.create({
// // //   container: { height: 500, backgroundColor: '#000' },
// // //   header: { color: '#fff', textAlign: 'center', padding: 10 },
// // //   videoWrapper: { flex: 1, position: 'relative' },
// // //   remoteVideo: { flex: 1, backgroundColor: '#000' },
// // //   localVideo: {
// // //     position: 'absolute',
// // //     right: 10,
// // //     top: 10,
// // //     width: 120,
// // //     height: 160,
// // //     backgroundColor: '#000',
// // //   },
// // //   controls: { padding: 10 },
// // // });




// // import React, { useEffect, useRef, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   Button,
// //   StyleSheet,
// //   ActivityIndicator,
// // } from 'react-native';
// // import {
// //   RTCPeerConnection,
// //   RTCIceCandidate,
// //   RTCSessionDescription,
// //   RTCView,
// //   mediaDevices,
// //   MediaStream,
// // } from 'react-native-webrtc';
// // import { initializeApp, getApps, getApp } from 'firebase/app';
// // import { getFirestore, doc, collection, onSnapshot } from 'firebase/firestore';
// // import messaging from '@react-native-firebase/messaging';
// // import { useAccessToken } from '../contexts/AccessTokenContext';

// // /* ---------------- CONFIG ---------------- */

// // const API_BASE_URL = 'https://api.docapp.co.in/api';

// // const firebaseConfig = {
// //   apiKey: 'AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw',
// //   authDomain: 'videocall-174e6.firebaseapp.com',
// //   projectId: 'videocall-174e6',
// //   storageBucket: 'videocall-174e6.firebasestorage.app',
// //   messagingSenderId: '965109245557',
// //   appId: '1:965109245557:web:eb5e5c760d3b41dbda7a3c',
// // };

// // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // const db = getFirestore(app);

// // const iceServers = {
// //   iceServers: [
// //     { urls: 'stun:stun1.l.google.com:19302' },
// //     { urls: 'stun:stun2.l.google.com:19302' },
// //   ],
// // };

// // /* ---------------- COMPONENT ---------------- */

// // export default function VideoCall({ route, embeddedRole, embeddedApptId }: any) {


// //   const userRole = route?.params?.userRole || embeddedRole || 'doctor';
// //   const appointmentId = route?.params?.appointmentId || embeddedApptId;
// //   // const patientUserId = route?.params?.userId;
// //   const patientUserId =
// //   userRole === 'doctor'
// //     ? 36   // doctor id
// //     : 33;  // patient id

// //   const { accessToken } = useAccessToken();

// //   const pc = useRef<RTCPeerConnection | null>(null);

// //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// //   const [callId, setCallId] = useState('');
// //   const [status, setStatus] =
// //     useState<'idle' | 'incoming' | 'calling' | 'connected'>('idle');

// //   /* ---------------- PEER ---------------- */

// //   useEffect(() => {
// //     console.log('userRole:', userRole);
// //     console.log('accessToken:', accessToken);
// //     console.log('userId:', patientUserId);
// //   }, []);

// //   const createPeer = () => {
// //     pc.current = new RTCPeerConnection(iceServers);

// //     pc.current.ontrack = event => {
// //       console.log('REMOTE TRACK:', event.track.kind);
// //       if (event.streams[0]) {
// //         setRemoteStream(event.streams[0]);
// //         setStatus('connected');
// //       }
// //     };

// //     pc.current.onicecandidate = e => {
// //       if (!e.candidate || !callId) return;

// //       fetch(
// //         userRole === 'doctor'
// //           ? `${API_BASE_URL}/call/add-offer-candidates`
// //           : `${API_BASE_URL}/call/add-answer-candidates`,
// //         {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             Authorization: `Bearer ${accessToken}`,
// //           },
// //           body: JSON.stringify({
// //             call_id: callId,
// //             [userRole === 'doctor'
// //               ? 'offer_candidate'
// //               : 'answer_candidate']: e.candidate,
// //           }),
// //         }
// //       );
// //     };

// //     pc.current.onconnectionstatechange = () => {
// //       console.log('PC STATE:', pc.current?.connectionState);
// //     };
// //   };

// //   /* ---------------- MEDIA ---------------- */

// //   const startMedia = async () => {
// //     const stream = await mediaDevices.getUserMedia({
// //       audio: true,
// //       video: true,
// //     });
// //     setLocalStream(stream);

// //     stream.getTracks().forEach(track => {
// //       pc.current?.addTrack(track, stream);
// //     });
// //   };

// //   /* ---------------- PATIENT FCM ---------------- */

// //   useEffect(() => {
// //     if (userRole !== 'patient') return;

// //     messaging().onMessage(msg => {
// //       if (msg.data?.action === 'INCOMING_CALL') {
// //         setCallId(msg.data.call_id);
// //         setStatus('incoming');
// //       }
// //     });
// //   }, []);

// //   /* ---------------- DOCTOR START ---------------- */

// //   const startCall = async () => {
// //     createPeer();
// //     await startMedia();
// //     setStatus('calling');

// //     const offer = await pc.current!.createOffer();
// //     await pc.current!.setLocalDescription(offer);

// //     const res = await fetch(`${API_BASE_URL}/call/initialise-call`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${accessToken}`,
// //       },
// //       body: JSON.stringify({ appointment_id: appointmentId, offer }),
// //     });

// //     const data = await res.json();
// //     setCallId(data.call_id);

// //     const callDoc = doc(db, 'call_history', data.call_id);

// //     onSnapshot(callDoc, snap => {
// //       const d = snap.data();
// //       if (d?.answer && !pc.current?.currentRemoteDescription) {
// //         pc.current?.setRemoteDescription(
// //           new RTCSessionDescription(d.answer)
// //         );
// //       }
// //     });

// //     onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
// //       snap.docChanges().forEach(c => {
// //         if (c.type === 'added') {
// //           pc.current?.addIceCandidate(
// //             new RTCIceCandidate(c.doc.data())
// //           );
// //         }
// //       });
// //     });
// //   };

// //   /* ---------------- PATIENT ACCEPT ---------------- */

// //   const acceptCall = async () => {
// //     createPeer();
// //     setStatus('calling');

// //     const callDoc = doc(db, 'call_history', callId);

// //     const unsub = onSnapshot(callDoc, async snap => {
// //       const data = snap.data();
// //       if (!data?.offer) return;

// //       unsub();

// //       await pc.current!.setRemoteDescription(
// //         new RTCSessionDescription(data.offer)
// //       );

// //       await startMedia();

// //       const answer = await pc.current!.createAnswer();
// //       await pc.current!.setLocalDescription(answer);

// //       await fetch(`${API_BASE_URL}/call/recieve-call`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${accessToken}`,
// //         },
// //         body: JSON.stringify({ call_id: callId, answer }),
// //       });

// //       onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
// //         snap.docChanges().forEach(c => {
// //           if (c.type === 'added') {
// //             pc.current?.addIceCandidate(
// //               new RTCIceCandidate(c.doc.data())
// //             );
// //           }
// //         });
// //       });
// //     });
// //   };

// //   /* ---------------- UI ---------------- */

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>
// //         {userRole.toUpperCase()} | {status}
// //       </Text>

// //       <View style={styles.videoWrapper}>
// //         {remoteStream && (
// //           <RTCView
// //             streamURL={remoteStream.toURL()}
// //             style={styles.remoteVideo}
// //             objectFit="cover"
// //           />
// //         )}

// //         {localStream && (
// //           <RTCView
// //             streamURL={localStream.toURL()}
// //             style={styles.localVideo}
// //             objectFit="cover"
// //             mirror
// //             zOrder={1}
// //           />
// //         )}

// //         {status === 'calling' && !remoteStream && (
// //           <ActivityIndicator color="#fff" size="large" />
// //         )}
// //       </View>

// //       {userRole === 'doctor' && status === 'idle' && (
// //         <Button title="Start Call" onPress={startCall} />
// //       )}

// //       {userRole === 'patient' && status === 'incoming' && (
// //         <Button title="Accept Call" onPress={acceptCall} />
// //       )}
// //     </View>
// //   );
// // }

// // /* ---------------- STYLES ---------------- */

// // const styles = StyleSheet.create({
// //   container: {
// //     height: 500,
// //     backgroundColor: '#000',
// //   },
// //   header: {
// //     color: '#fff',
// //     textAlign: 'center',
// //     padding: 10,
// //   },
// //   videoWrapper: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //   },
// //   remoteVideo: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   localVideo: {
// //     position: 'absolute',
// //     right: 12,
// //     top: 12,
// //     width: 120,
// //     height: 160,
// //     zIndex: 10,
// //     elevation: 10, // ANDROID FIX
// //   },
// // });








// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   mediaDevices,
//   MediaStream,
// } from 'react-native-webrtc';
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getFirestore, doc, collection, onSnapshot } from 'firebase/firestore';
// import messaging from '@react-native-firebase/messaging';
// import { useAccessToken } from '../contexts/AccessTokenContext';

// /* ---------------- CONFIG ---------------- */

// const API_BASE_URL = 'https://api.docapp.co.in/api';

// /** 🔧 TEMP DEBUG IDS (REMOVE IN PROD) */
// const DOCTOR_ID = 36;
// const PATIENT_ID = 33;

// const firebaseConfig = {
//   apiKey: 'AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw',
//   authDomain: 'videocall-174e6.firebaseapp.com',
//   projectId: 'videocall-174e6',
//   storageBucket: 'videocall-174e6.firebasestorage.app',
//   messagingSenderId: '965109245557',
//   appId: '1:965109245557:web:eb5e5c760d3b41dbda7a3c',
// };

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app);

// const iceServers = {
//   iceServers: [
//     { urls: 'stun:stun1.l.google.com:19302' },
//     { urls: 'stun:stun2.l.google.com:19302' },
//   ],
// };

// /* ---------------- COMPONENT ---------------- */

// export default function VideoCall({
//   route,
//   embeddedRole,
//   embeddedApptId,
// }: any) {
//   /** ✅ embeddedRole ALWAYS wins */
//   const userRole = embeddedRole ?? route?.params?.userRole;
//   const appointmentId = embeddedApptId ?? route?.params?.appointmentId;

//   /** ✅ FIXED IDENTITIES */
//   const doctorId = DOCTOR_ID;
//   const patientId = PATIENT_ID;

//   /** ✅ CURRENT USER */
//   const currentUserId =
//     userRole === 'doctor' ? doctorId : patientId;

//   const { accessToken } = useAccessToken();

//   const pc = useRef<RTCPeerConnection | null>(null);

//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//   const [callId, setCallId] = useState('');
//   const [status, setStatus] =
//     useState<'idle' | 'incoming' | 'calling' | 'connected'>('idle');

//   /* ---------------- DEBUG LOGS ---------------- */

//   useEffect(() => {
//     console.log('[VideoCall INIT]', {
//       userRole,
//       currentUserId,
//       doctorId,
//       patientId,
//       appointmentId,
//     });
//   }, []);

//   /* ---------------- PEER ---------------- */

//   const createPeer = () => {
//     pc.current = new RTCPeerConnection(iceServers);

//     pc.current.ontrack = event => {
//       console.log('[RTC] Remote track:', event.track.kind);
//       if (event.streams[0]) {
//         setRemoteStream(event.streams[0]);
//         setStatus('connected');
//       }
//     };

//     pc.current.onicecandidate = e => {
//       if (!e.candidate || !callId) return;

//       fetch(
//         userRole === 'doctor'
//           ? `${API_BASE_URL}/call/add-offer-candidates`
//           : `${API_BASE_URL}/call/add-answer-candidates`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify({
//             call_id: callId,
//             [userRole === 'doctor'
//               ? 'offer_candidate'
//               : 'answer_candidate']: e.candidate,
//           }),
//         }
//       );
//     };

//     pc.current.onconnectionstatechange = () => {
//       console.log('[RTC] State:', pc.current?.connectionState);
//     };
//   };

//   /* ---------------- MEDIA ---------------- */

//   const startMedia = async () => {
//     const stream = await mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });

//     setLocalStream(stream);
//     stream.getTracks().forEach(track =>
//       pc.current?.addTrack(track, stream)
//     );
//   };

//   /* ---------------- PATIENT LISTENER ---------------- */

//   useEffect(() => {
//     if (userRole !== 'patient') return;

//     const unsubscribe = messaging().onMessage(msg => {
//       console.log('[PATIENT] FCM MSG:', msg?.data);

//       if (msg.data?.action === 'INCOMING_CALL') {
//         setCallId(msg.data.call_id);
//         setStatus('incoming');
//       }
//     });

//     return unsubscribe;
//   }, [userRole]);

//   /* ---------------- DOCTOR START ---------------- */

//   const startCall = async () => {
//     createPeer();
//     await startMedia();
//     setStatus('calling');

//     const offer = await pc.current!.createOffer();
//     await pc.current!.setLocalDescription(offer);

//     const res = await fetch(
//       `${API_BASE_URL}/call/initialise-call`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//           appointment_id: appointmentId,
//           offer,
//           doctor_id: doctorId,
//           patient_id: patientId,
//         }),
//       }
//     );

//     const data = await res.json();
//     setCallId(data.call_id);

//     const callDoc = doc(db, 'call_history', data.call_id);

//     onSnapshot(callDoc, snap => {
//       const d = snap.data();
//       if (d?.answer && !pc.current?.currentRemoteDescription) {
//         pc.current?.setRemoteDescription(
//           new RTCSessionDescription(d.answer)
//         );
//       }
//     });

//     onSnapshot(collection(callDoc, 'answerCandidates'), snap => {
//       snap.docChanges().forEach(c => {
//         if (c.type === 'added') {
//           pc.current?.addIceCandidate(
//             new RTCIceCandidate(c.doc.data())
//           );
//         }
//       });
//     });
//   };

//   /* ---------------- PATIENT ACCEPT ---------------- */

//   const acceptCall = async () => {
//     createPeer();
//     setStatus('calling');

//     const callDoc = doc(db, 'call_history', callId);

//     const unsub = onSnapshot(callDoc, async snap => {
//       const data = snap.data();
//       if (!data?.offer) return;

//       unsub();

//       await pc.current!.setRemoteDescription(
//         new RTCSessionDescription(data.offer)
//       );

//       await startMedia();

//       const answer = await pc.current!.createAnswer();
//       await pc.current!.setLocalDescription(answer);

//       await fetch(`${API_BASE_URL}/call/recieve-call`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//           call_id: callId,
//           answer,
//           patient_id: patientId,
//         }),
//       });

//       onSnapshot(collection(callDoc, 'offerCandidates'), snap => {
//         snap.docChanges().forEach(c => {
//           if (c.type === 'added') {
//             pc.current?.addIceCandidate(
//               new RTCIceCandidate(c.doc.data())
//             );
//           }
//         });
//       });
//     });
//   };

//   /* ---------------- UI ---------------- */

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>
//         {userRole.toUpperCase()} | {status}
//       </Text>

//       <View style={styles.videoWrapper}>
//         {remoteStream && (
//           <RTCView
//             streamURL={remoteStream.toURL()}
//             style={styles.remoteVideo}
//             objectFit="cover"
//           />
//         )}

//         {localStream && (
//           <RTCView
//             streamURL={localStream.toURL()}
//             style={styles.localVideo}
//             objectFit="cover"
//             mirror
//           />
//         )}

//         {status === 'calling' && !remoteStream && (
//           <ActivityIndicator color="#fff" size="large" />
//         )}
//       </View>

//       {userRole === 'doctor' && status === 'idle' && (
//         <Button title="Start Call" onPress={startCall} />
//       )}

//       {userRole === 'patient' && status === 'incoming' && (
//         <Button title="Accept Call" onPress={acceptCall} />
//       )}
//     </View>
//   );
// }

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   container: {
//     height: 500,
//     backgroundColor: '#000',
//   },
//   header: {
//     color: '#fff',
//     textAlign: 'center',
//     padding: 10,
//   },
//   videoWrapper: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   remoteVideo: {
//     width: '100%',
//     height: '100%',
//   },
//   localVideo: {
//     position: 'absolute',
//     right: 12,
//     top: 12,
//     width: 120,
//     height: 160,
//     zIndex: 10,
//     elevation: 10,
//   },
// });



import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Mic, Video, PhoneOff, MoreVertical, MessageSquare, FileText } from 'lucide-react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
  MediaStream,
} from 'react-native-webrtc';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, collection, onSnapshot } from 'firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { useAccessToken } from '../contexts/AccessTokenContext';

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
}: any) {
  /** ROLE & APPOINTMENT */
  const userRole = embeddedRole ?? route?.params?.userRole;
  const appointmentId = embeddedApptId ?? route?.params?.appointmentId;

  /** FIXED TEST IDS */
  const doctorId = DOCTOR_ID;
  const patientId = PATIENT_ID;
  const currentUserId = userRole === 'doctor' ? doctorId : patientId;

  const { accessToken } = useAccessToken();

  const pc = useRef<RTCPeerConnection | null>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callId, setCallId] = useState('');
  const [status, setStatus] =
    useState<'idle' | 'incoming' | 'calling' | 'connected'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

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

  /* ---------------- PATIENT FCM LISTENER ---------------- */

  useEffect(() => {
    if (userRole !== 'patient') return;

    const unsubscribe = messaging().onMessage(msg => {
      addLog(`[PATIENT FCM] Action: ${msg.data?.action}`);

      if (msg.data?.action === 'INCOMING_CALL') {
        addLog(`[PATIENT FCM] Call ID: ${msg.data.call_id}`);
        setCallId(msg.data.call_id);
        setStatus('incoming');
      }
    });

    return unsubscribe;
  }, [userRole]);

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

  return (
    <View style={styles.container}>
      <View style={styles.videoWrapper}>
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
          colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.2)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Top Status Bar */}
        <View style={styles.topBar}>
          <View style={styles.statusPill}>
            <View style={styles.redDot} />
            <Text style={styles.statusText}>Consultation • 12:48</Text>
          </View>
          <TouchableOpacity style={styles.docsButton}>
            <FileText size={16} color="#FFF" />
            <Text style={styles.docsText}>Documents</Text>
          </TouchableOpacity>
        </View>

        {/* Logs Overlay */}
        <View style={styles.logsContainer}>
          {logs.map((l, i) => (
            <Text key={i} style={styles.logText}>{l}</Text>
          ))}
        </View>

        {/* PIP Local Video */}
        {localStream && (
          <View style={styles.pipContainer}>
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

        {/* Floating Bottom UI */}
        <View style={styles.bottomControlsContainer}>
          <View style={styles.doctorCard}>
            <Text style={styles.doctorName}>Dr. Julian Sterling</Text>
            <Text style={styles.doctorTitle}>SENIOR CARDIOLOGIST</Text>
          </View>

          <View style={styles.mainControlBar}>
            <TouchableOpacity style={styles.iconButton}>
              <Mic size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Video size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, styles.endCallButton]}
              onPress={status === 'connected' || status === 'calling' ? undefined : undefined}
            >
              <PhoneOff size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MoreVertical size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MessageSquare size={20} color="#FFF" />
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
    top: 48, // Adjusted for typical safe area
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    zIndex: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 28, 32, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    gap: 12,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#BA1A1A',
    marginRight: 6,
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  docsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 28, 32, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    gap: 8,
  },
  docsText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  pipContainer: {
    position: 'absolute',
    right: 16,
    top: 130, // pushed down to not overlap with top bar
    width: 112,
    height: 149.33,
    backgroundColor: 'rgba(255, 255, 255, 0.002)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    zIndex: 10,
  },
  localVideo: {
    width: '100%',
    height: '100%',
  },
  pipOverlay: {
    position: 'absolute',
    left: 7,
    bottom: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  pipText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '500',
  },
  bottomControlsContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
    zIndex: 10,
  },
  doctorCard: {
    backgroundColor: 'rgba(25, 28, 32, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    minWidth: 188,
    marginBottom: 16,
  },
  doctorName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  doctorTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  mainControlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 28, 32, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 32,
    padding: 12,
    width: 336,
    height: 82,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#BA1A1A',
    shadowColor: '#BA1A1A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
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
    top: 130,
    left: 16,
    width: '60%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 8,
    zIndex: 20,
  },
  logText: {
    color: '#0f0',
    fontSize: 10,
    fontFamily: 'monospace',
    marginBottom: 2,
  }
});

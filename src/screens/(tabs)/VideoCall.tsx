


// // import React, { useState, useRef, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   Button,
// //   StyleSheet,
// //   Alert,
// //   ActivityIndicator
// // } from 'react-native';
// // import {
// //   RTCPeerConnection,
// //   RTCIceCandidate,
// //   RTCSessionDescription,
// //   RTCView,
// //   mediaDevices,
// //   MediaStream,
// //   MediaStreamTrack
// // } from 'react-native-webrtc';
// // import { initializeApp, getApps, getApp } from 'firebase/app';
// // import { getFirestore, collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
// // import messaging from '@react-native-firebase/messaging';

// // // --- YOUR CONFIGURATION ---
// // const API_BASE_URL = "http://10.0.2.2:3000/api"; 
// // const AUTH_TOKEN = "YOUR_LOGGED_IN_USER_TOKEN"; // TODO: Replace with real token from Login

// // // ✅ YOUR REAL FIREBASE CONFIG
// // const firebaseConfig = {
// //   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
// //   authDomain: "videocall-174e6.firebaseapp.com",
// //   projectId: "videocall-174e6",
// //   storageBucket: "videocall-174e6.firebasestorage.app",
// //   messagingSenderId: "965109245557",
// //   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c",
// //   measurementId: "G-N1W0W2C8X0"
// // };

// // // Initialize Firebase (Prevent re-initialization error)
// // const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // const db = getFirestore(app);

// // const servers = {
// //   iceServers: [
// //     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
// //   ],
// // };

// // interface VideoCallProps {
// //   route?: any;
// //   embeddedRole?: 'doctor' | 'patient';
// //   embeddedApptId?: string;
// // }

// // export default function VideoCall({ route, embeddedRole, embeddedApptId }: VideoCallProps): JSX.Element {
// //   // Determine Role and ID safely
// //   const userRole = route?.params?.userRole || embeddedRole || 'doctor'; 
// //   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';

// //   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
// //   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
// //   const [callId, setCallId] = useState<string>('');
// //   const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

// //   const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

// //   // 1. SETUP NOTIFICATION LISTENER (For Patient)
// //   useEffect(() => {
// //     if (userRole === 'patient') {
// //         const unsubscribe = messaging().onMessage(async remoteMessage => {
// //             console.log('FCM Message Received:', remoteMessage);
// //             if (remoteMessage.data?.action === 'INCOMING_CALL') {
// //                 setCallId(remoteMessage.data.call_id);
// //                 setCallStatus('incoming'); 
// //             }
// //         });
// //         return unsubscribe;
// //     }
// //   }, [userRole]);

// //   // 2. CLEANUP ON UNMOUNT
// //   useEffect(() => {
// //     return () => {
// //        if (localStream) {
// //            localStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
// //            localStream.release();
// //        }
// //        pc.current.close();
// //     };
// //   }, []);

// //   // 3. START CAMERA
// //   const startWebcam = async () => {
// //     try {
// //         const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
// //         setLocalStream(stream as MediaStream);
        
// //         stream.getTracks().forEach((track: MediaStreamTrack) => {
// //           pc.current.addTrack(track, stream);
// //         });

// //         pc.current.ontrack = (event: any) => {
// //              if(event.streams && event.streams[0]) {
// //                  setRemoteStream(event.streams[0]);
// //                  setCallStatus('connected');
// //              }
// //         };
// //     } catch (err) {
// //         console.error("Camera Error:", err);
// //         Alert.alert("Error", "Camera permission denied or not available");
// //     }
// //   };

// //   // 4. DOCTOR: START CALL
// //   const initiateCall = async () => {
// //     await startWebcam();
// //     setCallStatus('calling');

// //     // Create Offer
// //     const offer = await pc.current.createOffer();
// //     await pc.current.setLocalDescription(offer);

// //     try {
// //         // Send to Backend
// //         const response = await fetch(`${API_BASE_URL}/initialise-call`, {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AUTH_TOKEN}` },
// //             body: JSON.stringify({
// //                 appointment_id: appointmentId,
// //                 offer: { sdp: offer.sdp, type: offer.type }
// //             })
// //         });
        
// //         const data = await response.json();
// //         if(data.error) throw new Error(data.error);
        
// //         const newCallId = data.call_id;
// //         setCallId(newCallId);

// //         // Listen for Answer (Direct to Firestore)
// //         const callDoc = doc(db, 'call_history', newCallId);
// //         onSnapshot(callDoc, (snapshot) => {
// //             const d = snapshot.data();
// //             if (!pc.current.currentRemoteDescription && d?.answer) {
// //                 const answer = new RTCSessionDescription(d.answer);
// //                 pc.current.setRemoteDescription(answer);
// //             }
// //         });

// //         // Listen for Candidates
// //         const ansCandsRef = collection(callDoc, 'answerCandidates');
// //         onSnapshot(ansCandsRef, (snapshot) => {
// //             snapshot.docChanges().forEach((change) => {
// //                 if (change.type === 'added') {
// //                     const candidate = new RTCIceCandidate(change.doc.data());
// //                     pc.current.addIceCandidate(candidate);
// //                 }
// //             });
// //         });

// //         // ICE Candidate Handler
// //         pc.current.onicecandidate = async (event: any) => {
// //             if (event.candidate) {
// //                 await fetch(`${API_BASE_URL}/add-offer-candidates`, {
// //                     method: 'POST',
// //                     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AUTH_TOKEN}` },
// //                     body: JSON.stringify({
// //                         call_id: newCallId,
// //                         offer_candidate: {
// //                             candidate: event.candidate.candidate,
// //                             sdpMid: event.candidate.sdpMid,
// //                             sdpMLineIndex: event.candidate.sdpMLineIndex
// //                         }
// //                     })
// //                 });
// //             }
// //         };

// //     } catch (err: any) {
// //         Alert.alert("Error", err.message || "Could not start call");
// //         setCallStatus('idle');
// //     }
// //   };

// //   // 5. PATIENT: ACCEPT CALL
// //   const acceptIncomingCall = async () => {
// //     if (!callId) return;
// //     await startWebcam();

// //     const callDoc = doc(db, 'call_history', callId);
// //     const snapshot = await getDoc(callDoc);
// //     const data = snapshot.data();

// //     if(!data) return Alert.alert("Error", "Call data not found");

// //     // Set Remote Description (Doctor's Offer)
// //     await pc.current.setRemoteDescription(new RTCSessionDescription(data.offer));

// //     // Create Answer
// //     const answer = await pc.current.createAnswer();
// //     await pc.current.setLocalDescription(answer);

// //     // Send Answer to Backend
// //     await fetch(`${API_BASE_URL}/recieve-call`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AUTH_TOKEN}` },
// //         body: JSON.stringify({
// //             call_id: callId,
// //             answer: { sdp: answer.sdp, type: answer.type }
// //         })
// //     });
    
// //     // Listen for Candidates
// //     const offCandsRef = collection(callDoc, 'offerCandidates');
// //     onSnapshot(offCandsRef, (snapshot) => {
// //         snapshot.docChanges().forEach((change) => {
// //             if (change.type === 'added') {
// //                 const candidate = new RTCIceCandidate(change.doc.data());
// //                 pc.current.addIceCandidate(candidate);
// //             }
// //         });
// //     });

// //     // ICE Candidate Handler (Answer side)
// //     pc.current.onicecandidate = async (event: any) => {
// //         if (event.candidate) {
// //             await fetch(`${API_BASE_URL}/add-answer-candidates`, {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AUTH_TOKEN}` },
// //                 body: JSON.stringify({
// //                     call_id: callId,
// //                     answer_candidate: {
// //                         candidate: event.candidate.candidate,
// //                         sdpMid: event.candidate.sdpMid,
// //                         sdpMLineIndex: event.candidate.sdpMLineIndex
// //                     }
// //                 })
// //             });
// //         }
// //     };

// //     setCallStatus('connected');
// //   };

// //   return (
// //     <View style={styles.container}>
// //        <View style={styles.header}>
// //           <Text style={styles.headerText}>
// //               Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'} 
// //               {callStatus !== 'idle' && ` | Status: ${callStatus}`}
// //           </Text>
// //        </View>

// //       <View style={styles.videoWrapper}>
// //         {/* Remote Video (Full Size) */}
// //         {remoteStream ? (
// //             <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} objectFit="cover" />
// //         ) : (
// //             <View style={styles.placeholder}>
// //                 {callStatus === 'calling' && <ActivityIndicator size="large" color="#ffffff" />}
// //                 <Text style={{color: '#999', marginTop: 10}}>
// //                     {callStatus === 'idle' ? 'Ready to Call' : 'Waiting for Video...'}
// //                 </Text>
// //             </View>
// //         )}

// //         {/* Local Video (Picture in Picture) */}
// //         {localStream && (
// //              <RTCView streamURL={localStream.toURL()} style={styles.localVideo} objectFit="cover" zOrder={1} />
// //         )}
// //       </View>

// //       <View style={styles.controls}>
// //         {userRole === 'doctor' && callStatus === 'idle' && (
// //              <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
// //         )}

// //         {userRole === 'patient' && callStatus === 'incoming' && (
// //              <View style={{flexDirection: 'row', gap: 20}}>
// //                  <Button title="Reject" onPress={() => setCallStatus('idle')} color="#EF4444" />
// //                  <Button title="Accept Call" onPress={acceptIncomingCall} color="#22C55E" />
// //              </View>
// //         )}

// //         {callStatus === 'connected' && (
// //              <Button title="End Call" onPress={() => setCallStatus('idle')} color="#EF4444" />
// //         )}
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { height: 500, backgroundColor: '#111', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
// //   header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
// //   headerText: { color: 'white', fontWeight: 'bold' },
// //   videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
// //   localVideo: { 
// //       position: 'absolute', top: 15, right: 15, 
// //       width: 100, height: 140, 
// //       backgroundColor: '#333', borderRadius: 8, borderWidth: 1, borderColor: '#fff' 
// //   },
// //   remoteVideo: { width: '100%', height: '100%' },
// //   placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111'},
// //   controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' },
// // });


// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   mediaDevices,
//   MediaStream,
//   MediaStreamTrack
// } from 'react-native-webrtc';
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getFirestore, collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
// import messaging from '@react-native-firebase/messaging';
// import { useUser } from '../contexts/UserContext';

// // --- YOUR CONFIGURATION ---
// const API_BASE_URL = "https://landing.docapp.co.in/api";

// // ✅ YOUR REAL FIREBASE CONFIG
// const firebaseConfig = {
//   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
//   authDomain: "videocall-174e6.firebaseapp.com",
//   projectId: "videocall-174e6",
//   storageBucket: "videocall-174e6.firebasestorage.app",
//   messagingSenderId: "965109245557",
//   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c",
//   measurementId: "G-N1W0W2C8X0"
// };

// // Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app);

// const servers = {
//   iceServers: [
//     { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
//   ],
// };

// interface VideoCallProps {
//   route?: any;
//   embeddedRole?: 'doctor' | 'patient';
//   embeddedApptId?: string;
// }

// export default function VideoCall({ route, embeddedRole, embeddedApptId }: VideoCallProps) {
//   const userRole = route?.params?.userRole || embeddedRole || 'doctor'; 
//   const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';
//   const { user } = useUser();

//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//   const [callId, setCallId] = useState<string>('');
//   const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

//   const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

//   // 1. SETUP NOTIFICATION LISTENER
//   useEffect(() => {
//     if (userRole === 'patient') {
//         const unsubscribe = messaging().onMessage(async remoteMessage => {
//             console.log('FCM Message Received:', remoteMessage);
//             if (remoteMessage.data?.action === 'INCOMING_CALL') {
//                 setCallId(remoteMessage.data.call_id);
//                 setCallStatus('incoming'); 
//             }
//         });
//         return unsubscribe;
//     }
//   }, [userRole]);

//   useEffect(() => {
//     return () => {
//        if (localStream) {
//            localStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
//            localStream.release();
//        }
//        pc.current.close();
//     };
//   }, []);

//   // --- NEW: REGISTER DEVICE FUNCTION ---
//   const registerDevice = async () => {
//     try {
//       if(userRole === 'doctor') {
//         Alert.alert("Info", "Only Patients usually need to register for incoming calls in this demo.");
//         return;
//       }

//       await messaging().requestPermission();
//       const fcmToken = await messaging().getToken();
//       console.log("My FCM Token:", fcmToken);

//       // HARDCODED ID FOR TESTING (Patient = 101)
//       const TEST_USER_ID = "101"; 

//       const response = await fetch(`${API_BASE_URL}/save-fcm-token`, { 
//           method: 'POST',
//           headers: { 
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//               token: fcmToken,
//               user_id: TEST_USER_ID,
//               device_type: 'android'
//           })
//       });

//       if(response.ok) {
//           Alert.alert("Success", `Device Registered for User ID: ${TEST_USER_ID}`);
//       } else {
//           const text = await response.text();
//           Alert.alert("Backend Error", text);
//       }

//     } catch (error: any) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   const startWebcam = async () => {
//     try {
//         const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
//         setLocalStream(stream as MediaStream);
//         stream.getTracks().forEach((track: MediaStreamTrack) => {
//           pc.current.addTrack(track, stream);
//         });
//         pc.current.ontrack = (event: any) => {
//              if(event.streams && event.streams[0]) {
//                  setRemoteStream(event.streams[0]);
//                  setCallStatus('connected');
//              }
//         };
//     } catch (err) {
//         Alert.alert("Error", "Camera permission denied");
//     }
//   };

//   const initiateCall = async () => {
//     await startWebcam();
//     setCallStatus('calling');
//     const offer = await pc.current.createOffer();
//     await pc.current.setLocalDescription(offer);

//     try {
//         const response = await fetch(`${API_BASE_URL}/initialise-call`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 appointment_id: appointmentId,
//                 offer: { sdp: offer.sdp, type: offer.type }
//             })
//         });
        
//         const data = await response.json();
//         if(data.error) throw new Error(data.error);
        
//         const newCallId = data.call_id;
//         setCallId(newCallId);

//         const callDoc = doc(db, 'call_history', newCallId);
//         onSnapshot(callDoc, (snapshot) => {
//             const d = snapshot.data();
//             if (!pc.current.currentRemoteDescription && d?.answer) {
//                 const answer = new RTCSessionDescription(d.answer);
//                 pc.current.setRemoteDescription(answer);
//             }
//         });

//         const ansCandsRef = collection(callDoc, 'answerCandidates');
//         onSnapshot(ansCandsRef, (snapshot) => {
//             snapshot.docChanges().forEach((change) => {
//                 if (change.type === 'added') {
//                     const candidate = new RTCIceCandidate(change.doc.data());
//                     pc.current.addIceCandidate(candidate);
//                 }
//             });
//         });

//         pc.current.onicecandidate = async (event: any) => {
//             if (event.candidate) {
//                 await fetch(`${API_BASE_URL}/add-offer-candidates`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         call_id: newCallId,
//                         offer_candidate: {
//                             candidate: event.candidate.candidate,
//                             sdpMid: event.candidate.sdpMid,
//                             sdpMLineIndex: event.candidate.sdpMLineIndex
//                         }
//                     })
//                 });
//             }
//         };

//     } catch (err: any) {
//         Alert.alert("Error", err.message);
//         setCallStatus('idle');
//     }
//   };

//   const acceptIncomingCall = async () => {
//     if (!callId) return;
//     await startWebcam();

//     const callDoc = doc(db, 'call_history', callId);
//     const snapshot = await getDoc(callDoc);
//     const data = snapshot.data();

//     if(!data) return Alert.alert("Error", "Call data not found");

//     await pc.current.setRemoteDescription(new RTCSessionDescription(data.offer));
//     const answer = await pc.current.createAnswer();
//     await pc.current.setLocalDescription(answer);

//     await fetch(`${API_BASE_URL}/recieve-call`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             call_id: callId,
//             answer: { sdp: answer.sdp, type: answer.type }
//         })
//     });
    
//     const offCandsRef = collection(callDoc, 'offerCandidates');
//     onSnapshot(offCandsRef, (snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//             if (change.type === 'added') {
//                 const candidate = new RTCIceCandidate(change.doc.data());
//                 pc.current.addIceCandidate(candidate);
//             }
//         });
//     });

//     pc.current.onicecandidate = async (event: any) => {
//         if (event.candidate) {
//             await fetch(`${API_BASE_URL}/add-answer-candidates`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     call_id: callId,
//                     answer_candidate: {
//                         candidate: event.candidate.candidate,
//                         sdpMid: event.candidate.sdpMid,
//                         sdpMLineIndex: event.candidate.sdpMLineIndex
//                     }
//                 })
//             });
//         }
//     };

//     setCallStatus('connected');
//   };

//   return (
//     <View style={styles.container}>
//        <View style={styles.header}>
//           <Text style={styles.headerText}>
//               Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'} 
//               {callStatus !== 'idle' && ` | Status: ${callStatus}`}
//           </Text>
//        </View>

//       <View style={styles.videoWrapper}>
//         {remoteStream ? (
//             <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} objectFit="cover" />
//         ) : (
//             <View style={styles.placeholder}>
//                 {callStatus === 'calling' && <ActivityIndicator size="large" color="#ffffff" />}
//                 <Text style={{color: '#999', marginTop: 10}}>
//                     {callStatus === 'idle' ? 'Ready to Call' : 'Waiting for Video...'}
//                 </Text>
//             </View>
//         )}
//         {localStream && (
//              <RTCView streamURL={localStream.toURL()} style={styles.localVideo} objectFit="cover" zOrder={1} />
//         )}
//       </View>

//       <View style={styles.controls}>
//         {/* 👇 THIS IS THE NEW BUTTON YOU NEED */}
//         {userRole === 'patient' && (
//            <View style={{marginBottom: 10, width: '100%'}}>
//               <Button title="DEBUG: Register Device (Step 1)" onPress={registerDevice} color="#555" />
//            </View>
//         )}

//         {userRole === 'doctor' && callStatus === 'idle' && (
//              <Button title="Start Call (Step 2)" onPress={initiateCall} color="#4ADE80" />
//         )}

//         {userRole === 'patient' && callStatus === 'incoming' && (
//              <View style={{flexDirection: 'row', gap: 20}}>
//                  <Button title="Reject" onPress={() => setCallStatus('idle')} color="#EF4444" />
//                  <Button title="Accept Call" onPress={acceptIncomingCall} color="#22C55E" />
//              </View>
//         )}

//         {callStatus === 'connected' && (
//              <Button title="End Call" onPress={() => setCallStatus('idle')} color="#EF4444" />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { height: 500, backgroundColor: '#111', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
//   header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
//   headerText: { color: 'white', fontWeight: 'bold' },
//   videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
//   localVideo: { 
//       position: 'absolute', top: 15, right: 15, 
//       width: 100, height: 140, 
//       backgroundColor: '#333', borderRadius: 8, borderWidth: 1, borderColor: '#fff' 
//   },
//   remoteVideo: { width: '100%', height: '100%' },
//   placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111'},
//   controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' },
// });











import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
  MediaStream,
  MediaStreamTrack
} from 'react-native-webrtc';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
import messaging from '@react-native-firebase/messaging';
// import { useUser } from '../contexts/UserContext'; // Uncomment if you use this

// --- YOUR CONFIGURATION ---
const API_BASE_URL = "https://landing.docapp.co.in/api";

// ✅ YOUR REAL FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
  authDomain: "videocall-174e6.firebaseapp.com",
  projectId: "videocall-174e6",
  storageBucket: "videocall-174e6.firebasestorage.app",
  messagingSenderId: "965109245557",
  appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c",
  measurementId: "G-N1W0W2C8X0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const servers = {
  iceServers: [
    { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
  ],
};

interface VideoCallProps {
  route?: any;
  embeddedRole?: 'doctor' | 'patient';
  embeddedApptId?: string;
}

export default function VideoCall({ route, embeddedRole, embeddedApptId }: VideoCallProps) {
  const userRole = route?.params?.userRole || embeddedRole || 'doctor'; 
  const appointmentId = route?.params?.appointmentId || embeddedApptId || '42';
  // const { user } = useUser(); // Uncomment if needed

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callId, setCallId] = useState<string>('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');

  const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

  // 1. SETUP NOTIFICATION LISTENER
  useEffect(() => {
    if (userRole === 'patient') {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('FCM Message Received:', remoteMessage);
            if (remoteMessage.data?.action === 'INCOMING_CALL') {
                setCallId(remoteMessage.data.call_id);
                setCallStatus('incoming'); 
            }
        });
        return unsubscribe;
    }
  }, [userRole]);

  useEffect(() => {
    return () => {
       if (localStream) {
           localStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
           localStream.release();
       }
       pc.current.close();
    };
  }, []);

  // --- NEW: REGISTER DEVICE FUNCTION (FIXED ENDPOINT) ---
  const registerDevice = async () => {
    try {
      if(userRole === 'doctor') {
        Alert.alert("Info", "Only Patients usually need to register for incoming calls in this demo.");
        return;
      }

      await messaging().requestPermission();
      const fcmToken = await messaging().getToken();
      console.log("My FCM Token:", fcmToken);

      // HARDCODED ID FOR TESTING (Patient = 101)
      const TEST_USER_ID = "101"; 

      // ✅ FIXED: Updated to match your backend docs (/notifications/save-token)
      const response = await fetch(`${API_BASE_URL}/notifications/save-token`, { 
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json'
              // 'Authorization': `Bearer ${user.token}` // Add this back if you have the token
          },
          body: JSON.stringify({
              token: fcmToken,
              user_id: TEST_USER_ID, // Ensure backend handles this field (or uses auth token)
              platform: 'android'    // Changed 'device_type' to 'platform' based on your docs
          })
      });

      if(response.ok) {
          Alert.alert("Success", `Device Registered for User ID: ${TEST_USER_ID}`);
      } else {
          const text = await response.text();
          // Alert.alert("Backend Error", text); 
          // Sometimes HTML error pages are too long for alerts, log it instead:
          console.log("Backend Error:", text);
          Alert.alert("Error", "Check console for details (likely 404 or 500)");
      }

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const startWebcam = async () => {
    try {
        const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
        setLocalStream(stream as MediaStream);
        stream.getTracks().forEach((track: MediaStreamTrack) => {
          pc.current.addTrack(track, stream);
        });
        pc.current.ontrack = (event: any) => {
             if(event.streams && event.streams[0]) {
                 setRemoteStream(event.streams[0]);
                 setCallStatus('connected');
             }
        };
    } catch (err) {
        Alert.alert("Error", "Camera permission denied");
    }
  };

  const initiateCall = async () => {
    await startWebcam();
    setCallStatus('calling');
    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);

    try {
        // ✅ FIXED: Added /call prefix
        const response = await fetch(`${API_BASE_URL}/call/initialise-call`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                appointment_id: appointmentId,
                offer: { sdp: offer.sdp, type: offer.type }
            })
        });
        
        const data = await response.json();
        if(data.error) throw new Error(data.error);
        
        const newCallId = data.call_id;
        setCallId(newCallId);

        const callDoc = doc(db, 'call_history', newCallId);
        onSnapshot(callDoc, (snapshot) => {
            const d = snapshot.data();
            if (!pc.current.currentRemoteDescription && d?.answer) {
                const answer = new RTCSessionDescription(d.answer);
                pc.current.setRemoteDescription(answer);
            }
        });

        const ansCandsRef = collection(callDoc, 'answerCandidates');
        onSnapshot(ansCandsRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.current.addIceCandidate(candidate);
                }
            });
        });

        pc.current.onicecandidate = async (event: any) => {
            if (event.candidate) {
                // ✅ FIXED: Added /call prefix
                await fetch(`${API_BASE_URL}/call/add-offer-candidates`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        call_id: newCallId,
                        offer_candidate: {
                            candidate: event.candidate.candidate,
                            sdpMid: event.candidate.sdpMid,
                            sdpMLineIndex: event.candidate.sdpMLineIndex
                        }
                    })
                });
            }
        };

    } catch (err: any) {
        Alert.alert("Error", err.message);
        setCallStatus('idle');
    }
  };

  const acceptIncomingCall = async () => {
    if (!callId) return;
    await startWebcam();

    const callDoc = doc(db, 'call_history', callId);
    const snapshot = await getDoc(callDoc);
    const data = snapshot.data();

    if(!data) return Alert.alert("Error", "Call data not found");

    await pc.current.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answer);

    // ✅ FIXED: Added /call prefix
    await fetch(`${API_BASE_URL}/call/recieve-call`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            call_id: callId,
            answer: { sdp: answer.sdp, type: answer.type }
        })
    });
    
    const offCandsRef = collection(callDoc, 'offerCandidates');
    onSnapshot(offCandsRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const candidate = new RTCIceCandidate(change.doc.data());
                pc.current.addIceCandidate(candidate);
            }
        });
    });

    pc.current.onicecandidate = async (event: any) => {
        if (event.candidate) {
            // ✅ FIXED: Added /call prefix
            await fetch(`${API_BASE_URL}/call/add-answer-candidates`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    call_id: callId,
                    answer_candidate: {
                        candidate: event.candidate.candidate,
                        sdpMid: event.candidate.sdpMid,
                        sdpMLineIndex: event.candidate.sdpMLineIndex
                    }
                })
            });
        }
    };

    setCallStatus('connected');
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <Text style={styles.headerText}>
              Role: {userRole === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 Patient'} 
              {callStatus !== 'idle' && ` | Status: ${callStatus}`}
          </Text>
       </View>

      <View style={styles.videoWrapper}>
        {remoteStream ? (
            <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} objectFit="cover" />
        ) : (
            <View style={styles.placeholder}>
                {callStatus === 'calling' && <ActivityIndicator size="large" color="#ffffff" />}
                <Text style={{color: '#999', marginTop: 10}}>
                    {callStatus === 'idle' ? 'Ready to Call' : 'Waiting for Video...'}
                </Text>
            </View>
        )}
        {localStream && (
             <RTCView streamURL={localStream.toURL()} style={styles.localVideo} objectFit="cover" zOrder={1} />
        )}
      </View>

      <View style={styles.controls}>
        {/* BUTTON: Register Device */}
        {userRole === 'patient' && (
           <View style={{marginBottom: 10, width: '100%'}}>
              <Button title="DEBUG: Register Device" onPress={registerDevice} color="#555" />
           </View>
        )}

        {userRole === 'doctor' && callStatus === 'idle' && (
             <Button title="Start Call" onPress={initiateCall} color="#4ADE80" />
        )}

        {userRole === 'patient' && callStatus === 'incoming' && (
             <View style={{flexDirection: 'row', gap: 20}}>
                 <Button title="Reject" onPress={() => setCallStatus('idle')} color="#EF4444" />
                 <Button title="Accept Call" onPress={acceptIncomingCall} color="#22C55E" />
             </View>
        )}

        {callStatus === 'connected' && (
             <Button title="End Call" onPress={() => setCallStatus('idle')} color="#EF4444" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 500, backgroundColor: '#111', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
  header: { padding: 12, backgroundColor: '#222', alignItems: 'center' },
  headerText: { color: 'white', fontWeight: 'bold' },
  videoWrapper: { flex: 1, position: 'relative', backgroundColor: '#000' },
  localVideo: { 
      position: 'absolute', top: 15, right: 15, 
      width: 100, height: 140, 
      backgroundColor: '#333', borderRadius: 8, borderWidth: 1, borderColor: '#fff' 
  },
  remoteVideo: { width: '100%', height: '100%' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111'},
  controls: { padding: 20, alignItems: 'center', backgroundColor: '#222' },
});
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   TextInput,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
// } from 'react-native';

// // 1. WebRTC Imports
// import {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   mediaDevices,
//   MediaStream,
//   MediaStreamTrack,
// } from 'react-native-webrtc';

// // 2. Firebase Imports
// import { initializeApp } from 'firebase/app';
// import {
//   getFirestore,
//   collection,
//   doc,
//   addDoc,
//   setDoc,
//   onSnapshot,
//   updateDoc,
//   getDoc,
//   DocumentSnapshot,
// } from 'firebase/firestore';

// // --- CONFIGURATION ---
// const firebaseConfig = {
//   apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
//   authDomain: "videocall-174e6.firebaseapp.com",
//   projectId: "videocall-174e6",
//   storageBucket: "videocall-174e6.firebasestorage.app",
//   messagingSenderId: "965109245557",
//   appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c",
//   measurementId: "G-N1W0W2C8X0"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const servers = {
//   iceServers: [
//     {
//       urls: [
//         'stun:stun1.l.google.com:19302',
//         'stun:stun2.l.google.com:19302',
//       ],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// // --- TYPES ---
// interface OfferAnswer {
//   sdp: string | undefined;
//   type: string | undefined;
// }

// export default function VideoCall(): JSX.Element {
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
//   const [callId, setCallId] = useState<string>('');
//   const [isCalling, setIsCalling] = useState<boolean>(false);

//   // Use useRef to keep the connection object persistent
//   const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

//   // Clean up on unmount
//   useEffect(() => {
//     return () => {
//        if (localStream) {
//            localStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
//            localStream.release();
//        }
//        pc.current.close();
//     };
//   }, []);

//   // --- HELPER: Request Permissions ---
//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       ]);
//       if (
//         granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
//         granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED
//       ) {
//         console.error('Camera permission denied');
//       }
//     }
//   };

//   // --- STEP A: Start Webcam ---
//   const startWebcam = async () => {
//     await requestCameraPermission();

//     try {
//       const stream = await mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });

//       setLocalStream(stream as MediaStream);

//       // Add Track to Peer Connection
//       stream.getTracks().forEach((track: MediaStreamTrack) => {
//         pc.current.addTrack(track, stream);
//       });

//       // Listen for Remote Track
//       pc.current.ontrack = (event: any) => {
//          // Note: react-native-webrtc events might differ slightly in types
//          // usually event.streams[0] is the remote stream
//          if(event.streams && event.streams[0]) {
//              setRemoteStream(event.streams[0]);
//          }
//       };

//     } catch (err) {
//       console.error('Error starting webcam:', err);
//     }
//   };

//   // --- STEP B: Create Call (Caller) ---
//   // const createCall = async () => {
//   //   setIsCalling(true);
//   //   const callDoc = doc(collection(db, 'calls'));
//   //   const offerCandidates = collection(callDoc, 'offerCandidates');
//   //   const answerCandidates = collection(callDoc, 'answerCandidates');

//   //   setCallId(callDoc.id);

//   //   pc.current.onicecandidate = (event: any) => {
//   //     event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
//   //   };

//   //   const offer = await pc.current.createOffer();
//   //   await pc.current.setLocalDescription(offer);

//   //   const offerObj: OfferAnswer = {
//   //     sdp: offer.sdp,
//   //     type: offer.type,
//   //   };

//   //   await setDoc(callDoc, { offer: offerObj });

//   //   onSnapshot(callDoc, (snapshot: DocumentSnapshot) => {
//   //     const data = snapshot.data();
//   //     if (!pc.current.currentRemoteDescription && data?.answer) {
//   //       const answer = new RTCSessionDescription(data.answer);
//   //       pc.current.setRemoteDescription(answer);
//   //     }
//   //   });

//   //   onSnapshot(answerCandidates, (snapshot) => {
//   //     snapshot.docChanges().forEach((change) => {
//   //       if (change.type === 'added') {
//   //         const candidate = new RTCIceCandidate(change.doc.data());
//   //         pc.current.addIceCandidate(candidate);
//   //       }
//   //     });
//   //   });
//   // };


//   const createCall = async () => {

//     const callDoc = doc(collection(db, 'calls'));
//     const offerCandidates = collection(callDoc, 'offerCandidates');
//     const answerCandidates = collection(callDoc, 'answerCandidates');

//     setCallId(callDoc.id);   // This works, but UI hides it because isCalling becomes true

//     pc.current.onicecandidate = (event: any) => {
//       event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
//     };

//     const offer = await pc.current.createOffer();
//     await pc.current.setLocalDescription(offer);

//     await setDoc(callDoc, { offer: offer });

//     onSnapshot(callDoc, (snapshot) => {
//       const data = snapshot.data();
//       if (data?.answer && !pc.current.currentRemoteDescription) {
//         pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
//       }
//     });

//     onSnapshot(answerCandidates, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === 'added') {
//           pc.current.addIceCandidate(new RTCIceCandidate(change.doc.data()));
//         }
//       });
//     });
// };





//   // --- STEP C: Answer Call (Callee) ---
//   const answerCall = async () => {
//     setIsCalling(true);
//     const callDoc = doc(collection(db, 'calls'), callId);
//     const answerCandidates = collection(callDoc, 'answerCandidates');
//     const offerCandidates = collection(callDoc, 'offerCandidates');

//     pc.current.onicecandidate = (event: any) => {
//       event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
//     };

//     const callSnapshot = await getDoc(callDoc);
//     const callData = callSnapshot.data();

//     if (!callData) {
//         alert("Call ID does not exist!");
//         return;
//     }

//     const offerDescription = callData.offer;
//     await pc.current.setRemoteDescription(
//       new RTCSessionDescription(offerDescription)
//     );

//     const answer = await pc.current.createAnswer();
//     await pc.current.setLocalDescription(answer);

//     const answerObj: OfferAnswer = {
//       sdp: answer.sdp,
//       type: answer.type,
//     };

//     await updateDoc(callDoc, { answer: answerObj });

//     onSnapshot(offerCandidates, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === 'added') {
//           const candidate = new RTCIceCandidate(change.doc.data());
//           pc.current.addIceCandidate(candidate);
//         }
//       });
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.videoContainer}>
//         {localStream && (
//           <RTCView
//             streamURL={localStream.toURL()}
//             style={styles.localVideo}
//             objectFit="cover"
//             mirror={true}
//           />
//         )}
//         {remoteStream && (
//           <RTCView
//             streamURL={remoteStream.toURL()}
//             style={styles.remoteVideo}
//             objectFit="cover"
//             mirror={false}
//           />
//         )}
//       </View>

//       <View style={styles.controls}>
//         {!localStream ? (
//           <Button title="1. Start Webcam" onPress={startWebcam} />
//         ) : (
//           <>
//             {!isCalling && (
//                 <View>
//                     <Text style={styles.text}>Your Call ID: {callId}</Text>
//                     <Button title="2. Create Call" onPress={createCall} />
                    
//                     <View style={styles.spacer} />
                    
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter Call ID to Join"
//                         placeholderTextColor="#999"
//                         onChangeText={setCallId}
//                         value={callId}
//                     />
//                     <Button title="3. Join Call" onPress={answerCall} />
//                 </View>
//             )}
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   videoContainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   localVideo: {
//     width: 100,
//     height: 150,
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     zIndex: 10,
//     backgroundColor: '#333',
//     borderRadius: 8,
//   },
//   remoteVideo: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#000',
//   },
//   controls: {
//     padding: 20,
//     backgroundColor: '#222',
//   },
//   text: {
//     color: 'white',
//     marginBottom: 10,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   input: {
//     backgroundColor: '#333',
//     color: 'white',
//     padding: 10,
//     marginVertical: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#555',
//   },
//   spacer: {
//     height: 20
//   }
// });


import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Clipboard, // Note: Use @react-native-clipboard/clipboard in production
} from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
} from 'react-native-webrtc';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  onSnapshot,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

// --- CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyCE6uu63O91LA5eCfKKIz6n5_dHWm4nwpw",
  authDomain: "videocall-174e6.firebaseapp.com",
  projectId: "videocall-174e6",
  storageBucket: "videocall-174e6.firebasestorage.app",
  messagingSenderId: "965109245557",
  appId: "1:965109245557:web:eb5e5c760d3b41dbda7a3c",
  measurementId: "G-N1W0W2C8X0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const servers = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function VideoCall(): JSX.Element {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callId, setCallId] = useState<string>('');
  
  // UI States
  const [mode, setMode] = useState<'idle' | 'creating' | 'joining' | 'connected'>('idle');

  const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

  useEffect(() => {
    return () => {
       if (localStream) {
           localStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
           localStream.release();
       }
       pc.current.close();
    };
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  const startWebcam = async () => {
    await requestCameraPermission();
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(stream as MediaStream);
    stream.getTracks().forEach((track: MediaStreamTrack) => {
      pc.current.addTrack(track, stream);
    });
    pc.current.ontrack = (event: any) => {
         if(event.streams && event.streams[0]) {
             setRemoteStream(event.streams[0]);
             setMode('connected'); // Switch to connected view when stream arrives
         }
    };
  };

  const createCall = async () => {
    setMode('creating'); // Set UI to 'creating' mode
    const callDoc = doc(collection(db, 'calls'));
    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');

    setCallId(callDoc.id);

    pc.current.onicecandidate = (event: any) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);

    await setDoc(callDoc, { offer: offer });

    // Listen for Answer
    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.current.currentRemoteDescription && data?.answer) {
        const answer = new RTCSessionDescription(data.answer);
        pc.current.setRemoteDescription(answer);
      }
    });

    // Listen for Remote Ice Candidates
    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const joinCall = async () => {
    setMode('joining');
    const callDoc = doc(collection(db, 'calls'), callId);
    const answerCandidates = collection(callDoc, 'answerCandidates');
    const offerCandidates = collection(callDoc, 'offerCandidates');

    pc.current.onicecandidate = (event: any) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callSnapshot = await getDoc(callDoc);
    const callData = callSnapshot.data();

    if (callData) {
        const offerDescription = callData.offer;
        await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answer = await pc.current.createAnswer();
        await pc.current.setLocalDescription(answer);

        await updateDoc(callDoc, { answer: { sdp: answer.sdp, type: answer.type } });

        onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.current.addIceCandidate(candidate);
            }
        });
        });
    } else {
        alert("Call ID not found");
        setMode('idle');
    }
  };

  // --- RENDER ---
  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. VIDEO VIEW */}
      <View style={styles.videoContainer}>
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={mode === 'connected' ? styles.localVideoSmall : styles.localVideoFull}
            objectFit="cover"
            mirror={true}
          />
        )}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
            objectFit="cover"
            mirror={false}
          />
        )}
      </View>

      {/* 2. CONTROLS VIEW */}
      <View style={styles.controls}>
        
        {/* Step 1: Start Webcam */}
        {!localStream && (
          <Button title="Start Webcam" onPress={startWebcam} />
        )}

        {/* Step 2: Select Mode */}
        {localStream && mode === 'idle' && (
          <>
             <Text style={styles.title}>Welcome</Text>
             <View style={styles.spacer} />
             <Button title="Create a new Call" onPress={createCall} />
             <View style={styles.spacer} />
             <Text style={styles.text}>- OR -</Text>
             <View style={styles.spacer} />
             <TextInput
                style={styles.input}
                placeholder="Enter Call ID"
                placeholderTextColor="#999"
                onChangeText={setCallId}
                value={callId}
             />
             <Button title="Join Call" onPress={joinCall} />
          </>
        )}

        {/* Step 3: Waiting for connection (Caller) */}
        {mode === 'creating' && (
            <View style={styles.idContainer}>
                <Text style={styles.text}>Waiting for other user...</Text>
                <Text style={styles.callIdTitle}>Share this Call ID:</Text>
                <Text selectable style={styles.callIdText}>{callId}</Text>
            </View>
        )}

        {/* Step 4: Joining (Callee) */}
        {mode === 'joining' && (
             <Text style={styles.text}>Connecting to call...</Text>
        )}
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoContainer: { flex: 1, position: 'relative' },
  // Local video becomes small when connected, full screen when alone
  localVideoFull: { width: '100%', height: '100%', backgroundColor: '#222' },
  localVideoSmall: { 
    width: 100, height: 150, 
    position: 'absolute', top: 20, right: 20, 
    zIndex: 10, borderRadius: 8, borderWidth: 1, borderColor: '#fff' 
  },
  remoteVideo: { width: '100%', height: '100%', backgroundColor: '#000' },
  controls: { 
    position: 'absolute', bottom: 0, width: '100%', 
    padding: 20, backgroundColor: 'rgba(0,0,0,0.8)', 
    borderTopLeftRadius: 20, borderTopRightRadius: 20 
  },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  text: { color: '#ccc', textAlign: 'center', marginVertical: 10 },
  input: { backgroundColor: '#333', color: 'white', padding: 12, borderRadius: 8, marginBottom: 15 },
  spacer: { height: 15 },
  idContainer: { alignItems: 'center', padding: 10 },
  callIdTitle: { color: '#aaa', marginTop: 10 },
  callIdText: { color: '#4ade80', fontSize: 24, fontWeight: 'bold', marginVertical: 10, letterSpacing: 1 },
});
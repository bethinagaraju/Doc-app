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
} from 'react-native';

// 1. WebRTC Imports
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
} from 'react-native-webrtc';

// 2. Firebase Imports
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
  DocumentSnapshot,
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

// --- TYPES ---
interface OfferAnswer {
  sdp: string | undefined;
  type: string | undefined;
}

export default function VideoCall(): JSX.Element {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callId, setCallId] = useState<string>('');
  const [isCalling, setIsCalling] = useState<boolean>(false);

  // Use useRef to keep the connection object persistent
  const pc = useRef<RTCPeerConnection>(new RTCPeerConnection(servers));

  // Clean up on unmount
  useEffect(() => {
    return () => {
       if (localStream) {
           localStream.getTracks().forEach((t: MediaStreamTrack) => t.stop());
           localStream.release();
       }
       pc.current.close();
    };
  }, []);

  // --- HELPER: Request Permissions ---
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.error('Camera permission denied');
      }
    }
  };

  // --- STEP A: Start Webcam ---
  const startWebcam = async () => {
    await requestCameraPermission();

    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setLocalStream(stream as MediaStream);

      // Add Track to Peer Connection
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        pc.current.addTrack(track, stream);
      });

      // Listen for Remote Track
      pc.current.ontrack = (event: any) => {
         // Note: react-native-webrtc events might differ slightly in types
         // usually event.streams[0] is the remote stream
         if(event.streams && event.streams[0]) {
             setRemoteStream(event.streams[0]);
         }
      };

    } catch (err) {
      console.error('Error starting webcam:', err);
    }
  };

  // --- STEP B: Create Call (Caller) ---
  const createCall = async () => {
    setIsCalling(true);
    const callDoc = doc(collection(db, 'calls'));
    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');

    setCallId(callDoc.id);

    pc.current.onicecandidate = (event: any) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);

    const offerObj: OfferAnswer = {
      sdp: offer.sdp,
      type: offer.type,
    };

    await setDoc(callDoc, { offer: offerObj });

    onSnapshot(callDoc, (snapshot: DocumentSnapshot) => {
      const data = snapshot.data();
      if (!pc.current.currentRemoteDescription && data?.answer) {
        const answer = new RTCSessionDescription(data.answer);
        pc.current.setRemoteDescription(answer);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  // --- STEP C: Answer Call (Callee) ---
  const answerCall = async () => {
    setIsCalling(true);
    const callDoc = doc(collection(db, 'calls'), callId);
    const answerCandidates = collection(callDoc, 'answerCandidates');
    const offerCandidates = collection(callDoc, 'offerCandidates');

    pc.current.onicecandidate = (event: any) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callSnapshot = await getDoc(callDoc);
    const callData = callSnapshot.data();

    if (!callData) {
        alert("Call ID does not exist!");
        return;
    }

    const offerDescription = callData.offer;
    await pc.current.setRemoteDescription(
      new RTCSessionDescription(offerDescription)
    );

    const answer = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answer);

    const answerObj: OfferAnswer = {
      sdp: answer.sdp,
      type: answer.type,
    };

    await updateDoc(callDoc, { answer: answerObj });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.localVideo}
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

      <View style={styles.controls}>
        {!localStream ? (
          <Button title="1. Start Webcam" onPress={startWebcam} />
        ) : (
          <>
            {!isCalling && (
                <View>
                    <Text style={styles.text}>Your Call ID: {callId}</Text>
                    <Button title="2. Create Call" onPress={createCall} />
                    
                    <View style={styles.spacer} />
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Call ID to Join"
                        placeholderTextColor="#999"
                        onChangeText={setCallId}
                        value={callId}
                    />
                    <Button title="3. Join Call" onPress={answerCall} />
                </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  localVideo: {
    width: 100,
    height: 150,
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  controls: {
    padding: 20,
    backgroundColor: '#222',
  },
  text: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555',
  },
  spacer: {
    height: 20
  }
});
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Phone, PhoneOff } from 'lucide-react-native';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { useUser } from '../screens/contexts/UserContext';

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

interface IncomingCallData {
  call_id: string;
  appointment_id?: string;
  doctor_id?: string;
}

const IncomingCallOverlay = () => {
  const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(null);
  const navigation = useNavigation<any>();
  const { user } = useUser();

  useEffect(() => {
    // Listen for FCM messages while app is in foreground
    const unsubscribe = messaging().onMessage(async msg => {
      console.log('[GLOBAL FCM] Action:', msg.data?.action);
      
      // Doctors should not see the incoming call overlay for their own outgoing calls
      if (user?.role === 'doctor') {
        return;
      }

      if (msg.data?.action === 'INCOMING_CALL') {
        setIncomingCall({
          call_id: msg.data.call_id as string,
          appointment_id: msg.data.appointment_id as string,
          doctor_id: msg.data.doctor_id as string,
        });
      }
    });

    return unsubscribe;
  }, [user?.role]);

  if (!incomingCall) return null;

  const handleAccept = async () => {
    try {
      const callDoc = doc(db, 'call_history', incomingCall.call_id);
      await updateDoc(callDoc, { callStatus: 'accepted' });
    } catch (e) {
      console.log('Error updating accept status', e);
    }
    // Navigate to PatientVideoCall with required params
    navigation.navigate('PatientVideoCall', {
      callId: incomingCall.call_id,
      appointmentId: incomingCall.appointment_id,
    });
    // Dismiss overlay
    setIncomingCall(null);
  };

  const handleDecline = async () => {
    try {
      const callDoc = doc(db, 'call_history', incomingCall.call_id);
      await updateDoc(callDoc, { callStatus: 'declined' });
    } catch (e) {
      console.log('Error updating decline status', e);
    }
    setIncomingCall(null);
  };

  return (
    <Modal transparent animationType="fade">
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.95)', 'rgba(20,20,30,0.95)']}
          style={StyleSheet.absoluteFill}
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>Incoming Consultation</Text>
          <Text style={styles.subtitle}>Doctor is calling...</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.declineButton]} onPress={handleDecline}>
              <PhoneOff color="#FFF" size={32} />
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.acceptButton]} onPress={handleAccept}>
              <Phone color="#FFF" size={32} />
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
    width: '100%',
    padding: 24,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 18,
    marginBottom: 64,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 40,
  },
  actionButton: {
    alignItems: 'center',
    gap: 12,
  },
  declineButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#BA1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#BA1A1A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  acceptButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#34A853',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34A853',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    position: 'absolute',
    bottom: -30,
  },
});

export default IncomingCallOverlay;

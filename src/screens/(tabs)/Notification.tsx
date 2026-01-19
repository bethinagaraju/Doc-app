import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Calendar, FileText, DollarSign, Bell
} from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';
import VideoCall from './VideoCall';

type Notification = {
  id: string;
  type: 'appointment' | 'report' | 'payment' | string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Smith is confirmed for May 25, 2025.',
      time: '2 hrs ago',
      read: false,
    },
    {
      id: '2',
      type: 'report',
      title: 'Medical Report Ready',
      message: 'Your latest test results are now available.',
      time: '1 day ago',
      read: true,
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      message: 'We received your payment of ₹1200.',
      time: '3 days ago',
      read: false,
    },
  ]);

  const getIcon = (type: Notification['type'], read: boolean) => {
    const color = read ? '#666' : '#007bff';
    switch (type) {
      case 'appointment':
        return <Calendar size={24} color={color} />;
      case 'report':
        return <FileText size={24} color={color} />;
      case 'payment':
        return <DollarSign size={24} color={color} />;
      default:
        return <Bell size={24} color={color} />;
    }
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );
    setNotifications(updated);
  };

  const clearNotifications = () => {
    Alert.alert('Clear All', 'Are you sure you want to clear all notifications?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => setNotifications([]),
      },
    ]);
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        tw`bg-green-50 p-4 rounded-xl flex-row my-1.5 items-center mx-4 ${
          !item.read ? 'border-l-4 border-green-600' : ''
        }`,
        { elevation: 1 },
      ]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.8}
      accessibilityLabel={item.title}
      accessibilityRole="button"
    >
      <View style={tw`mr-3 w-7 items-center`}>{getIcon(item.type, item.read)}</View>
      <View style={tw`flex-1`}>
        <Text style={tw`font-semibold text-base text-green-800`}>{item.title}</Text>
        <Text style={tw`text-sm text-green-700 my-1`}>{item.message}</Text>
        <Text style={tw`text-xs text-green-400`}>{item.time}</Text>
      </View>
      {!item.read && <View style={tw`w-2.5 h-2.5 bg-green-600 rounded-full ml-2.5`} />}
    </TouchableOpacity>
  );

  const HeaderRight = () => (
    notifications.length > 0 ? (
      <TouchableOpacity onPress={clearNotifications}>
        <Text style={tw`text-sm text-white`}>Clear All</Text>
      </TouchableOpacity>
    ) : null
  );

  return (
    <PageLayout
      title="Notifications"
        headerBackgroundColor="#16a34a"
      scrollable={false}
      headerRight={<HeaderRight />}
    >
      {notifications.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Bell size={50} color="#aaa" />
          <Text style={tw`text-base text-green-400 mt-2.5`}>No Notifications</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`py-4`}
        />
      )}

      <VideoCall
                      embeddedRole="doctor" 
                      embeddedApptId="72" 
                   />

      
                   <View style={tw`mt-4`}/><View style={tw`mt-4`}/><View style={tw`mt-4`}/>
                   <View style={tw`mt-4`}/><View style={tw`mt-4`}/><View style={tw`mt-4`}/>
    </PageLayout>
  );
};

export default NotificationsScreen;
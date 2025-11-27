import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DoctorStackParamList } from '../../types/navigation';
import DoctorHeader from '../../components/DoctorHeader';

const DoctorSettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<DoctorStackParamList>>();
  const appVersion = '11.98 (457)';

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    {
      title: 'Sync Now',
      subtitle: 'Last synced - 26 minutes ago',
      icon: 'sync',
      action: () => console.log('Syncing...'),
      rightIcon: 'sync',
    },
    {
      title: 'Support',
      subtitle: `App version ${appVersion}`,
      icon: 'email-outline',
      action: () => console.log('Opening support...'),
      rightIcon: 'email-outline',
    },
    {
      title: 'Caller ID',
      icon: 'phone-outline',
      action: () => {},
      isSwitch: true,
    },
    {
      title: 'Ray',
      icon: 'ray-start',
      action: () => navigation.navigate('Ray'),
      rightIcon: 'chevron-right',
    },
    {
      title: 'Cashless Settings',
      icon: 'credit-card-outline',
      action: () => navigation.navigate('CashlessSettings'),
      rightIcon: 'chevron-right',
    },
    {
      title: 'Account',
      icon: 'account-outline',
      action: () => navigation.navigate('Account'),
      rightIcon: 'chevron-right',
    },
    {
      title: 'Notifications',
      icon: 'bell-outline',
      action: () => navigation.navigate('DoctorNotifications'),
      rightIcon: 'chevron-right',
    },
    {
      title: 'Invite friends',
      icon: 'account-plus-outline',
      action: () => console.log('Inviting friends...'),
      rightIcon: 'chevron-right',
    },
    {
      title: 'Rate us on Playstore',
      icon: 'star-outline',
      action: () => console.log('Opening Play Store...'),
      rightIcon: 'chevron-right',
    },
    {
      title: 'Privacy Policy',
      icon: 'shield-outline',
      action: () => navigation.navigate('PrivacyPolicy'),
      rightIcon: 'chevron-right',
    },

    
    {
      title: 'Open-source licences',
      icon: 'file-document-outline',
      action: () => navigation.navigate('OpenSourceLicenses'),
      rightIcon: 'chevron-right',
    },


    {
      title: 'Logout',
      icon: 'logout',
      action: handleLogout,
      textColor: '#FF4444',
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <DoctorHeader title="Settings" showNotifications />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem,
              ]}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={24} color="#202b6d" />
                <View style={styles.menuItemTextContainer}>
                  <Text style={[
                    styles.menuItemTitle,
                    item.textColor && { color: item.textColor }
                  ]}>
                    {item.title}
                  </Text>
                  {item.subtitle && (
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
              </View>
              {item.isSwitch ? (
                <Switch
                  value={false}
                  onValueChange={() => {}}
                  trackColor={{ false: '#767577', true: '#1d9be3' }}
                  thumbColor="#f4f3f4"
                />
              ) : item.rightIcon && (
                <Icon name={item.rightIcon} size={24} color="#666" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Alert Message */}
        <Text style={styles.alertText}>
          We use full screen alerts and permission to alert you if a patient is waiting for your response
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#202b6d',
    padding: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemTextContainer: {
    marginLeft: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#666',
    padding: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default DoctorSettingsScreen;

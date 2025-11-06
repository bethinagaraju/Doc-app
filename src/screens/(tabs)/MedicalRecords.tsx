import tw from 'twrnc';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
} from 'react-native';
import {
  Search,
  SlidersHorizontal,
  MoreVertical,
  Bell,
  Folder,
  ArrowLeft,
  Plus,
  FileText,
  Calendar,
  Download,
  Share2,
  Clock,
} from 'lucide-react-native';
import PageLayout from '../../components/PageLayout';

interface Record {
  title: string;
  files: number;
  size: string;
  color: string;
  category: string;
  date: string;
  avatars: string[];
  status?: string;
}

const categories = [
  { id: 'all', label: 'All', icon: Folder },
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'rx', label: 'Rx', icon: FileText },
];

const records: Record[] = [
  {
    title: 'X-Ray Reports',
    files: 15,
    size: '20.3 Mb',
    color: '#B39DDB',
    category: 'reports',
    date: 'Jun 15, 2025',
    avatars: ['👨‍⚕️', '👩‍⚕️', '🧑‍⚕️'],
    status: 'New',
  },
  {
    title: 'Lab Reports',
    files: 5,
    size: '17.5 Mb',
    color: '#F48FB1',
    category: 'reports',
    date: 'Jun 14, 2025',
    avatars: ['👩‍⚕️', '👨‍⚕️'],
  },
  {
    title: 'Prescriptions',
    files: 27,
    size: '32.4 Mb',
    color: '#90CAF9',
    category: 'prescriptions',
    date: 'Jun 12, 2025',
    avatars: ['👨‍⚕️', '🧑‍⚕️'],
    status: 'Updated',
  },
  {
    title: 'Blood Tests',
    files: 25,
    size: '25.6 Mb',
    color: '#F06292',
    category: 'reports',
    date: 'Jun 10, 2025',
    avatars: ['👨‍⚕️', '👩‍⚕️'],
  },
  {
    title: 'Medical History',
    files: 16,
    size: '21.1 Mb',
    color: '#4DB6AC',
    category: 'reports',
    date: 'Jun 08, 2025',
    avatars: ['👩‍⚕️', '👨‍⚕️'],
  },
  {
    title: 'Doctor Notes',
    files: 10,
    size: '12.7 Mb',
    color: '#FFB74D',
    category: 'prescriptions',
    date: 'Jun 05, 2025',
    avatars: ['👨‍⚕️'],
  },
];

const MedicalRecordsScreen = () => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  const filteredRecords = records.filter(record => {
    const matchesCategory = activeCategory === 'all' || record.category === activeCategory;
    const matchesSearch = record.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderRecordCard = (item: Record, index: number) => (
    <TouchableOpacity
      key={index}
      style={tw`bg-green-50 rounded-2xl mb-4 shadow-md border border-green-100 overflow-hidden`}
      onPress={() => console.log('Handle record press')}
      activeOpacity={0.7}
    >
      <View style={tw`p-4`}>
        <View style={tw`flex-row items-start justify-between`}>
          <View style={tw`flex-row items-center flex-1`}>
            <View
              style={[
                tw`w-12 h-12 rounded-2xl justify-center items-center`,
                { backgroundColor: item.color + '15' },
              ]}
            >
              <FileText size={24} color={item.color} />
            </View>
            <View style={tw`ml-3 flex-1`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-base font-semibold text-green-800 flex-1`}>
                  {item.title}
                </Text>
                {item.status && (
                  <View style={tw`bg-green-100 px-2 py-0.5 rounded-full ml-2`}>
                    <Text style={tw`text-xs font-medium text-green-600`}>{item.status}</Text>
                  </View>
                )}
              </View>
              <View style={tw`flex-row items-center mt-1`}>
                <Calendar size={14} color="#059669" />
                <Text style={tw`text-sm text-green-600 ml-1`}>{item.date}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={tw`p-2`}>
            <MoreVertical size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row items-center justify-between mt-4 pt-4 border-t border-green-100`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-sm text-green-700`}>
              {item.files} files • {item.size}
            </Text>
            <View style={tw`flex-row ml-2`}>
              {item.avatars.slice(0, 3).map((a, i) => (
                <View
                  key={i}
                  style={[
                    tw`w-6 h-6 rounded-full items-center justify-center bg-green-100 border-2 border-green-50`,
                    { marginLeft: i === 0 ? 0 : -8 },
                  ]}
                >
                  <Text style={tw`text-sm`}>{a}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity 
              style={tw`p-2 rounded-xl bg-green-100`}
              onPress={() => console.log('Download pressed')}
            >
              <Download size={18} color="#059669" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={tw`p-2 rounded-xl bg-green-100`}
              onPress={() => console.log('Share pressed')}
            >
              <Share2 size={18} color="#059669" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <PageLayout
      title="Medical Records"
      headerBackgroundColor="#219f4dff"
      leftComponent={canGoBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`p-2 rounded-full`}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={tw`w-10`} />
      )}
      headerRight={
        <TouchableOpacity onPress={() => (navigation as any).navigate('Notification')}>
          <Bell size={22} color="#fff" />
        </TouchableOpacity>
      }      headerContent={
        <View style={tw`flex-row items-center bg-green-50 rounded-xl px-3 h-12 mt-2 mb-2 shadow-sm`}>
          <Search size={20} color="#202b6d" />
          <TextInput
            placeholder="Search medical records..."
            placeholderTextColor="#64748b"
            style={tw`flex-1 mx-2 text-base font-medium text-green-800`}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity 
            style={tw`p-2 rounded-lg active:bg-green-100`}
            activeOpacity={0.7}
          >
            <SlidersHorizontal size={20} color="#202b6d" />
          </TouchableOpacity>
        </View>
      }
      scrollable={true}
    >
      {/* Categories and Content */}
      <View style={tw`bg-green-50 rounded-t-3xl mt-4`}>
        {/* Categories */}
        <View style={tw`px-4 py-4`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`flex-row`}
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    tw`mr-2 flex-row items-center border rounded-xl px-3 py-1.5`,
                    isActive 
                      ? tw`bg-green-600 border-green-600` 
                      : tw`bg-green-100 border-green-100`
                  ]}
                  onPress={() => setActiveCategory(category.id)}
                  activeOpacity={0.7}
                >
                  <IconComponent 
                    size={14} 
                    color={isActive ? '#fff' : '#059669'}
                    style={tw`mr-1`}
                  />
                  <Text
                    style={[
                      tw`text-xs font-medium`,
                      isActive ? tw`text-white` : tw`text-green-700`
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={tw`h-[1px] bg-green-100 mx-4 -mt-1 mb-3`} />

        {/* Stats Row */}
        <View style={tw`flex-row justify-between px-4 py-4`}>
          <View style={tw`bg-green-100 px-4 py-3 rounded-xl flex-1 mr-3`}>
            <Text style={tw`text-sm text-green-700`}>Total Records</Text>
            <Text style={tw`text-xl font-bold text-green-700`}>
              {filteredRecords.length}
            </Text>
          </View>
          <View style={tw`bg-green-50 px-4 py-3 rounded-xl flex-1`}>
            <Text style={tw`text-sm text-green-700`}>Total Files</Text>
            <Text style={tw`text-xl font-bold text-green-700`}>
              {filteredRecords.reduce((sum, record) => sum + record.files, 0)}
            </Text>
          </View>
        </View>

        {/* Records List */}
        <ScrollView
          style={tw`px-4`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-24`}  
        >
          {filteredRecords.length > 0 ? (
            filteredRecords.map((item, index) => renderRecordCard(item, index))
          ) : (
            <View style={tw`items-center justify-center py-8`}>
              <Folder size={48} color="#94A3B8" />
              <Text style={tw`text-green-400 mt-4 text-base`}>No records found</Text>
            </View>
          )}
        </ScrollView>
      </View>     
      <TouchableOpacity
        style={[
          tw`absolute right-6 bg-[#202b6d] w-14 h-14 rounded-full items-center justify-center shadow-lg`,
          { 
            bottom: Platform.OS === 'ios' ? 90 : 70,
            right: Platform.OS === 'ios' ? 24 : 20
          }
        ]}
        onPress={() => console.log('Add new record')}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </PageLayout>
  );
};

export default MedicalRecordsScreen;

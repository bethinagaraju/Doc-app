import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

export interface ScheduleItem {
  day: string;
  loginTime: string;
  logoutTime: string;
  breaks: { start: string; end: string }[];
  mode: string;
}

interface Props {
  item: ScheduleItem;
  index: number;
  openTimePicker: (dayIndex: number, field: string, breakIndex?: number, breakField?: 'start' | 'end') => void;
  removeBreak: (dayIndex: number, breakIndex: number) => void;
  addBreak: (dayIndex: number) => void;
  handleChange: (index: number, field: keyof ScheduleItem, value: string) => void;
}

export default function DailyScheduleCard({
  item,
  index,
  openTimePicker,
  removeBreak,
  addBreak,
  handleChange,
}: Props) {
  return (
    <View style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
      <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>{item.day}</Text>

      <TouchableOpacity
        style={tw`border border-green-300 p-2 rounded mb-2`}
        onPress={() => openTimePicker(index, 'loginTime')}
      >
        <Text>{item.loginTime ? `Login Time: ${item.loginTime}` : 'Set Login Time'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`border border-green-300 p-2 rounded mb-2`}
        onPress={() => openTimePicker(index, 'logoutTime')}
      >
        <Text>{item.logoutTime ? `Logout Time: ${item.logoutTime}` : 'Set Logout Time'}</Text>
      </TouchableOpacity>

      <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
      {item.breaks.map((brk, brkIndex) => (
        <View key={brkIndex} style={tw`mb-2`}>
          <View style={tw`flex-row justify-between items-center mb-1`}>
            <TouchableOpacity
              style={tw`border border-green-300 p-2 rounded flex-1 mr-1`}
              onPress={() => openTimePicker(index, 'breaks', brkIndex, 'start')}
            >
              <Text>{brk.start ? `Start: ${brk.start}` : 'Set Start'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`border border-green-300 p-2 rounded flex-1 ml-1`}
              onPress={() => openTimePicker(index, 'breaks', brkIndex, 'end')}
            >
              <Text>{brk.end ? `End: ${brk.end}` : 'Set End'}</Text>
            </TouchableOpacity>

            {item.breaks.length > 1 && (
              <TouchableOpacity
                onPress={() => removeBreak(index, brkIndex)}
                style={tw`bg-red-500 px-3 py-1 rounded ml-2`}
              >
                <Text style={tw`text-white`}>−</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => addBreak(index)}
        style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
      >
        <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
      </TouchableOpacity>

      <View style={tw`border border-green-300 rounded mb-2 bg-green-50`}>
        <Picker
          selectedValue={item.mode}
          onValueChange={(val: string) => handleChange(index, 'mode', val)}
        >
          <Picker.Item label="Select Mode" value="" />
          <Picker.Item label="Online" value="online" />
          <Picker.Item label="Offline" value="offline" />
          <Picker.Item label="Hybrid" value="hybrid" />
        </Picker>
      </View>
    </View>
  );
}

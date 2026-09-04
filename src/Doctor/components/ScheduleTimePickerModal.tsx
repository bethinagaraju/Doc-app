import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Clock, X, Check } from 'lucide-react-native';
import tw from 'twrnc';

interface ScheduleTimePickerModalProps {
  visible: boolean;
  initialTime?: string; // Expects "HH:mm" (24hr) or "hh:mm AM/PM"
  title?: string;
  subtitle?: string;
  onConfirm: (time24: string) => void;
  onClose: () => void;
}

// Convert 24hr string ("14:30") to { hour12: 2, minute: 30, period: 'PM' }
const parseTimeTo12Hr = (timeStr?: string) => {
  if (!timeStr || !timeStr.includes(':')) {
    return { hour12: 9, minute: 0, period: 'AM' as 'AM' | 'PM' };
  }

  // If contains AM/PM
  const isPM = /PM/i.test(timeStr);
  const isAM = /AM/i.test(timeStr);
  const cleanStr = timeStr.replace(/(AM|PM)/gi, '').trim();
  const [hStr, mStr] = cleanStr.split(':');
  let h = parseInt(hStr, 10) || 9;
  const m = parseInt(mStr, 10) || 0;

  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;

  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  const period = h >= 12 ? 'PM' : 'AM';

  return { hour12, minute: m, period: period as 'AM' | 'PM' };
};

// Convert 12hr back to 24hr "HH:mm" format for backend
export const format12HrTo24Hr = (
  hour12: number,
  minute: number,
  period: 'AM' | 'PM'
): string => {
  let h = hour12 % 12;
  if (period === 'PM') h += 12;
  const hStr = h.toString().padStart(2, '0');
  const mStr = minute.toString().padStart(2, '0');
  return `${hStr}:${mStr}`;
};

// Format 24hr "HH:mm" for display as "9:00 AM" / "05:30 PM"
export const formatDisplay12Hr = (time24?: string): string => {
  if (!time24 || !time24.includes(':')) return time24 || '';
  const { hour12, minute, period } = parseTimeTo12Hr(time24);
  const mStr = minute.toString().padStart(2, '0');
  return `${hour12}:${mStr} ${period}`;
};

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const QUICK_PRESETS = [
  { label: '8:00 AM', h: 8, m: 0, p: 'AM' as const },
  { label: '9:00 AM', h: 9, m: 0, p: 'AM' as const },
  { label: '10:00 AM', h: 10, m: 0, p: 'AM' as const },
  { label: '1:00 PM', h: 1, m: 0, p: 'PM' as const },
  { label: '2:00 PM', h: 2, m: 0, p: 'PM' as const },
  { label: '5:00 PM', h: 5, m: 0, p: 'PM' as const },
  { label: '6:00 PM', h: 6, m: 0, p: 'PM' as const },
  { label: '8:00 PM', h: 8, m: 0, p: 'PM' as const },
];

const ScheduleTimePickerModal: React.FC<ScheduleTimePickerModalProps> = ({
  visible,
  initialTime,
  title = 'Select Time',
  subtitle,
  onConfirm,
  onClose,
}) => {
  const [selectedHour, setSelectedHour] = useState<number>(9);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('AM');

  useEffect(() => {
    if (visible) {
      const parsed = parseTimeTo12Hr(initialTime);
      setSelectedHour(parsed.hour12);
      setSelectedMinute(parsed.minute);
      setSelectedPeriod(parsed.period);
    }
  }, [visible, initialTime]);

  const handleConfirm = () => {
    const time24 = format12HrTo24Hr(
      selectedHour,
      selectedMinute,
      selectedPeriod
    );
    onConfirm(time24);
    onClose();
  };

  const formattedMinute = selectedMinute.toString().padStart(2, '0');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={tw`flex-1 bg-black/60 justify-center items-center p-4`}
        onPress={onClose}
      >
        <Pressable
          style={tw`w-full max-w-[360px] bg-white rounded-3xl p-5 border border-[#DAE1E7] shadow-xl`}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View style={tw`flex-row items-center justify-between pb-3 border-b border-[#F0F4F8]`}>
            <View style={tw`flex-row items-center gap-2.5`}>
              <View style={tw`w-9 h-9 rounded-full bg-[#EEF4FF] items-center justify-center`}>
                <Clock size={18} color="#124CB8" />
              </View>
              <View>
                <Text style={tw`text-[17px] font-bold text-[#011D35]`}>
                  {title}
                </Text>
                {subtitle ? (
                  <Text style={tw`text-xs text-[#737684] font-medium capitalize`}>
                    {subtitle}
                  </Text>
                ) : null}
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              style={tw`w-8 h-8 rounded-full bg-[#F8F9FF] items-center justify-center`}
            >
              <X size={16} color="#737684" />
            </TouchableOpacity>
          </View>

          {/* Time Display Card */}
          <View style={tw`mt-4 bg-[#F8F9FF] border border-[#DAE1E7] rounded-2xl p-4 items-center justify-center`}>
            <View style={tw`flex-row items-baseline gap-2`}>
              <Text style={tw`text-[36px] font-bold text-[#124CB8] tracking-tight`}>
                {selectedHour}:{formattedMinute}
              </Text>
              <Text style={tw`text-[18px] font-bold text-[#011D35]`}>
                {selectedPeriod}
              </Text>
            </View>

            {/* AM / PM Pills */}
            <View style={tw`flex-row gap-2 mt-3 bg-white p-1 rounded-full border border-[#DAE1E7]`}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedPeriod('AM')}
                style={tw.style(
                  'px-5 py-1.5 rounded-full',
                  selectedPeriod === 'AM' ? 'bg-[#124CB8]' : 'bg-transparent'
                )}
              >
                <Text
                  style={tw.style(
                    'text-xs font-bold',
                    selectedPeriod === 'AM' ? 'text-white' : 'text-[#737684]'
                  )}
                >
                  AM
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedPeriod('PM')}
                style={tw.style(
                  'px-5 py-1.5 rounded-full',
                  selectedPeriod === 'PM' ? 'bg-[#124CB8]' : 'bg-transparent'
                )}
              >
                <Text
                  style={tw.style(
                    'text-xs font-bold',
                    selectedPeriod === 'PM' ? 'text-white' : 'text-[#737684]'
                  )}
                >
                  PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Hours Picker */}
          <View style={tw`mt-4`}>
            <Text style={tw`text-[11px] font-bold text-[#737684] uppercase tracking-[0.5px] mb-2`}>
              Select Hour
            </Text>
            <View style={tw`flex-row flex-wrap gap-2 justify-between`}>
              {HOURS.map((h) => {
                const isActive = selectedHour === h;
                return (
                  <TouchableOpacity
                    key={h}
                    activeOpacity={0.8}
                    onPress={() => setSelectedHour(h)}
                    style={tw.style(
                      'w-[46px] h-9 rounded-xl items-center justify-center border',
                      isActive
                        ? 'bg-[#124CB8] border-[#124CB8] shadow-sm'
                        : 'bg-[#F8F9FF] border-[#DAE1E7]'
                    )}
                  >
                    <Text
                      style={tw.style(
                        'text-xs font-bold',
                        isActive ? 'text-white' : 'text-[#011D35]'
                      )}
                    >
                      {h}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Minutes Picker */}
          <View style={tw`mt-3.5`}>
            <Text style={tw`text-[11px] font-bold text-[#737684] uppercase tracking-[0.5px] mb-2`}>
              Select Minute
            </Text>
            <View style={tw`flex-row flex-wrap gap-2 justify-between`}>
              {MINUTES.map((m) => {
                const isActive = selectedMinute === m;
                const mLabel = m.toString().padStart(2, '0');
                return (
                  <TouchableOpacity
                    key={m}
                    activeOpacity={0.8}
                    onPress={() => setSelectedMinute(m)}
                    style={tw.style(
                      'w-[46px] h-9 rounded-xl items-center justify-center border',
                      isActive
                        ? 'bg-[#124CB8] border-[#124CB8] shadow-sm'
                        : 'bg-[#F8F9FF] border-[#DAE1E7]'
                    )}
                  >
                    <Text
                      style={tw.style(
                        'text-xs font-bold',
                        isActive ? 'text-white' : 'text-[#011D35]'
                      )}
                    >
                      :{mLabel}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Quick Presets */}
          <View style={tw`mt-3.5`}>
            <Text style={tw`text-[11px] font-bold text-[#737684] uppercase tracking-[0.5px] mb-1.5`}>
              Quick Presets
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`gap-1.5 py-1`}
            >
              {QUICK_PRESETS.map((preset, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedHour(preset.h);
                    setSelectedMinute(preset.m);
                    setSelectedPeriod(preset.p);
                  }}
                  style={tw`px-3 py-1.5 bg-[#EEF4FF] border border-[#DAE1FF] rounded-full`}
                >
                  <Text style={tw`text-[11px] font-bold text-[#124CB8]`}>
                    {preset.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Action Buttons */}
          <View style={tw`flex-row gap-3 mt-5 pt-3 border-t border-[#F0F4F8]`}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onClose}
              style={tw`flex-1 py-3 bg-[#F8F9FF] border border-[#DAE1E7] rounded-full items-center justify-center`}
            >
              <Text style={tw`text-xs font-bold text-[#737684]`}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleConfirm}
              style={tw`flex-1 py-3 bg-[#124CB8] rounded-full flex-row items-center justify-center gap-1.5 shadow-md`}
            >
              <Check size={16} color="#FFFFFF" />
              <Text style={tw`text-xs font-bold text-white`}>
                Set Time
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ScheduleTimePickerModal;

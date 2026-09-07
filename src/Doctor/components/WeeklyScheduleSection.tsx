import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Clock,
  Coffee,
  Plus,
  Trash2,
  Calendar,
  Video,
  Building,
  Layers,
  CheckCircle2,
} from 'lucide-react-native';
import tw from 'twrnc';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export interface ScheduleItem {
  day: string;
  loginTime: string;
  logoutTime: string;
  breaks: { start: string; end: string }[];
  mode: string;
}

interface WeeklyScheduleSectionProps {
  schedule: ScheduleItem[];
  openTimePicker?: (dayIndex: number, field: string, breakIndex?: number, breakField?: 'start' | 'end') => void;
  removeBreak: (dayIndex: number, breakIndex: number) => void;
  addBreak: (dayIndex: number) => void;
  handleChange: (index: number, field: keyof ScheduleItem, value: any) => void;
  onScheduleChange?: (newSchedule: ScheduleItem[]) => void;
  onSubmit: () => void;
  title?: string;
  submitButtonText?: string;
  loading?: boolean;
}

const MODES = [
  { key: 'online', label: 'Online', icon: Video },
  { key: 'offline', label: 'Offline', icon: Building },
  { key: 'hybrid', label: 'Hybrid', icon: Layers },
];

export const formatDisplay12Hr = (time24?: string): string => {
  if (!time24 || !time24.includes(':')) return time24 || '';
  const cleanStr = time24.replace(/(AM|PM)/gi, '').trim();
  const [hStr, mStr] = cleanStr.split(':');
  let h = parseInt(hStr, 10) || 0;
  const m = parseInt(mStr, 10) || 0;
  const isPM = /PM/i.test(time24) || h >= 12;
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  const period = isPM ? 'PM' : 'AM';
  const formattedMinutes = m.toString().padStart(2, '0');
  return `${hour12}:${formattedMinutes} ${period}`;
};

const parseTimeToDate = (timeStr?: string): Date => {
  const date = new Date();
  if (!timeStr || !timeStr.includes(':')) {
    date.setHours(9, 0, 0, 0);
    return date;
  }

  const cleanStr = timeStr.replace(/(AM|PM)/gi, '').trim();
  const [hStr, mStr] = cleanStr.split(':');
  let h = parseInt(hStr, 10) || 0;
  const m = parseInt(mStr, 10) || 0;

  if (/PM/i.test(timeStr) && h < 12) h += 12;
  if (/AM/i.test(timeStr) && h === 12) h = 0;

  date.setHours(h, m, 0, 0);
  return date;
};

const WeeklyScheduleSection: React.FC<WeeklyScheduleSectionProps> = ({
  schedule,
  openTimePicker,
  removeBreak,
  addBreak,
  handleChange,
  onScheduleChange,
  onSubmit,
  title = 'Weekly Working Hours',
  submitButtonText = 'Save Full Weekly Schedule',
  loading = false,
}) => {
  const [pickerState, setPickerState] = useState<{
    visible: boolean;
    dayIndex: number | null;
    field: string;
    breakIndex: number | null;
    breakField: 'start' | 'end' | null;
    initialTime: string;
  }>({
    visible: false,
    dayIndex: null,
    field: '',
    breakIndex: null,
    breakField: null,
    initialTime: '',
  });

  const handleOpenPicker = (
    dayIndex: number,
    field: string,
    breakIndex: number | null = null,
    breakField: 'start' | 'end' | null = null
  ) => {
    const dayItem = schedule[dayIndex];

    let initial = '';

    if (breakIndex !== null && breakField) {
      initial =
        dayItem?.breaks[breakIndex]?.[breakField] ||
        (breakField === 'start' ? '13:00' : '14:00');
    } else if (field === 'loginTime') {
      initial = dayItem?.loginTime || '09:00';
    } else if (field === 'logoutTime') {
      initial = dayItem?.logoutTime || '17:00';
    }

    setPickerState({
      visible: true,
      dayIndex,
      field,
      breakIndex,
      breakField,
      initialTime: initial,
    });
  };

  const handleConfirmDate = (selectedDate: Date) => {
    const hours = selectedDate.getHours().toString().padStart(2, '0');
    const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
    const time24 = `${hours}:${minutes}`;

    const { dayIndex, field, breakIndex, breakField } = pickerState;
    if (dayIndex === null) return;

    if (breakIndex !== null && breakField) {
      const updated = [...schedule];
      if (updated[dayIndex]?.breaks[breakIndex]) {
        updated[dayIndex].breaks[breakIndex][breakField] = time24;
        if (onScheduleChange) {
          onScheduleChange(updated);
        } else {
          handleChange(dayIndex, 'breaks', updated[dayIndex].breaks);
        }
      }
    } else {
      handleChange(dayIndex, field as keyof ScheduleItem, time24);
    }

    setPickerState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <View style={tw`w-full mt-4`}>

      {/* Header Section */}
      <View style={tw`bg-white border border-[#DAE1E7] rounded-2xl p-4 mb-4 shadow-sm`}>
        <View style={tw`flex-row items-center gap-2`}>
          <View style={tw`w-8 h-8 rounded-lg bg-[#EEF4FF] items-center justify-center`}>
            <Calendar size={18} color="#124CB8" />
          </View>
          <Text style={tw`text-[20px] font-semibold text-[#011D35]`}>
            {title}
          </Text>
        </View>
        <Text style={tw`text-sm text-[#434653] mt-1`}>
          Configure your daily hours, breaks, and consultation modes
        </Text>
      </View>

      {/* Days List */}
      {schedule.map((item, index) => {
        const isConfigured = Boolean(item.loginTime && item.logoutTime);
        const dayShort = item.day ? item.day.substring(0, 3).toUpperCase() : '';

        return (
          <View
            key={item.day}
            style={tw`bg-white border border-[#DAE1E7] rounded-2xl p-4 mb-4 shadow-sm`}
          >
            {/* Day Header Row */}
            <View style={tw`flex-row justify-between items-center pb-3 border-b border-[#F0F4F8] mb-3.5`}>
              <View style={tw`flex-row items-center gap-2.5`}>
                <View
                  style={tw.style(
                    'w-10 h-7 rounded-full items-center justify-center',
                    isConfigured ? 'bg-[#124CB8]' : 'bg-[#EEF4FF]'
                  )}
                >
                  <Text
                    style={tw.style(
                      'text-xs font-bold tracking-wider',
                      isConfigured ? 'text-white' : 'text-[#124CB8]'
                    )}
                  >
                    {dayShort}
                  </Text>
                </View>
                <Text style={tw`text-[17px] font-bold text-[#011D35] capitalize`}>
                  {item.day}
                </Text>
              </View>

              {/* Status Badge */}
              <View
                style={tw.style(
                  'px-3 py-1 rounded-full border flex-row items-center gap-1',
                  isConfigured
                    ? 'bg-[#EEF4FF] border-[#DAE1FF]'
                    : 'bg-[#F8F9FF] border-[#DAE1E7]'
                )}
              >
                <View
                  style={tw.style(
                    'w-1.5 h-1.5 rounded-full',
                    isConfigured ? 'bg-[#124CB8]' : 'bg-[#9CA3AF]'
                  )}
                />
                <Text
                  style={tw.style(
                    'text-[11px] font-semibold tracking-[0.4px] uppercase',
                    isConfigured ? 'text-[#124CB8]' : 'text-[#737684]'
                  )}
                >
                  {isConfigured ? 'Active' : 'Off'}
                </Text>
              </View>
            </View>

            {/* Working Hours Subheader & Chips */}
            <Text style={tw`text-xs font-semibold text-[#434653] tracking-[0.6px] uppercase mb-2`}>
              Working Hours
            </Text>
            <View style={tw`flex-row gap-2.5 mb-3.5`}>
              {/* Start Time Chip */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={tw`flex-1 bg-[#F8F9FF] border border-[#DAE1E7] rounded-xl p-3 flex-row items-center gap-2`}
                onPress={() => handleOpenPicker(index, 'loginTime')}
              >
                <Clock size={16} color="#124CB8" />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-[10px] font-semibold text-[#737684] uppercase tracking-[0.4px]`}>
                    Start Time
                  </Text>
                  <Text style={tw`text-[14px] font-bold text-[#011D35] mt-0.5`}>
                    {formatDisplay12Hr(item.loginTime) || 'Set Time'}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* End Time Chip */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={tw`flex-1 bg-[#F8F9FF] border border-[#DAE1E7] rounded-xl p-3 flex-row items-center gap-2`}
                onPress={() => handleOpenPicker(index, 'logoutTime')}
              >
                <Clock size={16} color="#124CB8" />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-[10px] font-semibold text-[#737684] uppercase tracking-[0.4px]`}>
                    End Time
                  </Text>
                  <Text style={tw`text-[14px] font-bold text-[#011D35] mt-0.5`}>
                    {formatDisplay12Hr(item.logoutTime) || 'Set Time'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Breaks Section */}
            <View style={tw`mb-3.5`}>
              <View style={tw`flex-row items-center justify-between mb-2`}>
                <View style={tw`flex-row items-center gap-1.5`}>
                  <Coffee size={14} color="#434653" />
                  <Text style={tw`text-xs font-semibold text-[#434653] tracking-[0.6px] uppercase`}>
                    Breaks {item.breaks.length > 0 ? `(${item.breaks.length})` : ''}
                  </Text>
                </View>
              </View>

              {item.breaks.map((brk, brkIndex) => (
                <View
                  key={brkIndex}
                  style={tw`flex-row items-center gap-2 mb-2 bg-[#F8F9FF] p-2.5 rounded-xl border border-[#E2E8F0]`}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={tw`flex-1 bg-white border border-[#DAE1E7] py-2 px-3 rounded-lg`}
                    onPress={() =>
                      handleOpenPicker(index, 'breaks', brkIndex, 'start')
                    }
                  >
                    <Text style={tw`text-[10px] font-semibold text-[#737684] uppercase`}>Start</Text>
                    <Text style={tw`text-[13px] font-bold text-[#011D35] mt-0.5`}>
                      {formatDisplay12Hr(brk.start) || 'Set'}
                    </Text>
                  </TouchableOpacity>

                  <Text style={tw`text-[#737684] font-semibold text-xs`}>to</Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={tw`flex-1 bg-white border border-[#DAE1E7] py-2 px-3 rounded-lg`}
                    onPress={() =>
                      handleOpenPicker(index, 'breaks', brkIndex, 'end')
                    }
                  >
                    <Text style={tw`text-[10px] font-semibold text-[#737684] uppercase`}>End</Text>
                    <Text style={tw`text-[13px] font-bold text-[#011D35] mt-0.5`}>
                      {formatDisplay12Hr(brk.end) || 'Set'}
                    </Text>
                  </TouchableOpacity>

                  {item.breaks.length > 1 && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => removeBreak(index, brkIndex)}
                      style={tw`w-9 h-9 rounded-lg bg-[#FEE2E2] border border-[#FECACA] items-center justify-center ml-1`}
                    >
                      <Trash2 size={15} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => addBreak(index)}
                style={tw`flex-row items-center justify-center bg-white border border-[#124CB8] py-2 px-4 rounded-full gap-1.5 mt-1`}
              >
                <Plus size={14} color="#124CB8" />
                <Text style={tw`text-xs font-semibold text-[#124CB8] tracking-[0.4px]`}>
                  Add Break Interval
                </Text>
              </TouchableOpacity>
            </View>

            {/* Consultation Mode Selector */}
            <View>
              <Text style={tw`text-xs font-semibold text-[#434653] tracking-[0.6px] uppercase mb-2`}>
                Consultation Mode
              </Text>
              <View style={tw`flex-row gap-2`}>
                {MODES.map((mode) => {
                  const isSelected = item.mode?.toLowerCase() === mode.key;
                  const IconComponent = mode.icon;

                  return (
                    <TouchableOpacity
                      key={mode.key}
                      activeOpacity={0.8}
                      onPress={() => handleChange(index, 'mode', mode.key)}
                      style={tw.style(
                        'flex-1 py-2 px-3 rounded-full border flex-row items-center justify-center gap-1.5',
                        isSelected
                          ? 'bg-[#124CB8] border-[#124CB8]'
                          : 'bg-white border-[#DAE1E7]'
                      )}
                    >
                      <IconComponent
                        size={14}
                        color={isSelected ? '#FFFFFF' : '#434653'}
                      />
                      <Text
                        style={tw.style(
                          'text-xs font-semibold tracking-[0.4px]',
                          isSelected ? 'text-white' : 'text-[#434653]'
                        )}
                      >
                        {mode.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        );
      })}

      {/* Save Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSubmit}
        disabled={loading}
        style={[
          tw`bg-[#124CB8] py-3.5 px-8 rounded-full flex-row items-center justify-center gap-2 mb-10 shadow-md`,
          loading ? tw`opacity-70` : null,
        ]}
      >
        <CheckCircle2 size={18} color="#FFFFFF" />
        <Text style={tw`text-white text-center font-semibold text-[15px] tracking-[0.6px]`}>
          {loading ? 'Saving Changes...' : submitButtonText}
        </Text>
      </TouchableOpacity>

      {/* Ready-made React Native DateTimePicker Modal */}
      <DateTimePickerModal
        isVisible={pickerState.visible}
        mode="time"
        date={parseTimeToDate(pickerState.initialTime)}
        onConfirm={handleConfirmDate}
        onCancel={() =>
          setPickerState((prev) => ({ ...prev, visible: false }))
        }
        accentColor="#124CB8"
        buttonTextColorIOS="#124CB8"
      />
    </View>
  );
};

export default WeeklyScheduleSection;

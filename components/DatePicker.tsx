import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DatePickerProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

export default function DatePicker({ visible, onClose, onDateSelect }: DatePickerProps) {
  const currentDate = new Date();
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: 'January', marathi: 'जानेवारी' },
    { value: 2, label: 'February', marathi: 'फेब्रुवारी' },
    { value: 3, label: 'March', marathi: 'मार्च' },
    { value: 4, label: 'April', marathi: 'एप्रिल' },
    { value: 5, label: 'May', marathi: 'मे' },
    { value: 6, label: 'June', marathi: 'जून' },
    { value: 7, label: 'July', marathi: 'जुलै' },
    { value: 8, label: 'August', marathi: 'ऑगस्ट' },
    { value: 9, label: 'September', marathi: 'सप्टेंबर' },
    { value: 10, label: 'October', marathi: 'ऑक्टोबर' },
    { value: 11, label: 'November', marathi: 'नोव्हेंबर' },
    { value: 12, label: 'December', marathi: 'डिसेंबर' },
  ];
  const years = Array.from({ length: 50 }, (_, i) => currentDate.getFullYear() - i);

  const handleDateConfirm = () => {
    const formattedDate = `${selectedDay.toString().padStart(2, '0')}-${selectedMonth.toString().padStart(2, '0')}-${selectedYear}`;
    onDateSelect(formattedDate);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const maxDays = getDaysInMonth(selectedMonth, selectedYear);
  const validDays = days.filter(day => day <= maxDays);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      transparent={false}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select Date</Text>
          <TouchableOpacity onPress={handleDateConfirm}>
            <Text style={styles.confirmButton}>Done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          {/* Day Picker */}
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>Day</Text>
            <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
              {validDays.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.pickerItem,
                    selectedDay === day && styles.pickerItemSelected,
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      selectedDay === day && styles.pickerItemTextSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Month Picker */}
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>Month</Text>
            <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
              {months.map((month) => (
                <TouchableOpacity
                  key={month.value}
                  style={[
                    styles.pickerItem,
                    selectedMonth === month.value && styles.pickerItemSelected,
                  ]}
                  onPress={() => setSelectedMonth(month.value)}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      selectedMonth === month.value && styles.pickerItemTextSelected,
                    ]}
                  >
                    {month.label}
                  </Text>
                  <Text
                    style={[
                      styles.pickerItemSubtext,
                      selectedMonth === month.value && styles.pickerItemTextSelected,
                    ]}
                  >
                    {month.marathi}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Year Picker */}
          <View style={styles.pickerColumn}>
            <Text style={styles.pickerLabel}>Year</Text>
            <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.pickerItem,
                    selectedYear === year && styles.pickerItemSelected,
                  ]}
                  onPress={() => setSelectedYear(year)}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      selectedYear === year && styles.pickerItemTextSelected,
                    ]}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  confirmButton: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingVertical: 8,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  pickerItemSelected: {
    backgroundColor: '#FF6B35',
    marginHorizontal: 8,
    borderRadius: 6,
  },
  pickerItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  pickerItemSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  pickerItemTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
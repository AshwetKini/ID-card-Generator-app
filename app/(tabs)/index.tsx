// app/(tabs)/index.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Upload, Search, Calendar } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { DISTRICTS_DATA } from '@/data/maharashtraData';
import {
  IDCardData,
  useIDCardStore,
} from '@/store/idCardStore';
import DatePicker from '@/components/DatePicker';

export default function CreateIDScreen() {
  const {
    idCardData,
    updateIDCardData,
    generateID,
  } = useIDCardStore();

  const [showDistrictModal, setShowDistrictModal] = useState(false);
  const [showTalukaModal, setShowTalukaModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [talukaSearch, setTalukaSearch] = useState('');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      updateIDCardData({ photo: result.assets[0].uri });
    }
  };

  const handleCamera = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert('Permission needed', 'Camera permission is required to take photos');
        return;
      }
    }
    setShowCameraModal(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
        });
        updateIDCardData({ photo: photo.uri });
        setShowCameraModal(false);
      } catch {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const filteredDistricts = DISTRICTS_DATA.filter(d =>
    d.name.toLowerCase().includes(districtSearch.toLowerCase()) ||
    d.marathi.includes(districtSearch)
  );

  const selectedDistrictData = DISTRICTS_DATA.find(d => d.name === idCardData.district);
  const filteredTalukas = selectedDistrictData
    ? selectedDistrictData.talukas.filter(t =>
        t.name.toLowerCase().includes(talukaSearch.toLowerCase()) ||
        t.marathi.includes(talukaSearch)
      )
    : [];

  const handleDistrictSelect = (district: any) => {
    updateIDCardData({
      district: district.name,
      districtMarathi: district.marathi,
      taluka: '',
      talukaMarathi: '',
    });
    setShowDistrictModal(false);
    setDistrictSearch('');
  };
  const handleTalukaSelect = (taluka: any) => {
    updateIDCardData({
      taluka: taluka.name,
      talukaMarathi: taluka.marathi,
    });
    setShowTalukaModal(false);
    setTalukaSearch('');
  };

  const validatePincode = (p: string) => /^\d{6}$/.test(p);

  const isFormValid = () =>
    idCardData.memberNumber &&
    idCardData.name &&
    idCardData.village &&
    idCardData.district &&
    idCardData.taluka &&
    validatePincode(idCardData.pincode) &&
    idCardData.receiptNumber &&
    idCardData.date &&
    idCardData.photo;

  const handleGenerate = () => {
    if (!isFormValid()) {
      Alert.alert('Incomplete', 'Please fill all required fields');
      return;
    }
    generateID();
    Alert.alert('Success', 'ID generated!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/5816299/pexels-photo-5816299.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }}
            style={styles.logo}
          />
          <Text style={styles.headerText}>कुणबी समाजोन्नती संघ</Text>
        </View>

        {/* Photo Section */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Photo</Text>
          <View style={styles.photoContainer}>
            {idCardData.photo ? (
              <Image source={{ uri: idCardData.photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>No Photo</Text>
              </View>
            )}
          </View>
          <View style={styles.photoButtons}>
            <TouchableOpacity style={styles.photoButton} onPress={handleCamera}>
              <Camera size={20} color="#fff" />
              <Text style={styles.photoButtonText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButton} onPress={handleImagePicker}>
              <Upload size={20} color="#fff" />
              <Text style={styles.photoButtonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/** Member Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>आजीव सभासद क्र. *</Text>
            <TextInput
              style={styles.input}
              value={idCardData.memberNumber}
              onChangeText={text => updateIDCardData({ memberNumber: text })}
              placeholder="Enter member number"
            />
          </View>
          {/** Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>नाव *</Text>
            <TextInput
              style={styles.input}
              value={idCardData.name}
              onChangeText={text => updateIDCardData({ name: text })}
              placeholder="Enter full name"
            />
          </View>
          {/** Village */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>गाव *</Text>
            <TextInput
              style={styles.input}
              value={idCardData.village}
              onChangeText={text => updateIDCardData({ village: text })}
              placeholder="Enter village name"
            />
          </View>
          {/** District */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>जिल्हा *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDistrictModal(true)}
            >
              <Text style={[styles.dropdownText, !idCardData.district && styles.placeholder]}>
                {idCardData.district || 'Select District'}
              </Text>
            </TouchableOpacity>
          </View>
          {/** Taluka */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>तालुका *</Text>
            <TouchableOpacity
              style={[styles.dropdown, !idCardData.district && styles.disabled]}
              onPress={() => idCardData.district && setShowTalukaModal(true)}
            >
              <Text style={[styles.dropdownText, !idCardData.taluka && styles.placeholder]}>
                {idCardData.taluka || 'Select Taluka'}
              </Text>
            </TouchableOpacity>
          </View>
          {/** Pincode */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>पिनकोड *</Text>
            <TextInput
              style={[
                styles.input,
                idCardData.pincode && !validatePincode(idCardData.pincode) && styles.inputError,
              ]}
              value={idCardData.pincode}
              onChangeText={text => updateIDCardData({ pincode: text })}
              placeholder="Enter 6 digit pincode"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
          {/** Receipt Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>पावती क्र. *</Text>
            <TextInput
              style={styles.input}
              value={idCardData.receiptNumber}
              onChangeText={text => updateIDCardData({ receiptNumber: text })}
              placeholder="Enter receipt number"
            />
          </View>
          {/** Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>दिनांक *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dropdownText, !idCardData.date && styles.placeholder]}>
                {idCardData.date || 'Select Date'}
              </Text>
              <Calendar size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* District Modal */}
      <Modal visible={showDistrictModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select District</Text>
            <TouchableOpacity onPress={() => setShowDistrictModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search district..."
              value={districtSearch}
              onChangeText={setDistrictSearch}
            />
          </View>
          <FlatList
            data={filteredDistricts}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleDistrictSelect(item)}
              >
                <Text style={styles.listItemText}>{item.name}</Text>
                <Text style={styles.listItemSubtext}>{item.marathi}</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>

      {/* Taluka Modal */}
      <Modal visible={showTalukaModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Taluka</Text>
            <TouchableOpacity onPress={() => setShowTalukaModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search taluka..."
              value={talukaSearch}
              onChangeText={setTalukaSearch}
            />
          </View>
          <FlatList
            data={filteredTalukas}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleTalukaSelect(item)}
              >
                <Text style={styles.listItemText}>{item.name}</Text>
                <Text style={styles.listItemSubtext}>{item.marathi}</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>

      {/* Camera Modal */}
      <Modal visible={showCameraModal} animationType="slide" presentationStyle="fullScreen">
        <CameraView style={styles.camera} facing="front" ref={cameraRef}>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCameraModal(false)}>
              <Text style={styles.cameraButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
            <View style={styles.cameraButton} />
          </View>
        </CameraView>
      </Modal>

      {/* Date Picker Modal */}
      <DatePicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onDateSelect={date => {
          updateIDCardData({ date });
          setShowDatePicker(false);
        }}
      />

      {/* Generate Button */}
      <View style={styles.generateContainer}>
        <TouchableOpacity
          style={[styles.generateButton, !isFormValid() && styles.generateButtonDisabled]}
          onPress={handleGenerate}
          disabled={!isFormValid()}
        >
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    padding: 16,
    paddingTop: 20,
  },
  logo: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#fff', flex: 1 },

  photoSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  photoContainer: { width: 120, height: 150, marginBottom: 12 },
  photo: { width: '100%', height: '100%', borderRadius: 8 },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  photoPlaceholderText: { color: '#999', fontSize: 14 },
  photoButtons: { flexDirection: 'row', gap: 12 },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  photoButtonText: { color: '#fff', fontSize: 14, fontWeight: '500' },

  formSection: { backgroundColor: '#fff', margin: 16, marginTop: 0, padding: 16, borderRadius: 8 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: '#FF4444' },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabled: { backgroundColor: '#f5f5f5', opacity: 0.6 },
  dropdownText: { fontSize: 16, color: '#333' },
  placeholder: { color: '#999' },

  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  closeButton: { color: '#FF6B35', fontSize: 16, fontWeight: '600' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16 },
  listItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  listItemText: { fontSize: 16, color: '#333', fontWeight: '500' },
  listItemSubtext: { fontSize: 14, color: '#666', marginTop: 2 },

  camera: { flex: 1 },
  cameraControls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  cameraButton: { padding: 16 },
  cameraButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    borderWidth: 6,
    borderColor: '#FF6B35',
  },

  generateContainer: { padding: 16, backgroundColor: '#f5f5f5' },
  generateButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonDisabled: { backgroundColor: '#ccc' },
  generateButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

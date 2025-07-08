import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2, RefreshCw, Info } from 'lucide-react-native';
import { useIDCardStore } from '@/store/idCardStore';

export default function SettingsScreen() {
  const { clearIDCardData } = useIDCardStore();

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all entered data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearIDCardData();
            Alert.alert('Success', 'All data has been cleared.');
          },
        },
      ]
    );
  };

  const showAppInfo = () => {
    Alert.alert(
      'App Information',
      'Kunabi ID Card Generator\nVersion 1.0.0\n\nThis app helps you create professional ID cards for Kunabi Samajonnati Sangh members.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleClearData}>
            <View style={styles.settingItemLeft}>
              <Trash2 size={24} color="#FF4444" />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>Clear All Data</Text>
                <Text style={styles.settingItemSubtitle}>
                  Remove all entered information and reset the form
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={showAppInfo}>
            <View style={styles.settingItemLeft}>
              <Info size={24} color="#666" />
              <View style={styles.settingItemText}>
                <Text style={styles.settingItemTitle}>App Information</Text>
                <Text style={styles.settingItemSubtitle}>
                  Version and app details
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How to Use</Text>
          <View style={styles.infoSteps}>
            <Text style={styles.infoStep}>
              1. Fill all required information in the "Create ID" tab
            </Text>
            <Text style={styles.infoStep}>
              2. Upload or capture a photo
            </Text>
            <Text style={styles.infoStep}>
              3. Select your district and taluka
            </Text>
            <Text style={styles.infoStep}>
              4. Preview your ID card in the "Preview" tab
            </Text>
            <Text style={styles.infoStep}>
              5. Share your completed ID card
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © Developed by Kini Software's
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FF6B35',
    padding: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemText: {
    marginLeft: 16,
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  infoSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoSteps: {
    gap: 8,
  },
  infoStep: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});
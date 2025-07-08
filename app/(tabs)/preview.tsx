import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  FlatList,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Share2, FileText, ArrowLeft, Search, X } from 'lucide-react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { useIDCardStore } from '@/store/idCardStore';

export default function PreviewScreen() {
  const { idList } = useIDCardStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const cardRef = useRef<View>(null);
  const card = selectedIndex !== null ? idList[selectedIndex] : null;

  // Filter IDs based on search query
  const filteredIdList = useMemo(() => {
    if (!searchQuery.trim()) return idList;
    
    const query = searchQuery.toLowerCase().trim();
    return idList.filter((item, index) => {
      const searchableText = [
        item.memberNumber,
        item.name,
        item.village,
        item.taluka,
        item.talukaMarathi,
        item.district,
        item.districtMarathi,
        item.pincode,
        item.receiptNumber,
        item.date
      ].join(' ').toLowerCase();
      
      return searchableText.includes(query);
    });
  }, [idList, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const shareImage = async () => {
    try {
      const uri = await captureRef(cardRef.current!, { format: 'png', quality: 1 });
      if (Platform.OS === 'web') {
        const a = document.createElement('a');
        a.href = uri;
        a.download = `kunabi-${card?.memberNumber}.png`;
        a.click();
      } else {
        await Sharing.shareAsync(uri);
      }
    } catch {
      Alert.alert('Error', 'Unable to share image');
    }
  };

  const sharePDF = async () => {
    try {
      // Convert image to base64 for PDF embedding
      let photoBase64 = '';
      if (card?.photo) {
        try {
          const response = await fetch(card.photo);
          const blob = await response.blob();
          const reader = new FileReader();
          photoBase64 = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.log('Could not load photo for PDF');
        }
      }

      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: white;
            }
            .card { 
              width: 340px; 
              height: 220px; 
              border: 2px solid #000; 
              background: #fff;
              position: relative;
              border-radius: 8px;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            }
            
            /* Header section - EXACTLY MATCHING PREVIEW */
            .header { 
              height: 65px; 
              background: #FF6B35; 
              color: #fff; 
              padding: 4px 8px;
              display: flex;
              flex-shrink: 0;
            }
            .header-content {
              display: flex;
              width: 100%;
              height: 100%;
            }
            .logo-area {
              width: 60px;  /* ← MATCHING PREVIEW: width: 60 */
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .logo-placeholder {
              width: 60px;  /* ← MATCHING PREVIEW: width: 60, height: 60 */
              height: 60px;
              border-radius: 2px;  /* ← MATCHING PREVIEW: borderRadius: 2 */
              background: rgba(255,255,255,0.3);
              border: 1px solid #fff;
            }
            .title-area {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding-left: 8px;
            }
            .header-text { 
              margin: 0; 
              font-size: 16px; 
              font-weight: bold;
              text-align: center;
            }
            .sub-text { 
              margin: 2px 0 0 0; 
              font-size: 11px; 
              text-align: center;
            }
            .reg-text {
              margin: 2px 0 0 0;
              font-size: 8px;
              text-align: center;
            }
            
            /* Main content section - EXACTLY MATCHING PREVIEW */
            .main-content { 
              height: 90px; 
              display: flex; 
              padding: 8px;
              flex-shrink: 0;
            }
            .photo { 
              width: 70px; 
              height: 82px;  /* ← MATCHING PREVIEW: height: 82 */
              border: 1px solid #000; 
              background: #f0f0f0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 10px;
              color: #666;
              overflow: hidden;
            }
            .photo img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .details { 
              flex: 1; 
              padding-left: 12px; 
              padding-top: 2px;
            }
            .member-row, .name-row, .location-row, .district-row {
              display: flex;
              margin-bottom: 3px;
            }
            .left-location, .left-district {
              display: flex;
              flex: 1;
            }
            .right-location, .right-pincode {
              display: flex;
              flex: 1;
            }
            .label { 
              font-size: 11px; 
              color: #000;
              margin-right: 4px;
            }
            .bold-value { 
              font-size: 11px; 
              font-weight: 600;
              color: #000;
            }
            
            /* Bottom section - REPLICATING PREVIEW FLEXBOX LOGIC */
            .bottom-section { 
              height: 57px;  /* ← MATCHING PREVIEW: height: 57 */
              border-top: 1px solid #000; 
              margin-top: 6px;  /* ← MATCHING PREVIEW: marginTop: 6 */
              padding: 8px 12px 0px;  /* ← MATCHING PREVIEW: paddingTop: 8, paddingHorizontal: 12 */
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              position: relative;
            }
            .receipt-info {
              flex: 0 0 auto;  /* ← MATCHING PREVIEW: flex: 0 */
              margin-top: 4px;  /* ← MATCHING PREVIEW: marginTop: 4 */
            }
            .receipt-left, .date-below {
              display: flex;
              margin-bottom: 3px;  /* ← MATCHING PREVIEW: marginBottom: 3 */
            }
            .bottom-label {
              font-size: 11px;
              color: #000;
              margin-right: 4px;
            }
            .bottom-value {
              font-size: 11px;
              font-weight: 600;
              color: #000;
            }
            
            /* Signature section - REPLICATING PREVIEW FLEXBOX + RELATIVE POSITIONING */
            .signature-section {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-end;
              flex: 1;  /* ← MATCHING PREVIEW: flex: 1 */
              min-height: 20px;  /* ← MATCHING PREVIEW: minHeight: 20 */
              padding: 0 20px;  /* ← MATCHING PREVIEW: paddingHorizontal: 20 */
              position: relative;
            }
            
            /* CRITICAL: Replicating the exact preview positioning logic */
            .left-signature {
              position: relative;
              top: -4px;  /* ← MATCHING PREVIEW: top: -1 */
              left: 110px;  /* ← MATCHING PREVIEW: left: 110 */
              align-items: flex-start;  /* ← MATCHING PREVIEW: alignItems: 'flex-start' */
            }
            
            .right-signature {
              position: relative;
              top: -4px;  /* ← MATCHING PREVIEW: top: -1 */
              right: 14px;  /* ← MATCHING PREVIEW: right: 14 */
              align-items: flex-end;  /* ← MATCHING PREVIEW: alignItems: 'flex-end' */
            }
            
            .sign-label {
              font-size: 12px;  /* ← MATCHING PREVIEW: fontSize: 12 */
              color: #000;
              font-weight: 500;  /* ← MATCHING PREVIEW: fontWeight: '500' */
              text-align: center;  /* ← MATCHING PREVIEW: textAlign: 'center' */
              line-height: 1;
              position: relative;
              top: -20px;  /* ← MATCHING PREVIEW: top: -20 */
            }
            
            @page {
              margin: 0;
              size: A4;
            }
            
            @media print {
              body {
                margin: 0;
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="card">
            <!-- Header - EXACTLY MATCHING PREVIEW -->
            <div class="header">
              <div class="header-content">
                <div class="logo-area">
                  <div class="logo-placeholder"></div>
                </div>
                <div class="title-area">
                  <p class="sub-text">(स्थापना १९२०)</p>
                  <p class="header-text">कुणबी समाजोन्नती संघ, मुंबई</p>
                  <p class="reg-text">रजि.क्र.एफ-५४</p>
                  <p class="reg-text">कुणबी ज्ञातीगृह, नंबर १२७ सेंटझेव्हिअर स्ट्रीट, परळ, मुंबई-१२</p>
                </div>
              </div>
            </div>
            
            <!-- Main content - EXACTLY MATCHING PREVIEW -->
            <div class="main-content">
              <div class="photo">
                ${photoBase64 ? `<img src="${photoBase64}" alt="Photo" />` : 'Photo'}
              </div>
              <div class="details">
                <div class="member-row">
                  <span class="label">आजीव सभासद क्र. :</span>
                  <span class="bold-value">${card?.memberNumber}</span>
                </div>
                <div class="name-row">
                  <span class="label">नाव :</span>
                  <span class="bold-value">${card?.name}</span>
                </div>
                <div class="location-row">
                  <div class="left-location">
                    <span class="label">गाव :</span>
                    <span class="bold-value">${card?.village}</span>
                  </div>
                  <div class="right-location">
                    <span class="label">तालुका :</span>
                    <span class="bold-value">${card?.talukaMarathi || card?.taluka}</span>
                  </div>
                </div>
                <div class="district-row">
                  <div class="left-district">
                    <span class="label">जिल्हा :</span>
                    <span class="bold-value">${card?.districtMarathi || card?.district}</span>
                  </div>
                  <div class="right-pincode">
                    <span class="label">पिनकोड :</span>
                    <span class="bold-value">${card?.pincode}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Bottom section - EXACTLY REPLICATING PREVIEW FLEXBOX LOGIC -->
            <div class="bottom-section">
              <div class="receipt-info">
                <div class="receipt-left">
                  <span class="bottom-label">पावती क्र. :</span>
                  <span class="bottom-value">${card?.receiptNumber}</span>
                </div>
                <div class="date-below">
                  <span class="bottom-label">दिनांक :</span>
                  <span class="bottom-value">${card?.date}</span>
                </div>
              </div>
              
              <!-- SIGNATURE SECTION: Replicating exact preview flexbox + relative positioning -->
              <div class="signature-section">
                <div class="left-signature">
                  <span class="sign-label">सभासदाची सही</span>
                </div>
                <div class="right-signature">
                  <span class="sign-label">अध्यक्ष</span>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>`;
      
      const { uri } = await Print.printToFileAsync({ 
        html,
        width: 612,
        height: 792,
        margins: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }
      });
      
      if (Platform.OS === 'web') {
        const a = document.createElement('a');
        a.href = uri;
        a.download = `kunabi-${card?.memberNumber}.pdf`;
        a.click();
      } else {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf' });
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert('Error', 'Unable to generate PDF');
    }
  };

  if (idList.length === 0) {
    return (
      <SafeAreaView style={styles.empty}>
        <Text style={styles.emptyText}>No IDs generated. Use Create ID tab first.</Text>
      </SafeAreaView>
    );
  }

  if (selectedIndex === null) {
    return (
      <SafeAreaView style={styles.list}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, member number, village..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <X size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results Info */}
        {searchQuery.trim() && (
          <View style={styles.resultsInfo}>
            <Text style={styles.resultsText}>
              {filteredIdList.length} of {idList.length} IDs found
            </Text>
          </View>
        )}

        {/* ID List */}
        <FlatList
          data={filteredIdList}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => {
            // Find the original index in the full list
            const originalIndex = idList.findIndex(id => 
              id.memberNumber === item.memberNumber && 
              id.name === item.name &&
              id.receiptNumber === item.receiptNumber
            );
            
            return (
              <TouchableOpacity 
                style={styles.listItem} 
                onPress={() => setSelectedIndex(originalIndex)}
              >
                <View style={styles.listItemContent}>
                  <Text style={styles.listTitle}>#{item.memberNumber} – {item.name}</Text>
                  <Text style={styles.listSubtitle}>
                    {item.village}, {item.talukaMarathi || item.taluka}
                  </Text>
                  <Text style={styles.listDetails}>
                    Receipt: {item.receiptNumber} | Date: {item.date}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            searchQuery.trim() ? (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No IDs found matching "{searchQuery}"</Text>
                <TouchableOpacity onPress={clearSearch} style={styles.clearSearchButton}>
                  <Text style={styles.clearSearchText}>Clear Search</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={() => setSelectedIndex(null)} style={styles.back}>
          <ArrowLeft size={20} /><Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View ref={cardRef} style={styles.card}>
          {/* HEADER SECTION - Orange background with organization details */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.logoArea}>
                {/* Logo placeholder - you can add actual logo here */}
                <View style={styles.logoPlaceholder} />
              </View>
              <View style={styles.titleArea}>
                <Text style={styles.subText}>(स्थापना १९२०)</Text>
                <Text style={styles.headerText}>कुणबी समाजोन्नती संघ, मुंबई</Text>
                <Text style={styles.regText}>रजि.क्र.एफ-५४ </Text>
                <Text style={styles.regText}>कुणबी ज्ञातीगृह, नंबर १२७ सेंटझेव्हिअर स्ट्रीट, परळ, मुंबई-१२</Text>
              </View>
            </View>
          </View>

          {/* MAIN CONTENT SECTION - Photo and member details */}
          <View style={styles.mainContent}>
            {/* Photo area */}
            {card?.photo ? (
              <Image source={{ uri: card.photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoText}>Photo</Text>
              </View>
            )}
            
            {/* Member details area */}
            <View style={styles.details}>
              <View style={styles.memberRow}>
                <Text style={styles.label}>आजीव सभासद क्र. :</Text>
                <Text style={styles.boldValue}>{card?.memberNumber}</Text>
              </View>
              
              <View style={styles.nameRow}>
                <Text style={styles.label}>नाव :</Text>
                <Text style={styles.boldValue}>{card?.name}</Text>
              </View>
              
              <View style={styles.locationRow}>
                <View style={styles.leftLocation}>
                  <Text style={styles.label}>गाव :</Text>
                  <Text style={styles.boldValue}>{card?.village}</Text>
                </View>
                <View style={styles.rightLocation}>
                  <Text style={styles.label}>तालुका :</Text>
                  <Text style={styles.boldValue}>{card?.talukaMarathi || card?.taluka}</Text>
                </View>
              </View>
              
              <View style={styles.districtRow}>
                <View style={styles.leftDistrict}>
                  <Text style={styles.label}>जिल्हा :</Text>
                  <Text style={styles.boldValue}>{card?.districtMarathi || card?.district}</Text>
                </View>
                <View style={styles.rightPincode}>
                  <Text style={styles.label}>पिनकोड :</Text>
                  <Text style={styles.boldValue}>{card?.pincode}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* BOTTOM SECTION - Receipt info and signatures (POSITIONED BELOW PHOTO/TEXT WITH ADJUSTABLE SPACING) */}
          <View style={styles.bottomSection}>
            {/* RECEIPT AND DATE INFORMATION - Positioned below the border line */}
            <View style={styles.receiptInfo}>
              <View style={styles.receiptLeft}>
                <Text style={styles.bottomLabel}>पावती क्र. :</Text>
                <Text style={styles.bottomValue}>{card?.receiptNumber}</Text>
              </View>
              <View style={styles.dateBelow}>
                <Text style={styles.bottomLabel}>दिनांक :</Text>
                <Text style={styles.bottomValue}>{card?.date}</Text>
              </View>
            </View>
            
            {/* SIGNATURE SECTION - Fixed positioning with constant text */}
            <View style={styles.signatureSection}>
              <View style={styles.leftSignature}>
                <Text style={styles.signLabel}>सभासदाची सही</Text>
              </View>
              <View style={styles.rightSignature}>
                <Text style={styles.signLabel}>अध्यक्ष</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnShare} onPress={shareImage}>
            <Share2 size={16} color="#fff" /><Text style={styles.btnText}>Share Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnPdf} onPress={sharePDF}>
            <FileText size={16} color="#fff" /><Text style={styles.btnText}>Generate PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  empty: { flex:1, justifyContent:'center', alignItems:'center' },
  emptyText: { color:'#666', fontSize:16 },
  
  list: { flex:1 },
  
  // Search Bar Styles
  searchContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  searchIcon: {
    marginRight: 8,
  },
  
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
  
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  
  // Results Info
  resultsInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
  },
  
  resultsText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  
  // List Item Styles
  listItem: { 
    padding: 16, 
    borderBottomWidth: 1, 
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  
  listItemContent: {
    flex: 1,
  },
  
  listTitle: { 
    fontSize: 16, 
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  
  listSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  
  listDetails: {
    fontSize: 12,
    color: '#999',
  },
  
  // No Results
  noResults: {
    padding: 32,
    alignItems: 'center',
  },
  
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  
  clearSearchButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  
  clearSearchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },

  container: { flex:1, backgroundColor:'#f0f0f0' },
  scroll: { alignItems:'center', paddingVertical:16 },

  back: { flexDirection:'row', alignItems:'center', marginBottom:8 },
  backText: { marginLeft:4, fontSize:16 },

  // ID CARD CONTAINER - Fixed dimensions
  card: {
    width: 340,
    height: 220,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },

  // HEADER SECTION - Orange background with organization info
  header: {
    height: 65,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerContent: {
    flexDirection: 'row',
    height: '100%',
  },
  logoArea: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: '#fff',
  },
  titleArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  headerText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: { 
    color: '#fff', 
    fontSize: 11, 
    textAlign: 'center',
    marginTop: 2,
  },
  regText: {
    color: '#fff',
    fontSize: 8,
    textAlign: 'center',
    marginTop: 2,
  },

  // MAIN CONTENT SECTION - Photo and member details
  mainContent: {
    height: 90,
    flexDirection: 'row',
    padding: 8,
  },
  
  // Photo area
  photo: {
    width: 70,
    height: 82,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
  },

  photoPlaceholder: {
    width: 70,
    height: 82,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  photoText: {
    fontSize: 10,
    color: '#666',
  },
  
  // Member details area
  details: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 2,
  },
  
  memberRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  
  nameRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  
  locationRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  
  leftLocation: {
    flexDirection: 'row',
    flex: 1,
  },
  
  rightLocation: {
    flexDirection: 'row',
    flex: 1,
  },
  
  districtRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  
  leftDistrict: {
    flexDirection: 'row',
    flex: 1,
  },
  
  rightPincode: {
    flexDirection: 'row',
    flex: 1,
  },
  
  label: { 
    fontSize: 11, 
    color: '#000',
    marginRight: 4,
  },
  
  boldValue: { 
    fontSize: 11, 
    fontWeight: '600',
    color: '#000',
  },

  // BOTTOM SECTION - Receipt info and signatures (POSITIONED BELOW PHOTO/TEXT WITH ADJUSTABLE SPACING)
  bottomSection: {
    height: 57, // 🔧 ADJUST THIS VALUE to move the bottom section up/down (current: 57px)
    borderTopWidth: 1, // Thicker border to separate from main content
    borderTopColor: '#000',
    marginTop: 6, // 🔧 ADJUST THIS VALUE to add more space between photo/text and bottom line (current: 6px)
    paddingHorizontal: 12,
    paddingTop: 8, // 🔧 ADJUST THIS VALUE to move receipt/date fields down from border line (current: 8px)
    // paddingBottom: 8,
    justifyContent: 'space-between',
  },
  
  // RECEIPT INFORMATION AREA - Positioned below the border line with adjustable spacing
  receiptInfo: {
    flex: 0, // Don't expand
    marginTop: 4, // 🔧 ADJUST THIS VALUE to move receipt/date fields further down (current: 4px)
  },
  
  receiptLeft: {
    flexDirection: 'row',
    marginBottom: 3, // 🔧 ADJUST THIS VALUE to change spacing between receipt and date lines (current: 3px)
  },
  
  dateBelow: {
    flexDirection: 'row',
  },
  
  bottomLabel: {
    fontSize: 11,
    color: '#000',
    marginRight: 4,
  },
  
  bottomValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000',
  },
  
  // SIGNATURE SECTION - Fixed positioning with constant text
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1, // Take remaining space
    minHeight: 20, // Minimum height for signatures
    paddingHorizontal: 20, // Padding from edges
  },
  
  leftSignature: {
    alignItems: 'flex-start',
    position: 'relative',
    top: -1,    // vertical nudge
    left: 110,    // horizontal shift
  },
  
  rightSignature: {
    alignItems: 'flex-end',
    position: 'relative',
    top: -1,    // vertical nudge
    right: 14,
  },
  
  // CONSTANT SIGNATURE TEXT - Always shows "सभासदाची सही" and "अध्यक्ष"
 signLabel: {
  fontSize: 12,
  color: '#000',
  fontWeight: '500',
  textAlign: 'center',
  position: 'relative',
  top: -20,    // ← moves the text up by 20px
},
 

  // Action buttons
  actions: { flexDirection: 'row', gap: 12 },
  btnShare: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    padding: 8,
    borderRadius: 4,
  },
  btnPdf: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  btnText: { color: '#fff', marginLeft: 4, fontSize: 14 },
});
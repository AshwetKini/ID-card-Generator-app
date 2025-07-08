export interface District {
  name: string;
  marathi: string;
  talukas: { name: string; marathi: string }[];
}

export const DISTRICTS_DATA: District[] = [
  {
    name: 'Mumbai City',
    marathi: 'मुंबई शहर',
    talukas: [
      { name: 'Mumbai City', marathi: 'मुंबई शहर' },
      { name: 'Mumbai Suburban', marathi: 'मुंबई उपनगर' }
    ]
  },
  {
    name: 'Mumbai Suburban',
    marathi: 'मुंबई उपनगर',
    talukas: [
      { name: 'Andheri', marathi: 'अंधेरी' },
      { name: 'Borivali', marathi: 'बोरिवली' },
      { name: 'Kurla', marathi: 'कुर्ला' }
    ]
  },
  {
    name: 'Thane',
    marathi: 'ठाणे',
    talukas: [
      { name: 'Thane', marathi: 'ठाणे' },
      { name: 'Kalyan', marathi: 'कल्याण' },
      { name: 'Murbad', marathi: 'मुरबाड' },
      { name: 'Bhiwandi', marathi: 'भिवंडी' },
      { name: 'Shahapur', marathi: 'शहापूर' },
      { name: 'Ulhasnagar', marathi: 'उल्हासनगर' },
      { name: 'Ambarnath', marathi: 'अंबरनाथ' }
    ]
  },
  {
    name: 'Palghar',
    marathi: 'पालघर',
    talukas: [
      { name: 'Palghar', marathi: 'पालघर' },
      { name: 'Dahanu', marathi: 'दहाणू' },
      { name: 'Vada', marathi: 'वाडा' },
      { name: 'Vasai', marathi: 'वसई' },
      { name: 'Jawhar', marathi: 'जव्हार' },
      { name: 'Mokhada', marathi: 'मोकड्या' },
      { name: 'Talasari', marathi: 'तालासरी' },
      { name: 'Vikramgad', marathi: 'विक्रमगड' }
    ]
  },
  {
    name: 'Raigad',
    marathi: 'रायगड',
    talukas: [
      { name: 'Alibag', marathi: 'अलिबाग' },
      { name: 'Murud', marathi: 'मुरुड' },
      { name: 'Panvel', marathi: 'पनवेल' },
      { name: 'Pen', marathi: 'पेण' },
      { name: 'Roha', marathi: 'रोहा' },
      { name: 'Sudhagad', marathi: 'सुधागड' },
      { name: 'Tala', marathi: 'ताळा' },
      { name: 'Karjat', marathi: 'कर्जत' },
      { name: 'Khalapur', marathi: 'खालापूर' },
      { name: 'Mahad', marathi: 'महाड' },
      { name: 'Mangaon', marathi: 'मांगाव' },
      { name: 'Mhasla', marathi: 'म्हसळा' },
      { name: 'Poladpur', marathi: 'पोलादपूर' },
      { name: 'Revdanda', marathi: 'रेवदंडा' },
      { name: 'Shrivardhan', marathi: 'श्रीवर्धन' },
      { name: 'Uran', marathi: 'उरण' }
    ]
  },
  {
    name: 'Ratnagiri',
    marathi: 'रत्नागिरी',
    talukas: [
      { name: 'Ratnagiri', marathi: 'रत्नागिरी' },
      { name: 'Rajapur', marathi: 'राजापूर' },
      { name: 'Khed', marathi: 'खेड़' },
      { name: 'Guhagar', marathi: 'गुहागर' },
      { name: 'Chiplun', marathi: 'चिपळूण' },
      { name: 'Sangameshwar', marathi: 'सांगमेश्वर' },
      { name: 'Dapoli', marathi: 'दापोली' },
      { name: 'Mandangad', marathi: 'मंडंगड' },
      { name: 'Lanja', marathi: 'लांजा' }
    ]
  },
  {
    name: 'Sindhudurg',
    marathi: 'सिंधुदुर्ग',
    talukas: [
      { name: 'Kudal', marathi: 'कुडाळ' },
      { name: 'Sawantwadi', marathi: 'सावंतवाडी' },
      { name: 'Kankavli', marathi: 'कणकवली' },
      { name: 'Vengurla', marathi: 'वेंगुर्ला' },
      { name: 'Malvan', marathi: 'मालवण' },
      { name: 'Dodamarg', marathi: 'दोड़मार्ग' }
    ]
  },
  {
    name: 'Pune',
    marathi: 'पुणे',
    talukas: [
      { name: 'Pune City', marathi: 'पुणे शहर' },
      { name: 'Pimpri-Chinchwad', marathi: 'पिंपरी-चिंचवड' },
      { name: 'Haveli', marathi: 'हवेली' },
      { name: 'Mulshi', marathi: 'मुळशी' },
      { name: 'Velhe', marathi: 'वेल्हे' },
      { name: 'Bhor', marathi: 'भोर' },
      { name: 'Purandar', marathi: 'पुरंदर' },
      { name: 'Baramati', marathi: 'बारामती' },
      { name: 'Daund', marathi: 'दौंड' },
      { name: 'Indapur', marathi: 'इंदापूर' },
      { name: 'Manal', marathi: 'मानल' },
      { name: 'Khed', marathi: 'खेड' },
      { name: 'Ambegaon', marathi: 'अंबेगाव' },
      { name: 'Junnar', marathi: 'जुन्नर' },
      { name: 'Shirur', marathi: 'शिरूर' }
    ]
  },
  {
    name: 'Nashik',
    marathi: 'नाशिक',
    talukas: [
      { name: 'Nashik', marathi: 'नाशिक' },
      { name: 'Sinnar', marathi: 'सिन्नर' },
      { name: 'Dindori', marathi: 'दिंडोरी' },
      { name: 'Peint', marathi: 'पेंट' },
      { name: 'Trimbakeshwar', marathi: 'त्र्यंबकेश्वर' },
      { name: 'Kalwan', marathi: 'कळवण' },
      { name: 'Deola', marathi: 'देवळा' },
      { name: 'Baglan', marathi: 'बागलाण' },
      { name: 'Chandwad', marathi: 'चांदवड' },
      { name: 'Niphad', marathi: 'निफाड' },
      { name: 'Yevla', marathi: 'येवला' },
      { name: 'Malegaon', marathi: 'मालेगाव' },
      { name: 'Nandgaon', marathi: 'नांदगाव' },
      { name: 'Surgana', marathi: 'सुरगाणा' },
      { name: 'Igatpuri', marathi: 'इगतपुरी' }
    ]
  },
  {
    name: 'Ahmednagar',
    marathi: 'अहमदनगर',
    talukas: [
      { name: 'Ahmednagar', marathi: 'अहमदनगर' },
      { name: 'Akole', marathi: 'आकोले' },
      { name: 'Jamkhed', marathi: 'जामखेड' },
      { name: 'Karjat', marathi: 'कर्जत' },
      { name: 'Kopargaon', marathi: 'कोपरगाव' },
      { name: 'Nagar', marathi: 'नगर' },
      { name: 'Nevasa', marathi: 'नेवासा' },
      { name: 'Parner', marathi: 'पारनेर' },
      { name: 'Pathardi', marathi: 'पथर्डी' },
      { name: 'Rahata', marathi: 'राहाता' },
      { name: 'Rahuri', marathi: 'राहुरी' },
      { name: 'Sangamner', marathi: 'संगमनेर' },
      { name: 'Shevgaon', marathi: 'शेवगाव' },
      { name: 'Shrigonda', marathi: 'श्रीगोंदा' },
      { name: 'Shrirampur', marathi: 'श्रीरामपूर' }
    ]
  },
  {
    name: 'Solapur',
    marathi: 'सोलापूर',
    talukas: [
      { name: 'Solapur North', marathi: 'सोलापूर उत्तर' },
      { name: 'Solapur South', marathi: 'सोलापूर दक्षिण' },
      { name: 'Akkalkot', marathi: 'अक्कलकोट' },
      { name: 'Barshi', marathi: 'बार्शी' },
      { name: 'Karmala', marathi: 'करमाळा' },
      { name: 'Madha', marathi: 'माढा' },
      { name: 'Malshiras', marathi: 'माळशिरस' },
      { name: 'Mangalvedhe', marathi: 'मंगळवेढे' },
      { name: 'Mohol', marathi: 'मोहोळ' },
      { name: 'Pandharpur', marathi: 'पंढरपूर' },
      { name: 'Sangole', marathi: 'सांगोले' }
    ]
  },
  {
    name: 'Satara',
    marathi: 'सातारा',
    talukas: [
      { name: 'Satara', marathi: 'सातारा' },
      { name: 'Jaoli', marathi: 'जावळी' },
      { name: 'Karad', marathi: 'कराड' },
      { name: 'Khandala', marathi: 'खंडाळा' },
      { name: 'Khatav', marathi: 'खटाव' },
      { name: 'Koregaon', marathi: 'कोरेगाव' },
      { name: 'Man', marathi: 'मान' },
      { name: 'Mahabaleshwar', marathi: 'महाबळेश्वर' },
      { name: 'Patan', marathi: 'पाटण' },
      { name: 'Phaltan', marathi: 'फलटण' },
      { name: 'Wai', marathi: 'वाई' }
    ]
  },
  {
    name: 'Sangli',
    marathi: 'सांगली',
    talukas: [
      { name: 'Sangli', marathi: 'सांगली' },
      { name: 'Atpadi', marathi: 'आटपाडी' },
      { name: 'Jat', marathi: 'जत' },
      { name: 'Kadegaon', marathi: 'कडेगाव' },
      { name: 'Kavathe Mahankal', marathi: 'कवठे महांकाळ' },
      { name: 'Khanapur', marathi: 'खानापूर' },
      { name: 'Miraj', marathi: 'मिरज' },
      { name: 'Palus', marathi: 'पलूस' },
      { name: 'Shirala', marathi: 'शिराळा' },
      { name: 'Tasgaon', marathi: 'तासगाव' },
      { name: 'Walwa', marathi: 'वाळवा' }
    ]
  },
  {
    name: 'Kolhapur',
    marathi: 'कोल्हापूर',
    talukas: [
      { name: 'Karvir', marathi: 'कर्वीर' },
      { name: 'Panhala', marathi: 'पन्हाळा' },
      { name: 'Hatkanangle', marathi: 'हातकणंगले' },
      { name: 'Shirol', marathi: 'शिरोळ' },
      { name: 'Bhudargad', marathi: 'भुदरगड' },
      { name: 'Ajra', marathi: 'अजरा' },
      { name: 'Gadhinglaj', marathi: 'गडहिंग्लज' },
      { name: 'Chandgad', marathi: 'चांदगड' },
      { name: 'Radhanagari', marathi: 'राधानगरी' },
      { name: 'Kagal', marathi: 'कागल' },
      { name: 'Shahuwadi', marathi: 'शाहूवाडी' }
    ]
  },
  {
    name: 'Aurangabad',
    marathi: 'औरंगाबाद',
    talukas: [
      { name: 'Aurangabad', marathi: 'औरंगाबाद' },
      { name: 'Kannad', marathi: 'कन्नड' },
      { name: 'Khultabad', marathi: 'खुल्ताबाद' },
      { name: 'Phulambri', marathi: 'फुलंब्री' },
      { name: 'Gangapur', marathi: 'गंगापूर' },
      { name: 'Paithan', marathi: 'पैठण' },
      { name: 'Soygaon', marathi: 'सोयगाव' },
      { name: 'Sillod', marathi: 'सिल्लोड' },
      { name: 'Vaijapur', marathi: 'वैजापूर' }
    ]
  },
  {
    name: 'Jalna',
    marathi: 'जालना',
    talukas: [
      { name: 'Jalna', marathi: 'जालना' },
      { name: 'Ambad', marathi: 'अंबड' },
      { name: 'Badnapur', marathi: 'बदनापूर' },
      { name: 'Bhokardan', marathi: 'भोकरदन' },
      { name: 'Ghansawangi', marathi: 'घनसावंगी' },
      { name: 'Jafrabad', marathi: 'जाफराबाद' },
      { name: 'Mantha', marathi: 'मंठा' },
      { name: 'Partur', marathi: 'परतूर' }
    ]
  },
  {
    name: 'Beed',
    marathi: 'बीड',
    talukas: [
      { name: 'Beed', marathi: 'बीड' },
      { name: 'Ambajogai', marathi: 'अंबाजोगाई' },
      { name: 'Ashti', marathi: 'आष्टी' },
      { name: 'Georai', marathi: 'गेवराई' },
      { name: 'Kaij', marathi: 'काईज' },
      { name: 'Majalgaon', marathi: 'मजलगाव' },
      { name: 'Parli', marathi: 'परळी' },
      { name: 'Patoda', marathi: 'पाटोदा' },
      { name: 'Shirur-Kasar', marathi: 'शिरूर-कासर' },
      { name: 'Wadwani', marathi: 'वडवणी' }
    ]
  },
  {
    name: 'Hingoli',
    marathi: 'हिंगोली',
    talukas: [
      { name: 'Hingoli', marathi: 'हिंगोली' },
      { name: 'Aundha', marathi: 'औंढा' },
      { name: 'Basmath', marathi: 'बसमत' },
      { name: 'Kalamnuri', marathi: 'कळमनुरी' },
      { name: 'Sengaon', marathi: 'सेनगाव' }
    ]
  },
  {
    name: 'Parbhani',
    marathi: 'परभणी',
    talukas: [
      { name: 'Parbhani', marathi: 'परभणी' },
      { name: 'Gangakhed', marathi: 'गंगाखेड' },
      { name: 'Jintur', marathi: 'जिंतूर' },
      { name: 'Manwath', marathi: 'मानवत' },
      { name: 'Palam', marathi: 'पालम' },
      { name: 'Pathri', marathi: 'पाथरी' },
      { name: 'Purna', marathi: 'पूर्णा' },
      { name: 'Sailu', marathi: 'सैलू' },
      { name: 'Sonpeth', marathi: 'सोनपेठ' }
    ]
  },
  {
    name: 'Nanded',
    marathi: 'नांदेड',
    talukas: [
      { name: 'Nanded', marathi: 'नांदेड' },
      { name: 'Ardhapur', marathi: 'अर्धापूर' },
      { name: 'Bhokar', marathi: 'भोकर' },
      { name: 'Biloli', marathi: 'बिलोली' },
      { name: 'Degloor', marathi: 'देगलूर' },
      { name: 'Dharmabad', marathi: 'धर्माबाद' },
      { name: 'Hadgaon', marathi: 'हडगाव' },
      { name: 'Himayatnagar', marathi: 'हिमायतनगर' },
      { name: 'Kandhar', marathi: 'कंधार' },
      { name: 'Kinwat', marathi: 'किनवट' },
      { name: 'Loha', marathi: 'लोहा' },
      { name: 'Mahoor', marathi: 'माहूर' },
      { name: 'Mudkhed', marathi: 'मुदखेड' },
      { name: 'Mukhed', marathi: 'मुखेड' },
      { name: 'Naigaon', marathi: 'नायगाव' },
      { name: 'Umri', marathi: 'उमरी' }
    ]
  },
  {
    name: 'Latur',
    marathi: 'लातूर',
    talukas: [
      { name: 'Latur', marathi: 'लातूर' },
      { name: 'Ahmadpur', marathi: 'अहमदपूर' },
      { name: 'Ausa', marathi: 'औसा' },
      { name: 'Chakur', marathi: 'चाकूर' },
      { name: 'Deoni', marathi: 'देवणी' },
      { name: 'Jalkot', marathi: 'जळकोट' },
      { name: 'Nilanga', marathi: 'निलंगा' },
      { name: 'Renapur', marathi: 'रेणापूर' },
      { name: 'Shirur-Anantpal', marathi: 'शिरूर-अनंतपाळ' },
      { name: 'Udgir', marathi: 'उदगीर' }
    ]
  },
  {
    name: 'Osmanabad',
    marathi: 'उस्मानाबाद',
    talukas: [
      { name: 'Osmanabad', marathi: 'उस्मानाबाद' },
      { name: 'Bhum', marathi: 'भूम' },
      { name: 'Kalamb', marathi: 'कळंब' },
      { name: 'Lohara', marathi: 'लोहारा' },
      { name: 'Omerga', marathi: 'उमरगा' },
      { name: 'Paranda', marathi: 'परांडा' },
      { name: 'Tuljapur', marathi: 'तुळजापूर' },
      { name: 'Washi', marathi: 'वाशी' }
    ]
  },
  {
    name: 'Buldhana',
    marathi: 'बुलडाणा',
    talukas: [
      { name: 'Buldhana', marathi: 'बुलडाणा' },
      { name: 'Chikhli', marathi: 'चिखली' },
      { name: 'Deulgaon Raja', marathi: 'देउळगाव राजा' },
      { name: 'Jalgaon Jamod', marathi: 'जळगाव जामोद' },
      { name: 'Khamgaon', marathi: 'खामगाव' },
      { name: 'Lonar', marathi: 'लोणार' },
      { name: 'Malkapur', marathi: 'मल्कापूर' },
      { name: 'Mehkar', marathi: 'मेहकर' },
      { name: 'Motala', marathi: 'मोताळा' },
      { name: 'Nandura', marathi: 'नांदुरा' },
      { name: 'Sangrampur', marathi: 'संग्रामपूर' },
      { name: 'Shegaon', marathi: 'शेगाव' },
      { name: 'Sindkhed Raja', marathi: 'सिंदखेड राजा' }
    ]
  },
  {
    name: 'Akola',
    marathi: 'अकोला',
    talukas: [
      { name: 'Akola', marathi: 'अकोला' },
      { name: 'Akot', marathi: 'आकोट' },
      { name: 'Balapur', marathi: 'बालापूर' },
      { name: 'Barshitakli', marathi: 'बार्शिटाकली' },
      { name: 'Murtijapur', marathi: 'मुर्तिजापूर' },
      { name: 'Patur', marathi: 'पातूर' },
      { name: 'Telhara', marathi: 'तेल्हारा' }
    ]
  },
  {
    name: 'Washim',  
    marathi: 'वाशिम',  
    talukas: [  
      { name: 'Washim', marathi: 'वाशिम' },  
      { name: 'Karanja', marathi: 'करंजा' },  
      { name: 'Malegaon', marathi: 'मालेगाव' },  
      { name: 'Mangrulpir', marathi: 'मांगरुळपीर' },  
      { name: 'Manora', marathi: 'मनोरा' },  
      { name: 'Risod', marathi: 'रिसोड' }  
    ]  
  },  
  {  
    name: 'Amravati',  
    marathi: 'अमरावती',  
    talukas: [  
      { name: 'Amravati', marathi: 'अमरावती' },  
      { name: 'Achalpur', marathi: 'अचलपूर' },  
      { name: 'Anjangaon Surji', marathi: 'अंजनगाव सुर्जी' },  
      { name: 'Bhatkuli', marathi: 'भटकुली' },  
      { name: 'Chandur Bazar', marathi: 'चांदूर बाजार' },  
      { name: 'Chandur Railway', marathi: 'चांदूर रेल्वे' },  
      { name: 'Chikhaldara', marathi: 'चिखलदरा' },  
      { name: 'Churni', marathi: 'चूर्णी' },  
      { name: 'Daryapur', marathi: 'दर्यापूर' },  
      { name: 'Dharni', marathi: 'धर्णी' },  
      { name: 'Dhamangaon Railway', marathi: 'धामणगाव रेल्वे' },  
      { name: 'Morshi', marathi: 'मोर्शी' },  
      { name: 'Nandgaon Khandeshwar', marathi: 'नांदगाव खंडेश्वर' },  
      { name: 'Teosa', marathi: 'तेओसा' },  
      { name: 'Warud', marathi: 'वरुड' }  
    ]  
  },  
  {  
    name: 'Nagpur',  
    marathi: 'नागपूर',  
    talukas: [  
      { name: 'Nagpur Rural', marathi: 'नागपूर ग्रामीण' },  
      { name: 'Nagpur Urban', marathi: 'नागपूर शहरी' },  
      { name: 'Bhiwapur', marathi: 'भिवापूर' },  
      { name: 'Hingna', marathi: 'हिंगणा' },  
      { name: 'Kalmeshwar', marathi: 'कळमेश्वर' },  
      { name: 'Kamptee', marathi: 'कांपटी' },  
      { name: 'Katol', marathi: 'कटोल' },  
      { name: 'Kuhi', marathi: 'कुही' },  
      { name: 'Mauda', marathi: 'मौदा' },  
      { name: 'Narkhed', marathi: 'नरखेड' },  
      { name: 'Parseoni', marathi: 'परसेवनी' },  
      { name: 'Ramtek', marathi: 'रामटेक' },  
      { name: 'Saoner', marathi: 'सावनेर' },  
      { name: 'Umred', marathi: 'उमरेड' }  
    ]  
  },  
  {  
    name: 'Wardha',  
    marathi: 'वर्धा',  
    talukas: [  
      { name: 'Wardha', marathi: 'वर्धा' },  
      { name: 'Arvi', marathi: 'अर्वी' },  
      { name: 'Ashti', marathi: 'आष्टी' },  
      { name: 'Deoli', marathi: 'देवळी' },  
      { name: 'Hinganghat', marathi: 'हिंगणघाट' },  
      { name: 'Karanja', marathi: 'करंजी' },  
      { name: 'Samudrapur', marathi: 'समुद्रपूर' },  
      { name: 'Seloo', marathi: 'सेलू' }  
    ]  
  },  
  {  
    name: 'Chandrapur',  
    marathi: 'चंद्रपूर',  
    talukas: [  
      { name: 'Chandrapur', marathi: 'चंद्रपूर' },  
      { name: 'Ballarpur', marathi: 'बल्लारपूर' },  
      { name: 'Bhadravati', marathi: 'भद्रावती' },  
      { name: 'Bramhapuri', marathi: 'ब्रह्मपुरी' },  
      { name: 'Chimur', marathi: 'चिमूर' },  
      { name: 'Corporal', marathi: 'कॉर्पोरल' },  
      { name: 'Gadchandur', marathi: 'गडचंदूर' },  
      { name: 'Gondpipri', marathi: 'गोंदपिपरी' },  
      { name: 'Jivati', marathi: 'जिवती' },  
      { name: 'Mul', marathi: 'मूळ' },  
      { name: 'Nagbhir', marathi: 'नागभीर' },  
      { name: 'Pombhurna', marathi: 'पोंभुर्णा' },  
      { name: 'Rajura', marathi: 'राजुरा' },  
      { name: 'Sindewahi', marathi: 'सिंदेवाही' },  
      { name: 'Warora', marathi: 'वरोरा' }  
    ]  
  },  
  {  
    name: 'Gadchiroli',  
    marathi: 'गडचिरोली',  
    talukas: [  
      { name: 'Gadchiroli', marathi: 'गडचिरोली' },  
      { name: 'Aheri', marathi: 'आहेरी' },  
      { name: 'Armori', marathi: 'आर्मोरी' },  
      { name: 'Bhamragad', marathi: 'भामरागड' },  
      { name: 'Chamorshi', marathi: 'चामोर्शी' },  
      { name: 'Desaiganj', marathi: 'देसाईगंज' },  
      { name: 'Dhanora', marathi: 'धनोरा' },  
      { name: 'Etapalli', marathi: 'एटापल्ली' },  
      { name: 'Korchi', marathi: 'कोर्ची' },  
      { name: 'Kurkheda', marathi: 'कुर्खेडा' },  
      { name: 'Mulchera', marathi: 'मुलचेरा' },  
      { name: 'Sironcha', marathi: 'सिरोंचा' }  
    ]  
  },  
  {  
    name: 'Bhandara',  
    marathi: 'भंडारा',  
    talukas: [  
      { name: 'Bhandara', marathi: 'भंडारा' },  
      { name: 'Lakhandur', marathi: 'लाखंदूर' },  
      { name: 'Lakhani', marathi: 'लाखानी' },  
      { name: 'Mohadi', marathi: 'मोहाडी' },  
      { name: 'Pauni', marathi: 'पौनी' },  
      { name: 'Sakoli', marathi: 'साकोली' },  
      { name: 'Tumsar', marathi: 'तुमसर' }  
    ]  
  },  
  {  
    name: 'Gondia',  
    marathi: 'गोंदिया',  
    talukas: [  
      { name: 'Gondia', marathi: 'गोंदिया' },  
      { name: 'Amgaon', marathi: 'आमगाव' },  
      { name: 'Arjuni Morgaon', marathi: 'अर्जुनी मोरगाव' },  
      { name: 'Deori', marathi: 'देवरी' },  
      { name: 'Goregaon', marathi: 'गोरेगाव' },  
      { name: 'Sadak Arjuni', marathi: 'सडक अर्जुनी' },  
      { name: 'Salekasa', marathi: 'सालेकसा' },  
      { name: 'Tirora', marathi: 'तिरोरा' }  
    ]  
  },  
  {  
    name: 'Yavatmal',  
    marathi: 'यवतमाळ',  
    talukas: [  
      { name: 'Yavatmal', marathi: 'यवतमाळ' },  
      { name: 'Arni', marathi: 'अर्णी' },  
      { name: 'Babhulgaon', marathi: 'बाभुळगाव' },  
      { name: 'Darwha', marathi: 'दरवहा' },  
      { name: 'Digras', marathi: 'दिग्रस' },  
      { name: 'Ghatanji', marathi: 'घाटंजी' },  
      { name: 'Karanji', marathi: 'करंजी' },  
      { name: 'Lohara', marathi: 'लोहारा' },  
      { name: 'Mahagaon', marathi: 'महागाव' },  
      { name: 'Maregaon', marathi: 'मारेगाव' },  
      { name: 'Ner', marathi: 'नेर' },  
      { name: 'Pusad', marathi: 'पुसद' },  
      { name: 'Ralegaon', marathi: 'राळेगाव' },  
      { name: 'Umarkhed', marathi: 'उमरखेड' },  
      { name: 'Wani', marathi: 'वाणी' },  
      { name: 'Zari-Jamani', marathi: 'झारी-जमानी' }  
    ]  
  },  
  {  
    name: 'Dhule',  
    marathi: 'धुळे',  
    talukas: [  
      { name: 'Dhule', marathi: 'धुळे' },  
      { name: 'Sakri', marathi: 'साक्री' },  
      { name: 'Shirpur', marathi: 'शिरपूर' },  
      { name: 'Sindkhede', marathi: 'सिंदखेडे' }  
    ]  
  },  
  {  
    name: 'Jalgaon',  
    marathi: 'जळगाव',  
    talukas: [  
      { name: 'Jalgaon', marathi: 'जळगाव' },  
      { name: 'Amalner', marathi: 'अमळनेर' },  
      { name: 'Bhusawal', marathi: 'भुसावळ' },  
      { name: 'Bodwad', marathi: 'बोदवड' },  
      { name: 'Chalisgaon', marathi: 'चाळीसगाव' },  
      { name: 'Chopda', marathi: 'चोपडा' },  
      { name: 'Dharangaon', marathi: 'धरणगाव' },  
      { name: 'Erandol', marathi: 'एरंडोल' },  
      { name: 'Faizpur', marathi: 'फैजपूर' },  
      { name: 'Jamner', marathi: 'जामनेर' },  
      { name: 'Muktainagar', marathi: 'मुक्तैनगर' },  
      { name: 'Pachora', marathi: 'पाचोरा' },  
      { name: 'Parola', marathi: 'परोळा' },  
      { name: 'Raver', marathi: 'रावेर' },  
      { name: 'Yawal', marathi: 'यावल' }  
    ]  
  },  
  {  
    name: 'Nandurbar',  
    marathi: 'नंदुरबार',  
    talukas: [  
      { name: 'Nandurbar', marathi: 'नंदुरबार' },  
      { name: 'Akkalkuwa', marathi: 'अक्कलकुवा' },  
      { name: 'Akrani', marathi: 'अकराणी' },  
      { name: 'Dhadgaon', marathi: 'धडगाव' },  
      { name: 'Nawapur', marathi: 'नवापूर' },  
      { name: 'Shahada', marathi: 'शहादा' },  
      { name: 'Taloda', marathi: 'तालोदा' }  
    ]  
  }  
];

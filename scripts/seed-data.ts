// Seed script to add sample product data to Firestore
// Run with: npx tsx scripts/seed-data.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2l8TJCtDP8y4DdBFeM34gFDt6B8iISRo",
  authDomain: "qrmanufacturingtracking.firebaseapp.com",
  projectId: "qrmanufacturingtracking",
  storageBucket: "qrmanufacturingtracking.firebasestorage.app",
  messagingSenderId: "285894723154",
  appId: "1:285894723154:web:06101925b9dd0d5f1f418b",
};

console.log('Initializing Firebase with project:', firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample product data
const sampleProducts = [
  // ============ GHEE ============
  {
    handle: 'desi-cow-ghee',
    category: 'Ghee',
    productName: 'Desi Cow Ghee',
    variant: '',
    manufacturedBy: `Aira Dairy Products, Mohanur Block, Namakkal, Tamil Nadu - 637002`,
    fssaiLicense: '12424014000490',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'gir-cow-ghee',
    category: 'Ghee',
    productName: 'Gir Cow Ghee',
    variant: '',
    manufacturedBy: `SGB Food Products Pvt Ltd., Shri Balaji Industrial Estate, Palsana, Surat, Gujarat - 394361`,
    fssaiLicense: '10021021000207',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'buffalo-ghee',
    category: 'Ghee',
    productName: 'Buffalo Ghee',
    variant: '',
    manufacturedBy: `SGB Food Products Pvt Ltd., Shri Balaji Industrial Estate, Palsana, Surat, Gujarat - 394361`,
    fssaiLicense: '10021021000207',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // ============ OIL ============
  {
    handle: 'black-mustard-oil',
    category: 'Oil',
    productName: 'Black Mustard Oil',
    variant: '',
    manufacturedBy: `SHRI GURU NANAK ENTERPRISES
VillageTARFARA, LADPUR, HATHRAS, Uttar Pradesh-204101`,
    fssaiLicense: '12723057000224',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'yellow-mustard-oil',
    category: 'Oil',
    productName: 'Yellow Mustard Oil',
    variant: '',
    manufacturedBy: `SHRI GURU NANAK ENTERPRISES
VillageTARFARA, LADPUR, HATHRAS, Uttar Pradesh-204101`,
    fssaiLicense: '12723057000224',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'groundnut-oil',
    category: 'Oil',
    productName: 'Groundnut Oil',
    variant: '',
    manufacturedBy: `Kanthamma. Sanathana Foods, C.N. Halli Taluk, Chiknayakanhalli, Tumkur, Karnataka-572214`,
    fssaiLicense: '11224327000652',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'virgin-coconut-oil',
    category: 'Oil',
    productName: 'Virgin Coconut Oil',
    variant: '',
    manufacturedBy: `Kanthamma. Sanathana Foods, C.N. Halli Taluk, Chiknayakanhalli, Tumkur, Karnataka-572214`,
    fssaiLicense: '11224327000652',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'black-sesame-oil',
    category: 'Oil',
    productName: 'Black Sesame Oil',
    variant: '',
    manufacturedBy: `Kanthamma. Sanathana Foods, C.N. Halli Taluk, Chiknayakanhalli, Tumkur, Karnataka-572214`,
    fssaiLicense: '11224327000652',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'safflower-oil',
    category: 'Oil',
    productName: 'Safflower Oil',
    variant: '',
    manufacturedBy: `V S Natural Agro Foods,
Bhandure Industrial Estate,
Bajrang Nagar, Satpur, Nashik
Maharashtra-422007`,
    fssaiLicense: '11522027000428',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'canola-oil',
    category: 'Oil',
    productName: 'Canola Oil',
    variant: '',
    manufacturedBy: `IMPORTED BY: JIVO WELLNESS PVT. LTD. Village Bhakarpur, Ganaur, Sonipat, Haryana-131101`,
    fssaiLicense: '10015064000541',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'coconut-oil',
    category: 'Oil',
    productName: 'Coconut Oil',
    variant: '',
    manufacturedBy: `Kanthamma. Sanathana Foods, C.N. Halli Taluk, Chiknayakanhalli, Tumkur, Karnataka-572214`,
    fssaiLicense: '11224327000652',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'almond-oil',
    category: 'Oil',
    productName: 'Almond Oil',
    variant: '',
    manufacturedBy: `SHIV OIL & FLOUR MILL, Gali No.1, MADAN PURI, Gurugram, Haryana - 122001`,
    fssaiLicense: '10823005001413',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'sunflower-oil',
    category: 'Oil',
    productName: 'Sunflower Oil',
    variant: '',
    manufacturedBy: `Sudheer L.R. Vinayaka Industries, Huliyar. C.N. Halli Taluk, Chiknayakanhalli, Tumkur, Karnataka-572214`,
    fssaiLicense: '11223327000396',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // ============ ATTA ============
  {
    handle: 'multigrain-atta-5kg',
    category: 'Atta',
    productName: 'Multigrain Atta',
    variant: '5 Kg',
    manufacturedBy: `MFD and PKD by: V S Natural Agro Foods,
Bhandure Industrial Estate,
Bajrang Nagar, Satpur, Nashik
Maharashtra-422007`,
    fssaiLicense: '11522027000428',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'khapli-atta',
    category: 'Atta',
    productName: 'Khapli Atta',
    variant: '',
    manufacturedBy: `MFD and PKD by: V S Natural Agro Foods,
Bhandure Industrial Estate,
Bajrang Nagar, Satpur, Nashik
Maharashtra-422007`,
    fssaiLicense: '11522027000428',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // ============ OTHERS ============
  {
    handle: 'wild-forest-honey',
    category: 'Others',
    productName: 'Wild Forest Honey',
    variant: '',
    manufacturedBy: `Wellness Shot, Hosiery Complex, Phase-2, Noida,
PAHASE- II, NOIDA CITY ZONE-5,
Gautam Buddha Nagar, Uttar Pradesh - 201301`,
    fssaiLicense: '22724926000136',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'mongra-saffron',
    category: 'Others',
    productName: 'Mongra Saffron',
    variant: '',
    manufacturedBy: `Basu Kesar Co., Pampore, Jammu & Kashmir India, Pulwama,
Pulwama, Jammu & Kashmir-192121`,
    fssaiLicense: '11021999000021',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'chia-seeds',
    category: 'Others',
    productName: 'Chia Seeds',
    variant: '',
    manufacturedBy: `Appkin Agro Private Ltd., Sahakari Shitgrah Sanstha Maryadit, Shramik Colony, Rau, Indore, Madhya Pradesh, 453331, India`,
    fssaiLicense: '10019026001725',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'jaggery-powder',
    category: 'Others',
    productName: 'Jaggery Powder',
    variant: '',
    manufacturedBy: `Christy Friedgram Industry Private Limited
A2&A3, SIDCO Industrial estate, Andipalayam,
Tiruchengode, Namakkal, Tamil Nadu-637214`,
    fssaiLicense: '10013042000857',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'turmeric-latte',
    category: 'Others',
    productName: 'Turmeric Latte',
    variant: '',
    manufacturedBy: `ANVESHAN FARM TECHNOLOGIES PVT. LTD., Plot Bearing No. 291, Sector 6, IMT Manesar, Gurugram Haryana 122052`,
    fssaiLicense: '10824999000361',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'dry-fruit-paak',
    category: 'Others',
    productName: 'Dry Fruit Paak',
    variant: '',
    manufacturedBy: `WEMAKE SWEETS AND SNACKS, PLOT NO 85, GROUND FLOOR, DARBAR FALIYU, MOTA VARACHHA, SURAT, GUJARAT`,
    fssaiLicense: '10721031001496',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'turmeric-powder',
    category: 'Others',
    productName: 'Turmeric Powder',
    variant: '',
    manufacturedBy: `LRM SPICES PRIVATE LIMITED, FOOD PARK, HSIIDC INDUSTRIAL AREA, RAI, SONIPAT, HARYANA, Sonipat, Sonipat, Haryana-131029`,
    fssaiLicense: '10021064000173',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'amlaprash',
    category: 'Others',
    productName: 'Amlaprash',
    variant: '',
    manufacturedBy: `Ayubal Wellness Private Limited
RIICO Industrial Area, Sitapura Vistar,
Gram Vidhani, Sanganer, Jaipur, Sanganer,
Rajasthan-302022`,
    fssaiLicense: 'RJ 846-AYU',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'millet-health-mix',
    category: 'Others',
    productName: 'Millet Health Mix',
    variant: '',
    manufacturedBy: `Tummy Friendly Foods (OPC) Pvt Ltd. Raghvendra Nagar, Hayathnagar, Hyderabad, Telangana - 501505`,
    fssaiLicense: '13622999000258',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'desi-khandsari',
    category: 'Others',
    productName: 'Desi Khaandsar',
    variant: '',
    manufacturedBy: `MFD and PKD BY: DHAMPURE SPECIALITY SUGARS LIMITED, Dhampur, Bijnor, Uttar Pradesh-246761`,
    fssaiLicense: '10013051000853',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'gulkand',
    category: 'Others',
    productName: 'Gulkand',
    variant: '',
    manufacturedBy: `OI (P) LTD. Tabiji Road, Ajmer, Rajasthan - 305001`,
    fssaiLicense: '12220009000222',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'moong-daal-halwa-250g',
    category: 'Others',
    productName: 'Moong Daal Halwa 250 g (RTE)',
    variant: '250g',
    manufacturedBy: `MFD and PKD by: Aacharan Enterprises Pvt. Ltd. Lal Madri Nathdwara, Rajasthan, India- 313301`,
    fssaiLicense: '10015013001000',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'gond-katira',
    category: 'Others',
    productName: 'Gond Katira',
    variant: '',
    manufacturedBy: '',
    fssaiLicense: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    handle: 'moringa-sattu',
    category: 'Others',
    productName: 'Moringa Sattu',
    variant: '',
    manufacturedBy: `MFD and PKD by: Fermentis Lifesciences Pvt. Ltd., Sector-8, IMT Manesar, Gurugram, Haryana - 122051`,
    fssaiLicense: '10018064001572',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function seedData() {
  console.log('🌱 Starting to seed data...\n');

  for (const product of sampleProducts) {
    try {
      const docRef = doc(db, 'qrmanufacturingtracking', product.handle);
      await setDoc(docRef, product);
      console.log(`✅ Added: ${product.productName} (${product.handle})`);
    } catch (error) {
      console.error(`❌ Failed to add ${product.handle}:`, error);
    }
  }

  console.log('\n🎉 Seed completed!');
  console.log('\nYou can now view products at:');
  sampleProducts.forEach(p => {
    console.log(`  - http://localhost:3000/product/${p.handle}`);
  });

  process.exit(0);
}

seedData();

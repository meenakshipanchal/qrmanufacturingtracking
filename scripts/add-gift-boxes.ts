// One-off: Shikara / Bagh / Gokul / Assorted 1 & 2 Gift Box ko Firestore me add karta hai.
// Sabka MFD aur PKD ek hi vendor hai — Super Healthyfox Food India Pvt. Ltd.
// Handles anveshan.farm ke product URLs se liye hain.
// Run with: npx tsx scripts/add-gift-boxes.ts

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2l8TJCtDP8y4DdBFeM34gFDt6B8iISRo",
  authDomain: "qrmanufacturingtracking.firebaseapp.com",
  projectId: "qrmanufacturingtracking",
  storageBucket: "qrmanufacturingtracking.firebasestorage.app",
  messagingSenderId: "285894723154",
  appId: "1:285894723154:web:06101925b9dd0d5f1f418b",
};

const FSSAI = '12725999000062';

// MFD aur PKD dono ek hi — ek hi vendor hai, isliye (A)/(B) lettering ki
// zaroorat nahi.
const VENDOR = `Super Healthyfox Food India Pvt. Ltd.,
Sector 58, Noida City Zone-I, Gautam Budha Nagar, U.P -201301.
FSSAI Lic No. ${FSSAI}`;

const GIFT_BOXES = [
  { handle: 'shikara-gift-box', productName: 'Shikara Gift Box' },
  { handle: 'bagh-gift-box', productName: 'Bagh Gift Box' },
  { handle: 'gokul-gift-box', productName: 'Gokul Gift Box' },
  { handle: 'assorted-gift-box-1', productName: 'Assorted Gift Box 1' },
  { handle: 'assorted-gift-box-2', productName: 'Assorted Gift Box 2' },
];

async function main() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);

  for (const box of GIFT_BOXES) {
    const ref = doc(db, 'qrmanufacturingtracking', box.handle);
    const before = await getDoc(ref);
    const now = new Date().toISOString();

    const payload = {
      handle: box.handle,
      category: 'Gifting',
      productName: box.productName,
      variant: '',
      mfdBy: VENDOR,
      pkdBy: VENDOR,
      fssaiLicense: FSSAI,
      updatedAt: now,
    };

    if (before.exists()) {
      console.log(`${box.handle} — already exists, merging.`);
      await setDoc(ref, payload, { merge: true });
    } else {
      console.log(`${box.handle} — creating.`);
      await setDoc(ref, { ...payload, createdAt: now });
    }

    const after = (await getDoc(ref)).data();
    console.log(`  productName : ${after?.productName}`);
    console.log(`  category    : ${after?.category}`);
    console.log(`  fssaiLicense: ${after?.fssaiLicense}`);
    console.log(`  mfdBy       : ${String(after?.mfdBy).replace(/\n/g, ' | ')}`);
    console.log(`  pkdBy       : ${String(after?.pkdBy).replace(/\n/g, ' | ')}`);
    console.log(`  URL         : /product/${box.handle}\n`);
  }

  console.log('✅ Saare gift box ready.');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

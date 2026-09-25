// One-off: Ghee Kaju Mysore Pak ko Firestore me add karta hai.
//
// Sheet me iska sirf MFD BY column bhara hai — PKD. BY aur Imported BY dono
// khaali hain, isliye page par sirf "MFD BY" row aani chahiye. pkdBy field
// set hi nahi kar rahe, warna ProductDisplay ek aur row dikha dega.
//
// Run with: npx tsx scripts/add-ghee-kaju-mysore-pak.ts

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

const HANDLE = 'ghee-kaju-mysore-pak';
const FSSAI = '10020043003263';

const MFD_BY = `BOLAS AGRO PRIVATE LIMITED
Ground Floor, Block No. K-56, Kedinje, Karkala, Udupi, Karnataka-574110
FSSAI Lic No. ${FSSAI}`;

async function main() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);

  const ref = doc(db, 'qrmanufacturingtracking', HANDLE);
  const before = await getDoc(ref);
  const now = new Date().toISOString();

  const payload = {
    handle: HANDLE,
    category: 'Gifting',
    productName: 'Ghee Kaju Mysore Pak',
    variant: '',
    mfdBy: MFD_BY,
    fssaiLicense: FSSAI,
    updatedAt: now,
  };

  if (before.exists()) {
    console.log(`${HANDLE} — already exists, merging.`);
    await setDoc(ref, payload, { merge: true });
  } else {
    console.log(`${HANDLE} — creating.`);
    await setDoc(ref, { ...payload, createdAt: now });
  }

  const after = (await getDoc(ref)).data();
  console.log(`  productName : ${after?.productName}`);
  console.log(`  category    : ${after?.category}`);
  console.log(`  fssaiLicense: ${after?.fssaiLicense}`);
  console.log(`  mfdBy       : ${String(after?.mfdBy).replace(/\n/g, ' | ')}`);
  console.log(`  pkdBy       : ${after?.pkdBy ?? '(none — sheet me PKD khaali hai)'}`);
  console.log(`  URL         : /product/${HANDLE}`);

  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

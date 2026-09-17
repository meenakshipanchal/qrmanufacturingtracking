// black-mustard-oil / yellow-mustard-oil — stale licence field.
//
// seed-data.ts me in dono ka vendor SHRI GURU NANAK ENTERPRISES tha,
// licence 12723057000224. Baad me mfdBy badal kar Ashoka Oil Industries
// kar diya gaya, par fssaiLicense field purane vendor ka number hi rakhe rahi.
// Result: page pe Ashoka ka address dikhta hai aur licence Shri Guru Nanak ka —
// ek hi screen pe do alag FSSAI numbers.
//
// Sheet (source of truth) kehti hai: Ashoka Oil Industries, FSSAI 10012013000112
// — aur wahi number product ke apne mfdBy text me bhi likha hai. Dono match karte
// hain, isliye yahi set kar rahe hain.
//
// Script idempotent hai — dobara chalane se kuch nahi bigdega.
// Run with: npx tsx scripts/fix-mustard-oil-fssai.ts

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

const ASHOKA_LIC = '10012013000112';       // sheet + mfdBy text, dono me yahi
const OLD_VENDOR_LIC = '12723057000224';   // Shri Guru Nanak — ab in products pe nahi hai

const HANDLES = ['black-mustard-oil', 'yellow-mustard-oil'];

const show = (v: unknown) => String(v ?? '(none)').replace(/\n/g, ' | ');

async function main() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);

  for (const handle of HANDLES) {
    const ref = doc(db, 'qrmanufacturingtracking', handle);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      console.log(`⚠️  ${handle} — doc not found, skipped.\n`);
      continue;
    }

    const data = snap.data();
    console.log(`— ${handle} (${data.productName})`);
    console.log('  BEFORE  fssaiLicense :', show(data.fssaiLicense));
    console.log('          mfdBy        :', show(data.mfdBy));

    const current = String(data.fssaiLicense ?? '').trim();
    if (current === ASHOKA_LIC) {
      console.log('  already fixed — skipped.\n');
      continue;
    }
    if (current !== OLD_VENDOR_LIC) {
      // Koi teesra number mila — chhedte nahi, pehle insaan dekhe.
      console.log(`  ⚠️  unexpected licence "${current}" — skipped, manually check karo.\n`);
      continue;
    }

    await setDoc(
      ref,
      { fssaiLicense: ASHOKA_LIC, updatedAt: new Date().toISOString() },
      { merge: true }
    );

    const after = (await getDoc(ref)).data();
    console.log('  AFTER   fssaiLicense :', show(after?.fssaiLicense));
    console.log('  ✅ licence ab address ke text se match karta hai.\n');
  }

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });

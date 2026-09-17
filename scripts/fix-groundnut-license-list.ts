// groundnut-oil — License field me sirf do vendor the, jabki product pe chaar hain.
//
// MFD BY : (A) Ashoka Oil Industries, (B) Kanthamma Sanathana Foods
// PKD BY : (A) Ashoka Oil Industries, (B) Anveshan Farm Technologies,
//          (C) Srevee Edible Oils
//
// Anveshan Farm aur Srevee ke licence page pe kahin nahi aa rahe the.
// Lettering wahi convention follow karti hai jo update-license-field-multi-vendor.ts
// me hai: display order — pehle MFD BY ke vendors, phir PKD BY ke. Ashoka dono me
// hai isliye ek hi baar aayega.
//
// NOTE: Ashoka ka number 1001201300012 — 13 digits ka hai, FSSAI 14 ka hota hai.
// Ye typo yahan JAAN-BOOJH KAR waisa hi rakha hai. Pehle vendor/Rishab se confirm
// hona chahiye (mustard oil rows me isi vendor ka 10012013000112 likha hai), tabhi
// badlenge — licence number ka andaaza nahi lagana chahiye.
//
// Script idempotent hai.
// Run with: npx tsx scripts/fix-groundnut-license-list.ts

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

const HANDLE = 'groundnut-oil';

const LICENSES = [
  { owner: 'MFD — Ashoka Oil Industries (PKD me bhi)', number: '1001201300012' },
  { owner: 'MFD — Kanthamma Sanathana Foods', number: '11224327000652' },
  { owner: 'PKD — Anveshan Farm Technologies', number: '10824999000361' },
  { owner: 'PKD — Srevee Edible Oils', number: '12225999000656' },
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const show = (v: unknown) => String(v ?? '(none)').replace(/\n/g, ' | ');

async function main() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);

  const ref = doc(db, 'qrmanufacturingtracking', HANDLE);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    console.log(`⚠️  ${HANDLE} — doc not found.`);
    process.exit(1);
  }

  const data = snap.data();
  const value = LICENSES.map((lic, i) => `(${LETTERS[i]}) ${lic.number}`).join('\n');

  console.log(`— ${HANDLE} (${data.productName})`);
  console.log('  BEFORE fssaiLicense :', show(data.fssaiLicense));

  if (String(data.fssaiLicense ?? '').trim() === value) {
    console.log('  already fixed — skipped.');
    process.exit(0);
  }

  await setDoc(
    ref,
    { fssaiLicense: value, updatedAt: new Date().toISOString() },
    { merge: true }
  );

  const after = (await getDoc(ref)).data();
  console.log('  AFTER  fssaiLicense :', show(after?.fssaiLicense));
  for (const [i, lic] of LICENSES.entries()) {
    console.log(`    (${LETTERS[i]}) ${lic.number}  — ${lic.owner}`);
  }
  console.log('  ✅ chaaron vendors ka licence ab page pe dikhega.');

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });

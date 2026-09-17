// One-off: kuch records abhi bhi purane combined field `manufacturedBy` par hain.
// ProductDisplay ka legacy fallback un par "MFD & PKD BY" label print karta hai,
// chahe sheet ke PKD. BY column me kuch na ho.
//
// Buffalo Ghee: sheet me sirf MFD BY bhara hai, PKD. BY khaali hai
// -> value wahi rehti hai, sirf field `mfdBy` me move hoti hai, taaki label "MFD BY" aaye.
//
// Run with: npx tsx scripts/fix-legacy-mfdby.ts

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, deleteField } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2l8TJCtDP8y4DdBFeM34gFDt6B8iISRo",
  authDomain: "qrmanufacturingtracking.firebaseapp.com",
  projectId: "qrmanufacturingtracking",
  storageBucket: "qrmanufacturingtracking.firebasestorage.app",
  messagingSenderId: "285894723154",
  appId: "1:285894723154:web:06101925b9dd0d5f1f418b",
};

// Sirf wo handles jinke sheet me PKD. BY column khaali hai.
const HANDLES = ['buffalo-ghee'];

async function main() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);

  for (const handle of HANDLES) {
    const ref = doc(db, 'qrmanufacturingtracking', handle);
    const before = await getDoc(ref);

    if (!before.exists()) {
      console.log(`⚠️  ${handle} — doc not found, skipped.\n`);
      continue;
    }

    const data = before.data();
    const legacy = String(data.manufacturedBy ?? '').trim();

    console.log(`— ${handle} (${data.productName})`);
    console.log('  BEFORE  mfdBy          :', data.mfdBy ?? '(none)');
    console.log('          pkdBy          :', data.pkdBy ?? '(none)');
    console.log('          manufacturedBy :', legacy.replace(/\n/g, ' | ') || '(none)');

    if (!legacy) {
      console.log('  legacy field khaali hai — skipped.\n');
      continue;
    }

    await setDoc(
      ref,
      {
        mfdBy: legacy,
        // purana combined field hata dete hain, warna fallback dobara trigger hoga
        manufacturedBy: deleteField(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    const after = (await getDoc(ref)).data();
    console.log('  AFTER   mfdBy          :', String(after?.mfdBy).replace(/\n/g, ' | '));
    console.log('          pkdBy          :', after?.pkdBy ?? '(none)');
    console.log('          manufacturedBy :', after?.manufacturedBy ?? '(removed)');
    console.log('  ✅ ab label "MFD BY" aayega.\n');
  }

  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });

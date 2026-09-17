// DB ko sheet ke columns ke hisaab se align karta hai.
//
// Rule (sheet hi source of truth hai):
//   MFD BY column me jo hai      -> mfdBy
//   PKD. BY column khaali hai    -> pkdBy field hona hi nahi chahiye
//   PKD. BY me details hain      -> pkdBy waise ka waisa
//
// Teen cheezein theek karta hai:
//
// 1. legacy -> mfdBy
//    12 gifting SKUs abhi bhi purane combined field `manufacturedBy` par hain,
//    isliye ProductDisplay ka fallback un par "MFD & PKD BY" chhapta hai jabki
//    sheet me unka PKD. BY khaali hai.
//
// 2. "MFD and PKD BY:" prefix hatana
//    Ye text cell ke andar likha hai, isliye page par label do baar aata hai:
//    "MFD BY: MFD and PKD by: WEMAKE ...". Label component khud lagata hai,
//    value me dobara nahi chahiye.
//
// 3. pkdBy hatana jahan sheet ka PKD. BY khaali hai
//    Dry Fruit Paak par PKD BY row aa rahi hai jabki sheet me column khaali hai.
//
// Legacy `manufacturedBy` har jagah se hata dete hain — ab har record mfdBy par
// hai, aur purana field sirf confusion aur stale text rakhta hai.
//
// Kisi ka address/FSSAI number badla nahi ja raha — sirf field aur prefix.
// Script idempotent hai.
// Run with: npx tsx scripts/align-roles-with-sheet.ts

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, getDocs, collection, deleteField } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2l8TJCtDP8y4DdBFeM34gFDt6B8iISRo",
  authDomain: "qrmanufacturingtracking.firebaseapp.com",
  projectId: "qrmanufacturingtracking",
  storageBucket: "qrmanufacturingtracking.firebasestorage.app",
  messagingSenderId: "285894723154",
  appId: "1:285894723154:web:06101925b9dd0d5f1f418b",
};

// Sheet me PKD. BY column sirf in paanch products par bhara hua hai.
// Baaki sab par khaali hai, isliye unka pkdBy nahi hona chahiye.
const KEEP_PKD = new Set([
  'desi-cow-ghee',
  'groundnut-oil',
  'shikara-gift-box',
  'bagh-gift-box',
  'gokul-gift-box',
]);

const PREFIX = /^\s*MFD\s*(?:and|&)\s*PKD\s*BY\s*:?\s*/i;
const show = (v: unknown) => String(v ?? '(none)').replace(/\n/g, ' | ');

async function main() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);

  const snap = await getDocs(collection(db, 'qrmanufacturingtracking'));
  let changed = 0;

  for (const d of snap.docs) {
    const data = d.data();
    const handle = d.id;
    const patch: Record<string, unknown> = {};
    const notes: string[] = [];

    // 1. legacy field se mfdBy
    let mfd = String(data.mfdBy ?? '').trim();
    const legacy = String(data.manufacturedBy ?? '').trim();
    if (!mfd && legacy) {
      mfd = legacy;
      notes.push('legacy -> mfdBy');
    }

    // 2. value ke andar ka label hatao
    if (PREFIX.test(mfd)) {
      mfd = mfd.replace(PREFIX, '').trim();
      notes.push('prefix hataya');
    }
    if (mfd && mfd !== String(data.mfdBy ?? '').trim()) patch.mfdBy = mfd;

    // 3. sheet me PKD khaali -> field hi nahi chahiye
    if (data.pkdBy && !KEEP_PKD.has(handle)) {
      patch.pkdBy = deleteField();
      notes.push('pkdBy hataya (sheet me PKD khaali)');
    }

    // purana combined field ab kisi kaam ka nahi
    if (data.manufacturedBy !== undefined) {
      patch.manufacturedBy = deleteField();
      notes.push('legacy field hataya');
    }

    if (Object.keys(patch).length === 0) continue;

    console.log(`— ${handle} (${data.productName})`);
    console.log('   ', notes.join(', '));
    console.log('    before mfdBy:', show(data.mfdBy ?? data.manufacturedBy));
    await setDoc(doc(db, 'qrmanufacturingtracking', handle),
      { ...patch, updatedAt: new Date().toISOString() }, { merge: true });
    const after = (await getDoc(doc(db, 'qrmanufacturingtracking', handle))).data();
    console.log('    after  mfdBy:', show(after?.mfdBy));
    console.log('    after  pkdBy:', after?.pkdBy ? show(after.pkdBy) : '(none)');
    console.log('');
    changed++;
  }

  console.log(`${changed} products updated.`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });

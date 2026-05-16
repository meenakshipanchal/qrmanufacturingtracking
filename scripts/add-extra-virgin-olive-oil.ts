// One-off: add `mfdBy` + `importedBy` to extra-virgin-olive-oil.

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const KEY_PATH = '/Users/meenakshipancha/Downloads/qrmanufacturingtracking-firebase-adminsdk-fbsvc-1e8a3833be.json';

const HANDLE = 'extra-virgin-olive-oil';
const MFD_BY = 'Migasa Envasado SLU ctra. Nacional IV, Km. 387, Alcolea, Córdoba, Spain.';
const IMPORTED_BY = 'Aamaya Impex, 3/15, Shanti Niketan, New Delhi-110021. FSSAI No. 10013011001484';

async function main() {
  const serviceAccount = require(KEY_PATH);
  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();

  const ref = db.collection('qrmanufacturingtracking').doc(HANDLE);
  const before = await ref.get();
  if (!before.exists) {
    console.error(`Doc ${HANDLE} not found.`);
    process.exit(1);
  }
  console.log('Before:');
  console.log('  mfdBy:      ', before.data()?.mfdBy ?? '(none)');
  console.log('  importedBy: ', before.data()?.importedBy ?? '(none)');

  await ref.set(
    { mfdBy: MFD_BY, importedBy: IMPORTED_BY, updatedAt: new Date().toISOString() },
    { merge: true }
  );

  const after = await ref.get();
  console.log('\nAfter:');
  console.log('  mfdBy:      ', after.data()?.mfdBy);
  console.log('  importedBy: ', after.data()?.importedBy);
  console.log(`\n✅ Updated ${HANDLE}.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

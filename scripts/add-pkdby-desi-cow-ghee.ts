// One-off: add `pkdBy` to the desi-cow-ghee document using firebase-admin
// (which bypasses Firestore security rules via the service account).

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const KEY_PATH = '/Users/meenakshipancha/Downloads/qrmanufacturingtracking-firebase-adminsdk-fbsvc-1e8a3833be.json';

const MFD_BY = 'RAMANA DAIRY PRODUCTS 155,\nBazaar street,\nNamakkal, Namakkal, Tamil Nadu-637001\nFSSAI No. 12416014000387';
const PKD_BY = 'Aira Dairy Products, Mohanur Block, Namakkal, Tamil Nadu - 637002;  FSSAI No. 12424014000490';

async function main() {
  const serviceAccount = require(KEY_PATH);
  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();

  const ref = db.collection('qrmanufacturingtracking').doc('desi-cow-ghee');
  const before = await ref.get();
  if (!before.exists) {
    console.error('Doc desi-cow-ghee not found.');
    process.exit(1);
  }
  console.log('Before:');
  console.log('  mfdBy:', before.data()?.mfdBy ?? '(none)');
  console.log('  pkdBy:', before.data()?.pkdBy ?? '(none)');

  await ref.set(
    { mfdBy: MFD_BY, pkdBy: PKD_BY, updatedAt: new Date().toISOString() },
    { merge: true }
  );

  const after = await ref.get();
  console.log('\nAfter:');
  console.log('  mfdBy:', after.data()?.mfdBy);
  console.log('  pkdBy:', after.data()?.pkdBy);
  console.log('\n✅ Updated desi-cow-ghee.');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// Import product data from the manufacturing-details Excel sheet.
//
// Usage:
//   npx tsx scripts/import-from-xlsx.ts            # dry run (prints what would be written)
//   npx tsx scripts/import-from-xlsx.ts --commit   # actually write to Firestore
//
// Sheet columns: Category | Product | MFD BY | PKD. BY | Imported BY | QR Code
// Category cells use "merged" semantics — only the first row of each group has it,
// so we forward-fill the last seen category.

import * as XLSX from 'xlsx';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const FILE = '/Users/meenakshipancha/Downloads/Manufacturing Details for QR Code.xlsx';
const KEY_PATH = '/Users/meenakshipancha/Downloads/qrmanufacturingtracking-firebase-adminsdk-fbsvc-1e8a3833be.json';
const COMMIT = process.argv.includes('--commit');

interface Row {
  Category?: string;
  Product?: string;
  'MFD BY'?: string;
  'PKD. BY'?: string;
  'Imported BY'?: string;
  'QR Code'?: string;
}

function normalizeHandle(qr: string): string {
  return qr
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function cleanText(s: string | undefined): string {
  if (!s) return '';
  // The xlsx export uses ` | ` to represent line breaks inside a cell.
  return s.replace(/\s*\|\s*/g, '\n').replace(/[ \t]+/g, ' ').trim();
}

// Extract first FSSAI/license number from a blob of text.
// Falls back to non-numeric Ayurvedic license patterns (e.g. "RJ 846 -AYU").
function extractFssai(text: string): string {
  if (!text) return '';
  const m = text.match(/FSSAI[^A-Za-z0-9]*(?:Lic\.?\s*)?(?:No\.?\s*)?:?\s*([0-9]{10,14})/i);
  if (m) return m[1];
  const m2 = text.match(/Lic\.?\s*([A-Z]{2}\s*\d+\s*-?\s*[A-Z]+)/i);
  if (m2) return m2[1].replace(/\s+/g, ' ').trim();
  return '';
}

async function main() {
  const wb = XLSX.readFile(FILE);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Row>(sheet, { defval: '' });

  let lastCategory = '';
  const products = rows
    .map((r) => {
      const category = (r.Category || '').trim() || lastCategory;
      if ((r.Category || '').trim()) lastCategory = category;

      const productName = (r.Product || '').trim();
      const qr = (r['QR Code'] || '').trim();
      if (!productName || !qr) return null;

      const mfdBy = cleanText(r['MFD BY']);
      const pkdBy = cleanText(r['PKD. BY']);
      const importedBy = cleanText(r['Imported BY']);

      const fssaiLicense =
        extractFssai(pkdBy) ||
        extractFssai(importedBy) ||
        extractFssai(mfdBy) ||
        '';

      return {
        handle: normalizeHandle(qr),
        category,
        productName,
        variant: '',
        mfdBy: mfdBy || undefined,
        pkdBy: pkdBy || undefined,
        importedBy: importedBy || undefined,
        fssaiLicense,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  // Report
  console.log(`\n${COMMIT ? '🔥 COMMITTING' : '🧪 DRY RUN'} — ${products.length} products parsed\n`);
  for (const p of products) {
    console.log(`• ${p.handle}  [${p.category}]  ${p.productName}`);
    console.log(`    FSSAI: ${p.fssaiLicense || '(none extracted)'}`);
    if (p.mfdBy) console.log(`    MFD BY:      ${p.mfdBy.replace(/\n/g, ' / ')}`);
    if (p.pkdBy) console.log(`    PKD BY:      ${p.pkdBy.replace(/\n/g, ' / ')}`);
    if (p.importedBy) console.log(`    IMPORTED BY: ${p.importedBy.replace(/\n/g, ' / ')}`);
  }

  // Duplicate handle check
  const handles = products.map((p) => p.handle);
  const dupes = handles.filter((h, i) => handles.indexOf(h) !== i);
  if (dupes.length) {
    console.error(`\n⚠️  Duplicate handles detected: ${[...new Set(dupes)].join(', ')}`);
  }
  const missingFssai = products.filter((p) => !p.fssaiLicense);
  if (missingFssai.length) {
    console.warn(`\n⚠️  ${missingFssai.length} products have no FSSAI extracted: ${missingFssai.map((p) => p.handle).join(', ')}`);
  }

  if (!COMMIT) {
    console.log('\nRe-run with --commit to write these to Firestore.');
    return;
  }

  const serviceAccount = require(KEY_PATH);
  initializeApp({ credential: cert(serviceAccount) });
  const db = getFirestore();
  const now = new Date().toISOString();
  let written = 0;
  for (const p of products) {
    // Firestore rejects `undefined`; build payload skipping empty optional fields.
    const payload: Record<string, unknown> = {
      handle: p.handle,
      category: p.category,
      productName: p.productName,
      variant: p.variant,
      fssaiLicense: p.fssaiLicense,
      updatedAt: now,
    };
    if (p.mfdBy) payload.mfdBy = p.mfdBy;
    if (p.pkdBy) payload.pkdBy = p.pkdBy;
    if (p.importedBy) payload.importedBy = p.importedBy;

    // Only set createdAt on first write — keep existing one if doc already exists.
    const ref = db.collection('qrmanufacturingtracking').doc(p.handle);
    const existing = await ref.get();
    if (!existing.exists) payload.createdAt = now;

    await ref.set(payload, { merge: true });
    written++;
    process.stdout.write(`\r  Wrote ${written}/${products.length}`);
  }
  console.log(`\n✅ Done. ${written} products upserted.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

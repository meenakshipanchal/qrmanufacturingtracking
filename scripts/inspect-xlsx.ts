import * as XLSX from 'xlsx';

const FILE = '/Users/meenakshipancha/Downloads/Manufacturing Details for QR Code.xlsx';

const wb = XLSX.readFile(FILE);
console.log('Sheet names:', wb.SheetNames);

for (const name of wb.SheetNames) {
  const sheet = wb.Sheets[name];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });
  console.log(`\n=== Sheet: ${name} (${rows.length} rows) ===`);
  if (rows.length > 0) {
    console.log('Columns:', Object.keys(rows[0]));
    console.log('\nAll rows:');
    rows.forEach((r, i) => {
      console.log(`\n--- Row ${i + 1} ---`);
      for (const [k, v] of Object.entries(r)) {
        const val = String(v).trim();
        if (val) console.log(`  ${k}: ${val.replace(/\n/g, ' | ')}`);
      }
    });
  }
}

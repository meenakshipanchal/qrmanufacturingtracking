// Parses the manufacturing-details xlsx from a fixed local path.
// Called by the admin "Import from Excel" button. Browser then writes each
// parsed product via the client Firebase SDK (which carries App Check tokens).
//
// This route runs on localhost during dev only — the admin page itself is
// IP-gated by middleware.ts, so this endpoint inherits the same protection.

import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { readFileSync } from 'fs';

export const dynamic = 'force-dynamic';

const FILE = '/Users/meenakshipancha/Downloads/Manufacturing Details for QR Code.xlsx';

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
  return s.replace(/\s*\|\s*/g, '\n').replace(/[ \t]+/g, ' ').trim();
}

function extractFssai(text: string): string {
  if (!text) return '';
  const m = text.match(/FSSAI[^A-Za-z0-9]*(?:Lic\.?\s*)?(?:No\.?\s*)?:?\s*([0-9]{10,14})/i);
  if (m) return m[1];
  const m2 = text.match(/Lic\.?\s*([A-Z]{2}\s*\d+\s*-?\s*[A-Z]+)/i);
  if (m2) return m2[1].replace(/\s+/g, ' ').trim();
  return '';
}

export async function GET() {
  let buf: Buffer;
  try {
    buf = readFileSync(FILE);
  } catch (e) {
    return NextResponse.json(
      { error: `Could not read ${FILE}: ${(e as Error).message}` },
      { status: 404 }
    );
  }

  const wb = XLSX.read(buf);
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
        extractFssai(pkdBy) || extractFssai(importedBy) || extractFssai(mfdBy) || '';

      return {
        handle: normalizeHandle(qr),
        category,
        productName,
        variant: '',
        ...(mfdBy ? { mfdBy } : {}),
        ...(pkdBy ? { pkdBy } : {}),
        ...(importedBy ? { importedBy } : {}),
        fssaiLicense,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return NextResponse.json({ products });
}

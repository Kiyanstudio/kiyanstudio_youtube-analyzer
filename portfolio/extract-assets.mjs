// Extract embedded base64 data-URI images from the compiled portfolio HTML
// and write them to ./assets, printing a manifest.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = 'C:\\Users\\IN005499\\Downloads\\kiyan-portfolio_2_14.html';
const OUT = path.join(__dirname, 'assets');
fs.mkdirSync(OUT, { recursive: true });

const html = fs.readFileSync(SRC, 'utf-8');

// Match data:image/<type>;base64,<payload> — payload is base64 chars until a
// non-base64 delimiter (quote, backtick, paren, backslash, whitespace).
const re = /data:image\/(png|jpeg|jpg|gif|webp|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;

const seen = new Map(); // payloadHash -> filename
let m, i = 0;
const manifest = [];
const extOf = t => (t === 'jpeg' ? 'jpg' : t === 'svg+xml' ? 'svg' : t);

while ((m = re.exec(html)) !== null) {
  const type = m[1];
  const b64 = m[2];
  if (b64.length < 2000) continue; // skip tiny icons/spinners
  const key = b64.length + ':' + b64.slice(0, 32) + b64.slice(-32);
  if (seen.has(key)) continue;
  i++;
  const ext = extOf(type);
  const name = `img-${String(i).padStart(2, '0')}.${ext}`;
  const buf = Buffer.from(b64, 'base64');
  fs.writeFileSync(path.join(OUT, name), buf);
  seen.set(key, name);
  manifest.push({ name, type, kb: Math.round(buf.length / 1024) });
}

console.log(`Extracted ${manifest.length} unique images to ${OUT}`);
for (const e of manifest) console.log(`  ${e.name}\t${e.type}\t${e.kb}KB`);

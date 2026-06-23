// Build ONE self-contained portfolio .html:
//  - every assets/*.png|jpg|webp inlined as a base64 data URI
//  - every projects/*.html embedded as base64; the "Live" buttons open them
//    from inside the single file via Blob URLs (new tab)
// Output: kiyan-portfolio-complete.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, 'index.html');
const OUT = path.join(__dirname, 'kiyan-portfolio-complete.html');

let html = fs.readFileSync(SRC, 'utf-8');

// ---- 1. inline images -------------------------------------------------------
const mime = ext => ({ png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg', webp:'image/webp', svg:'image/svg+xml' }[ext] || 'application/octet-stream');
const assetRefs = [...new Set([...html.matchAll(/assets\/([A-Za-z0-9._-]+)/g)].map(m => m[1]))];
let imgCount = 0, imgBytes = 0;
for (const file of assetRefs) {
  const abs = path.join(__dirname, 'assets', file);
  if (!fs.existsSync(abs)) { console.warn('  missing asset:', file); continue; }
  const buf = fs.readFileSync(abs);
  const ext = file.split('.').pop().toLowerCase();
  const uri = `data:${mime(ext)};base64,${buf.toString('base64')}`;
  html = html.split('assets/' + file).join(uri);
  imgCount++; imgBytes += buf.length;
}

// ---- 2. embed project pages -------------------------------------------------
// Map href -> key. Each project file is base64-encoded into a <script type=text/plain>.
const projects = {
  'projects/bmw-m1.html':           'bmw-m1',
  'projects/youtube-dashboard.html':'youtube-dashboard',
  'projects/kika-rings.html':       'kika-rings',
  'projects/bmw-m4.html':           'bmw-m4',
  'projects/headphones.html':       'headphones',
  'projects/world-cup.html':        'world-cup',
  'projects/views-analyser.html':   'views-analyser',
};
let payloadTags = '';
let projCount = 0, projBytes = 0;
for (const [href, key] of Object.entries(projects)) {
  const abs = path.join(__dirname, href);
  if (!fs.existsSync(abs)) { console.warn('  missing project:', href); continue; }
  const buf = fs.readFileSync(abs);
  // base64 has no "<", so it can never contain a stray </script>
  payloadTags += `<script type="text/plain" id="proj-${key}">${buf.toString('base64')}</script>\n`;
  // rewrite the anchor: drop href so the site's #-anchor smooth-scroll ignores it,
  // mark it with data-proj for our click handler.
  const re = new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" target="_blank" rel="noopener"`, 'g');
  html = html.replace(re, `data-proj="${key}" role="link" tabindex="0" style="cursor:pointer"`);
  projCount++; projBytes += buf.length;
}

// ---- 3. inject the Blob-opener ----------------------------------------------
const opener = `
<!-- embedded project payloads (base64) -->
${payloadTags}<script>
(function () {
  var cache = {};
  function openProject(key) {
    if (!cache[key]) {
      var node = document.getElementById('proj-' + key);
      if (!node) return;
      var bin = atob(node.textContent.trim());
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      cache[key] = URL.createObjectURL(new Blob([bytes], { type: 'text/html;charset=utf-8' }));
    }
    window.open(cache[key], '_blank');
  }
  document.querySelectorAll('[data-proj]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); openProject(el.getAttribute('data-proj')); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(el.getAttribute('data-proj')); }
    });
  });
})();
</script>
`;
html = html.replace('</body>', opener + '</body>');

fs.writeFileSync(OUT, html);
const mb = n => (n / 1048576).toFixed(2) + ' MB';
console.log(`Built ${path.basename(OUT)}`);
console.log(`  images embedded : ${imgCount} (${mb(imgBytes)} raw)`);
console.log(`  projects embedded: ${projCount} (${mb(projBytes)} raw)`);
console.log(`  final file size : ${mb(fs.statSync(OUT).size)}`);

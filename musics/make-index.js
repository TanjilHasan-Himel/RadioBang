// make-index.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'musics');     // ./musics
const OUT  = path.join(ROOT, 'index.json');

function listDir(dir) {
  return fs.readdirSync(dir, { withFileTypes: true });
}

const folders = [];
for (const entry of listDir(ROOT)) {
  if (!entry.isDirectory()) continue;
  const folderName = entry.name;
  const abs = path.join(ROOT, folderName);

  const tracks = listDir(abs)
    .filter(d => d.isFile() && /\.(mp3|m4a|aac|ogg|wav)$/i.test(d.name))
    .map((f) => ({
      title: path.parse(f.name).name,
      artist: "Radio Bang",
      file: `${folderName}/${f.name}`
      // optionally: cover: "image/logo.png"
    }));

  if (tracks.length) folders.push({ name: folderName, tracks });
}

const json = { folders };
fs.writeFileSync(OUT, JSON.stringify(json, null, 2), 'utf8');
console.log(`✅ Wrote ${OUT} with ${folders.length} folder(s).`);

# make_index.py
import os, json

ROOT = os.path.join(os.getcwd(), "musics")   # ./musics
OUT  = os.path.join(ROOT, "index.json")

folders = []
for name in sorted(os.listdir(ROOT)):
    p = os.path.join(ROOT, name)
    if not os.path.isdir(p): continue
    tracks = []
    for f in sorted(os.listdir(p)):
        if f.lower().endswith((".mp3",".m4a",".aac",".ogg",".wav")):
            title = os.path.splitext(f)[0]
            tracks.append({
                "title": title,
                "artist": "Radio Bang",
                "file": f"{name}/{f}"
                # "cover": "image/logo.png"
            })
    if tracks:
        folders.append({"name": name, "tracks": tracks})

with open(OUT, "w", encoding="utf-8") as fh:
    json.dump({"folders": folders}, fh, ensure_ascii=False, indent=2)

print(f"✅ Wrote {OUT} with {len(folders)} folder(s).")

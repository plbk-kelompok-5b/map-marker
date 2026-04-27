# MAP MARKER

## PLBK B Kelompok 5

- Muhammad Faruqi
- Faris Zain As-Shadiq
- Muhammad Nazlul Ramadhyan

## Setup

```bash
git clone https://github.com/mfaruqi35/map-marker.git
cd map-marker/kelompok-5b
node server.js
```

Buka `http://localhost:3000` di browser.

## Cara Menambahkan Marker

1. Klik lokasi di map
2. Isi nama kontributor dan nama lokasi di input
3. Klik **Tambah Pin** (JSON akan otomatis tersimpan)
4. Commit dan push perubahan `points.json`

```bash
git add points.json
git commit -m "point: <nama tempat> - <tanggal>"
git push org
```

# MAP MARKER

## PLBK B Kelompok 5

- Muhammad Faruqi
- Faris Zain As-Shadiq
- Muhammad Nazlul Ramadhyan

## Setup

```bash
git clone https://github.com/mfaruqi35/map-marker.git
cd map-marker
npx serve kelompok-5b
```

Buka `http://localhost:3000` di browser.

## Cara Menambahkan Marker

1. Klik lokasi di map
2. Isi nama lokasi di input
3. Klik **Tambah Pin**
4. Klik **Export JSON**, lalu paste isi clipboard ke `kelompok-5b/points.json` dan save
5. Commit dan push

```bash
git add kelompok-5b/points.json
git commit -m "point: <nama tempat> - <tanggal>"
git push org
```

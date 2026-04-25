# MAP MARKER

## PLBK B Kelompok 5

- Muhammad Faruqi
- Faris Zain As-Shadiq
- Muhammad Nazlul Ramadhyan

## Setup

```bash
git clone https://github.com/mfaruqi35/map-marker.git
cd map-marker
npx serve src
```

Buka `http://localhost:3000` di browser.

## How To Add Marker

1. Klik lokasi di map
2. Isi nama lokasi di input
3. Klik **Tambah Pin**
4. Klik **Export JSON**, lalu paste isi clipboard ke `src/points.json` dan save
5. Commit dan push

```bash
git add src/points.json
git commit -m "point: <nama tempat> - <tanggal>"
git push
```

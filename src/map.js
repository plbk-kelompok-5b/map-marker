const map = L.map("map").setView([-6.2, 106.816], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let pendingLatLng = null;
const points = [];

// Klik map untuk simpan koordinat sementara
map.on("click", function (e) {
  pendingLatLng = e.latlng;
  document.getElementById("label-input").placeholder =
    `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
});

// Tombol tambah pin
document.getElementById("add-btn").addEventListener("click", function () {
  if (!pendingLatLng) {
    alert("Klik dulu lokasi di map.");
    return;
  }

  const label =
    document.getElementById("label-input").value.trim() || "Tanpa nama";
  const date = new Date().toISOString().split("T")[0];

  const point = {
    coords: [pendingLatLng.lat, pendingLatLng.lng],
    label,
    date,
  };

  points.push(point);

  L.marker(point.coords)
    .addTo(map)
    .bindPopup(`<b>${point.label}</b><br>${point.date}`)
    .openPopup();

  // Reset
  document.getElementById("label-input").value = "";
  document.getElementById("label-input").placeholder = "Nama lokasi";
  pendingLatLng = null;
});

// Export ke JSON buat di-paste ke file atau di-commit
document.getElementById("export-btn").addEventListener("click", function () {
  const json = JSON.stringify(points, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `points-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

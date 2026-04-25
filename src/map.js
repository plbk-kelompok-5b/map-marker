const map = L.map("map").setView([-6.2, 106.816], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let pendingLatLng = null;
let points = [];

function renderPoints() {
  points.forEach((point) => {
    L.marker(point.coords)
      .addTo(map)
      .bindPopup(`<b>${point.label}</b><br>${point.date}`);
  });
}

// Load dari points.json saat startup
fetch("points.json")
  .then((res) => res.json())
  .then((data) => {
    points = data;
    renderPoints();
  });

map.on("click", function (e) {
  pendingLatLng = e.latlng;
  document.getElementById("label-input").placeholder =
    `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
});

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

  document.getElementById("label-input").value = "";
  document.getElementById("label-input").placeholder = "Nama lokasi";
  pendingLatLng = null;
});

document.getElementById("export-btn").addEventListener("click", function () {
  const json = JSON.stringify(points, null, 2);
  navigator.clipboard.writeText(json).then(() => {
    alert("JSON berhasil disalin ke clipboard.");
  });
});

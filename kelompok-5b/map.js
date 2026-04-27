const map = L.map("map").setView([-6.2, 106.816], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let pendingLatLng = null;
let points = [];
let markerGroup = L.layerGroup().addTo(map);

const colors = ["blue", "red", "green", "orange", "violet", "grey", "black", "yellow"];
let contributorColors = {};

function getContributorColor(contributor) {
  const name = contributor || "Unknown";
  if (!contributorColors[name]) {
    const colorIndex = Object.keys(contributorColors).length % colors.length;
    contributorColors[name] = colors[colorIndex];
  }
  return contributorColors[name];
}

function createIcon(color) {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

function updateLegend() {
  const legendList = document.getElementById("legend-list");
  legendList.innerHTML = "";
  
  const cssColors = {
    blue: "#2A81CB",
    red: "#CB2B3E",
    green: "#2AAD27",
    orange: "#CB8427",
    violet: "#9C2BCB",
    grey: "#7B7B7B",
    black: "#3D3D3D",
    yellow: "#CAC428"
  };

  for (const [contributor, color] of Object.entries(contributorColors)) {
    const li = document.createElement("li");
    const cssColor = cssColors[color] || color;
    li.innerHTML = `<span class="color-box" style="background-color: ${cssColor};"></span> ${contributor}`;
    legendList.appendChild(li);
  }
}

function renderPoints() {
  markerGroup.clearLayers();
  contributorColors = {}; // Reset colors

  points.forEach((point) => {
    const color = getContributorColor(point.contributor);
    L.marker(point.coords, { icon: createIcon(color) })
      .addTo(markerGroup)
      .bindPopup(`<b>${point.label}</b><br>Oleh: ${point.contributor || "Unknown"}<br>${point.date}`);
  });
  
  updateLegend();
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

  const label = document.getElementById("label-input").value.trim() || "Tanpa nama";
  const contributor = document.getElementById("contributor-input").value.trim() || "Unknown";
  const date = new Date().toISOString().split("T")[0];

  const point = {
    coords: [pendingLatLng.lat, pendingLatLng.lng],
    label,
    contributor,
    date,
  };

  points.push(point);
  renderPoints();

  // Save to points.json automatically
  fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(points, null, 2)
  }).then(res => {
    if (!res.ok) alert("Gagal menyimpan ke server");
  }).catch(err => {
    console.error(err);
    alert("Gagal menyimpan ke server");
  });

  document.getElementById("label-input").value = "";
  document.getElementById("label-input").placeholder = "Nama lokasi";
  pendingLatLng = null;
});

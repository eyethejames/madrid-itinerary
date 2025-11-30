window.addEventListener("scroll", () => {
  const intro = document.getElementById("intro");
  const conclusion = document.getElementById("conclusion");
  const scrollY = window.scrollY;

  // Start fading out after 50px, fully gone by 300px
  const introFadeStart = 50;
  const introFadeEnd = 300;

  if (scrollY <= introFadeStart) {
    intro.style.opacity = 1;
  } else if (scrollY >= introFadeEnd) {
    intro.style.opacity = 0;
  } else {
    const opacity =
      1 - (scrollY - introFadeStart) / (introFadeEnd - introFadeStart);
    intro.style.opacity = opacity;
  }

  const conclusionTop = conclusion.offsetTop;
  const conclusionFadeStart = conclusionTop - window.innerHeight + 100;
  const conclusionFadeEnd = conclusionFadeStart + 200;

  if (scrollY <= conclusionFadeStart) {
    conclusion.style.opacity = 0;
  } else if (scrollY >= conclusionFadeEnd) {
    conclusion.style.opacity = 1;
  } else {
    const opacity =
      1 -
      (scrollY - conclusionFadeStart) /
        (conclusionFadeEnd - conclusionFadeStart);
    conclusion.style.opacity = opacity;
  }
});

// Initialize map
const map = L.map("mapid", { minZoom: 14 }).setView([40.4168, -3.7038], 15);

map.scrollWheelZoom.disable();

/* --- MAP DESIGNS --- */
// 1. STANDARD
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution: "© OpenStreetMap contributors © CARTO",
    maxZoom: 20,
  }
).addTo(map);

/* --- CARTOON / TOURIST MAP STYLE --- */
// TO-DO

// ICON FOR THEMES
const themeAIcon = L.icon({
  iconUrl: "assets/themeA.ico", // add custom icon
  iconSize: [50, 50],
});

const themeBIcon = L.icon({
  iconUrl: "assets/themeB.ico", // add custom icon
  iconSize: [50, 50],
});

const themeCIcon = L.icon({
  iconUrl: "assets/themeC.ico", // add custom icon
  iconSize: [50, 50],
});

// // Specialized Icons for items in each theme
// const plazaColonIcon = L.icon({});
// const estatuaIsabelColonIcon = L.icon({});
// const iglesiaSanGinesIcon = L.icon({});
// const plazaCibelesIcon = L.icon({});
// const palacioLiriaIcon = L.icon({});
// const bancoEspanaIcon = L.icon({});
// const realJardinBotanicoIcon = L.icon({});
// const descalzasRealesIcon = L.icon({});
// const academiaHistoriaIcon = L.icon({});

// ----- THEME A: Imperial Foundation -----
const plazaColon = L.marker([40.425, -3.6889], { icon: themeAIcon })
  .addTo(map)
  // .bindPopup("Plaza Colón")
  // .bindTooltip(themeAData[0].title, { direction: "top", offset: [0, -30] })
  .on("click", () => openModal(themeAData, 0));

const estatuaIsabelColon = L.marker([40.440328, -3.690703], {
  icon: themeAIcon,
})
  .addTo(map)
  // .bindPopup("Monument of Isabel la Católica")
  //.bindTooltip(themeAData[1].title, { direction: "top", offset: [0, -10] })
  .on("click", () => openModal(themeAData, 1));

const iglesiaSanGines = L.marker([40.4171, -3.7069], { icon: themeAIcon })
  .addTo(map)
  //.bindTooltip(themeAData[2].title, { direction: "top", offset: [0, -10] })
  .on("click", () => openModal(themeAData, 2));

// Theme A array
const themeAMarkers = [plazaColon, estatuaIsabelColon, iglesiaSanGines];

// ----- THEME B: Material Culture -----
const plazaCibeles = L.marker([40.4193, -3.6931], { icon: themeBIcon })
  .addTo(map)
  //   .bindTooltip(themeBData[0].title, { direction: "top", offset: [0, -10] })
  .on("click", () => openModal(themeBData, 0));

const palacioLiria = L.marker([40.4277, -3.7124], { icon: themeBIcon })
  .addTo(map)
  //   .bindTooltip(themeBData[1].title, { direction: "top", offset: [0, -10] })
  .on("click", () => openModal(themeBData, 1));

const bancoEspana = L.marker([40.4183, -3.6939], { icon: themeBIcon })
  .addTo(map)
  //   .bindTooltip(themeBData[2].title, { direction: "top", offset: [0, -10] })
  .on("click", () => openModal(themeBData, 2));

// Theme B array
const themeBMarkers = [plazaCibeles, palacioLiria, bancoEspana];

// ----- THEME C: Knowledge, Science & Global Exchange -----
const realJardinBotanico = L.marker([40.4111, -3.6911], { icon: themeCIcon })
  .addTo(map)
  //   .bindTooltip(themeCData[0].title, { direction: "top", offset: [0, -10] })
  .on("click", () => openModal(themeCData, 0));

const descalzasReales = L.marker([40.4183, -3.7062], { icon: themeCIcon })
  .addTo(map)
  //   .bindTooltip(themeCData[1].title, { direction: "top", offset: [0, -10] })
  .on("click", () => openModal(themeCData, 1));

const academiaHistoria = L.marker([40.4135, -3.6989], { icon: themeCIcon })
  .addTo(map)
  //   .bindTooltip(themeCData[2].title, { direction: "top", offset: [0, -10] })
  .on("click", () => openModal(themeCData, 2));

// Theme C array
const themeCMarkers = [realJardinBotanico, descalzasReales, academiaHistoria];

const allMarkers = [...themeAMarkers, ...themeBMarkers, ...themeCMarkers];

// Define polylines for each theme (connecting markers in order)
const polylineA = L.polyline(
  themeAMarkers.map((m) => m.getLatLng()),
  { color: "blue", dashArray: "5, 5" }
);
const polylineB = L.polyline(
  themeBMarkers.map((m) => m.getLatLng()),
  { color: "green", dashArray: "5, 5" }
);
const polylineC = L.polyline(
  themeCMarkers.map((m) => m.getLatLng()),
  { color: "red", dashArray: "5, 5" }
);

function showTheme(theme) {
  // Remove all markers and polylines
  allMarkers.forEach((m) => map.removeLayer(m));
  map.removeLayer(polylineA);
  map.removeLayer(polylineB);
  map.removeLayer(polylineC);

  // vs :
  //   allMarkers.forEach((m) => map.removeLayer(m));
  //   [polylineA, polylineB, polylineC].forEach((p) => {
  //     if (map.hasLayer(p)) map.removeLayer(p);
  //   });

  let markersToShow = [];
  let polylineToShow = null;

  const themeInfo = document.getElementById("themeInfo");
  if (theme === "A") {
    markersToShow = themeAMarkers;
    polylineToShow = polylineA;
  } else if (theme === "B") {
    markersToShow = themeBMarkers;
    polylineToShow = polylineB;
  } else if (theme === "C") {
    markersToShow = themeCMarkers;
    polylineToShow = polylineC;
  } else if (theme === "all") {
    markersToShow = allMarkers;
    // map.setView([40.4168, -3.7038], 15); // Reset to initial view
    // themeInfo.hidden = true; // Hide info on reset
  }

  // Add selected markers and polyline
  markersToShow.forEach((m) => m.addTo(map));
  if (polylineToShow) polylineToShow.addTo(map);

  // Zoom to fit markers
  if (markersToShow.length > 0) {
    const group = L.featureGroup(markersToShow);
    map.fitBounds(group.getBounds().pad(0.3));
  }

  // Show which theme is shown

  themeInfo.textContent =
    theme === "A"
      ? "Theme A: Imperial Foundation"
      : theme === "B"
      ? "Theme B: Material Culture"
      : theme === "C"
      ? "Theme C: Knowledge, Science & Global Exchange"
      : "";
  themeInfo.hidden = false;
}

// Set up button event listeners
document.querySelectorAll(".theme-buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.getAttribute("data-theme");
    showTheme(theme);
  });
});

// Modal elements
const modal = document.getElementById("itemModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".modal .close");
const prevBtn = document.getElementById("prevItem");
const nextBtn = document.getElementById("nextItem");

// Data for Theme A items (example)
const themeAData = [
  {
    title: "Plaza de Colón",
    description: "Central square commemorating imperial figures.",
    image: "assets/images/plazaColon.jpg",
  },
  {
    title: "Estatua de Isabel la Católica y Colón",
    description: "Monument honoring Isabella I and Columbus.",
    image: "assets/images/estatuadeIsabel.JPG",
  },
  {
    title: "Iglesia de San Ginés",
    description: "Historic church tied to royal and imperial ceremonies.",
    image: "assets/images/iglesiaSanGines.jpg",
  },
];

// Data for Theme B items
const themeBData = [
  {
    title: "Plaza de Cibeles",
    description: "Symbolic site of imperial & royal power.",
    image: "assets/images/plazaCibeles.jpg", // Add your image path
  },
  {
    title: "Palacio de Liria",
    description: "House of Alba collections, elite imperial memory.",
    image: "assets/images/palacioLiria.jpg",
  },
  {
    title: "Banco de España",
    description: "Historic building linked to Spanish elite and empire.",
    image: "assets/images/bancoEspana.jpg",
  },
];

// Data for Theme C items
const themeCData = [
  {
    title: "Real Jardín Botánico",
    description: "Botanical garden collecting plants from colonies.",
    image: "assets/images/realJardinBotanico.jpg",
  },
  {
    title: "Monasterio de las Descalzas Reales",
    description: "Convent with imperial diplomatic gifts.",
    image: "assets/images/monasterioDescalzas.jpg",
  },
  {
    title: "Real Academia de la Historia",
    description: "Institution preserving imperial historical narratives.",
    image: "assets/images/academiaHistoria.jpg",
  },
];

// Current item index
let currentIndex = 0;
let currentTheme = themeAData;

// Function to open modal
function openModal(themeData, index) {
  currentTheme = themeData;
  currentIndex = index;
  updateModalContent();
  modal.style.display = "flex";
}

// Function to update modal content
function updateModalContent() {
  const item = currentTheme[currentIndex];
  modalTitle.textContent = item.title;
  modalDescription.textContent = item.description;
  modalImage.src = item.image;
}

// Navigate prev/next
prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + currentTheme.length) % currentTheme.length;
  updateModalContent();
};
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentTheme.length;
  updateModalContent();
};

// Close modal
closeBtn.onclick = () => (modal.style.display = "none");

// Close modal if click outside content
window.onclick = (event) => {
  if (event.target === modal) modal.style.display = "none";
};

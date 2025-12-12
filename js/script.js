window.addEventListener("scroll", () => {
  const intro = document.getElementById("intro");
  const conclusion = document.getElementById("conclusion");
  const scrollY = window.scrollY;

  // Start fading out after 50px, fully gone by 300px
  const introFadeStart = 200;
  const introFadeEnd = 800;

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
const map = L.map("mapid", {
  minZoom: 14,
  scrollWheelZoom: true,
  wheelDebounceTime: 10,
  wheelPxPerZoomLevel: 120,
  zoomSnap: 0, // allow fractional zoom
  zoomDelta: 0.25, // scroll steps
}).setView([40.4268, -3.7038], 14.5);

map.scrollWheelZoom.disable();

/* --- STANDARD MAP DESIGN --- */
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution: "© OpenStreetMap contributors © CARTO",
    maxZoom: 20,
  }
).addTo(map);

// Specialized Icons for each item
const plazaColonIcon = L.icon({
  iconUrl: "assets/icons/plazaColonIcon.png",
  iconSize: [100, 100],
});
const monumentoIsabelIcon = L.icon({
  iconUrl: "assets/icons/monumentoIsabelIcon.png",
  iconSize: [100, 100],
});
const iglesiaSanGinesIcon = L.icon({
  iconUrl: "assets/icons/iglesiaSanGinesIcon.png",
  iconSize: [100, 100],
});
const plazaCibelesIcon = L.icon({
  iconUrl: "assets/icons/plazaCibelesIcon.png",
  iconSize: [100, 100],
});
const palacioLiriaIcon = L.icon({
  iconUrl: "assets/icons/palacioLiriaIcon.png",
  iconSize: [100, 100],
});
const bancoEspanaIcon = L.icon({
  iconUrl: "assets/icons/bancoEspanaIcon.png",
  iconSize: [100, 100],
});
const realJardinBotanicoIcon = L.icon({
  iconUrl: "assets/icons/realJardinBotanicoIcon.png",
  iconSize: [100, 100],
});
const descalzasRealesIcon = L.icon({
  iconUrl: "assets/icons/descalzasRealesIcon.png",
  iconSize: [100, 100],
});
const academiaHistoriaIcon = L.icon({
  iconUrl: "assets/icons/academiaHistoriaIcon.png",
  iconSize: [100, 100],
});

// ----- Show THEME A on map: Imperial Foundation -----
const plazaColon = L.marker([40.425, -3.6889], { icon: plazaColonIcon })
  .addTo(map)
  .on("click", () => openModal("A", themeAData, 0));

const estatuaIsabelColon = L.marker([40.440328, -3.690703], {
  icon: monumentoIsabelIcon,
})
  .addTo(map)
  .on("click", () => openModal("A", themeAData, 1));

const iglesiaSanGines = L.marker([40.4171, -3.7069], {
  icon: iglesiaSanGinesIcon,
})
  .addTo(map)
  .on("click", () => openModal("A", themeAData, 2));

const themeAMarkers = [plazaColon, estatuaIsabelColon, iglesiaSanGines];

// ----- Show THEME B on map: Material Culture -----
const plazaCibeles = L.marker([40.4193, -3.6931], { icon: plazaCibelesIcon })
  .addTo(map)
  .on("click", () => openModal("B", themeBData, 0));

const palacioLiria = L.marker([40.4277, -3.7124], { icon: palacioLiriaIcon })
  .addTo(map)
  .on("click", () => openModal("B", themeBData, 1));

const bancoEspana = L.marker([40.4183, -3.6939], { icon: bancoEspanaIcon })
  .addTo(map)
  .on("click", () => openModal("B", themeBData, 2));

const themeBMarkers = [plazaCibeles, palacioLiria, bancoEspana];

// ----- Show THEME C on map: Knowledge, Science & Global Exchange -----
const realJardinBotanico = L.marker([40.4111, -3.6911], {
  icon: realJardinBotanicoIcon,
})
  .addTo(map)
  .on("click", () => openModal("C", themeCData, 0));

const descalzasReales = L.marker([40.4183, -3.7062], {
  icon: descalzasRealesIcon,
})
  .addTo(map)
  .on("click", () => openModal("C", themeCData, 1));

const academiaHistoria = L.marker([40.4135, -3.6989], {
  icon: academiaHistoriaIcon,
})
  .addTo(map)
  .on("click", () => openModal("C", themeCData, 2));

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

const themeDescriptions = {
  A: `The items in the first theme are connected through their focus on the symbolic beginnings of empire. 
  These sites anchor imperial memory in 1492 and frame overseas expansion as a divinely guided and 
  civilizing mission led by the monarchy. Through religious imagery, celebratory monuments, and public 
  commemoration, they present conquest and exploration as foundational moments of national unity and moral 
  legitimacy, while largely omitting indigenous perspectives.`,

  B: `The items in this theme reflect how imperial authority was sustained and visualized through 
  urban space, elite power, and financial institutions. These locations show how Madrid was organized to 
  project centralized governance, dynastic loyalty, and economic control. Together, they demonstrate how 
  imperial power moved beyond exploration and into the structures that governed wealth, politics, and urban 
  life in the capital.`,

  C: `The items in this theme are linked by the production and management of imperial knowledge. 
  These institutions collected plants, objects, information, and historical narratives from Spain’s 
  colonial territories and transformed them into organized systems of scientific, religious, and historical 
  authority. In doing so, they reinforced Madrid’s role as the intellectual center of empire while reshaping 
  colonial knowledge into metropolitan frameworks.`,
};

function showTheme(theme) {
  // Remove all markers and polylines
  allMarkers.forEach((m) => map.removeLayer(m));
  map.removeLayer(polylineA);
  map.removeLayer(polylineB);
  map.removeLayer(polylineC);

  let markersToShow = [];
  let polylineToShow = null;

  const themeInfo = document.getElementById("themeInfo");
  const themeTextDiv = document.getElementById("themeText");
  const themeTextP = themeTextDiv.querySelector("p");

  if (theme === "A") {
    markersToShow = themeAMarkers;
    // polylineToShow = polylineA;
  } else if (theme === "B") {
    markersToShow = themeBMarkers;
    // polylineToShow = polylineB;
  } else if (theme === "C") {
    markersToShow = themeCMarkers;
    // polylineToShow = polylineC;
  } else if (theme === "all") {
    markersToShow = allMarkers;
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
  themeInfo.innerHTML =
    theme === "A"
      ? "Theme: Imperial Foundation and Symbols"
      : theme === "B"
      ? "Theme: Material Culture and Elite Memory of Empire"
      : theme === "C"
      ? "Theme: Knowledge, Science & Global Exchange in the Early Modern Empire"
      : "";
  themeInfo.hidden = false;

  if (theme === "A" || theme === "B" || theme === "C") {
    themeTextP.textContent = themeDescriptions[theme];
    themeTextDiv.hidden = false;
    themeInfo.hidden = false;
  } else if (theme === "all") {
    themeTextP.textContent = "";
  }
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
const modalTheme = document.getElementById("modalTheme");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".modal .close");
const prevBtn = document.getElementById("prevItem");
const nextBtn = document.getElementById("nextItem");

// Data for Theme A items
const themeAData = [
  {
    title: "Plaza de Colón",
    description: `This plaza located to the north of the city center is dedicated to Cristopher Columbus. 
      It contains two separate monuments: one dedicated to Christopher Columbus himself, and the other 
      to the discovery of the new world. An obvious omission from the site is the inclusion of indigenous 
      experiences. It uses classical aesthetics, such as white marble, grand columns, etc, as a way to 
      communicate authority, triumph, and the moral legitimacy of the imperial mission. It is thus clear 
      that the plaza suggests that Spain’s colonization of the new world is something to be proudly 
      memorialized in public space.`,
    image: "assets/images/plazaColon.jpg",
    // readMore: "",
  },
  {
    title: "Monumento a Isabel la Católica",
    description: `A powerful piece of public storytelling, the Monument to Isabella the Catholic anchors Spain’s 
    imperial narrative through the figure traditionally credited with initiating overseas expansion. 
    Portraying Isabella as a visionary monarch, one who granted authority to Columbus and guided the 
    Christianization of new territories, the monument frames the beginning of the empire as a civilizing 
    mission rather than conquest. Its placement in the urban core near Castellana reinforces this narrative 
    inviting pedestrians to see the origins of Spain’s empire as rooted in royal wisdom and religious purpose. 
    The pedestal of the monument contains the inscription (translated from spanish to english) “To Isabella 
    the Catholic, under whose reign national unity and the discovery of the Americas took place”. This further 
    displays the great impact that Isabella had over the beginnings of the spanish empire.`,
    image: "assets/images/estatuadeIsabel.JPG",
    // readMore: "https://en.wikipedia.org/wiki/Monument_to_Isabella_the_Catholic_(Madrid)",
  },
  {
    title: "Iglesia de San Ginés",
    description: `The Iglesia de San Ginés, one of Madrid’s oldest churches, displays how religious architecture and 
      urban churches can be used to illustrate Spain’s imperial mission. While primarily used for religious 
      service, the church itself often includes references to Spain’s overseas endeavors. One such reference 
      is the legendary crocodile of San Ginés. This stuffed crocodile was brought back from the new world 
      during the reign of Queen Isabella. This shows how exotic animals from the new world became curiosities 
      to Europeans. Churches, such as San Ginés served not only as centers of worship, but also as a place to 
      house art, relics, and stories that connected Spain with its overseas empire. There is debate over 
      whether or not the crocodile in the church today is the same as the one that was brought from the new 
      world, but nonetheless, it remains as a symbol of European curiosity during the early modern era.`,
    image: "assets/images/iglesiaSanGines.jpg",
    // readMore: "https://en.wikipedia.org/wiki/San_Gin%C3%A9s,_Madrid",
  },
];

// Data for Theme B items
const themeBData = [
  {
    title: "Plaza de Cibeles",
    description: `The Plaza de Cibeles, one of Madrid’s most iconic urban spaces, illustrates how the design and 
      monumentalization of the city reflected early modern royal and political authority. Though the 
      current fountain and surrounding architecture date largely to the nineteenth and early twentieth 
      centuries, the square occupies the historical axis along which Habsburg and Bourbon rulers organized 
      the city to project imperial power, linking royal palaces, administrative buildings, and religious 
      institutions into a symbolic network of governance. The fountain of Cybele itself, with its classical 
      iconography of a powerful goddess overseeing the city, evokes themes of prosperity, dominion, and the 
      centralizing authority of the crown, values rooted in early modern conceptions of monarchy that 
      justified and showcased Spain’s imperial reach. As a civic stage, the plaza mediates between the city 
      and the monarchy, turning urban space into a visual narrative of political hierarchy, control, and 
      imperial ambition. In this way, the Plaza de Cibeles embodies how the Spanish crown used architecture, 
      monuments, and urban planning to make Madrid a living symbol of empire, translating early modern power 
      into the organization and experience of the city itself.`,
    image: "assets/images/plazaCibeles.jpg",
    // readMore: "https://en.wikipedia.org/wiki/Plaza_de_Cibeles",
  },
  {
    title: "Palacio de Liria",
    description: `The Palacio de Liria, associated with the House of Alba, serves as an expression of how courtly power 
      and dynastic representation took shape in Spain’s early modern colonial world. Its vast collections, 
      ranging from portraits of Habsburg and Bourbon monarchs to maps, colonial artworks, and diplomatic 
      gifts, reveal how noble families used material culture to affirm their participation in the empire’s 
      global reach. Within Madrid, the palace functioned as an urban stage where the Alba family projected 
      political loyalty and social prestige, aligning themselves with both the ceremonial magnificence of the 
      Habsburg court and the administrative centralization promoted by the Bourbons. The artworks and 
      documents preserved there construct visual narratives of imperial ambition, situating the Albas as 
      intermediaries between the monarchy and distant colonial territories. In this way, the Palacio de Liria 
      operates not merely as a noble residence but as a curated monument to Spain’s colonial past, encoding in 
      its collections the rituals, hierarchies, and aesthetic languages that bound metropolis and empire 
      together.`,
    image: "assets/images/palacioLiria.jpg",
    // readMore: "https://en.wikipedia.org/wiki/Liria_Palace",
  },
  {
    title: "Banco de España",
    description: `The Banco de España, though formally established in the late eighteenth century, reflects the deep 
      structural legacy of Spain’s early modern imperial economy and its Bourbon era drive to centralize power 
      in Madrid. As an institution rooted in reforms initiated under the Bourbons, it embodied the shift from 
      the decentralized financial practices of the Habsburg empire toward a modernized, state controlled 
      fiscal system designed to stabilize and monetize the wealth flowing from Spain’s colonial domains. Its 
      prominent placement in Madrid’s urban fabric, at the symbolic meeting point of the city’s political and 
      commercial arteries, asserts the capital’s authority as the financial heart of the empire. The 
      building’s monumental architecture and programs evoke a narrative of national grandeur and imperial 
      continuity, visually linking the monarchy’s historical claims to global power with the mechanisms of 
      modern state finance. In this sense, the Banco de España stands as a late but powerful representation 
      of how early modern colonial wealth, courtly authority, and urban governance were fused into a single 
      ideological project, translating the legacy of the empire into the institutions that structured Spain’s 
      modern national identity.`,
    image: "assets/images/bancoEspana.jpg",
    // readMore: "https://en.wikipedia.org/wiki/Bank_of_Spain",
  },
];

// Data for Theme C items
const themeCData = [
  {
    title: "Real Jardín Botánico",
    description: `A clear expression of the scientific inquiry and exchange that took place within Spain’s early modern 
      empire is the Real Jardín Botánico. Founded in 1755 by King Ferdinand VI, it became a central hub for 
      classifying, cultivating, and displaying plant species with origins throughout the Spanish empire. Even 
      to this day, the garden still holds plants from the new world, including dyes such as indigo, and fruits 
      such as avocado. As botanists, naturalists and court sponsored explorers sent specimens and notes back 
      to Madrid, the garden functioned as a bridge between European science and colonial environments. By 
      organizing colonial nature into ordered scientific systems, the Real Jardín Botánico helped the monarchy 
      assert cultural and epistemic authority over distant lands, making the garden not only a space of study 
      but also a material symbol of imperial reach and the global circulation of knowledge in the early modern 
      world.`,
    image: "assets/images/realJardinBotanico.jpg",
    // readMore: "https://en.wikipedia.org/wiki/Real_Jard%C3%ADn_Bot%C3%A1nico_de_Madrid",
  },
  {
    title: "Monasterio de las Descalzas Reales",
    description: `The Monasterio de las Descalzas Reales reveals how early modern religious institutions participated in 
      the global exchange of knowledge that underpinned Spain’s empire. As a royal convent tied to Habsburg 
      court culture, it became a repository for sacred objects, relics, devotional art, and luxury goods 
      arriving from across the empire, including the Americas, Asia, and the Philippines. Each object carried 
      with it forms of cultural, botanical, artistic, and technological knowledge. The convent’s cloistered 
      community, composed largely of noblewomen, maintained networks of correspondence and patronage that 
      linked Madrid to colonial elites and missionary orders. These networks allowed information about distant 
      peoples, materials, and environments to circulate back to the metropolitan center. Its treasuries and 
      chapels, filled with artworks made from colonial materials like Mexican silver, Andean textiles, Asian 
      ivories, and exotic dyes, show how global resources were incorporated into religious practice and 
      courtly spirituality. In this way, the Descalzas Reales functioned as a quiet but powerful engine of 
      imperial learning: a space where the spiritual, scientific, and cultural products of the empire were 
      collected, interpreted, and transformed into symbols of both dynastic piety and global dominion.`,
    image: "assets/images/monasterioDescalzas.jpg",
    // readMore: "https://www.patrimonionacional.es/coleccion/archivo-general-de-palacio/informacion-general",
  },
  {
    title: "Real Academia de la Historia",
    description: `The Real Academia de la Historia, founded in the eighteenth century during the Bourbon reform era, 
      became a central institution for organizing and legitimizing the knowledge Spain collected through its 
      early modern empire. Tasked with producing an authoritative national history, the Academy drew heavily 
      on documents, maps, chronicles, and ethnographic accounts sent from colonial territories, effectively 
      transforming local and indigenous knowledge into imperial archives. Scholars working within the Academy 
      classified and interpreted materials from the Americas and Asia, integrating them into broader 
      narratives of Spanish civilization, monarchy, and global expansion. This process not only systematized 
      historical inquiry along Enlightenment lines but also reinforced the cultural and intellectual 
      hierarchies that underpinned colonial rule by privileging metropolitan scholarship over colonial voices. 
      Through its collections, its patronage of scientific expeditions, and its role in organizing imperial 
      information, the Real Academia de la Historia functioned as a key site where global encounters were 
      distilled into state-sponsored knowledge, turning the raw materials of empire into the historical 
      foundations of Bourbon authority and Spain’s early modern imperial identity.`,
    image: "assets/images/academiaHistoria.jpg",
    // readMore: "https://www.rah.es/",
  },
];

// Current item index
let currentIndex = 0;
let currentThemeData = themeAData;
let currentThemeId = "A";

// Function to open modal
function openModal(themeId, themeData, index) {
  document.querySelector("header").style.display = "none";
  currentThemeId = themeId;
  currentThemeData = themeData;
  currentIndex = index;
  updateModalContent();
  modal.style.display = "flex";
}

// Function to update modal content
function updateModalContent() {
  const item = currentThemeData[currentIndex];
  modalTheme.textContent =
    currentThemeId === "A"
      ? "Current theme: Imperial Foundation and Symbols"
      : currentThemeId === "B"
      ? "Current theme: Material Culture and Elite Memory of Empire"
      : "Current theme: Knowledge, Science & Global Exchange in the Early Modern Empire";
  modalTitle.textContent = item.title;
  modalDescription.textContent = item.description;
  modalImage.src = item.image;
  // moreInfo.href = item.readMore;
}

// Navigate prev/next
prevBtn.onclick = () => {
  currentIndex =
    (currentIndex - 1 + currentThemeData.length) % currentThemeData.length;
  updateModalContent();
};
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentThemeData.length;
  updateModalContent();
};

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
  document.querySelector("header").style.display = "block";
};

// Close modal if click outside content
window.onclick = (event) => {
  if (event.target === modal) modal.style.display = "none";
  //document.querySelector("header").style.display = "block";
};

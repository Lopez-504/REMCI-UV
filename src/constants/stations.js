export const STATIONS = [
  { id: '1',
    name: "Ciencias UV",
    loc: 'Valparaíso, Chile',
    color: '#33ff00',
    lat: -33.02705, 
    lng: -71.63875, 
    elev: '77.58',
    elevUnit: "masl",
    instdate:'24/07/2024',
    timezone: 'America/Santiago',
    brand: 'Hobo RX3000',
    status: 'online', 
    images: [
      "REMCI-UV/images/estacionUV.png",
      "REMCI-UV/images/cameraciencias.gif",
      "REMCI-UV/images/2025-07-28-07-49-19.jpg"
    ],
    variables: [
      "temp",
      "rh",
      "dew",
      "ws",
      "wd",
      "wg",
      "press",
      "solarRad",
      "accRain"
    ],
    link: "https://www.licor.cloud/dashboards/public/edb4ddea-8f4d-4401-8479-1535407cc17a/false?filters={%22davra-timeselector%22:{%22type%22:%22relative%22,%22unit%22:%22minutes%22,%22value%22:30,%22live%22:false}}"},

  { id: '2', 
    name: "Pocuro UV",
    loc: 'Los Andes, Chile', 
    color: '#8b0cc6',
    lat: -32.86967, 
    lng: -70.61523, 
    elev: '800',
    elevUnit: "masl",
    instdate:'23/03/2026',
    timezone: 'America/Santiago',
    brand: 'Hobo RX3000', 
    status: 'online',
    images: [
      "REMCI-UV/images/pocuro1.jpg",
      "REMCI-UV/images/pocuro2.gif",
      "REMCI-UV/images/pocuro3.jpg",
    ],
    variables: [
      "temp",
      "rh",
      "dew",
      "ws",
      "wd",
      "wg",
      "press",
      "solarRad",
      "accRain"
    ],
    link: "https://www.licor.cloud/dashboards/public/f2e63989-d622-4d4a-95c3-6708d4ef080b/true?filters={%22davra-timeselector%22:{%22type%22:%22relative%22,%22unit%22:%22minutes%22,%22value%22:30,%22live%22:true}}"}, 

  { id: '3', 
    name: "La Reserva",
    loc: 'Villa Alemana, Chile', 
    color: '#fff700',
    lat: -33.04374, 
    lng: -71.33947, 
    elev: '228.87',
    elevUnit: "masl",
    instdate:'30/03/2026',
    timezone: 'America/Santiago',
    brand: 'Davis Vantage Pro2',
    status: 'offline',
    images: [
      "REMCI-UV/images/reserva1.jpg",
      "REMCI-UV/images/presentation.jpeg",
      "REMCI-UV/images/instalacion.jpeg",
      "REMCI-UV/images/davis2.1.png"
    ],
    variables: [
      "temp",
      "rh",
      "dew",
      "ws",
      "wd",
      "wg",
      "press",
      "accRain"
    ],
    link: "https://www.weatherlink.com/embeddablePage/show/745c3c317c794f5a81f5a777bde785b5/summary"
  },
  
  { id: '4', 
    name: "Home",
    loc: 'Villa Alemana, Chile', 
    color: '#1602eb',
    lat: -33.061188,
    lng: -71.396009, 
    elev: '160.72',
    elevUnit: "masl",
    instdate: 'July 28, 2026',
    timezone: 'America/Santiago',
    brand: 'DIY Weather Station',
    status: 'MAINTENANCE',
    images: [
      "REMCI-UV/images/cameraciencias.gif",
    ],
    variables: [
      "temp",
      "rh",
      "dew",
      "ws",
      "wd",
      "wg",
      "press",
      "solarRad",
      "accRain"
    ],
    link: "https://www.weatherlink.com/embeddablePage/show/745c3c317c794f5a81f5a777bde785b5/summary"}
];

// BUG: locally the images paths need the REMCI-UV at the begining, but in GitHub we don't need it
// Try to fix this in vite.config.js, here the base root is set to "/REMCI-UV"
// NOTE: for consistency, keep the ids as strings
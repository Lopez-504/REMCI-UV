export const STATIONS = [
  { id: 1, 
    name: "Pocuro-AWS", 
    color: '#8b0cc6',
    lat: -32.86967, 
    lng: -70.61523, 
    brand: 'Hobo RX3000', 
    status: 'ACTIVE',
    images: [
      "/images/pocuro1.jpg",
      "/images/pocuro2.gif",
      "/images/pocuro3.jpg",
    ],
    temp: 18.5, 
    humidity: 45, 
    windSpeed: 0.5, 
    windDir: 216, 
    solarRad: 1}, 

  { id: 2,
    name: "CienciasUV-AWS",
    color: '#33ff00',
    lat: -33.02705, 
    lng: -71.63875, 
    brand: 'Hobo RX3000',
    status: 'IDLE', 
    images: [
      "/images/estacionUV.png",
      "/images/cameraciencias.gif",
      "/images/2025-07-28-07-49-19.jpg"
    ],
    temp: 16.2, 
    humidity: 62, 
    windSpeed: 0.5, 
    windDir: 216, 
    solarRad: 1 },

  { id: 3, 
    name: "LaReserva-AWS", 
    color: '#fff700',
    lat: -33.04374, 
    lng: -71.33947, 
    brand: 'Davis Vantage Pro2',
    status: 'ACTIVE',
    images: [
      "/images/reserva1.jpg",
      "/images/presentation.jpeg",
      "/images/instalacion.jpeg"
    ],
    temp: 17.8, 
    humidity: 55, 
    windSpeed: 0.5, 
    windDir: 216, 
    solarRad: 1 }
];

// BUG: locally the images paths need the REMCI-UV at the begining, but in GitHub we don't need it
// Try to fix this in vite.config.js, here the base root is set to "/REMCI-UV"
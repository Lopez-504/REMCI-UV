export const SATELLITE_PRODUCTS = [
  {
    title: "cleanIR.title",
    description: "cleanIR.desc",
    help:"cleanIR.help",
    time:"cleanIR.time",
    url: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/13/GOES19-SSA-13-900x540.gif",
    colorbar: "REMCI-UV/images/colorbar-band13.png",
  },      
  {
    title: "visibleRed.title",
    description: "visibleRed.desc",
    help:"visibleRed.help",
    time:"visibleRed.time",
    url: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/02/GOES19-SSA-02-900x540.gif",
    colorbar: "",
  },
  {
    title: "waterVapor.title",
    description: "waterVapor.desc",
    help:"waterVapor.help",
    time:"waterVapor.time",
    // Band 08 = Upper-level water vapor, Band 09 = Mid-level, Band 10 = Lower-level
    url: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/08/GOES19-SSA-08-900x540.gif",
    colorbar: "REMCI-UV/images/colorbar-band8.png",
  },
  {
    title: "airMass.title",
    description: "airMass.desc",
    help:"airMass.help",
    time:"airMass.time",
    url: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/AirMass/GOES19-SSA-AirMass-900x540.gif",
    colorbar: "REMCI-UV/images/colorbar-airmass.png",
  },
  //{
  //  title: "geocolor.title",
  //  description: "geocolor.desc",
  //  help:"geocolor.help",
  //  time:"geocolor.time",
  //  url: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/GEOCOLOR/GOES19-SSA-GEOCOLOR-900x540.gif",
  //  colorbar: "",
  //},
];

// This one is good too: Day Cloud Phase / Night Microphysics

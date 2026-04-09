// Function to generate a realistic meteorological curve
const generateWeatherData = () => {
  const data = [];
  const startTime = new Date('2026-03-30T00:00:00');
  
  // "status" field to simulate sensor dropouts
  const status = Math.random() > 0.1 ? 1 : 0; // 10% chance of data loss

  for (let i = 0; i < 96; i++) {
    const time = new Date(startTime.getTime() + i * 30 * 60000);
    const hour = time.getHours() + time.getMinutes() / 60;

    // Physics-based Diurnal Cycle: T(t) = T_avg + A * sin(freq * (t - t_shift))
    // We shift by 10 hours so the peak (sin=1) happens at 16:00 (4 PM)
    const temp = (20 + 7 * Math.sin((Math.PI / 12) * (hour - 10))).toFixed(1);
    
    // Humidity is usually inversely proportional to temperature
    const humidity = (65 - 25 * Math.sin((Math.PI / 12) * (hour - 10))).toFixed(0);
    
    // Wind Speed usually picks up in the afternoon due to thermal gradients
    const windSpeed = (3 + 4 * Math.max(0, Math.sin((Math.PI / 12) * (hour - 8)))).toFixed(1);

    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: time.toISOString(),
      temp: parseFloat(temp),
      humidity: parseInt(humidity),
      windSpeed: parseFloat(windSpeed),
      windDir: 270 // Consistent Westerly wind for Valparaiso
    });
  }
  return data;
};

export const RAW_WEATHER_DATA = generateWeatherData();

// Calculating Availability
const calculateAvailability = (data, start, end, variable) => {
  const totalDuration = end - start;
  const intervalDuration = totalDuration / 30;
  const availabilityPoints = [];

  for (let i = 0; i < 30; i++) {
    const binStart = new Date(start.getTime() + i * intervalDuration);
    const binEnd = new Date(start.getTime() + (i + 1) * intervalDuration);

    // Filter data that falls into this specific 1/30th bin
    const binData = data.filter(d => {
      const dTime = new Date(d.timestamp);
      return dTime >= binStart && dTime < binEnd;
    });

    // Availability = (Actual points with data / Expected points) * 100
    // For mock purposes, we'll average the 'status' field
    const validPoints = binData.filter(d => d[variable] !== undefined && d.status !== 0).length;
    const percentage = binData.length > 0 ? (validPoints / binData.length) * 100 : 0;

    availabilityPoints.push({
      interval: binStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: Math.round(percentage)
    });
  }
  return availabilityPoints;
};

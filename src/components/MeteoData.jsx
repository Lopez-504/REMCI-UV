import React, { useState, useEffect } from "react";
import FetchClock from "./FetchClock";

const sadCloud = 'https://s3.amazonaws.com/static.weatherlink.com/images/errorpage/sadconfusedraincloud-07.svg' 

function MeteoData() {
  const [data, setData] = useState(null);
  const [lastAttempt, setLastAttempt] = useState(null);
  const [lastSuccess, setLastSuccess] = useState(null);

  const fetchData = () => {
    setLastAttempt(new Date());

    fetch("https://api.open-meteo.com/v1/forecast?latitude=-33.06118&longitude=-71.396&current=temperature_2m,wind_speed_10m")
      .then(res => res.json())
      .then(newData => {
        setData(newData);
        setLastSuccess(new Date());
      })
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 120000/120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <FetchClock
        lastAttempt={lastAttempt}
        lastSuccess={lastSuccess}
      />

      {!data ? (
        <h1>Loading meteorological data... <img>sadCloud</img></h1>
      ) : (
        <>
          <h1>Location: {data.latitude} lat | {data.longitude} lon</h1>
          <h2>Current temperature: {data.current.temperature_2m} {data.current_units.temperature_2m}</h2>
          <h2>Current wind speed: {data.current.wind_speed_10m} {data.current_units.wind_speed_10m}</h2>
          <h2>Data timestamp: {data.current.time}</h2>
        </>
      )}
    </div>
  );
}

export default MeteoData;
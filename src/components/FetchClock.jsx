import React from "react";
import "./fetchClock.css";

function formatGMTMinus4(date) {
  if (!date) return "--:--:--";

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Etc/GMT+4", // fixed GMT-4
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function FetchClock({ lastAttempt, lastSuccess }) {
  return (
    <div className="fetch-clock">
      <div className="clock-box">
        <span className="clock-label">Last fetch attempt</span>
        <span className="clock-time">{formatGMTMinus4(lastAttempt)}</span>
        <span className="clock-zone">GMT-4</span>
      </div>

      <div className="clock-divider" />

      <div className="clock-box">
        <span className="clock-label">Last successful update</span>
        <span className="clock-time">{formatGMTMinus4(lastSuccess)}</span>
        <span className="clock-zone">GMT-4</span>
      </div>
    </div>
  );
}

export default FetchClock;
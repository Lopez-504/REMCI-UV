import React, { useState } from 'react';

const HIGHLIGHTS = [
  { id: 1, time: '06:00 AM', url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=200' },
  { id: 2, time: '12:00 PM', url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=200' },
  { id: 3, time: '03:00 PM', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200' },
  { id: 4, time: '06:00 PM', url: 'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=200' },
  { id: 5, time: '09:00 PM', url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4b519?w=200' },
];

const LiveGallery = () => {
  return (
    <div className="gallery-container">
      {/* LEFT SIDE: HIGHLIGHTS STRIP */}
      <aside className="highlights-sidebar">
        <h3 className="sidebar-title">Today's Highlights</h3>
        <div className="thumbnails-list">
          {HIGHLIGHTS.map(pic => (
            <div key={pic.id} className="thumb-card">
              <img src={pic.url} alt={`Sky at ${pic.time}`} />
              <span>{pic.time}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT SIDE: LIVE VIEW */}
      <main className="live-stream-area">
        <div className="live-header">
          <div className="live-indicator">🔴 LIVE FEED</div>
          <h2>Pocuro-AWS Camera</h2>
        </div>
        <div className="video-placeholder">
            {/* Replace this with your actual <img src="http://camera-ip/mjpeg" /> */}
            <p>Waiting for stream connection...</p>
        </div>
        <div className="stream-footer">
            <p>Location: -32.869, -70.615 | Altitude: 850m</p>
        </div>
      </main>
    </div>
  );
};

export default LiveGallery;

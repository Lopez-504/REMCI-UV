import { useState } from 'react';

import pocuro1 from "/images/pocuro1.jpg"        // This works
import pocuro2 from "/images/pocuro2.gif"
import pocuro3 from "/images/pocuro3.jpg"

import ciencias4 from "/images/2025-07-28-10-19-19.jpg"
import ciencias2 from "/images/2025-07-28-10-49-19.jpg"
import ciencias3 from "/images/2025-07-28-07-49-19.jpg"
import ciencias1 from "/images/cameraciencias.gif"

import reserva1 from "/images/instalacion.jpeg"
import reserva2 from "/images/presentation.jpeg"
import reserva3 from "/images/reserva1.jpg"

const IMAGE_DB = {
  "Pocuro-AWS": [
    pocuro1,
    pocuro2,
    pocuro3
  ],
  "CienciasUV-AWS": [
    ciencias1,
    ciencias2,
    ciencias3,
    ciencias4
  ],
  "LaReserva-AWS": [
    reserva1,
    reserva2,
    reserva3
  ]
};

const StationGallery = ({ selectedStation }) => {

  const images = IMAGE_DB[selectedStation?.name] || [];

  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); 

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  if (images.length === 0) return <div>No images</div>;

  return (
    <div className="card-frame gallery-card">

      <div className="card-header">Station Gallery</div>

      <div className="gallery-container">

        {/* ZOOM MODAL */}
        {isZoomed && (
          <div className="zoom-modal" onClick={() => setIsZoomed(false)}>
            <img src={images[index]} alt="zoomed" />
          </div>
        )}

        {/* IMAGE */}
        <div className="image-wrapper">

          <img src={images[index]} alt="station" />

          <button
            className="zoom-btn"
            onClick={() => setIsZoomed(true)}
          >
            🔍
          </button>

        </div>

        {/* CONTROLS */}
        <div className="gallery-controls">
          <button onClick={prev}>←</button>
          <span>{index + 1} / {images.length}</span>
          <button onClick={next}>→</button>
        </div>

        {/* DOTS */}
        <div className="gallery-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={i === index ? 'dot active' : 'dot'}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default StationGallery;

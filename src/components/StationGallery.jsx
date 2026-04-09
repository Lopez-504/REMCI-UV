import { useState } from 'react';

const IMAGE_DB = {
  "Pocuro-AWS": [
    "/images/pocuro1.jpg",
    "/images/pocuro2.jpg",
    "/images/pocuro3.jpg"
  ],
  "CienciasUV-AWS": [
    "/images/ciencias1.jpg",
    "/images/ciencias2.jpg",
    "/images/ciencias3.jpg"
  ],
  "LaReserva-AWS": [
    "/images/reserva1.jpg",
    "/images/reserva2.jpg",
    "/images/reserva3.jpg"
  ]
};

const StationGallery = ({ selectedStation }) => {

  const images = IMAGE_DB[selectedStation?.name] || [];

  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // ✅ MOVED HERE

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

import { useEffect, useState } from "react";

import "./goesSatellite.css";

const SATELLITE_PRODUCTS = [
  {
    title: "Band 13 - Clean Infrared",
    description: "Cloud-top temperature and synoptic weather (day/night)",
    url: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/13/GOES19-SSA-13-900x540.gif",
  },      
  {
    title: "Band 2 - Visible Red",
    description: "Visible satellite imagery (daytime only)",
    url: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/GEOCOLOR/GOES19-SSA-GEOCOLOR-900x540.gif",
  },
  {
    title: "Band 08 - Water Vapor",
    description: "Upper-level moisture and jet stream",
    // Band 08 = Upper-level water vapor, Band 09 = Mid-level, Band 10 = Lower-level
    url: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/08/GOES19-SSA-08-900x540.gif",
  },
];

const HQ_IMAGES = [
  {
    title: "Band 13 - Clean Infrared",
    src: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/13/3600x2160.jpg",
  },
  {
    title: "Band 2 - Visible",
    src: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/02/3600x2160.jpg",
  },
  {
    title: "Band 08 - Water Vapor",
    src: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/08/3600x2160.jpg",
  },
  {
    title: "GEOCOLOR",
    src: "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/ssa/GEOCOLOR/3600x2160.jpg",
  },
];

export default function GoesSatellite() {
  const [refreshKey, setRefreshKey] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(Date.now());
    }, 10 * 60 * 1000);                 //10min

    return () => clearInterval(interval);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
    <div className="goes-container">
      <div className="goes-scroll">

        {SATELLITE_PRODUCTS.map((product) => (
          <section className="goes-panel" key={product.title}>

            <div className="goes-header">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </div>

            <div className="goes-image-wrapper">

              <img
                src={`${product.url}?t=${refreshKey}`}
                alt={product.title}
                className="goes-image"
              />

            </div>

          </section>
        ))}

      </div>
    </div>
    
    {/* =======================================================
    HIGH RESOLUTION IMAGE GALLERY
    ======================================================= */}

    <div className="goes-gallery">

        <h2 className="gallery-title">
            High Resolution Satellite Imagery
        </h2>

        <div className="gallery-grid">

            {HQ_IMAGES.map((image) => (

                <div
                    className="gallery-card"
                    key={image.title}
                    onClick={() => setSelectedImage(image)}
                >

                    <img
                        src={image.src}
                        alt={image.title}
                    />

                    <span>{image.title}</span>

                </div>

            ))}

        </div>

    </div>

    {selectedImage && (

        <div
            className="lightbox"
            onClick={() => setSelectedImage(null)}
        >

            <button
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
            >
                ✕
            </button>

            <img
                className="lightbox-image"
                src={selectedImage.src}
                alt={selectedImage.title}
                onClick={(e) => e.stopPropagation()}
            />

            <div className="lightbox-caption">
                {selectedImage.title}
            </div>

        </div>

    )}
    </>
  );
}
import { useEffect, useState } from "react";

//COMPONENTS & TRANSLATION
import HelpTooltip from '../components/HelpTooltip';
import { useTranslation } from "react-i18next";

//CSS & STATICS
import "./goesSatellite.css";
import { SATELLITE_PRODUCTS } from "../constants/satelliteProducts-ghp"
//import { SATELLITE_PRODUCTS } from "../constants/satelliteProducts"
import { HQ_IMAGES } from "../constants/satelliteHQimg"

export default function GoesSatellite() {
  const { t } = useTranslation("charts");

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
              <h2>
                {t(product.title)}
                <span>
                  <HelpTooltip helpKey={t(product.help)} placement='right'/>
                </span>
              </h2>
              <p>{t(product.description)} 
                <span>
                  <HelpTooltip helpKey={t(product.time)} placement='bottom'/>
                </span>
              </p>
            </div>

            <div className="goes-image-wrapper">
              <img
                src={`${product.url}?t=${refreshKey}`}
                alt={t(product.title)}
                className="goes-image"
              />
              <span>
                <HelpTooltip 
                  helpKey={""} 
                  placement='top' 
                  image={product.colorbar} 
                  size={24}
                  icon="pallete"
                />
              </span>
            </div>
          </section>
        ))}
      </div>
    </div>
    
    {/* HIGH RESOLUTION IMAGE GALLERY */}
    <div className="goes-gallery">
        <h2 className="gallery-title">
            {t("hqSatImg.title")}
            <span>
              <HelpTooltip helpKey={t("hqSatImg.help")} placement='right'/>
            </span>
        </h2>
        <div className="gallery-grid">
          {HQ_IMAGES.map((image) => (
            <div
              className="goes-gallery-card"
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
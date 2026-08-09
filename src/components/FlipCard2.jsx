import React, { useState } from "react";
import "./flipCard2.css";
import FormattedText from "./FormattedText";

const FlipCard2 = ({ 
    cardTitle, 
    cardFront,
    cardBack, 
    cardImg
  }) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  return (
      <div className="cloud-container">
        <div className={`flip-cloud ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-cloud-inner">
            {/* Card front */}  
            <div className="flip-cloud-front">
              <div className="cloud-title">
                <h2>{cardTitle}</h2>
              </div>
              <div className="cloud-content">
                <div className="cloud-image">
                  <img src={cardImg} alt="cloud" />
                </div>
              </div>
              <button 
                className="cloud-flip-button" 
                onClick={handleFlip}>
                ⮞
              </button>
            </div>
            {/* Card back */}
            <div className="flip-cloud-back">
              <div className="cloud-title">
                <h2>{cardTitle}</h2>
              </div>
              <div className="cloud-content">
                <FormattedText text={cardBack}/>
              </div>
              <button 
                className="cloud-flip-button" 
                onClick={handleFlip}>
                ⮜
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FlipCard2;

/*
<div className="cloud-text">
                  <FormattedText text={cardFront}/>
                </div>
*/
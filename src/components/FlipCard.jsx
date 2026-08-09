import React, { useState } from "react";
import "./flipCard.css";
import FormattedText from "./FormattedText";

const FlipCard = ({ 
    cardTitle, 
    cardFront, 
    cardBack,
    cardIcon}) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  return (
      <div className="container">
        <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-card-inner">
            {/* Card front */}  
            <div className="flip-card-front">
              <div className="card-title">
                <h2>{cardTitle}</h2>
                <h3>{cardIcon}</h3>
              </div>
              <div className="card-content">
                <FormattedText text={cardFront}/>
              </div>
              <button 
                className="flip-button" 
                onClick={handleFlip}>
                ⮞
              </button>
            </div>
            {/* Card back */}
            <div className="flip-card-back">
              <div className="card-title">
                <h2>{cardTitle}</h2>
                <h3>{cardIcon}</h3>
              </div>
              <div className="card-content">
                <FormattedText text={cardBack}/>
              </div>
              <button 
                className="flip-button" 
                onClick={handleFlip}>
                ⮜
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FlipCard;
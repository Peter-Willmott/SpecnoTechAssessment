import React from "react";
import cardBack from "../../img/cardBack.png";

import "./Card.css";

const Card = ({ indCard, selectedCard, showCard, matched }) => {
  const handleSelectedCard = () => {
    selectedCard(indCard);
  };
  return (
    <div className="card">
      <div className={matched ? "matched" : ""}>
        <div className={showCard ? "flipped" : ""}>
          <img className="front" src={indCard.src} alt="cardFront" />
          <img
            className="back"
            src={cardBack}
            alt="cardBack"
            onClick={handleSelectedCard}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

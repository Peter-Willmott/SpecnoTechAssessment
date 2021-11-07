import React from "react";

// Images
import cardBack from "../../img/cardBack.png";

// Style
import "./Card.css";

const Card = ({ indCard, selectedCard, showCard, matched }) => {
  // Set selected card
  const handleSelectedCard = () => {
    selectedCard(indCard);
  };
  return (
    <div className="card">
      {/* If matched already, hide */}
      <div className={matched ? "matched" : ""}>
        {/* Flip selected card */}
        <div className={showCard ? "flipped" : ""}>
          {/* Front of card (value) */}
          <img className="front" src={indCard.src} alt="cardFront" />
          {/* Back of card (Speco decal) */}
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

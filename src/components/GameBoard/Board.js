import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

// Antd imports
import { Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

// Images
import backgroundCard from "../../img/backgroundCard.jpg";
import backgroundBoard from "../../img/backgroundBoard.png";
import match from "../../img/match.gif";
import player1Avatar from "../../img/player1_Avatar.png";
import player2Avatar from "../../img/player2_Avatar.png";

// Components
import Card from "../GameBoard/Card";
import Exit from "../ExitButton";

// Cards
import cards from "./cardsArray";

// Style
import "./Board.css";

const { Title } = Typography;

// Style overrides, kept within file ease of image imports
const styleOverrides = {
  Background: {
    backgroundImage: `url(${backgroundCard})`,
    height: "100vh",
  },
  CardContainer: {
    backgroundImage: `url(${backgroundBoard})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "70%",
    padding: 10,
    borderRadius: 20,
    height: "85vh",
    marginTop: -25,
  },
  CardContainerMatch: {
    backgroundImage: `url(${match})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "70%",
    padding: 10,
    borderRadius: 20,
    height: "85vh",
    marginTop: -25,
  },
};

const Board = () => {
  const [playersTurn, setPlayerTurn] = useState(true);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [rocketShip, setRocketShip] = useState(true);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Shuffle cards, reset score and clock
  const shuffle = () => {
    const shuffled = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((cards) => ({ ...cards, id: Math.random(), matched: false }));
    setShuffledCards(shuffled);
    setCardOne(null);
    setCardTwo(null);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setTime(0);
    setStart(true);
  };

  // Call shuffle on load
  useEffect(() => {
    shuffle();
  }, []);

  // Assign first and second card
  const selectedCard = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  // Check if card numbers (value) match
  const checkNumber = (cardOneNumber, cardTwoNumber) => {
    if (cardOneNumber === cardTwoNumber) {
      return true;
    } else {
      return false;
    }
  };

  // Check if card colour matches
  const checkColor = (cardOneSuit, cardTwoSuit) => {
    if (cardOneSuit === cardTwoSuit) {
      return true;
    } else {
      return false;
    }
  };

  // Navigate to Score on game complete
  useEffect(() => {
    if (shuffledCards.length > 0) {
      if (shuffledCards.some((e) => e.matched === false)) {
      } else {
        navigate("/SpecnoTechAssessment/score", {
          state: {
            playerOne: location.state.playerOne,
            playerTwo: location.state.playerTwo,
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
          },
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffledCards]);

  // Game Clock
  useEffect(() => {
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);

  // Show 'Its a Match' Rocket
  const showRocket = () => {
    setRocketShip(false);
    setTimeout(() => setRocketShip(true), 1600);
  };

  // Match cards
  useEffect(() => {
    if (cardOne && cardTwo) {
      // Split card src (e.g. "/SpecnoTechAssessment/static/media/2_of_diamonds.a51b192d.png")
      const cardOneValues = cardOne.src.split("_");
      const cardTwoValues = cardTwo.src.split("_");
      let cardOneNumber = null;
      let cardTwoNumber = null;
      let cardOneSuit = null;
      let cardTwoSuit = null;
      // (e.g. "/SpecnoTechAssessment/static/media/2")
      cardOneNumber = cardOneValues[0];
      cardTwoNumber = cardTwoValues[0];
      // Identify if card One is a Jocker or not based of split length (_).
        //  Length of "2_of_clubs.png" = 3
        //  Length of "joker_black.png" = 2
      if (cardOneValues.length > 2) {
        cardOneSuit = cardOneValues[2];
        // Match suit to colour
        if (cardOneSuit.includes("clubs") || cardOneSuit.includes("spades")) {
          cardOneSuit = "black";
        } else {
          cardOneSuit = "red";
        }
      }
      if (cardTwoValues.length > 2) {
        cardTwoSuit = cardTwoValues[2];
        if (cardTwoSuit.includes("clubs") || cardTwoSuit.includes("spades")) {
          cardTwoSuit = "black";
        } else {
          cardTwoSuit = "red";
        }
      }
      if (cardOneValues.length === 2) {
        cardOneSuit = "Jocker";
      }
      if (cardTwoValues.length === 2) {
        cardTwoSuit = "Jocker";
      }
      const number = checkNumber(cardOneNumber, cardTwoNumber);
      const suit = checkColor(cardOneSuit, cardTwoSuit);

      // If cards match, update 'matched' value to 'true' for both cards
      if (number && suit) {
        setShuffledCards((cardsOnBoard) => {
          return cardsOnBoard.map((card) => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true };
            }
            if (card.src === cardTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        // Show rocket animation
        setTimeout(showRocket());
        // Reset card selection
        setCardOne(null);
        setCardTwo(null);
        // Add score
        if (playersTurn) {
          setPlayerOneScore((prevCount) => prevCount + 10);
        } else {
          setPlayerTwoScore((prevCount) => prevCount + 10);
        }
      // If no match, reset card selection and next players turn
      } else {
        setTimeout(() => {
          setCardOne(null);
          setCardTwo(null);
          setPlayerTurn(!playersTurn);
        }, 800);
      }
    }
  }, [cardOne, cardTwo, playersTurn]);

  return (
    <div style={styleOverrides.Background}>
      <Exit />

      <div>
        <Link
          to="/SpecnoTechAssessment/"
          state={{ playerOne: "playerOneName", playerTwo: "playerTwoName" }}
        >
          <ArrowLeftOutlined className="backArrow" />
        </Link>
      </div>

      <div className="players">
        <div className="playerOne">
          <img className="avatars" src={player1Avatar} alt="Player_1" />
          <Title className="gameTitle" level={3}>
            {location.state.playerOne}
          </Title>
          <Title className="gameTitle" level={4}>
            Score: {playerOneScore}
          </Title>
          {playersTurn && (
            <div className="playerTurn">
              <Title className="playerTurnText" level={4}>
                It's your turn
              </Title>
            </div>
          )}
        </div>
        {rocketShip && (
          <div style={styleOverrides.CardContainer}>
            <div className="cardLayout">
              {shuffledCards.map((indCard) => (
                // Component to handle individual cards
                <Card
                  key={indCard.id}
                  indCard={indCard}
                  selectedCard={selectedCard}
                  showCard={indCard === cardOne || indCard === cardTwo}
                  matched={indCard.matched}
                />
              ))}
            </div>
          </div>
        )}
        {!rocketShip && <div style={styleOverrides.CardContainerMatch}></div>}

        <div className="playerTwo">
          <img className="avatars" src={player2Avatar} alt="Player_2" />
          <Title className="gameTitle" level={3}>
            {location.state.playerTwo}
          </Title>
          <Title className="gameTitle" level={4}>
            Score: {playerTwoScore}
          </Title>
          {!playersTurn && (
            <div className="playerTurn">
              <Title className="playerTurnText" level={4}>
                It's your turn
              </Title>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Link
            to="/SpecnoTechAssessment/score"
            state={{
              playerOne: location.state.playerOne,
              playerTwo: location.state.playerTwo,
              playerOneScore: playerOneScore,
              playerTwoScore: playerTwoScore,
            }}
          >
            <Button className="bottomButtons">End Game</Button>
          </Link>
        </div>
        <div className="column">
          {/* Game timer */}
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </div>
        <div className="column">
          <Button className="bottomButtons" onClick={shuffle}>
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Board;

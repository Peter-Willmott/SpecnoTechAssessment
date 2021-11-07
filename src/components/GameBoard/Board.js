import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import backgroundCard from "../../img/backgroundCard.jpg";
import backgroundBoard from "../../img/backgroundBoard.png";
import match from "../../img/match.gif";
import player1Avatar from "../../img/player1_Avatar.png";
import player2Avatar from "../../img/player2_Avatar.png";
import Card from "../GameBoard/Card";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { ArrowLeftOutlined } from "@ant-design/icons";

import Exit from "../ExitButton";

const { Title } = Typography;

const styleOverrides = {
  Background: {
    backgroundImage: `url(${backgroundCard})`,
    height: "100vh",
  },
  GameTitle: {
    color: "white",
    textAlign: "center",
  },
  Players: {
    display: "flex",
  },
  PlayerOne: {
    marginLeft: "5%",
    width: "15%",
  },
  PlayerTwo: {
    marginRight: "5%",
    width: "15%",
  },
  CardContainer: {
    backgroundImage: `url(${backgroundBoard})`,
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
  CardLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    gridGap: 4,
    height: "100%",
  },
  Avatars: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    width: "100%",
  },
  BackArrow: {
    color: "white",
    fontSize: 30,
    marginLeft: 30,
  },
  PlayerTurn: {
    background: "rgb(167, 171, 228)",
    width: "70%",
    marginLeft: "15%",
    height: "15%",
    borderRadius: 25,
  },
  PlayerTurnText: {
    color: "black",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 22,
  },
};

const cards = [
  { src: "/cards/2_of_clubs.png" },
  { src: "/cards/2_of_diamonds.png" },
  { src: "/cards/2_of_hearts.png" },
  { src: "/cards/2_of_spades.png" },
  { src: "/cards/3_of_clubs.png" },
  { src: "/cards/3_of_diamonds.png" },
  { src: "/cards/3_of_hearts.png" },
  { src: "/cards/3_of_spades.png" },
  { src: "/cards/4_of_clubs.png" },
  { src: "/cards/4_of_diamonds.png" },
  { src: "/cards/4_of_hearts.png" },
  { src: "/cards/4_of_spades.png" },
  { src: "/cards/5_of_clubs.png" },
  { src: "/cards/5_of_diamonds.png" },
  { src: "/cards/5_of_hearts.png" },
  { src: "/cards/5_of_spades.png" },
  { src: "/cards/6_of_clubs.png" },
  { src: "/cards/6_of_diamonds.png" },
  { src: "/cards/6_of_hearts.png" },
  { src: "/cards/6_of_spades.png" },
  { src: "/cards/7_of_clubs.png" },
  { src: "/cards/7_of_diamonds.png" },
  { src: "/cards/7_of_hearts.png" },
  { src: "/cards/7_of_spades.png" },
  { src: "/cards/8_of_clubs.png" },
  { src: "/cards/8_of_diamonds.png" },
  { src: "/cards/8_of_hearts.png" },
  { src: "/cards/8_of_spades.png" },
  { src: "/cards/9_of_clubs.png" },
  { src: "/cards/9_of_diamonds.png" },
  { src: "/cards/9_of_hearts.png" },
  { src: "/cards/9_of_spades.png" },
  { src: "/cards/10_of_clubs.png" },
  { src: "/cards/10_of_diamonds.png" },
  { src: "/cards/10_of_hearts.png" },
  { src: "/cards/10_of_spades.png" },
  { src: "/cards/jack_of_clubs.png" },
  { src: "/cards/jack_of_diamonds.png" },
  { src: "/cards/jack_of_hearts.png" },
  { src: "/cards/jack_of_spades.png" },
  { src: "/cards/queen_of_clubs.png" },
  { src: "/cards/queen_of_diamonds.png" },
  { src: "/cards/queen_of_hearts.png" },
  { src: "/cards/queen_of_spades.png" },
  { src: "/cards/king_of_clubs.png" },
  { src: "/cards/king_of_diamonds.png" },
  { src: "/cards/king_of_hearts.png" },
  { src: "/cards/king_of_spades.png" },
  { src: "/cards/ace_of_clubs.png" },
  { src: "/cards/ace_of_diamonds.png" },
  { src: "/cards/ace_of_hearts.png" },
  { src: "/cards/ace_of_spades.png" },
  { src: "/cards/joker_red.png" },
  { src: "/cards/joker_black.png" },
];

const Board = () => {
  const [playersTurn, setPlayerTurn] = useState(true);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [rocketShip, setRocketShip] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const shuffle = () => {
    const shuffled = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((cards) => ({ ...cards, id: Math.random(), matched: false }));
    setShuffledCards(shuffled);
    setCardOne(null);
    setCardTwo(null);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
  };

  useEffect(() => {
    shuffle();
  }, []);

  const selectedCard = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  const checkNumber = (cardOneNumber, cardTwoNumber) => {
    if (cardOneNumber === cardTwoNumber) {
      return true;
    } else {
      return false;
    }
  };

  const checkColor = (cardOneSuit, cardTwoSuit) => {
    if (cardOneSuit === cardTwoSuit) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (shuffledCards.length > 0) {
      if (shuffledCards.some((e) => e.matched === false)) {
      } else {
        navigate("/score", {
          state: {
            playerOne: location.state.playerOne,
            playerTwo: location.state.playerTwo,
            playerOneScore: playerOneScore,
            playerTwoScore: playerTwoScore,
          },
        });
      }
    }
  }, [shuffledCards]);

  const showRocket = () => {
    setRocketShip(false);
    setTimeout(() => setRocketShip(true), 1600);
  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      const cardOneValues = cardOne.src.split("_");
      const cardTwoValues = cardTwo.src.split("_");
      let cardOneNumber = null;
      let cardTwoNumber = null;
      let cardOneSuit = null;
      let cardTwoSuit = null;
      cardOneNumber = cardOneValues[0];
      cardTwoNumber = cardTwoValues[0];
      if (cardOneValues.length > 2) {
        cardOneSuit = cardOneValues[2];
        if (cardOneSuit === "clubs.png" || cardOneSuit === "spades.png") {
          cardOneSuit = "black";
        } else {
          cardOneSuit = "red";
        }
      }
      if (cardTwoValues.length > 2) {
        cardTwoSuit = cardTwoValues[2];
        if (cardTwoSuit === "clubs.png" || cardTwoSuit === "spades.png") {
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
        setTimeout(showRocket());
        setCardOne(null);
        setCardTwo(null);
        if (playersTurn) {
          setPlayerOneScore(playerOneScore + 10);
        } else {
          setPlayerTwoScore(playerTwoScore + 10);
        }
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
          to="/"
          state={{ playerOne: "playerOneName", playerTwo: "playerTwoName" }}
        >
          <ArrowLeftOutlined style={styleOverrides.BackArrow} />
        </Link>
      </div>

      <div style={styleOverrides.Players}>
        <div style={styleOverrides.PlayerOne}>
          <img
            style={styleOverrides.Avatars}
            src={player1Avatar}
            alt="Player_1"
          />
          <Title style={styleOverrides.GameTitle} level={3}>
            {location.state.playerOne}
          </Title>
          <Title style={styleOverrides.GameTitle} level={4}>
            Score: {playerOneScore}
          </Title>
          {playersTurn && (
            <div style={styleOverrides.PlayerTurn}>
              <Title style={styleOverrides.PlayerTurnText} level={4}>
                It's your turn
              </Title>
            </div>
          )}
        </div>
        {rocketShip && (
          <div style={styleOverrides.CardContainer}>
            <div style={styleOverrides.CardLayout}>
              {shuffledCards.map((indCard) => (
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

        <div style={styleOverrides.PlayerTwo}>
          <img
            style={styleOverrides.Avatars}
            src={player2Avatar}
            alt="Player_2"
          />
          <Title style={styleOverrides.GameTitle} level={3}>
            {location.state.playerTwo}
          </Title>
          <Title style={styleOverrides.GameTitle} level={4}>
            Score: {playerTwoScore}
          </Title>
          {!playersTurn && (
            <div style={styleOverrides.PlayerTurn}>
              <Title style={styleOverrides.PlayerTurnText} level={4}>
                It's your turn
              </Title>
            </div>
          )}
        </div>
      </div>
      <Link
        to="/score"
        state={{
          playerOne: location.state.playerOne,
          playerTwo: location.state.playerTwo,
          playerOneScore: playerOneScore,
          playerTwoScore: playerTwoScore,
        }}
      >
        <Button>End Game</Button>
      </Link>
      <Button onClick={shuffle}>Play Again</Button>
    </div>
  );
};

export default Board;

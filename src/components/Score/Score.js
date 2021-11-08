import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

// Antd imports
import { Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

// Images
import backgroundCard from "../../img/backgroundCard.jpg";
import player1Avatar from "../../img/player1_Avatar.png";
import player2Avatar from "../../img/player2_Avatar.png";
import Winner from "../../img/winner.png";
import Trophy from "../../img/trophy.png";

// Components
import Exit from "../ExitButton";

// Style
import "./Score.css";

const { Title } = Typography;

const styleOverrides = {
  Background: {
    backgroundImage: `url(${backgroundCard})`,
    height: "100vh",
  }
};

const Score = () => {
  const [scoreBoard, setScoreBoard] = useState([0, 0]);
  const [draw, setDraw] = useState(false);
  const location = useLocation();

  // Create a sorted array of the player based on score
  useEffect(() => {
    if (location.state.playerTwoScore === location.state.playerOneScore) {
      setDraw(true);
    }
    const scoreCard = [
      {
        avatar: player1Avatar,
        name: location.state.playerOne,
        score: location.state.playerOneScore,
      },
      {
        avatar: player2Avatar,
        name: location.state.playerTwo,
        score: location.state.playerTwoScore,
      },
    ];
    setScoreBoard(scoreCard.sort((a, b) => (a.score < b.score ? 1 : -1)));
  }, [location.state.playerOne, location.state.playerOneScore, location.state.playerTwo, location.state.playerTwoScore]);

  return (
    <div style={styleOverrides.Background}>
      <Exit />
      <div>
        <Link to="/SpecnoTechAssessment/">
          <ArrowLeftOutlined
            className="backArrow"
            style={styleOverrides.BackArrow}
          />
        </Link>
      </div>
      {scoreBoard.length > 0 && (
        <div>
          <div>
            <Title className="gameTitle" level={1}>
              Well Done!
            </Title>
            <Title className="gameTitle" level={1}>
              {draw ? "It's a DRAW!" : scoreBoard[0].name}
            </Title>
            <div className="winner">
              <img className="kingAvatars" src={Winner} alt="WINNER!" />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <img
                className="avatars"
                src={scoreBoard[0].avatar}
                alt="Player"
              />
            </div>
            <div className="column">
              <Title className="scoreText" level={3}>
                {draw ? "Draw" : "1st"}
              </Title>
            </div>
            <div className="column">
              <Title className="scoreText" level={4}>
                {scoreBoard[0].name}
              </Title>
            </div>
            <div className="column">
              <Title className="scoreText" level={4}>
                Score: {scoreBoard[0].score}
              </Title>
            </div>
            <div className="column">
              <img className="trophy" src={Trophy} alt="WINNER!" />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <img
                className="avatars"
                src={scoreBoard[1].avatar}
                alt="Player"
              />
            </div>
            <div className="column">
              <Title className="scoreText" level={3}>
                {draw ? "Draw" : "2nd"}
              </Title>
            </div>
            <div className="column">
              <Title className="scoreText" level={4}>
                {scoreBoard[1].name}
              </Title>
            </div>
            <div className="column">
              <Title className="scoreText" level={4}>
                Score: {scoreBoard[1].score}
              </Title>
            </div>
            <div className="column">
              {draw ? (
                <img className="trophy" src={Trophy} alt="WINNER!" />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}

      <Link
        to="/SpecnoTechAssessment/play"
        state={{
          playerOne: location.state.playerOne,
          playerTwo: location.state.playerTwo,
        }}
      >
        <Button shape="round" className="playAgainButton">
          PLAY AGAIN
        </Button>
      </Link>
    </div>
  );
};

export default Score;

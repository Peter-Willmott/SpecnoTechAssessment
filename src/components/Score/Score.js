import React, { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import backgroundCard from "../../img/backgroundCard.jpg";
import player1Avatar from "../../img/player1_Avatar.png";
import player2Avatar from "../../img/player2_Avatar.png";
import Winner from "../../img/winner.png";
import Trophy from "../../img/trophy.png";
import { useLocation, Link } from "react-router-dom";

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
  Winner: {
    marginLeft: "40%",
    width: "20%",
  },
  KingAvatars: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    width: "100%",
  },
  Avatars: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "inline",
    width: "70%",
  },
  Trophy: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "inline",
    width: "40%",
  },
  BackArrow: {
    color: "white",
    fontSize: 30,
    marginLeft: 30,
  },
  ScoreText: {
    color: "Black",
  },
  TileContainer: {
    position: "relative",
    margin: 5,
    width: "100%",
    fontSize: 0,
  },
  Tile: {
    fontSize: 20,
    width: "20%",
    minHeight: 22,
    display: "inline-block",
  },
  Play: {
    width: "10%",
    marginLeft: "45%",
    marginRight: "45%",
    marginTop: 50,
    color: "green",
    height: 50,
    fontSize: 20,
  },
  row: {
    display: "flex",
    marginLeft: "30%",
    width: "40%",
    background: "white",
    marginBottom: 10,
    textAlign: "center",
    alignItems: "center",
  },
  column: {
    flex: "20%",
    padding: 10,
  },
};

const Score = () => {
  const [scoreBoard, setScoreBoard] = useState([0, 0]);
  const [draw, setDraw] = useState(false);
  const location = useLocation();

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
  }, []);

  return (
    <div style={styleOverrides.Background}>
      <Exit />
      <div>
        <Link to="/">
          <ArrowLeftOutlined style={styleOverrides.BackArrow} />
        </Link>
      </div>
      {scoreBoard.length > 0 && (
        <div>
          <div>
            <Title style={styleOverrides.GameTitle} level={1}>
              Well Done!
            </Title>
            <Title style={styleOverrides.GameTitle} level={1}>
              {draw ? "It's a DRAW!" : scoreBoard[0].name}
            </Title>
            <div style={styleOverrides.Winner}>
              <img
                style={styleOverrides.KingAvatars}
                src={Winner}
                alt="WINNER!"
              />
            </div>
          </div>

          <div style={styleOverrides.row}>
            <div style={styleOverrides.column}>
              <img
                style={styleOverrides.Avatars}
                src={scoreBoard[0].avatar}
                alt="Player"
              />
            </div>
            <div style={styleOverrides.column}>
              <Title style={styleOverrides.ScoreText} level={3}>
                {draw ? "Draw" : "1st"}
              </Title>
            </div>
            <div style={styleOverrides.column}>
              <Title style={styleOverrides.ScoreText} level={4}>
                {scoreBoard[0].name}
              </Title>
            </div>
            <div style={styleOverrides.column}>
              <Title style={styleOverrides.ScoreText} level={4}>
                Score: {scoreBoard[0].score}
              </Title>
            </div>
            <div style={styleOverrides.column}>
              <img style={styleOverrides.Trophy} src={Trophy} alt="WINNER!" />
            </div>
          </div>
          <div style={styleOverrides.row}>
            <div style={styleOverrides.column}>
              <img
                style={styleOverrides.Avatars}
                src={scoreBoard[1].avatar}
                alt="Player"
              />
            </div>
            <div style={styleOverrides.column}>
              <Title style={styleOverrides.ScoreText} level={3}>
                {draw ? "Draw" : "2nd"}
              </Title>
            </div>
            <div style={styleOverrides.column}>
              <Title style={styleOverrides.ScoreText} level={4}>
                {scoreBoard[1].name}
              </Title>
            </div>
            <div style={styleOverrides.column}>
              <Title style={styleOverrides.ScoreText} level={4}>
                Score: {scoreBoard[1].score}
              </Title>
            </div>
            <div style={styleOverrides.column}>
              {draw ? <img style={styleOverrides.Trophy} src={Trophy} alt="WINNER!" /> : ""}
            </div>
          </div>
        </div>
      )}

      <Link
        to="/play"
        state={{
          playerOne: location.state.playerOne,
          playerTwo: location.state.playerTwo,
        }}
      >
        <Button shape="round" style={styleOverrides.Play}>
          PLAY AGAIN
        </Button>
      </Link>
    </div>
  );
};

export default Score;

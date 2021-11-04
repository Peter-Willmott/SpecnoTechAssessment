import React from "react";
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
  PlayerOne: {
    marginLeft: "30%",
    width: "40%",
    background: "white",
  },
  PlayerTwo: {
    marginLeft: "30%",
    width: "40%",
    background: "white",
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
};

const Score = () => {
  const location = useLocation();
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
      <div>
        <Title style={styleOverrides.GameTitle} level={1}>
          Well Done!
        </Title>
        <Title style={styleOverrides.GameTitle} level={1}>
          TEST
        </Title>
        <div style={styleOverrides.Winner}>
          <img style={styleOverrides.KingAvatars} src={Winner} alt="WINNER!" />
        </div>
      </div>
      <div style={styleOverrides.PlayerOne}>
        <div style={styleOverrides.PlayerRow}>
          <div class="col-md-10 col-md-offset-1">
            <div style={styleOverrides.TileContainer}>
              <div style={styleOverrides.Tile}>
                <img
                  style={styleOverrides.Avatars}
                  src={player1Avatar}
                  alt="Player_1"
                />
              </div>
              <div style={styleOverrides.Tile}>
                <Title style={styleOverrides.ScoreText} level={3}>
                  1st Place
                </Title>
              </div>
              <div style={styleOverrides.Tile}>
                <Title style={styleOverrides.ScoreText} level={4}>
                  {location.state.playerOne}
                </Title>
              </div>
              <div style={styleOverrides.Tile}>
                <Title style={styleOverrides.ScoreText} level={4}>
                  Score: 25
                </Title>
              </div>
              <div style={styleOverrides.Tile}>
                <img style={styleOverrides.Trophy} src={Trophy} alt="WINNER!" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={styleOverrides.PlayerTwo}>
        <div style={styleOverrides.PlayerRow}>
          <div class="col-md-10 col-md-offset-1">
            <div style={styleOverrides.TileContainer}>
              <div style={styleOverrides.Tile}>
                <img
                  style={styleOverrides.Avatars}
                  src={player2Avatar}
                  alt="Player_2"
                />
              </div>
              <div style={styleOverrides.Tile}>
                <Title style={styleOverrides.ScoreText} level={3}>
                  2nd Place
                </Title>
              </div>
              <div style={styleOverrides.Tile}>
                <Title style={styleOverrides.ScoreText} level={4}>
                  {location.state.playerTwo}
                </Title>
              </div>
              <div style={styleOverrides.Tile}>
                <Title style={styleOverrides.ScoreText} level={4}>
                  Score: 0
                </Title>
              </div>
            </div>
          </div>
        </div>
      </div>

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

import React from "react";
import { Button, Typography } from "antd";
import backgroundCard from "../../img/backgroundCard.jpg";
import player1Avatar from "../../img/player1_Avatar.png";
import player2Avatar from "../../img/player2_Avatar.png";
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
      background: "white",
      width: "70%",
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
};

const Board = () => {
  const location = useLocation();

  console.log(location.state);

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
          Memory
        </Title>
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
            Score: 0
          </Title>
        </div>
        <div style={styleOverrides.CardContainer}>

        </div>

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
            Score: 0
          </Title>
        </div>
      </div>
      <Link
          to="/score"
          state={{ playerOne: location.state.playerOne, playerTwo: location.state.playerTwo }}
        >
          <Button>SCORE</Button>
        </Link>
    </div>
  );
};

export default Board;

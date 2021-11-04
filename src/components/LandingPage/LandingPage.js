import React, { useState } from "react";
import { Button, Typography, Modal, Form, Input } from "antd";
import background from "../../img/background.gif";
import player1Avatar from "../../img/player1_Avatar.png";
import player2Avatar from "../../img/player2_Avatar.png";
import Exit from "../ExitButton";
import { Link } from "react-router-dom";

const { Title } = Typography;

const styleOverrides = {
  Background: {
    backgroundImage: `url(${background})`,
    height: "100vh",
  },
  GameTitle: {
    color: "white",
    textAlign: "center",
  },
  GameReady: {
    color: "white",
    textAlign: "center",
  },
  Players: {
    display: "flex",
  },
  PlayerOne: {
    marginLeft: "15%",
    width: "25%",
  },
  PlayerTwo: {
    marginRight: "15%",
    width: "25%",
  },
  Avatars: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    width: "100%",
  },
  ChampionContainer: {
    width: "20%",
  },
  ChampionButton: {
    width: "100%",
    top: "50%",
  },
  AvatarsModal: {
    display: "inline",
    width: "50%",
    marginLeft: "25%",
  },
  Play: {
    width: "20%",
    marginLeft: "40%",
    marginRight: "40%",
    marginTop: 50,
    color: "green",
    height: 100,
    fontSize: 40,
  },
};

const LandingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");

  const [form] = Form.useForm();

  const championSelect = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setPlayerOneName(values.player1);
    setPlayerTwoName(values.player2);
    setIsModalVisible(false);
  };

  return (
    <div style={styleOverrides.Background}>
      <Exit />
      <div>
        <Title style={styleOverrides.GameTitle} level={1}>
          Me-moon-ry
        </Title>
      </div>
      <div>
        <Title style={styleOverrides.GameReady} level={2}>
          Ready for lift off?
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
            {playerOneName}
          </Title>
        </div>
        <div style={styleOverrides.ChampionContainer}>
          <Button
            style={styleOverrides.ChampionButton}
            onClick={championSelect}
            shape="round"
          >
            Name Your Champion
          </Button>
          <Modal
            title="Choose Wisely"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
            ]}
          >
            <Form form={form} name="championForm" onFinish={onFinish}>
              <img
                style={styleOverrides.AvatarsModal}
                src={player1Avatar}
                alt="Player_1"
              />
              <Form.Item
                name="player1"
                label="Player 1"
                rules={[
                  {
                    required: true,
                    message: "Please give your champion a name!",
                  },
                ]}
              >
                <Input placeholder="Player One" />
              </Form.Item>
              <img
                style={styleOverrides.AvatarsModal}
                src={player2Avatar}
                alt="Player_2"
              />
              <Form.Item
                name="player2"
                label="Player 2"
                rules={[
                  {
                    required: true,
                    message: "Please give your champion a name!",
                  },
                ]}
              >
                <Input placeholder="Player Two" />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 10 }}>
                <Button type="primary" htmlType="submit">
                  Set Names
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div style={styleOverrides.PlayerTwo}>
          <img
            style={styleOverrides.Avatars}
            src={player2Avatar}
            alt="Player_2"
          />
          <Title style={styleOverrides.GameTitle} level={3}>
            {playerTwoName}
          </Title>
        </div>
      </div>
      <Link to="/play" state={{playerOne: playerOneName, playerTwo: playerTwoName }}>
        <Button shape="round" style={styleOverrides.Play}>
          Let's Play
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;

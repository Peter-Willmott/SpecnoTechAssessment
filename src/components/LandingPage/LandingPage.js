import React, { useState } from "react";
import { Link } from "react-router-dom";

// Antd imports
import { Button, Typography, Modal, Form, Input } from "antd";

// Images
import background from "../../img/background.gif";
import player1Avatar from "../../img/player1_Avatar.png";
import player2Avatar from "../../img/player2_Avatar.png";
import flying from "../../img/flyingRotated.png";

// Components
import Exit from "../ExitButton";

// Style
import "./LandingPage.css";

const { Title } = Typography;

const styleOverrides = {
  Background: {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "repeat-y",
  },
};

const LandingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");

  const [form] = Form.useForm();

  // Show player naming modal
  const championSelect = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Set players names
  const onFinish = (values) => {
    setPlayerOneName(values.player1);
    setPlayerTwoName(values.player2);
    setIsModalVisible(false);
  };

  return (
    <div style={styleOverrides.Background}>
      <Exit />
      <div>
        <Title className="gameTitle" level={1}>
          Memory Invaders
        </Title>
      </div>
      <div>
        <Title className="gameTitle" level={2}>
          Ready for lift off?
        </Title>
      </div>
      <div className="playersContainer">
        <div className="playerOneContainer">
          <img className="playerPicture" src={player1Avatar} alt="Player_1" />
          <Title className="gameTitle" level={3}>
            {playerOneName}
          </Title>
        </div>
        <div className="championContainer">
          <Button
            className="championButton"
            onClick={championSelect}
            shape="round"
          >
            Name Your Champion
          </Button>
          <img className="flyingMan" src={flying} alt="flying" />
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
              <img className="avatarsModal" src={player1Avatar} alt="Player_1" />
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
                className="avatarsModal"
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
        <div className="playerTwoContainer">
          <img className="playerPicture" src={player2Avatar} alt="Player_2" />
          <Title className="gameTitle" level={3}>
            {playerTwoName}
          </Title>
        </div>
      </div>
      <Link
        to="/SpecnoTechAssessment/play"
        state={{ playerOne: playerOneName, playerTwo: playerTwoName }}
      >
        <Button shape="round" className="play">
          LET'S PLAY
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;

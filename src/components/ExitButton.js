import React from "react";
import { Button } from "antd";

const styleOverrides = {
  ExitButton: {
    marginLeft: "auto",
    color: "red",
    top: 10,
    right: 10,
  },
};

const Exit = () => (
  <div style={{ display: "flex" }}>
    <Button shape="round" style={styleOverrides.ExitButton}>
      Exit Game
    </Button>
  </div>
);

export default Exit;

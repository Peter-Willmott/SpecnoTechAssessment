import React from "react";

// Antd imports
import { Button } from "antd";

const styleOverrides = {
  ExitButton: {
    marginLeft: "auto",
    color: "red",
    top: 10,
    right: 10,
  },
};

const Exit = () => {
  // A bit hacky as window.close is only allowed to close windows it opened.
  const closeWindow = () => {
    window.open("about:blank", "_self");
    window.close();
  };
  return (
    <div style={{ display: "flex" }}>
      <Button
        shape="round"
        onClick={closeWindow}
        style={styleOverrides.ExitButton}
      >
        Exit Game
      </Button>
    </div>
  );
};

export default Exit;

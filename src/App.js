import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Board from "./components/GameBoard/Board";
import { Routes, Route } from "react-router-dom";

import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/play" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;

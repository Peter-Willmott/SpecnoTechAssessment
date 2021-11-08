import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Board from "./components/GameBoard/Board";
import Score from "./components/Score/Score";
import { Routes, Route } from "react-router-dom";

import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="SpecnoTechAssessment/" element={<LandingPage />} />
        <Route path="SpecnoTechAssessment/play" element={<Board />} />
        <Route path="SpecnoTechAssessment/score" element={<Score />} />
      </Routes>
    </div>
  );
}

export default App;

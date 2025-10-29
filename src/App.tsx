import * as React from "react";
import "./index.css";
import styled from "styled-components";

import { BrowserRouter, Routes, Route } from "react-router";
import ShowcaseAnimation from "./components/MicroAnimations/ShowcaseAnimation";
import BottomBarComponent from "./components/ShowComponents/BottomBarComponent";
import FeedbackCaptureAnimation from "./components/ShowComponents/FeedbackCaptureComponent";
import Index from "./pages/Index";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/craft/bottom-bar"
          element={
            <ShowcaseAnimation showcaseAnimation={<BottomBarComponent />} />
          }
        />
        <Route
          path="/craft/feedback-capture"
          element={
            <ShowcaseAnimation
              showcaseAnimation={<FeedbackCaptureAnimation />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

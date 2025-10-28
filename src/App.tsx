import * as React from "react";
import "./index.css";
import NavBar from "./components/NavBar";

import styled from "styled-components";
import Hero from "./components/Hero";

import { BrowserRouter, Routes, Route } from "react-router";
import ShowcaseAnimation from "./components/MicroAnimations/ShowcaseAnimation";
import BottomBarComponent from "./components/ShowComponents/BottomBarComponent";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GyanContainer>
              <NavBar />
              <Hero />
            </GyanContainer>
          }
        />
        <Route
          path="/craft/bottom-bar"
          element={
            <ShowcaseAnimation showcaseAnimation={<BottomBarComponent />} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const GyanContainer = styled.div`
  max-width: 945px;
  width: 100%;
  margin: 0 auto;
`;

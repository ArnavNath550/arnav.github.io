import * as React from "react";
import "./index.css";
import NavBar from "./components/NavBar";

import styled from "styled-components";
import Hero from "./components/Hero";
import ThoughtSection from "./components/ThoughtSection";

const App: React.FC = () => {
  return (
    <GyanContainer>
      <NavBar />
      <Hero />
      <ThoughtSection />
    </GyanContainer>
  );
};

export default App;

const GyanContainer = styled.div`
  max-width: 945px;
  width: 100%;
  margin: 0 auto;
`;

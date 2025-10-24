import * as React from "react";
import "./index.css";
import NavBar from "./components/NavBar";

import styled from "styled-components";
import Hero from "./components/Hero";
import ThoughtSection from "./components/ThoughtSection";
import Section from "./components/Section";

const App: React.FC = () => {
  return (
    <GyanContainer>
      <NavBar />
      <Hero />
      <ThoughtSection />
      <Section>thought action</Section>
    </GyanContainer>
  );
};

export default App;

const GyanContainer = styled.div`
  max-width: 945px;
  width: 100%;
  margin: 0 auto;
`;

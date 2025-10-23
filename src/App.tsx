import * as React from "react";
import "./index.css";
import NavBar from "./components/NavBar";

import styled from "styled-components";

const App: React.FC = () => {
  return (
    <GyanContainer>
      <NavBar />
    </GyanContainer>
  );
};

export default App;

const GyanContainer = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`;

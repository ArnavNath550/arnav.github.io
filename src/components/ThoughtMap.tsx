import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

const ThoughtMap: React.FC = () => {
  const MAP_LINES = 50; // lines that we will begin with to show the flow of (thought)
  const VISIBLE_LINES = 5; // lines which will be visible at the end
  const MAP_LINE_GAP = 10;

  return (
    <StyledThoughtMapContainer>
      <StyledThoughtLineMapContainer
        initial={{ gap: 0 + "px" }}
        animate={{ gap: MAP_LINE_GAP + "px" }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
      >
        {Array.from({ length: MAP_LINES }, (i, index) => {
          return (
            <>
              <StyledThoughtLine />
            </>
          );
        })}
      </StyledThoughtLineMapContainer>
    </StyledThoughtMapContainer>
  );
};

export default ThoughtMap;

const StyledThoughtMapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const StyledThoughtLineMapContainer = styled(motion.div)`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledThoughtLine = styled(motion.div)`
  width: 1px;
  height: 200px;
  border: 1px solid #555;
  position: relative;
`;

const StyledThoughtLineOdd = styled(motion.div)`
  width: 1px;
  height: 200px;
  border: 1px solid #555;
  position: relative;
`;

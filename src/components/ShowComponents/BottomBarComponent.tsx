import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

const BottomBarComponent: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <StyledBottomBar>
        <StyledBottomBarContent>
          <StyledBottomBarItem>Home</StyledBottomBarItem>
          <StyledBottomBarItem>Deployments</StyledBottomBarItem>
          <StyledBottomBarItem>Inbox</StyledBottomBarItem>
        </StyledBottomBarContent>
      </StyledBottomBar>
    </div>
  );
};

export default BottomBarComponent;

const StyledBottomBar = styled.div`
  background-color: #0d0d0d;
  border-radius: 999px;
  width: max-content;
  position: relative;
`;

const StyledBottomBarContent = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  position: relative;
  gap: 15px;
`;

const StyledBottomBarItem = styled(motion.div)`
  color: #fff;
  font-size: 15px;
  font-weight: 450;
  padding: 5px;
  cursor: pointer;
`;

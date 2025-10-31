import * as React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const NavBar: React.FC = () => {
  return (
    <StyledIndexNav>
      <Link to="/">
        <StyledIndexNavItem data-animate basics-text stagger={0.5}>
          Thought
        </StyledIndexNavItem>
      </Link>
      <Link to="/craft">
        <StyledIndexNavItem data-animate basics-text stagger={1.5}>
          Craft
        </StyledIndexNavItem>
      </Link>
    </StyledIndexNav>
  );
};

export default NavBar;

const StyledIndexNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 25px;
  padding-bottom: 25px;
  position: fixed;
  top: 0;
  width: 100%;
  backdrop-filter: blur(5px);
  background: #ededed42;
  z-index: 100000;

  @media (max-width: 780px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const StyledIndexNavItem = styled.div<{ stagger: number }>`
  font-size: 20px;
  font-weight: 480;
  letter-spacing: -0.2px;
  --stagger: ${(props) => props.stagger};
  cursor: pointer;
`;

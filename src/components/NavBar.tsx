import * as React from "react";
import styled from "styled-components";

const NavBar: React.FC = () => {
  return (
    <StyledNavBar>
      <StyledNavBarItem>Thought</StyledNavBarItem>
      <StyledNavBarItem>Action</StyledNavBarItem>
      <StyledNavBarItem>Craft</StyledNavBarItem>
    </StyledNavBar>
  );
};

export default NavBar;

const StyledNavBar = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const StyledNavBarItem = styled.div`
  width: 100%;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 450;
  font-size: 19px;
  color: var(--primary);
  transition: ease 0.1s all;
  &:hover {
    opacity: 0.8;
  }
`;

import * as React from "react";
import styled from "styled-components";

const NavBar: React.FC = () => {
  return (
    <StyledNavBar stagger={1} data-animate>
      <StyledNavBarItem>Thought</StyledNavBarItem>
      <StyledNavBarItem>Action</StyledNavBarItem>
      <StyledNavBarItem>Craft</StyledNavBarItem>
    </StyledNavBar>
  );
};

export default NavBar;

const StyledNavBar = styled.div<{ stagger: number }>`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 30px;
`;

const StyledNavBarItem = styled.div`
  width: 100%;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 450;
  font-size: 21px;
  color: var(--primary);
  transition: ease 0.1s all;
  &:hover {
    opacity: 0.8;
  }
  --stagger: ${(props) => props.stagger};
`;

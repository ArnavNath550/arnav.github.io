import * as React from "react";
import { Link } from "react-router";
import styled from "styled-components";

type Props = {
  pagePath: string;
  pageName: string;
};

const PageBack: React.FC<Props> = (props: Props) => {
  return (
    <StyledPageBack>
      <StyledPageBackItem to={props.pagePath}>
        Back {props.pageName}
      </StyledPageBackItem>
    </StyledPageBack>
  );
};

export default PageBack;

const StyledPageBack = styled.div`
  position: absolute;
  left: 50px;
  top: 50px;
  z-index: 275375;
`;

const StyledPageBackItem = styled(Link)`
  font-size: 1.1rem;
  color: var(--text);
  letter-spacing: -0.2px;
  font-weight: 450;
  font-family: var(--secondaryFont);
  font-style: italic;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background-color: gray;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

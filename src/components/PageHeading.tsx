import * as React from "react";
import { Link } from "react-router";
import styled from "styled-components";

const PageHeading: React.FC = () => {
  return (
    <StyledPageHeading>
      <StyledNavigationHead>
        <StyledNavigationItem to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: "rotate(180deg)" }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.1161 5.36612C13.6043 4.87796 14.3957 4.87796 14.8839 5.36612L20.6339 11.1161C20.8683 11.3505 21 11.6685 21 12C21 12.3315 20.8683 12.6494 20.6339 12.8839L14.8839 18.6339C14.3957 19.122 13.6043 19.122 13.1161 18.6339C12.628 18.1457 12.628 17.3543 13.1161 16.8661L16.7322 13.25H4.25C3.55964 13.25 3 12.6903 3 12C3 11.3096 3.55964 10.75 4.25 10.75H16.7322L13.1161 7.13388C12.628 6.64573 12.628 5.85427 13.1161 5.36612Z"
              fill="currentColor"
            ></path>
          </svg>
          Back
        </StyledNavigationItem>
      </StyledNavigationHead>
      <StyledPageHead basics-text data-animate stagger={0.2}>
        Craft
      </StyledPageHead>
      <StyledPageDescription basics-text data-animate stagger={0.3}>
        Heres a curation of all my crafted components
      </StyledPageDescription>
    </StyledPageHeading>
  );
};

export default PageHeading;

const StyledPageHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 750px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const StyledPageHead = styled.div<{ stagger: number }>`
  font-size: 1.2rem;
  font-weight: 500;
  --stagger: ${(props) => props.stagger};
`;

const StyledPageDescription = styled.div<{ stagger: number }>`
  font-size: 1rem;
  font-weight: 400;
  color: #555;
  --stagger: ${(props) => props.stagger};
`;

const StyledNavigationHead = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const StyledNavigationItem = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: ease 0.1s all;
  &:hover {
    opacity: 0.5;
  }
  &:active {
    transform: scale(0.95);
  }
`;

import * as React from "react";
import styled from "styled-components";

const Hero: React.FC = () => {
  return (
    <StyledHero>
      <StyledHeroLeft>
        <StyledTime>1.48pm, Thu, 25th Oct, 2025</StyledTime>
        <StyledHeroContent>
          <StyledHeroHeading opacity={1}>
            Hi There, its <StyledItalic>Arnav</StyledItalic>
          </StyledHeroHeading>
          <StyledHeroHeading opacity={0.5}>
            A software craftsman
          </StyledHeroHeading>
          <StyledHeroHeading opacity={0.3}>
            Searching for perfection.
          </StyledHeroHeading>
        </StyledHeroContent>
      </StyledHeroLeft>
    </StyledHero>
  );
};

export default Hero;

const StyledHero = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const StyledHeroLeft = styled.div`
  width: 100%;
`;
const StyledTime = styled.div`
  color: var(--primary);
  font-family: var(--secondaryFont);
  font-weight: 450;
  font-style: italic;
  font-size: 20px;
`;

const StyledHeroHeading = styled.div<{ opacity?: number }>`
  color: var(--primary);
  font-family: var(--secondaryFont);
  font-weight: 450;
  font-size: 2.2rem;

  opacity: ${(props) => props.opacity};
`;

const StyledItalic = styled.span`
  font-style: italic;
  font-family: inherit;
  color: var(--black);
`;

const StyledHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 30px;
  padding-bottom: 30px;
`;

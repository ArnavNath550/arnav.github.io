import * as React from "react";
import styled from "styled-components";
import Section from "./Section";

const Hero: React.FC = () => {
  return (
    <Section>
      <StyledHero>
        <StyledHeroLeft>
          <StyledTime data-animate basics-text stagger={3.5}>
            1.48pm, Thu, 25th Oct, 2025
          </StyledTime>
          <StyledHeroContent>
            <StyledHeroHeading data-animate basics-text stagger={1}>
              Hi There, its <StyledItalic>Arnav</StyledItalic>
            </StyledHeroHeading>
            <StyledHeroHeading
              opacity={0.5}
              data-animate
              basics-text
              stagger={1.5}
            >
              A software craftsman
            </StyledHeroHeading>
            <StyledHeroHeading
              data-animate
              basics-text
              stagger={2}
              small={true}
            >
              Searching for perfection.
            </StyledHeroHeading>
          </StyledHeroContent>
        </StyledHeroLeft>
        <StyledHeroRight data-animate basics-text stagger={3}>
          <StyledHeroParagraph>
            Have you ever noticed that some animation sequences can be improved
            with just a touch of delay? Or that some interactions just feel
            better without any motion at all?
          </StyledHeroParagraph>
        </StyledHeroRight>
      </StyledHero>
    </Section>
  );
};

export default Hero;

const StyledHero = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledHeroLeft = styled.div`
  width: 100%;
`;
const StyledTime = styled.div<{ stagger: number }>`
  color: var(--primary);
  font-family: var(--secondaryFont);
  font-weight: 450;
  font-style: italic;
  font-size: 20px;
  --stagger: ${(props) => props.stagger};
`;

const StyledHeroHeading = styled.div<{ stagger: number; small?: boolean }>`
  color: var(--primary);
  font-family: var(--secondaryFont);
  font-weight: 450;
  // font-size: ${(props) => (props.small ? "1.5rem" : "2.2rem")};
  font-size: 2.2rem;
  --stagger: ${(props) => props.stagger};
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

const StyledHeroRight = styled.div<{ stagger: number }>`
  width: 50%;
  --stagger: ${(props) => props.stagger};
`;

const StyledHeroParagraph = styled.p`
  font-size: 1.5rem;
  color: var(--primary);
  text-align: justify;
  line-height: 35px;
  font-weight: 450;
`;

import * as React from "react";
import styled from "styled-components";
import Section from "./Section";
import FineTuningAnimation from "./MicroAnimations/FineTuningAnimation";
import PixelAnimation from "./MicroAnimations/PixelAnimation";
import PerformanceAnimation from "./MicroAnimations/PerformanceAnimation";

const Hero: React.FC = () => {
  const paragraphText =
    "When polishing and fine-tuning every pixel, performance, and motion design adds up. It becomes a memorable interaction. That is my challenge.";
  const words = paragraphText.split(" ");

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
        <StyledHeroRight>
          <StyledHeroParagraph>
            {words.map((word, index) => (
              <div key={index}>{word} </div>
            ))}
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

const StyledHeroHeading = styled.div<{
  devangari?: boolean;
  stagger: number;
  small?: boolean;
}>`
  color: var(--primary);
  font-family: ${(props) =>
    props.devangari == true ? "var(--devangariFont)" : "var(--primaryFont)"};
  font-weight: 450;
  // font-size: ${(props) => (props.small ? "1.5rem" : "2.2rem")};
  font-size: 2.2rem;
  --stagger: ${(props) => props.stagger};
`;

const StyledItalic = styled.span`
  font-style: italic;
  font-family: var(--secondaryFont);
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
  width: 90%;
  --stagger: ${(props) => props.stagger};
`;

const StyledHeroParagraph = styled.div`
  font-size: 1.5rem;
  color: var(--primary);
  text-align: justify;
  line-height: 45px;
  font-weight: 450;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

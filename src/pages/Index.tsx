import * as React from "react";
import styled from "styled-components";

const Index: React.FC = () => {
  return (
    <GyanContainer>
      <StyledIndexNav>
        <StyledIndexNavItem data-animate basics-text stagger={0.5}>
          Thought
        </StyledIndexNavItem>
        <StyledIndexNavItem data-animate basics-text stagger={1}>
          Action
        </StyledIndexNavItem>
        <StyledIndexNavItem data-animate basics-text stagger={1.5}>
          Craft
        </StyledIndexNavItem>
      </StyledIndexNav>
      <StyledIndexHero>
        <StyledIndexHeroContent>
          <StyledIndexHeroLeft>
            <StyledIndexHeading data-animate basics-text stagger={0.5}>
              Arnav Nath, is a{" "}
              <StyledNewsreaderFont>software craftsman</StyledNewsreaderFont>
            </StyledIndexHeading>
            <StyledIndexHeading data-animate basics-text stagger={1.5}>
              Crafting{" "}
              <StyledNewsreaderFont>memorable software</StyledNewsreaderFont>
            </StyledIndexHeading>
            <StyledIndexHeading data-animate basics-text stagger={2.5}>
              In search for{" "}
              <StyledNewsreaderFont>perfection.</StyledNewsreaderFont>
            </StyledIndexHeading>
          </StyledIndexHeroLeft>
          <StyledIndexHeroRight>
            <StyledIndexHeading data-animate basics-text stagger={0.5}>
              When polishing and fine-tuning every pixel, performance, and
              motion design adds up. It becomes a memorable interaction.
            </StyledIndexHeading>
          </StyledIndexHeroRight>
        </StyledIndexHeroContent>
      </StyledIndexHero>
    </GyanContainer>
  );
};

export default Index;

const GyanContainer = styled.div`
  width: 950px;
  margin: 0 auto;
  height: 100%;
`;

const StyledIndexNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 25px;
  padding-bottom: 25px;
  position: fixed;
  top: 0;
`;

const StyledIndexNavItem = styled.div<{ stagger: number }>`
  font-size: 20px;
  color: #0d0d0d;
  font-weight: 480;
  letter-spacing: -0.2px;
  --stagger: ${(props) => props.stagger};
  cursor: pointer;
`;

const StyledIndexHero = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
`;

const StyledIndexHeroContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;
const StyledIndexHeroLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledIndexHeroRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledIndexHeading = styled.div<{ stagger: number }>`
  font-size: 1.7rem;
  font-weight: 450;
  letter-spacing: -0.2px;
  --stagger: ${(props) => props.stagger};
  // font-family: var(--secondaryFont);
  // font-style: italic;
  // color: var(--primary);
  font-weight: 450;
  line-height: 45px;
`;

const StyledNewsreaderFont = styled.span`
  font-family: var(--secondaryFont);
  font-style: italic;
  color: var(--primary);
  font-weight: 480;
`;

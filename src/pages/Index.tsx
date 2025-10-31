import * as React from "react";
import styled from "styled-components";
import ThoughtAnimation from "../components/Animations/ThoughtAnimation";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Index: React.FC = () => {
  const cursorRef = React.useRef(null);

  // Raw motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth motion with spring
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <Container>
      <CircleCursor style={{ x: smoothX, y: smoothY }} ref={cursorRef} />

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
              <StyledIndexHeading data-animate basics-text stagger={3}>
                Arnav Nath, is a{" "}
                <StyledNewsreaderFont>software craftsman</StyledNewsreaderFont>
              </StyledIndexHeading>
              <StyledIndexHeading data-animate basics-text stagger={3.5}>
                Crafting{" "}
                <StyledNewsreaderFont>memorable software</StyledNewsreaderFont>
              </StyledIndexHeading>
              <StyledIndexHeading data-animate basics-text stagger={4}>
                In search for{" "}
                <StyledNewsreaderFont>perfection.</StyledNewsreaderFont>
              </StyledIndexHeading>
            </StyledIndexHeroLeft>
            <StyledIndexHeroRight>
              <StyledIndexHeading data-animate basics-text stagger={4.5}>
                When polishing and fine-tuning every pixel, performance, and
                motion design adds up. It becomes a memorable interaction.
              </StyledIndexHeading>
            </StyledIndexHeroRight>
          </StyledIndexHeroContent>
        </StyledIndexHero>
      </GyanContainer>
    </Container>
  );
};

export default Index;

const Container = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  cursor: none;
  /*color: #fff;*/
`;

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
  // color: #fff;
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
  /*color: var(--primary);*/
  font-weight: 480;
`;

const CircleCursor = styled(motion.div)`
  width: 40px;
  height: 40px;
  background-color: var(--primary);
  border-radius: 9999px;
  position: absolute;
  z-index: 1000;
`;

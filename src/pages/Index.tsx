import * as React from "react";
import styled from "styled-components";
import ThoughtAnimation from "../components/Animations/ThoughtAnimation";
import {
  motion,
  useMotionValue,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import { Link } from "react-router";
import NavBar from "../components/NavBar";

const Index: React.FC = () => {
  const cursorRef = React.useRef(null);

  // Motion values for position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track velocity of the cursor movement
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  // Compute overall speed magnitude
  const speed = useTransform([velocityX, velocityY], ([vx, vy]) =>
    Math.sqrt(vx * vx + vy * vy),
  );

  // Map speed → scale (faster = smaller circle)
  const scale = useTransform(speed, [0, 1000], [1, 0.8], { clamp: true });

  // Optional: smooth the scale transition slightly
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 20 });

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
      {/* Circle cursor with dynamic scale */}
      <CircleCursor
        style={{ x: mouseX, y: mouseY, scale: smoothScale }}
        ref={cursorRef}
      />

      <GyanContainer>
        <NavBar />
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

// ---------------- Styled Components ----------------

const Container = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  cursor: none;
`;

const GyanContainer = styled.div`
  width: min(90%, 950px);
  margin: 0 auto;
  height: 100%;
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

  @media (max-width: 780px) {
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: column;
    gap: 20px;
  }
`;

const StyledIndexHeroLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

const StyledIndexHeroRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

const StyledIndexHeading = styled.div<{ stagger: number }>`
  /* Responsive font size using clamp(min, preferred, max) */
  font-size: clamp(1.2rem, 2vw + 0.8rem, 1.8rem);
  font-weight: 450;
  letter-spacing: -0.2px;
  --stagger: ${(props) => props.stagger};
  line-height: clamp(1.8rem, 2.5vw + 1rem, 2.8rem);
  color: #111;
`;

const StyledNewsreaderFont = styled.span`
  font-family: var(--secondaryFont);
  font-style: italic;
  font-weight: 480;
  /* Slightly larger font for emphasis, also responsive */
  font-size: clamp(1.25rem, 2vw + 1rem, 2rem);
`;

const CircleCursor = styled(motion.div)`
  width: 40px;
  height: 40px;
  background-color: var(--primary);
  border-radius: 50%;
  position: absolute;
  z-index: 1000;
  pointer-events: none;
`;

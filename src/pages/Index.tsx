import * as React from "react";
import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import VideoCarousel from "../components/VideoCarousel";
import { Link } from "react-router";

const Index: React.FC = () => {
  const cursorRef = React.useRef<HTMLDivElement | null>(null);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Velocity (speed of mouse movement)
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  // Calculate overall speed using velocity values
  const speed = useTransform([velocityX, velocityY], ([vx, vy]: number[]) =>
    Math.sqrt(vx * vx + vy * vy),
  );

  // Transform speed into a scale effect (faster = smaller)
  const scale = useTransform(speed, [0, 1000], [1, 0.8]);
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
      <CircleCursor
        style={{ x: mouseX, y: mouseY, scale: smoothScale }}
        ref={cursorRef}
      />
      <GyanContainer>
        {/* <NavBar /> */}
        <VideoCarousel />
        <StyledIndexHero>
          <StyledIndexHeroContent>
            <StyledIndexHeroLeft>
              <StyledIndexLinks>
                <StyledIndexLinkItem basics-text data-animate stagger={0.2}>
                  2025
                </StyledIndexLinkItem>
                <Link to="/craft">
                  <StyledIndexLinkItem basics-text data-animate stagger={0.2}>
                    Craft
                  </StyledIndexLinkItem>
                </Link>
                <Link
                  to="https://x.com/ArnavNath134095"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StyledIndexLinkItem basics-text data-animate stagger={0.2}>
                    Twitter
                  </StyledIndexLinkItem>
                </Link>
              </StyledIndexLinks>
              <StyledIndexHeading data-animate basics-text stagger={0.5}>
                Arnav Nath is a{" "}
                <StyledNewsreaderFont>software craftsman</StyledNewsreaderFont>,
                crafting and polishing interactions and beautiful experiences on
                the web that make you feel magical.
              </StyledIndexHeading>
            </StyledIndexHeroLeft>
          </StyledIndexHeroContent>
        </StyledIndexHero>
      </GyanContainer>
    </Container>
  );
};

export default Index;

// =============================
// Styled Components
// =============================

const Container = styled.div`
  background: #0d0d0d;
  width: 100%;
  height: 100%;
  cursor: none;
  color: #fff;
`;

const GyanContainer = styled.div`
  width: min(90%, 950px);
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const StyledIndexHero = styled.div`
  position: relative;
  max-width: 620px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  margin: 0 auto;
`;

const StyledIndexHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  @media (max-width: 780px) {
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: column;
    gap: 20px;
  }
`;

const StyledIndexHeroLeft = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

const StyledIndexHeading = styled.div<{ stagger: number }>`
  font-size: clamp(1.2rem, 2vw + 0.8rem, 1.7rem);
  font-weight: 380;
  letter-spacing: -0.2px;
  --stagger: ${(props) => props.stagger};
  line-height: clamp(1.8rem, 2.5vw + 1rem, 2.8rem);
  color: #fff;
`;

const StyledNewsreaderFont = styled.span`
  font-family: var(--secondaryFont);
  font-style: italic;
  font-weight: 480;
  font-size: clamp(1.25rem, 2vw + 1rem, 2rem);
`;

const CircleCursor = styled(motion.div)`
  width: 30px;
  height: 30px;
  background-color: var(--background, #0d0d0d);
  border: 3px solid var(--primary, #fff);
  border-radius: 50%;
  position: absolute;
  z-index: 1000000;
  pointer-events: none;

  @media (max-width: 780px) {
    display: none !important; /* no custom cursor on mobile */
  }
`;

const StyledIndexLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const StyledIndexLinkItem = styled.div<{ stagger: number }>`
  position: relative;
  font-size: 2rem;
  font-weight: 400;
  cursor: none;
  color: inherit;
  text-decoration: none;
  --stagger: var(${(props) => props.stagger});
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background-color: gray;
    transform: scaleX(1);
    transform-origin: left center;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  // &:hover::after {
  //   transform: scaleX(1);
  // }
`;

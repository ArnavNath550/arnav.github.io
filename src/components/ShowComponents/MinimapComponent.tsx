import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

// Prevent horizontal scroll globally
const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }
`;

const MinimapComponent: React.FC = () => {
  const MINI_LINES = 25;
  const INTERVAL = 5;
  const CONTAINER_WIDTH = 600;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = React.useState(0);
  const [zoomFactor, setZoomFactor] = React.useState(1);
  const [activeLine, setActiveLine] = React.useState<number | null>(null);
  const [lineIndex, setLineIndex] = React.useState<number | null>(null);

  // Track mouse X position
  const mouseX = useMotionValue(-9999);
  const velocity = useVelocity(mouseX);

  const handleMouseLeave = () => {
    mouseX.set(-9999);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    mouseX.set(x);
  };

  const [items] = React.useState([
    {
      itemName: "Mess",
      itemContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      itemName: "Thought",
      itemContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      itemName: "Process",
      itemContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      itemName: "Action",
      itemContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      itemName: "Peace",
      itemContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
  ]);

  const handleLineClick = (
    lineElement: HTMLDivElement | null,
    index: number,
    lineIndex: number,
  ) => {
    if (!lineElement || !containerRef.current) return;

    const lineRect = lineElement.getBoundingClientRect();
    const lineCenterInViewport = lineRect.left + lineRect.width / 2;
    const viewportCenter = window.innerWidth / 2;

    const deltaX = viewportCenter - lineCenterInViewport;

    // Move container horizontally to center the clicked line
    setOffsetX((prev) => prev + deltaX);

    // Animate the expansion
    setActiveLine(index);
    setZoomFactor(2.5); // zoom in effect
    setLineIndex(lineIndex);
  };

  const handleReset = () => {
    // Reset all states to their initial values
    setOffsetX(0);
    setZoomFactor(1);
    setActiveLine(null);
    setLineIndex(null);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if the click is outside the lines container
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        handleReset();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <StyledLineContainer
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            x: offsetX,
            y: activeLine !== null ? -window.innerHeight / 2.5 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
        >
          {Array.from({ length: MINI_LINES }).map((_, i) => {
            const lineX = (i / MINI_LINES) * CONTAINER_WIDTH;
            const distance = useTransform(mouseX, (x) => Math.abs(x - lineX));

            const baseScale = useTransform(distance, [0, 150], [1.6, 1]);
            const velocityBoost = useTransform(
              velocity,
              [-2000, 0, 2000],
              [1.2, 1, 1.2],
            );

            const boostedScale = useTransform(
              [baseScale, velocityBoost],
              ([scale, boost]) => scale * boost,
            );

            const smoothScale = useSpring(boostedScale, {
              stiffness: 250,
              damping: 20,
            });

            const isBigLine = Number.isInteger(i / INTERVAL);
            const itemIndex = Math.floor(i / INTERVAL);
            const lineRef = React.useRef<HTMLDivElement>(null);

            const relativeIndex = activeLine !== null ? i - activeLine : 0;
            const spread =
              activeLine !== null ? relativeIndex * 150 * (zoomFactor - 1) : 0;

            return (
              <motion.div
                key={i}
                ref={lineRef}
                animate={{ x: spread }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                <StyledLineContent
                  onClick={() =>
                    isBigLine
                      ? handleLineClick(lineRef.current, i, itemIndex)
                      : console.log("small line")
                  }
                >
                  <StyledLine
                    style={{ scaleY: smoothScale }}
                    isSmall={!isBigLine}
                    isActive={activeLine === i}
                  />
                  {isBigLine && items[itemIndex] ? (
                    <LineLabel isActive={activeLine === i}>
                      {items[itemIndex].itemName}
                    </LineLabel>
                  ) : null}
                </StyledLineContent>
              </motion.div>
            );
          })}
        </StyledLineContainer>
        {lineIndex !== null && (
          <StyledContent
            initial={{ opacity: 0, top: 50, filter: "blur(5px)" }}
            animate={{ opacity: 1, top: 60, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <StyledContentName
              initial={{ opacity: 0, top: -5, filter: "blur(5px)" }}
              animate={{ opacity: 1, top: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {items[lineIndex].itemName}
            </StyledContentName>
            <StyledContentDescription
              initial={{ opacity: 0, top: -5, filter: "blur(5px)" }}
              animate={{ opacity: 1, top: 0, filter: "blur(0px)" }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {items[lineIndex].itemContent}
            </StyledContentDescription>
          </StyledContent>
        )}
      </Container>
    </>
  );
};

export default MinimapComponent;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #f9f9f9;
  overflow: hidden;
`;

const StyledLineContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
  width: 600px;
  height: 100px;
  position: absolute;
`;

const StyledLineContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const StyledLine = styled(motion.div)<{ isSmall: boolean; isActive: boolean }>`
  width: 1px;
  height: ${(props) => (props.isSmall ? "20px" : "50px")};
  border: 0.5px solid
    ${(props) =>
      props.isActive ? "var(--primary)" : props.isSmall ? "#888" : "#000"};
  transform-origin: bottom center;
`;

const LineLabel = styled.div<{ isActive: boolean }>`
  font-size: 13px;
  color: ${(props) => (props.isActive ? "var(--primary)" : "#555")};
  margin-top: 4px;
  position: absolute;
  bottom: -25px;
  transition: color 0.3s ease;
`;

const StyledContent = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
`;

const StyledContentName = styled(motion.span)`
  font-size: 25px;
  font-family: var(--secondaryFont);
  font-style: italic;
  font-weight: 480;
`;

const StyledContentDescription = styled(motion.span)`
  font-size: 20px;
  font-weight: 480;
  text-align: justify;
  line-height: 38px;
`;

import * as React from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  min-height: 300vh;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinesContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: matrix(1, 0, 0.5, 1, 0, 0);
`;

const Line = styled.div`
  width: 2px;
  height: 200px;
  background-color: var(--primary);
`;

const ThoughtMomentum: React.FC = () => {
  const lines = 10;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Lines expand from 0 to 0.3 scroll progress
  const linesGapValue = useTransform(scrollYProgress, [0, 0.3], [0, 80]);

  // Lines animate up/down from 0.35 to 0.55 scroll progress
  const lineAnimationProgress = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    [0, 1],
  );

  // Lines fade out from 0.6 to 0.75 scroll progress
  const linesOpacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);

  // Content fades in and scales from 0.65 to 0.85 scroll progress
  const contentOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.65, 0.85], [0.85, 1]);

  return (
    <Container ref={containerRef}>
      <StickyContainer>
        <LinesContainer
          style={{
            opacity: linesOpacity,
            filter: "blur(10)",
          }}
        >
          {Array.from({ length: lines }, (_, index) => {
            const isEven = index % 2 === 0;
            // Even lines go up, odd lines go down
            const yValue = useTransform(
              lineAnimationProgress,
              [0, 1],
              [0, isEven ? -60 : 60],
            );

            return (
              <motion.div
                key={index}
                style={{
                  position: "relative",
                  marginLeft: index === 0 ? 0 : linesGapValue,
                  y: yValue,
                }}
              >
                <Line />
              </motion.div>
            );
          })}
        </LinesContainer>
      </StickyContainer>
    </Container>
  );
};

export default ThoughtMomentum;

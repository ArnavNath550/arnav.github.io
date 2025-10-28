import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

const PixelAnimation: React.FC = () => {
  const [motionShift, setMotionShift] = React.useState(false);

  const LINES = 10;
  const MAP_LINE_GAP = 5;

  setTimeout(() => {
    setMotionShift(true);
  }, 3000);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.25, filter: "blur(24px)" }}
      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
    >
      {motionShift ? (
        <StyledHeroParagraph
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(24px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          pixel,
        </StyledHeroParagraph>
      ) : (
        <StyledPixelAnimation
          initial={{ gap: 0 + "px" }}
          animate={{ gap: MAP_LINE_GAP + "px" }}
          exit={{
            opacity: 0,
            scale: 0.25,
            filter: "blur(24px)",
          }}
          transition={{
            delay: 2,
            duration: 1,
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
        >
          {Array.from({ length: LINES }, (_i, index) => {
            return <StyledPixelBlock isEven={index % 2 == 0} />;
          })}
        </StyledPixelAnimation>
      )}
    </motion.span>
  );
};

export default PixelAnimation;

const StyledPixelAnimation = styled(motion.span)`
  display: flex;
  flex-direction: row;
`;

const StyledPixelBlock = styled.p<{ isEven: boolean }>`
  background-color: #555;
  width: 5px;
  height: 5px;
  position: relative;
  top: ${(props) => (props.isEven == true ? 0 : -5)};
`;

const StyledHeroParagraph = styled(motion.div)`
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

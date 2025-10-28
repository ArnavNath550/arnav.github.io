import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

const FeedbackCaptureAnimation: React.FC = () => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <Container>
      <CircleCursor
        animate={{
          x: mousePos.x - 22.5,
          y: mousePos.y - 22.5,
          scale: isClicked ? 0.9 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      <StyledFeedbackContainer
        animate={{
          x: mousePos.x - 22.5,
          y: mousePos.y + 30,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        hello
      </StyledFeedbackContainer>
    </Container>
  );
};

export default FeedbackCaptureAnimation;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  cursor: none;
  overflow: hidden;
`;

const CircleCursor = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: var(--primary, #ff4757);
  pointer-events: none;
  z-index: 9999;
`;

const StyledFeedbackContainer = styled(motion.div)`
  width: 200px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 1px 1px 2px 1px #e7e3e3;
`;

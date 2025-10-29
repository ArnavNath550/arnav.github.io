import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

interface Feedback {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  message: string;
}

const FeedbackCaptureAnimation: React.FC = () => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = React.useState(false);
  const [mouseDownPos, setMouseDownPos] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectionBox, setSelectionBox] = React.useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [feedbacks, setFeedbacks] = React.useState<Feedback[]>([]);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Handle mouse movement and selection box creation
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (isClicked && mouseDownPos) {
        const currentX = e.clientX;
        const currentY = e.clientY;
        const x = Math.min(mouseDownPos.x, currentX);
        const y = Math.min(mouseDownPos.y, currentY);
        const width = Math.abs(mouseDownPos.x - currentX);
        const height = Math.abs(mouseDownPos.y - currentY);
        setSelectionBox({ x, y, width, height });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      setMouseDownPos({ x: e.clientX, y: e.clientY });
      setSelectionBox(null); // reset previous selection
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsClicked(false);

      if (!mouseDownPos) return;

      const upPos = { x: e.clientX, y: e.clientY };
      const width = Math.abs(mouseDownPos.x - upPos.x);
      const height = Math.abs(mouseDownPos.y - upPos.y);

      const MIN_DRAG_DISTANCE = 10;
      if (width < MIN_DRAG_DISTANCE && height < MIN_DRAG_DISTANCE) {
        setSelectionBox(null);
        return;
      }

      const x = Math.min(mouseDownPos.x, upPos.x);
      const y = Math.min(mouseDownPos.y, upPos.y);
      setSelectionBox({ x, y, width, height });

      // Focus textarea shortly after box appears
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    };

    // Handle Escape key to cancel selection
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectionBox(null);
        setMouseDownPos(null);
        setIsClicked(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isClicked, mouseDownPos]);

  // Handle Enter key to save feedback
  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey && selectionBox) {
      e.preventDefault();
      const message = e.currentTarget.value.trim();
      if (message.length === 0) return;

      const newFeedback: Feedback = {
        id: Date.now().toString(),
        x: selectionBox.x,
        y: selectionBox.y,
        width: selectionBox.width,
        height: selectionBox.height,
        message,
      };

      setFeedbacks((prev) => [...prev, newFeedback]);
      setSelectionBox(null);
    } else if (e.key === "Escape") {
      // Escape cancels the textarea while typing
      e.preventDefault();
      setSelectionBox(null);
    }
  };

  return (
    <Container>
      {/* Circle follows cursor */}
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

      {/* Feedback selection box with textarea */}
      {selectionBox && (
        <StyledFeedbackContainer
          initial={false}
          animate={{
            x: selectionBox.x,
            y: selectionBox.y,
            width: selectionBox.width,
            height: selectionBox.height,
            opacity: isClicked ? 0.6 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <StyledTextarea
            ref={textareaRef}
            placeholder="Give your feedback here... [Press Enter to save, Esc to cancel]"
            onKeyDown={handleTextareaKeyDown}
          />
        </StyledFeedbackContainer>
      )}

      {/* Render saved feedback messages */}
      {feedbacks.map((f) => (
        <StyledSavedFeedbackMessage
          key={f.id}
          style={{
            top: f.y,
            left: f.x,
            width: f.width,
            height: f.height,
            position: "fixed",
          }}
        >
          <span>{f.message}</span>
        </StyledSavedFeedbackMessage>
      ))}
    </Container>
  );
};

export default FeedbackCaptureAnimation;

// ---------------- Styled Components ----------------

const Container = styled.div`
  width: 100%;
  height: 100vh;
  cursor: none;
  overflow: hidden;
  background-color: #fafafa;
  position: relative;
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
  position: fixed;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  pointer-events: none;
  z-index: 9998;
  overflow: hidden;
`;

const StyledTextarea = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  color: #0d0d0d;
  resize: none;
  padding: 10px;
  pointer-events: auto;
  outline: none;
  font-size: 14px;
`;

const StyledSavedFeedbackMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-wrap: break-word;
  padding: 10px;
  font-size: 14px;
  font-weight: 480;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 10px;
  z-index: 9997;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

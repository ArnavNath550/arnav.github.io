import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styled from "styled-components";

type Props = {
  cursorRef?: any;
};

const ThoughtAnimation: React.FC<Props> = () => {
  const LINES = 14;
  const thoughtItems = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Smoothed mouse position
  const mouseX = useMotionValue(-9999);
  const smoothMouseX = useSpring(mouseX, {
    stiffness: 200,
    damping: 25,
    mass: 0.4,
  });

  const [hoveredLine, setHoveredLine] = React.useState<number | null>(null);
  const [lineScales, setLineScales] = React.useState<number[]>(
    Array(LINES).fill(1),
  );

  // Handle mouse move with requestAnimationFrame batching
  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
  }, []);

  React.useEffect(() => {
    const unsub = smoothMouseX.on("change", (x) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const newScales = Array.from({ length: LINES }, (_, i) => {
        const lineX = (i / (LINES - 1)) * width;
        const distance = Math.abs(x - lineX);
        const maxDistance = width / 2;
        const scale = 1.4 - (distance / maxDistance) * 0.4;
        return Math.max(1, scale);
      });
      setLineScales(newScales);
    });

    return () => unsub();
  }, [smoothMouseX]);

  const handleMouseLeave = () => {
    setHoveredLine(null);
    mouseX.set(-9999);
    setLineScales(Array(LINES).fill(1));
  };

  return (
    <StyledContainer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: LINES }).map((_, i) => {
        const hasLabel = thoughtItems[i].trim().length > 0;
        const isHovered = hoveredLine === i;
        const scaleY = lineScales[i];

        return (
          <StyledLineContainer
            key={i}
            onMouseEnter={() => hasLabel && setHoveredLine(i)}
            onMouseLeave={() => hasLabel && setHoveredLine(null)}
          >
            <StyledLine
              style={{
                transform: `scaleY(${scaleY})`,
                backgroundColor: scaleY > 1.05 ? "var(--primary)" : "#0d0d0d",
                borderColor: isHovered ? "var(--primary)" : "transparent",
                borderWidth: isHovered ? 2 : 0,
              }}
            />
            <span
              style={{
                color: isHovered && hasLabel ? "var(--primary)" : "#555",
                fontWeight: isHovered && hasLabel ? 600 : 400,
              }}
            >
              {thoughtItems[i]}
            </span>
          </StyledLineContainer>
        );
      })}
    </StyledContainer>
  );
};

export default ThoughtAnimation;

// ---------------------- STYLES ----------------------

const StyledContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  align-items: center;
  z-index: 10000;
  will-change: transform;
`;

const StyledLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  will-change: transform;

  span {
    font-size: 0.8rem;
    transition:
      color 0.3s ease,
      font-weight 0.3s ease;
    font-family: var(--secondaryFont);
    font-style: italic;
    color: #555;
  }
`;

const StyledLine = styled.div`
  width: 1px;
  height: 100px;
  background-color: #555;
  transform-origin: bottom;
  border-style: solid;
  transition:
    transform 0.2s ease-out,
    background-color 0.2s ease-out,
    border-width 0.2s ease-out;
  will-change: transform, background-color, border-width;
`;

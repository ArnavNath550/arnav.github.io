import * as React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import PageHeading from "../components/PageHeading";
import { toHindiNumerals } from "../helpers/numeralsHelper";
import { Link } from "react-router";

const Craft: React.FC = () => {
  const craftItems = [
    {
      name: "Gallery",
      date: "2025",
      url: "gallery",
    },
    {
      video: "/videos/minimap.mov",
      name: "Thought minimap",
      date: "2025",
      url: "thought-minimap",
    },
    {
      video: "/videos/bottom-bar.mov",
      name: "Bottom Bar",
      date: "2025",
      url: "bottom-bar",
    },
    {
      video: "/videos/readerview.mov",
      name: "Reader View",
      date: "2025",
      url: "reader-view",
    },
    {
      video: "/videos/todo.mov",
      name: "Smooth Todo",
      date: "2025",
      url: "smooth-todo",
    },
    {
      video: "",
      name: "Circular",
      date: "2024",
      url: "https://www.thecircular.app",
    },
  ];

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [mousePos, setMousePos] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLElement>,
    itemUrl: string,
  ) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setHoveredItem(itemUrl);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <Container>
      <PageHeading />
      <CraftTableContainer ref={containerRef}>
        {craftItems.map((item) => (
          <CraftTableItem
            key={item.url}
            onMouseMove={(e) => item.video && handleMouseMove(e, item.url)}
            onMouseLeave={handleMouseLeave}
            to={item.url}
          >
            <CraftTableData data-animate basics-text stagger={0.3}>
              {toHindiNumerals(item.date)}
            </CraftTableData>
            <CraftTableData data-animate basics-text stagger={0.5}>
              {item.name}
            </CraftTableData>
          </CraftTableItem>
        ))}
      </CraftTableContainer>

      <AnimatePresence>
        {hoveredItem && (
          <FloatingPreviewContainer
            key={hoveredItem}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
            style={{
              top: mousePos.y,
              left: mousePos.x,
            }}
          >
            <PreviewContent>
              <video
                src={craftItems.find((i) => i.url === hoveredItem)?.video}
                autoPlay
                loop
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "6px",
                  objectFit: "cover",
                }}
              />
            </PreviewContent>
          </FloatingPreviewContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Craft;

const Container = styled.div`
  max-width: 550px;
  margin: 0 auto;
  margin-top: 8rem;
  position: relative;
`;

const CraftTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const CraftTableItem = styled(Link)`
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #3d3d3d;
  display: flex;
  gap: 15px;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #0d0d0d;
    background-color: #f7f7f7;
  }

  @media (max-width: 750px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const CraftTableData = styled.div<{ stagger: number }>`
  display: flex;
  --stagger: ${(props) => props.stagger};
`;

const FloatingPreviewContainer = styled(motion.div)`
  position: fixed; /* Use fixed to follow viewport exactly */
  width: 350px;
  height: 200px;
  transform: translate(-50%, -50%); /* center on cursor */
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  pointer-events: none;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 9999;
`;

const PreviewContent = styled.div`
  max-width: 100%;
  height: 100%;
`;

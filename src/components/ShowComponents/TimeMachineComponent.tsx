import * as React from "react";
import styled from "styled-components";
import PageBack from "../PageBack";

const TimeMachineComponent: React.FC = () => {
  const [notes] = React.useState([
    "Every pixel is crafted to perfect",
    "Don't stay too focused when being creative",
    "Every creative block is a queue to look for inspiration again",
    "Art is find everywhere, you just need to search for it",
    "Just because its the web, doesn't mean it has to be boring",
    "Knowing where to apply art is better than knowing art",
  ]);

  return (
    <Container>
      <PageBack pagePath="/craft" pageName="Craft" />
      <StyledTransformContainer>
        {notes.map((note, index) => {
          // Frontmost card = index 0
          const depth = index;

          const stagger = depth * 35; // smaller gap between cards
          const scale = 1 - depth * 0.1; // zoom-out effect
          const blur = depth * 2.5; // blur by depth
          const opacity = 1 - depth * 0.12; // fade out

          return (
            <TimeMachineCard
              key={index}
              stagger={stagger}
              scale={scale}
              blur={blur}
              opacity={opacity}
              style={{ zIndex: notes.length - index }}
            >
              {note}
            </TimeMachineCard>
          );
        })}
      </StyledTransformContainer>
      <FloatingActionContainer>
        <Button>Remove</Button>
      </FloatingActionContainer>
    </Container>
  );
};

export default TimeMachineComponent;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f2f2f2;
  perspective: 1000px;
`;

const TimeMachineCard = styled.div<{
  stagger: number;
  scale: number;
  blur: number;
  opacity: number;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 300px;
  background-color: #fff;
  backdrop-filter: blur(10px) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  font-size: 1.3rem;
  color: #3d3d3d;
  text-align: center;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Center + offset upward progressively */
  transform: translate(-50%, calc(-50% - ${(props) => props.stagger}px))
    scale(${(props) => props.scale});

  filter: blur(${(props) => props.blur}px);
  opacity: ${(props) => props.opacity};
  transition: all 0.4s ease;
`;

const FloatingActionContainer = styled.div`
  position: absolute;
  bottom: 50px;
`;

const Button = styled.div`
  color: #fff;
  background: #383838;
  border-radius: 9999px;
  padding: 11px;
  padding-left: 15px;
  padding-right: 15px;
  transition: ease background-color 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #5f5f5f;
  }
`;

const StyledTransformContainer = styled.div``;

import * as React from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
} from "framer-motion";
import NavBar from "../components/NavBar";
import { toHindiNumerals } from "../helpers/numeralsHelper";
import { Link } from "react-router";

const Craft: React.FC = () => {
  const [craftItems, setCraftItems] = React.useState([
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
  ]);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Container>
        <NavBar />
        <Flex style={{ marginTop: 120 }}>
          {craftItems.map((y) => {
            return (
              <Card video={y.video} name={y.name} date={y.date} url={y.url} />
            );
          })}
        </Flex>
      </Container>
    </div>
  );
};

export default Craft;

type CardProps = {
  video: string;
  name: string;
  date: string;
  url: string;
};
const Card: React.FC = (cardProps: CardProps) => {
  // Scroll motion hooks
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth out velocity for nicer easing
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 20,
    stiffness: 150,
  });

  // Map velocity to a skew range
  const skewY = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    ["6deg", "0deg", "-6deg"],
  );

  return (
    <Link to={`/craft/${cardProps.url}`}>
      <MotionCard style={{ skewY }}>
        <StyledCardVideo
          src={cardProps.video}
          autoPlay
          loop
          muted
          playsInline
        />
        <StyledCardName>{cardProps.name}</StyledCardName>
        <StyledCardDate>{toHindiNumerals(cardProps.date)}</StyledCardDate>
      </MotionCard>
    </Link>
  );
};

// ----- Styled Components -----
const Container = styled.div`
  width: 950px;
  margin: 0 auto;
  height: 100%;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 15px;
`;

const StyledCard = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  flex-grow: 1;
  transform-origin: center center;
  will-change: transform;
`;

const MotionCard = motion(StyledCard);

const StyledCardImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
`;

const StyledCardName = styled.div`
  font-size: 1.5rem;
  font-weight: 480;
  letter-spacing: -0.2px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const StyledCardDate = styled.div`
  font-size: 1.5rem;
  font-weight: 480;
  letter-spacing: -0.2px;
  font-family: var(--secondaryFont);
  font-style: italic;
  color: #555;
`;

const StyledCardVideo = styled.video`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  object-fit: contain;
  display: block;
`;

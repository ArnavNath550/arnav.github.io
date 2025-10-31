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
  const craftItems = [
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
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Container>
        <NavBar />
        <Flex style={{ marginTop: 120 }}>
          {craftItems.map((y, i) => (
            <Card
              key={i}
              video={y.video}
              name={y.name}
              date={y.date}
              url={y.url}
            />
          ))}
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

const Card: React.FC<CardProps> = ({ video, name, date, url }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 20,
    stiffness: 150,
  });
  const skewY = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    ["6deg", "0deg", "-6deg"],
  );

  return (
    <Link to={`/craft/${url}`}>
      <MotionCard style={{ skewY }}>
        <StyledCardVideo src={video} autoPlay loop muted playsInline />
        <StyledCardName>{name}</StyledCardName>
        <StyledCardDate>{toHindiNumerals(date)}</StyledCardDate>
      </MotionCard>
    </Link>
  );
};

const Container = styled.div`
  max-width: 950px;
  margin: 0 auto;
  height: 100%;

  @media (max-width: 780px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 15px;
  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

const StyledCard = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  flex-grow: 1;
  transform-origin: center center;
  will-change: transform;
`;

const MotionCard = motion(StyledCard);

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

import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";

const VideoCarousel: React.FC = () => {
  const videos = [
    "/videos/bottom-bar.mov",
    "/videos/todo.mov",
    "/videos/circular-changelog.mov",
    "/videos/circular-preview.mov",
  ];

  return (
    <StyledVideoCarousel>
      {videos.map((videoSrc, i) => (
        <LazyVideo key={i} src={videoSrc} />
      ))}
    </StyledVideoCarousel>
  );
};

export default VideoCarousel;

/* ----------------------- */
/*  Lazy Video Component   */
/* ----------------------- */
const LazyVideo: React.FC<{ src: string }> = ({ src }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.25 },
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <StyledVideoItem
      initial={{ maxWidth: "10px" }}
      animate={{ maxWidth: "400px" }}
      transition={{ duration: 0.5 }}
    >
      <StyledVideo
        ref={videoRef}
        as={motion.video}
        autoPlay={isVisible}
        loop
        muted
        playsInline
        src={isVisible ? src : undefined}
        initial={{ opacity: 0, filter: "blur(50px) grayscale(1)" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          filter: isVisible
            ? "blur(5px) contrast(1.3) grayscale(1)"
            : "blur(50px) grayscale(1)",
        }}
        transition={{ duration: 0.5 }}
        style={{ objectFit: "cover", borderRadius: 8 }}
      />
    </StyledVideoItem>
  );
};

/* ----------------------- */
/*  Styled Components      */
/* ----------------------- */
const StyledVideoCarousel = styled.div`
  height: 50vh;
  display: flex;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
`;

const StyledVideoItem = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledVideo = styled(motion.video)`
  width: 100%;
  height: 100%;
  display: block;
  mask-image: linear-gradient(#0d0d0d 60%, transparent);
`;

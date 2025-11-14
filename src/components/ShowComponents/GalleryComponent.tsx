//@ts-nocheck
import * as React from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import PageBack from "../PageBack";

const artworkData: Record<
  string,
  {
    title: string;
    artist: string;
    date: string;
    description: string;
  }
> = {
  "/images/artwork/artwork-one.jpg": {
    title: "The House Within",
    artist: "Rabindranath Tagore",
    date: "c. 1930s",
    description:
      "A psychological abstraction where a human profile merges into a house-like structure. Tagore’s later works explored inner consciousness, emotional ambiguity, and dreamlike symbolism using expressive ink textures.",
  },

  "/images/artwork/artwork-two.jpg": {
    title: "Goddess Saraswati",
    artist: "Raja Ravi Varma",
    date: "1894",
    description:
      "One of Ravi Varma’s iconic portrayals of Saraswati, the Hindu goddess of learning and arts. The painting combines classical Indian motifs with European realism, conveying grace, divinity, and cultural richness.",
  },

  "/images/artwork/artwork-three.jpg": {
    title: "Lady in Green Sari",
    artist: "Amrita Sher-Gil",
    date: "1930s",
    description:
      "A contemplative portrait reflecting Sher-Gil’s emotional depth and painterly sensitivity. The subject’s posture and expression evoke themes of solitude, introspection, and womanhood within everyday Indian life.",
  },

  "/images/artwork/artwork-four.jpg": {
    title: "Ganesha Preparations",
    artist: "Unknown Contemporary Indian Artist",
    date: "c. 2000s",
    description:
      "A stylized devotional composition showing Lord Ganesha being adorned for ritual worship. The vibrant orange backdrop and surreal figure modeling evoke modern Indian figurative art while referencing traditional puja symbolism.",
  },

  "/images/artwork/artwork-five.jpg": {
    title: "Pratima Visarjan",
    artist: "Gaganendranath Tagore",
    date: "late 20th century",
    description:
      "An atmospheric scene of durga maa idol on a boat during nighttime immersion rites. Soft glowing light diffuses through misty surroundings, creating a dreamlike devotional ambience filled with ritual emotion.",
  },
};

const GalleryComponent: React.FC = () => {
  const [gallery] = React.useState([
    "/images/artwork/artwork-one.jpg",
    "/images/artwork/artwork-two.jpg",
    "/images/artwork/artwork-three.jpg",
    "/images/artwork/artwork-four.jpg",
    "/images/artwork/artwork-five.jpg",
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClick = (src: string) => {
    setSelectedImage(src);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  // Framer Motion variants for staggered text roll-up with blur
  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, rotateX: 20, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80, // less springy
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <PageBack pagePath="/craft" pageName="Craft" />
      <StyledGalleryContainer>
        {gallery.map((src, index) => (
          <GalleryItem
            key={src}
            src={src}
            index={index}
            onClick={() => handleClick(src)}
          />
        ))}
      </StyledGalleryContainer>

      <AnimatePresence>
        {selectedImage && (
          <StyledOverlay
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StyledOverlayContent>
              <motion.img
                src={selectedImage}
                layoutId={selectedImage}
                style={{
                  width: 400,
                  height: 500,
                  borderRadius: 10,
                  objectFit: "cover",
                }}
              />

              <StyledOverlayText
                as={motion.div}
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={textItemVariants}>
                  <StyledOverlayDate>
                    {artworkData[selectedImage]?.date || ""}
                  </StyledOverlayDate>
                </motion.div>

                <motion.div variants={textItemVariants}>
                  <StyledOverlayName>
                    {artworkData[selectedImage]?.title || "Untitled"}
                  </StyledOverlayName>
                </motion.div>

                <motion.div variants={textItemVariants}>
                  <StyledOverlayArtist>
                    {artworkData[selectedImage]?.artist || ""}
                  </StyledOverlayArtist>
                </motion.div>

                <motion.div variants={textItemVariants}>
                  <StyledOverlayDescription>
                    {artworkData[selectedImage]?.description || ""}
                  </StyledOverlayDescription>
                </motion.div>
              </StyledOverlayText>
            </StyledOverlayContent>
          </StyledOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryComponent;

/* ---------------- STYLES ---------------- */

const StyledGalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 250px);
  gap: 15px;
  justify-content: center;
  align-content: start;
  margin: 8rem 0;
  margin-bottom: 8rem !important;
`;

const StyledGalleryItem = styled(motion.img)`
  width: 250px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

interface GalleryItemProps {
  src: string;
  index: number;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, index, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <StyledGalleryItem
      ref={ref}
      src={src}
      onClick={onClick}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      layoutId={src}
    />
  );
};

/* Overlay styles */

const StyledOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledOverlayContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledOverlayText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  color: #0d0d0d;
  perspective: 1000px;
`;

const StyledOverlayName = styled.div`
  font-size: 2rem;
  font-style: italic;
  font-family: var(--secondaryFont);
`;

const StyledOverlayArtist = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
  font-family: var(--secondaryFont);
`;

const StyledOverlayDate = styled.div`
  font-size: 1rem;
  font-family: var(--secondaryFont);
  opacity: 0.8;
  font-style: italic;
`;

const StyledOverlayDescription = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
`;

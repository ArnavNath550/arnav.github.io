//@ts-ignore
import { motion, AnimatePresence, type Variants } from "framer-motion";
import * as React from "react";
import styled from "styled-components";
import PageBack from "../PageBack";

const ReaderViewComponent: React.FC = () => {
  const [text] = React.useState<string[]>([
    "Much of the art I appreciate in museums can be bucketed into aesthetics like typographic, medieval, or patterned.",
    "The boundaries feel clearly defined because we can assign names to them.",
    "I have been increasingly more stimulated by aesthetic intersections—unexpected displays of art that tastefully reject the notion of a clean, singularly defined style, yet bridges many.",
    "For my taste, often this ends up in opposition to minimalism, yet does not chaotically lean into kitschy or maximalism.",
    "There is authoring intent, purpose, and a sense of iteration felt throughout, not seemingly arbitrary excess for the sake of creative provocation.",
    "I believe there's something fascinating in art and design that treats my attention with care and instills curiosity.",
  ]);

  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);
  const [direction, setDirection] = React.useState<"up" | "down">("down");
  const [textAnimate, setTextAnimate] = React.useState(false);

  const hoveredTextRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    document.body.style.overflow = overlayVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayVisible]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && hoveredTextRef.current && !overlayVisible) {
        const index = text.indexOf(hoveredTextRef.current);
        if (index !== -1) {
          setCurrentIndex(index);
          setOverlayVisible(true);
        }
      }

      if (overlayVisible) {
        if (e.key === "ArrowDown") {
          setDirection("down");
          setCurrentIndex((prev) =>
            prev === null ? 0 : Math.min(prev + 1, text.length - 1),
          );
        }
        if (e.key === "ArrowUp") {
          setDirection("up");
          setCurrentIndex((prev) =>
            prev === null ? 0 : Math.max(prev - 1, 0),
          );
        }
        if (e.key === "Escape") {
          setOverlayVisible(false);
          setTimeout(() => setCurrentIndex(null), 300);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        setOverlayVisible(false);
        setTimeout(() => setCurrentIndex(null), 300);
      }
    };
    0;

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [overlayVisible, text]);

  const currentText = currentIndex !== null ? text[currentIndex] : null;
  const nextText =
    currentIndex !== null && currentIndex < text.length - 1
      ? text[currentIndex + 1]
      : null;
  const prevText =
    currentIndex !== null && currentIndex > 0 ? text[currentIndex - 1] : null;

  // Variants
  const creditContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 1.2 } },
  };

  const creditItemVariants: Variants = {
    hidden: { opacity: 0, y: 2 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  const textContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.5 } },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: "easeIn" } },
  };

  return (
    <Container>
      <PageBack pagePath="/craft" pageName="Craft" />
      <ContentWrapper layout>
        <CreditContainer
          as={motion.div}
          variants={creditContainerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={() => setTextAnimate(true)}
          layout
        >
          <motion.div variants={creditItemVariants}>
            These lines are from{" "}
            <strong>
              <a href="https://rauno.me">Rauno Freiberg's</a>
            </strong>{" "}
            Blog Post{" "}
            <a href="https://rauno.me/craft/contrasting-aesthetics">
              Contrasting Aesthetics
            </a>
          </motion.div>
          <motion.div variants={creditItemVariants}>
            <code>Hover over a sentence and press ALT</code>
          </motion.div>
        </CreditContainer>

        {textAnimate && (
          <TextContainer
            as={motion.div}
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            layout
          >
            {text.map((t, idx) => (
              <StyledText
                as={motion.div}
                key={idx}
                variants={textItemVariants}
                layout
                onMouseEnter={() => (hoveredTextRef.current = t)}
                onMouseLeave={() => (hoveredTextRef.current = null)}
              >
                {t}
              </StyledText>
            ))}
          </TextContainer>
        )}
      </ContentWrapper>

      <AnimatePresence mode="wait">
        {overlayVisible && currentText && (
          <StyledOverlayTextContainer
            overflowContainerIsVisible={overlayVisible}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StyledOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />
            <StyledOverlayContainer layout>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentText}
                  layout
                  variants={{
                    enter: { y: direction === "down" ? 6 : -6, opacity: 0 },
                    center: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.5, ease: "easeInOut" },
                    },
                    exit: {
                      y: direction === "down" ? -6 : 6,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut" },
                    },
                  }}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <StyledBigText layout>{currentText}</StyledBigText>
                </motion.div>
              </AnimatePresence>

              <StyledSubTextWrapper layout>
                <AnimatePresence mode="wait" custom={direction}>
                  {direction === "down" && nextText && (
                    <motion.div
                      key={nextText}
                      layout
                      initial={{ y: 6, opacity: 0, filter: "blur(1px)" }}
                      animate={{
                        y: 0,
                        opacity: 0.7,
                        filter: "blur(1px)",
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                      exit={{
                        y: -6,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                    >
                      <StyledNextText layout>{nextText}</StyledNextText>
                    </motion.div>
                  )}

                  {direction === "up" && prevText && (
                    <motion.div
                      key={prevText}
                      layout
                      initial={{ y: -6, opacity: 0, filter: "blur(1px)" }}
                      animate={{
                        y: 0,
                        opacity: 0.7,
                        filter: "blur(1px)",
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                      exit={{
                        y: 6,
                        opacity: 0,
                        filter: "blur(1px)",
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }}
                    >
                      <StyledPrevText layout>{prevText}</StyledPrevText>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StyledSubTextWrapper>
            </StyledOverlayContainer>
          </StyledOverlayTextContainer>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ReaderViewComponent;

//
// ---------------- Styled Components ----------------
//

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: column;
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const TextContainer = styled(motion.div)`
  display: flex;
  font-size: 16px;
  max-width: 550px;
  line-height: 35px;
  margin: 0 auto;
  font-weight: 450;
  cursor: default;
  letter-spacing: -0.2px;
  flex-direction: column;
  gap: 15px;
  z-index: 1;
`;

const StyledText = styled(motion.div)`
  transition: ease 0.5s all;
  &:hover {
    opacity: 0.5 !important;
  }
`;

const StyledBigText = styled(motion.div)`
  font-size: 2.3rem;
  font-weight: 480;
  letter-spacing: -0.2px;
  line-height: 50px;
  text-align: center;
  position: relative;
  z-index: 2;
  color: #000;
  max-width: 750px;
`;

const StyledNextText = styled(motion.div)`
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  margin-top: 25px;
`;

const StyledPrevText = styled(motion.div)`
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  margin-bottom: 25px;
`;

const StyledSubTextWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledOverlayTextContainer = styled(motion.div)<{
  overflowContainerIsVisible: boolean;
}>`
  position: fixed;
  inset: 0;
  z-index: ${(props) => (props.overflowContainerIsVisible ? 10000 : -1)};
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledOverlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #fff;
`;

const StyledOverlayContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  min-height: 150px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
  flex-direction: column;
  transition: height 1s ease-in-out;
  overflow: hidden;
`;

const CreditContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #555;
  strong {
    color: #0d0d0d;
  }
  a {
    text-decoration: underline;
  }
  code {
    font-size: 15px;
    color: var(--primary);
    font-weight: 500;
  }
  margin-top: 70px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

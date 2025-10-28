import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

const ThoughtMomentum: React.FC = () => {
  const items = [
    {
      title: "Thinking",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Mess",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Innovation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Collaboration",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Excellence",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const LINES = 50;
  const VISIBLE_LINES = items.length;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const spacing = useTransform(scrollYProgress, [0, 0.25], [10, 150]);
  const blur = useTransform(scrollYProgress, [0, 0.25], [10, 0]);

  // Lines position: starts at center, moves to top after 0.25
  const linesTop = useTransform(scrollYProgress, [0, 0.25], ["50%", "80px"]);

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Phase 1: Initial animation (0 to 0.25) - show first item
      if (latest < 0.25) {
        setActiveIndex(0);
        return;
      }

      // Phase 2: Item transitions (0.25 to 1)
      // Each item gets equal space in the remaining scroll
      const adjustedProgress = (latest - 0.25) / 0.75; // 0 to 1
      const segmentSize = 1 / items.length;
      const newIndex = Math.min(
        Math.floor(adjustedProgress / segmentSize),
        items.length - 1,
      );
      setActiveIndex(newIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          height: "800vh",
          position: "relative",
        }}
      >
        {/* Sticky lines - moves from center to top */}
        <motion.div
          style={{
            position: "sticky",
            top: linesTop,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            overflow: "hidden",
            transform: "translateY(-50%)",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {new Array(LINES).fill(null).map((_, index) => {
              const offsetMultiplier = index - (LINES - 1) / 2;
              const distanceFromCenter = Math.abs(offsetMultiplier);
              const shouldBeVisible = distanceFromCenter < VISIBLE_LINES / 2;

              const centerLineIndex = Math.floor(LINES / 2);
              const itemIndex = centerLineIndex + offsetMultiplier;
              const isInItemRange = itemIndex >= 0 && itemIndex < items.length;

              const visibleIndex =
                Math.floor(VISIBLE_LINES / 2) + offsetMultiplier;

              const opacity = useTransform(
                scrollYProgress,
                [0, 0.25, 1],
                [1, 1, shouldBeVisible ? 1 : 0],
              );

              const isActive = activeIndex === Math.round(visibleIndex);

              return (
                <motion.div
                  key={index}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    translateX: "-50%",
                    translateY: "-50%",
                    x: useTransform(spacing, (s) => offsetMultiplier * s),
                    opacity: opacity,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      scale: isActive ? 1 : 0.8,
                      height: isActive ? 40 : 30,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: "1px",
                      background: "#555",
                      filter: useTransform(blur, (b) => `blur(${b}px)`),
                    }}
                  />
                  {shouldBeVisible && (
                    <motion.div
                      style={{
                        marginTop: "50px",
                        textAlign: "center",
                        position: "absolute",
                        opacity: useTransform(
                          scrollYProgress,
                          [0.2, 0.35],
                          [0, 1],
                        ),
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        {items[Math.round(visibleIndex)]?.title}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Centered content - stays in center */}
        <motion.div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -40%)",
            textAlign: "center",
            opacity: useTransform(scrollYProgress, [0.3, 0.4], [0, 1]),
            pointerEvents: "none",
            maxWidth: "600px",
            padding: "0 20px",
          }}
        >
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "16px",
                fontFamily: "var(--secondaryFont)",
                fontStyle: "italic",
              }}
            >
              {items[activeIndex].title}
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#1d1d1d",
                lineHeight: "1.6",
                textAlign: "justify",
              }}
            >
              {items[activeIndex].description}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ThoughtMomentum;

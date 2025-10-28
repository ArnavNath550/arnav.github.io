import { motion, useInView } from "framer-motion";
import * as React from "react";
import styled from "styled-components";
import ThoughtMap from "./ThoughtMap";

const ThoughtSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <div>
      <StyledThoughtSection>
        {/*text 0.1*/}
        <StyledThoughtContent ref={ref}>
          <StyledRefinedType
            initial={{ opacity: 0, y: 2 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 2, filter: "blur(2px)" }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            No vision & blury ideas
          </StyledRefinedType>
          <StyledRefinedSmallType
            initial={{ opacity: 0, y: 2 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 2, filter: "blur(2px)" }
            }
            transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
          >
            lead to
          </StyledRefinedSmallType>
          <StyledRefinedType
            initial={{ opacity: 0, y: 2 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 2, filter: "blur(2px)" }
            }
            transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
          >
            concrete thoughts
          </StyledRefinedType>
        </StyledThoughtContent>
      </StyledThoughtSection>
      <ThoughtMap />
    </div>
  );
};

export default ThoughtSection;

const StyledThoughtSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledRefinedType = styled(motion.div)`
  font-size: 4.5rem;
  font-weight: 500;
  color: var(--primary);
`;

const StyledRefinedSmallType = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 500;
  text-align: right;
  font-family: var(--secondaryFont);
  font-style: italic;
  align-items: flex-end;
  justify-content: flex-end;
  /*color: var(--primary);*/
  padding-top: 50px;
  padding-bottom: 50px;
  margin-right: 50px;
`;

const StyledThoughtContent = styled.div`
  display: flex;
  flex-direction: column;
`;

//@ts-nocheck
import { motion } from "framer-motion";
import * as React from "react";
import styled from "styled-components";
import CircularIcon from "../components/Icons/CircularIcon";
import EyeIcon from "../components/Icons/EyeIcon";
import SignatureIcon from "../components/Icons/SignatureIcon";

const Index: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 1.5,
      y: 50,
      rotateX: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 125,
        damping: 35,
      },
    },
  };

  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 3.5,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 1,
      },
    },
  };

  return (
    <StyledContainer>
      <StyledContent
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StyledMetaHeader>
          <StyledNavText variants={itemVariants} variant="staple">
            2025-2026
          </StyledNavText>
          <StyledNavText
            variants={itemVariants}
            variant="default"
            href="/craft"
          >
            My Crafts
          </StyledNavText>
          <StyledNavText
            variants={itemVariants}
            variant="default"
            href="https://x.com/ArnavNath134095"
          >
            My Twitter (X)
          </StyledNavText>
        </StyledMetaHeader>
        <StyledHeader>
          <StyledMotionText variants={itemVariants}>
            I am, in love with creating{" "}
            <StyledInlineContent>
              <motion.div variants={iconVariants}>
                <CircularIcon width={24} height={24} />
              </motion.div>
            </StyledInlineContent>{" "}
            beautiful software.
          </StyledMotionText>
          <StyledMotionText variants={itemVariants}>
            Focused on bringing memorable interfaces to life.
          </StyledMotionText>
          <StyledMotionText variants={itemVariants}>
            Interesting, novel experiences catch my{" "}
            <StyledInlineContent>
              <motion.div variants={iconVariants}>
                <EyeIcon width={48} height={48} />
              </motion.div>
            </StyledInlineContent>
          </StyledMotionText>
          <StyledMotionText variants={itemVariants}>
            Currently building Circular.
          </StyledMotionText>
        </StyledHeader>
      </StyledContent>
      <StyledFooter>
        <StyledFooterText>Made By</StyledFooterText>
        <SignatureIcon width={50} height={150} />
      </StyledFooter>
    </StyledContainer>
  );
};

export default Index;

const StyledContainer = styled.div`
  background-color: var(--background);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

const StyledContent = styled.div`
  max-width: 710px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const StyledHeader = styled(motion.div)`
  font-size: 1.8rem;
  color: var(--black);
  line-height: 1.4;
  letter-spacing: -0.2px;
  perspective: 600px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    line-height: 1.3;
    gap: 16px;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const StyledMetaHeader = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  padding-bottom: 15px;
  padding-top: 15px;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const StyledNavText = styled(motion.a)<{ variant?: string }>`
  font-size: 1.2rem;
  font-weight: 450;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  color: ${(props) =>
    props.variant === "staple" ? "var(--info)" : "var(--black)"};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledMotionText = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  overflow: visible;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const StyledInlineContent = styled(motion.div)`
  background: var(--surface);
  color: #fff;
  border-radius: 10px;
  padding: 0 10px;
  width: max-content;
  display: flex;
  align-items: center;
  height: 34px;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (min-height: 700px) {
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const StyledFooterText = styled.div`
  color: var(--info);
  font-size: 14px;
`;

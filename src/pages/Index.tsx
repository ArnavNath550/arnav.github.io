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
      y: 50,
      rotateX: 30,
    },
    visible: {
      opacity: 1,
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
            <span>I am</span>, in love with creating{" "}
            <StyledInlineContent>
              <motion.div variants={iconVariants}>
                <CircularIcon width={28} height={28} />
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
                <EyeIcon width={58} height={58} />
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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledContent = styled.div`
  max-width: 710px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledHeader = styled(motion.div)`
  font-size: 1.8rem;
  color: var(--black);
  line-height: 40px;
  letter-spacing: -0.2px;
  perspective: 600px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledMetaHeader = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  padding-bottom: 15px;
  padding-top: 15px;
`;

const StyledNavText = styled(motion.a)<{ variant?: string }>`
  font-size: 1.5rem;
  font-weight: 450;
  cursor: pointer;
  display: inline-block;
  color: ${(props) =>
    props.variant === "staple" ? "var(--info)" : "var(--black)"};
`;

const StyledMotionText = styled(motion.div)`
  display: flex;
  gap: 8px;
  align-items: center;
  overflow: hidden;
`;

const StyledInlineContent = styled(motion.div)`
  background: var(--surface);
  color: #fff;
  border-radius: 10px;
  padding-left: 12px;
  width: max-content;
  padding-right: 12px;
  display: flex;
  align-items: center;
  height: 38px;
  overflow: hidden;
`;

const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const StyledFooterText = styled.div`
  color: var(--info);
  font-size: 15px;
`;

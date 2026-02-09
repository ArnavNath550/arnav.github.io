import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <StyledContainer
      as={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <StyledGroupContainer>
        <StyledGroup as={motion.div} variants={itemVariants}>
          <StyledName>Arnav Nath</StyledName>
          <StyledMetaText>Software Craftsman</StyledMetaText>
        </StyledGroup>

        <StyledGroupLarge>
          <StyledText as={motion.div} variants={itemVariants}>
            I am currently the founder of{" "}
            <StyledLink href="https://thecircular.app">Circular</StyledLink>, a
            beautiful calendar app for your work.
          </StyledText>
          <StyledText as={motion.div} variants={itemVariants}>
            I’ve been a Software Craftsman for 10+ years now, and love the art
            of bringing memorable interfaces to life.
          </StyledText>
          <StyledText as={motion.div} variants={itemVariants}>
            I also craft experiments on the web such as{" "}
            <StyledLink href="https://neatbuttons.vercel.app">
              NeatButtons
            </StyledLink>
            .
          </StyledText>
        </StyledGroupLarge>
      </StyledGroupContainer>

      <StyledHorizontalGroup as={motion.div} variants={itemVariants}>
        <StyledLink href="https://x.com/iamjhaadhoo">X</StyledLink>
        <StyledLink href="mailto:arnavnath55@gmail.com">
          arnavnath55@gmail.com
        </StyledLink>
      </StyledHorizontalGroup>
    </StyledContainer>
  );
};

export default Index;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 24px;
`;

const StyledGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 450px;
  width: 100%;
`;

const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledGroupLarge = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const StyledName = styled.div`
  font-size: clamp(1rem, 4vw, 1.1rem);
  font-weight: 480;
  color: var(--black, #000);
`;

const StyledText = styled.div`
  font-size: clamp(1rem, 4vw, 1.1rem);
  font-weight: 450;
  color: var(--black, #000);
  line-height: 1.55;
`;

const StyledMetaText = styled.div`
  font-size: clamp(0.9rem, 3.5vw, 1rem);
  font-weight: 400;
  color: var(--info, #666);
`;

const StyledLink = styled.a`
  text-decoration: none;
  background-image: linear-gradient(
    var(--infoLighter, #ccc),
    var(--infoLighter, #ccc)
  );
  &:hover {
    background-image: linear-gradient(var(--info, #666), var(--info, #666));
  }
  transition: ease 0.1s all;
  background-size: 100% 1px;
  background-position: left bottom;
  background-repeat: no-repeat;
  color: var(--black, #000);
  font-weight: 480;
`;

const StyledHorizontalGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 450px;
  font-size: clamp(0.9rem, 3.5vw, 1rem);
`;

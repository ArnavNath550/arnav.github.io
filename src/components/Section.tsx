import * as React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const Section: React.FC<Props> = (props: Props) => {
  return <StyledSection>{props.children}</StyledSection>;
};

export default Section;

const StyledSection = styled(motion.div)`
  padding-top: 50px;
  padding-bottom: 50px;
`;

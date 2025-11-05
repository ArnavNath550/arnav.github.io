import * as React from "react";
import styled from "styled-components";
import PageHeading from "../components/PageHeading";

const Craft: React.FC = () => {
  return (
    <Container>
      <PageHeading />
    </Container>
  );
};

export default Craft;

const Container = styled.div`
  width: 550px;
  margin: 0 auto;
  margin-top: 8rem;
`;

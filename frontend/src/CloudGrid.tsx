import React, { useState } from "react";
import { Cloud } from "./api/models";
import Table from "./components/Table/Table";
import styled from "styled-components";
const CloudGrid = (props: { platforms: Array<Cloud> }) => {
  return (
    <Container>
      <Table data={props.platforms} />
    </Container>
  );
};

const Container = styled.div`
  margin: 50px;
`;

export default CloudGrid;

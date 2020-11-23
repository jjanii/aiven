import React from "react";
import styled from "styled-components";

const TableHeader = (props: {
  headers: Array<{ label: string; value: string }>;
  sortBy: (name: string) => void;
}) => {
  return (
    <thead>
      <tr>
        {props.headers.map(entry => (
          <StyledTh onClick={() => props.sortBy(entry.value)}>
            {entry.label}
          </StyledTh>
        ))}
      </tr>
    </thead>
  );
};

const StyledTh = styled.th`
  cursor: pointer;
`;

export default TableHeader;

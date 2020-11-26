import React from 'react';

const TableRow = (props: { key: number; data: Array<string | number> }) => (
  <tr data-cy="TableRow" key={props.key}>
    {props.data.map(cell => (
      <td key={cell}>{cell}</td>
    ))}
  </tr>
);

export default TableRow;

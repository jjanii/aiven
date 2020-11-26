import React from 'react';

const TableRow = (props: { data: Array<string | number> }) => {
  const { data } = props;
  return (
    <tr data-cy="TableRow" key={data[1]}>
      {props.data.map(cell => (
        <td key={cell}>{cell}</td>
      ))}
    </tr>
  );
};

export default TableRow;

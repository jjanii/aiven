import React from 'react';

const TableRow = (props: { data: Array<string | number> }) => {
  const { data } = props;
  return (
    <tr key={data[1]}>
      {props.data.map(cell => (
        <td key={cell}>{cell}</td>
      ))}
    </tr>
  );
};

export default TableRow;

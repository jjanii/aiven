import React from 'react';
import Table from 'react-bootstrap/Table';

import { Cloud } from 'api/models';

const GenericTable = (props: {
  headers: Array<{ label: string; value: string }>;
  rows: Array<Cloud>;
  rowRenderer: (arg0: Cloud) => Array<string | number>;
  sortBy: (arg0: string) => void;
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {props.headers.map(entry => (
            <th
              title={`Click to sort by ${entry.label}`}
              key={entry.label}
              onClick={() => props.sortBy(entry.value)}
              style={{ cursor: 'pointer' }}
            >
              {entry.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, rowIndex) => (
          <tr data-cy="TableRow" key={rowIndex}>
            {props.rowRenderer(row).map(cell => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GenericTable;

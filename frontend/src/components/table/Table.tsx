import React from 'react';
import Table from 'react-bootstrap/Table';

type Props<T> = {
  headers: Array<{ label: string; value: string }>;
  rows: Array<T>;
  rowRenderer: (row: T) => Array<string | number>;
  getRowKey: (rowIndex: number) => string;
  sortBy: (key: string) => void;
};

const GenericTable = <T,>(props: Props<T>) => {
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
          <tr data-cy="TableRow" key={props.getRowKey(rowIndex)}>
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

import React from 'react';

const TableHeader = (props: {
  headers: Array<{ label: string; value: string }>;
  sortBy: (name: string) => void;
}) => {
  return (
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
  );
};

export default TableHeader;

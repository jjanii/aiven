import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import orderBy from 'lodash/orderBy';

import TableRow from './TableRow';
import TableHeader from './TableHeader';

import { Cloud } from 'api/models';

const CloudTable = (props: { data: Array<Cloud> }) => {
  const [orderState, setOrderState] = useState<{
    name: string;
    order?: string;
  }>({
    name: '',
    order: undefined,
  });

  const [orderedData, setOrderedData] = useState<Array<Cloud>>(props.data);

  useEffect(() => {
    setOrderedData(props.data);
    setOrderState({ name: '', order: undefined });
  }, [props.data]);

  const sortBy = (name: string): void => {
    const order =
      orderState.name !== name
        ? 'asc'
        : orderState.order === 'asc'
        ? 'desc'
        : orderState.order === 'desc'
        ? undefined
        : 'asc';

    if (order) {
      const sorted = orderBy(props.data, name, order);
      setOrderedData(sorted);
    } else {
      setOrderedData(props.data);
    }
    setOrderState({ name, order });
  };

  return (
    <Table striped bordered hover>
      <TableHeader
        headers={[
          { label: 'Cloud name', value: 'cloudName' },
          { label: 'Cloud Description', value: 'cloudDescription' },
          { label: 'Region', value: 'geoRegion' },
          { label: 'Distance (km)', value: 'distance' },
        ]}
        sortBy={sortBy}
      />
      <tbody>
        {orderedData.map((entry, i) => (
          <TableRow key={i} data={entry} />
        ))}
      </tbody>
    </Table>
  );
};

export default CloudTable;

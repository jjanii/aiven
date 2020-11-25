import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import orderBy from 'lodash/orderBy';

import TableRow from './TableRow';
import TableHeader from './TableHeader';

import { Cloud } from 'api/models';

import { sortByDistance } from 'helpers/sortByDistance';

const CloudTable = (props: {
  data: Array<Cloud>;
  distancesToClouds: { [cloudName: string]: number };
}) => {
  const [sortState, setSortState] = useState<{
    name: string;
    order?: string;
  }>({
    name: '',
    order: undefined,
  });

  const [sortedData, setSortedData] = useState<Array<Cloud>>(props.data);
  const [sortedDistances, setSortedDistances] = useState<{
    [cloudName: string]: number;
  }>(props.distancesToClouds);

  useEffect(() => {
    setSortedData(props.data);
    setSortState({ name: '', order: undefined });
  }, [props.data]);

  useEffect(() => {
    setSortedDistances(props.distancesToClouds);
    setSortState({ name: '', order: undefined });
  }, [props.distancesToClouds]);

  const sortBy = (name: string): void => {
    const order =
      sortState.name !== name
        ? 'asc'
        : sortState.order === 'asc'
        ? 'desc'
        : sortState.order === 'desc'
        ? 'asc'
        : 'asc';

    if (name !== 'distance') {
      const sortedData = orderBy(props.data, name, order);
      setSortedData(sortedData);
    } else {
      const { sortedDistances, sortedData } = sortByDistance(
        props.data,
        props.distancesToClouds,
        order,
      );

      setSortedDistances(sortedDistances);
      setSortedData(sortedData);
    }

    setSortState({ name, order });
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
        {sortedData.map((entry, i) => (
          <TableRow
            key={i}
            data={[
              entry.cloudName,
              entry.cloudDescription || '',
              entry.geoRegion,
              sortedDistances[entry.cloudName],
            ]}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default CloudTable;

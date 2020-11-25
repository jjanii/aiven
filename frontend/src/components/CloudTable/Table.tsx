import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import orderBy from 'lodash/orderBy';

import TableRow from './TableRow';
import TableHeader from './TableHeader';

import { Cloud } from 'api/models';

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
  }, [props.distancesToClouds]);

  const sortBy = (name: string): void => {
    const order =
      sortState.name !== name
        ? 'asc'
        : sortState.order === 'asc'
        ? 'desc'
        : sortState.order === 'desc'
        ? undefined
        : 'asc';

    if (order) {
      let sortedData;
      if (name !== 'distance') {
        sortedData = orderBy(props.data, name, order);
      } else {
        // Sort key:val distances first in distances object
        const sortedDistances = Object.fromEntries(
          Object.entries(props.distancesToClouds).sort(([, a], [, b]) =>
            order === 'asc' ? a - b : b - a,
          ),
        );

        // then sort rest of the data based on the order of keys in sortedDistances
        // key:val object
        sortedData = props.data.sort((a, b) => {
          if (
            Object.keys(sortedDistances).indexOf(a.cloudName) >
            Object.keys(sortedDistances).indexOf(b.cloudName)
          ) {
            return 1;
          } else {
            return -1;
          }
        });
        setSortedDistances(sortedDistances);
      }
      setSortedData(sortedData);
    } else {
      console.log(props.distancesToClouds);
      setSortedDistances(props.distancesToClouds);
      setSortedData(props.data);
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

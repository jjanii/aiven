import React from 'react';
import { Cloud } from 'api/models';
import capitalize from 'lodash/capitalize';

const TableRow = (props: { data: Cloud }) => {
  const { data } = props;
  return (
    <tr key={data.cloudName}>
      <td>{data.cloudName}</td>
      <td>{data.cloudDescription}</td>
      <td>{capitalize(data.geoRegion)}</td>
      <td>{data.distance}</td>
    </tr>
  );
};

export default TableRow;

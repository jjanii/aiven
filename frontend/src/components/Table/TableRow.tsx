import React from "react";
import { Cloud } from "../../api/models";
import capitalize from "lodash/capitalize";
const TableRow = (props: { data: Array<Cloud> }) => {
  return (
    <tbody>
      {props.data.map(entry => (
        <tr key={entry.cloudName}>
          <td>{entry.cloudName}</td>
          <td>{entry.cloudDescription}</td>
          <td>{capitalize(entry.geoRegion)}</td>
          <td>{entry.distance}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableRow;

import React, { useState } from "react";
import { Cloud } from "../../api/models";
import Table from "react-bootstrap/Table";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

import orderBy from "lodash/orderBy";

const CloudTable = (props: { data: Array<Cloud> }) => {
  const [orderState, setOrderState] = useState<{
    name: string;
    order?: string;
  }>({
    name: "",
    order: undefined
  });
  const [orderedData, setOrderedData] = useState<Array<Cloud> | undefined>(
    undefined
  );
  const { data } = props;
  const sortBy = (name: string) => {
    const order =
      orderState.name !== name
        ? "asc"
        : orderState.order === "asc"
        ? "desc"
        : orderState.order === "desc"
        ? undefined
        : "asc";

    if (order) {
      const sorted = orderBy(data, name, order);
      setOrderedData(sorted);
    } else {
      setOrderedData(undefined);
    }
    setOrderState({ name, order });
  };

  return (
    <Table striped bordered hover>
      <TableHeader
        headers={[
          { label: "Cloud name", value: "cloudName" },
          { label: "Cloud Description", value: "cloudDescription" },
          { label: "Region", value: "geoRegion" }
        ]}
        sortBy={sortBy}
      />
      <TableRow data={orderedData || data} />
    </Table>
  );
};

export default CloudTable;

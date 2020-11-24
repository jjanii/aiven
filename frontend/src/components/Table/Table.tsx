import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import orderBy from "lodash/orderBy";
import isEqual from "lodash/isEqual";

import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

import { Cloud } from "../../api/models";

const CloudTable = (props: { data: Array<Cloud> }) => {
  const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const [orderState, setOrderState] = useState<{
    name: string;
    order?: string;
  }>({
    name: "",
    order: undefined
  });

  const [orderedData, setOrderedData] = useState<Array<Cloud>>(props.data);

  const prevData = usePrevious(props.data);
  useEffect(() => {
    if (!isEqual(prevData, props.data)) {
      setOrderedData(props.data);
      setOrderState({ name: "", order: undefined });
    }
  }, [prevData, props.data]);

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
      setOrderedData(props.data);
    }
    setOrderState({ name, order });
  };

  return (
    <Table striped bordered hover>
      <TableHeader
        headers={[
          { label: "Cloud name", value: "cloudName" },
          { label: "Cloud Description", value: "cloudDescription" },
          { label: "Region", value: "geoRegion" },
          { label: "Distance (km)", value: "distance" }
        ]}
        sortBy={sortBy}
      />
      <TableRow data={orderedData} />
    </Table>
  );
};

export default CloudTable;

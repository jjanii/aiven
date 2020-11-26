import React from 'react';
import Table from 'react-bootstrap/Table';

const GenericTable = (props: { children: React.ReactNode }) => {
  return (
    <Table striped bordered hover>
      {props.children}
    </Table>
  );
};

export default GenericTable;

import React from "react";
import Table from "react-bootstrap/Table";

export const ProvideNumberFiletoExport = ({
  ProvideNumberFiletoExport,
}: {
  ProvideNumberFiletoExport: Array<object> | any;
}) => {
  const ProvideNumbersRow = (ProvideNumbers: any, index: number) => {
    return (
      <tr key={index} className="even">
        <td> {index + 1} </td>
        <td>{ProvideNumbers.firstName}</td>
        <td>{ProvideNumbers.lastName}</td>
        <td>{ProvideNumbers.email}</td>
        <td>{ProvideNumbers.address}</td>
        <td>{ProvideNumbers.zipcode}</td>
      </tr>
    );
  };

  const ProvideNumbersTable = ProvideNumberFiletoExport.map(
    (cust: object, index: number) => ProvideNumbersRow(cust, index)
  );

  const tableHeader = (
    <thead className="bgvi">
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Zipcode</th>
      </tr>
    </thead>
  );

  return (
    <Table striped bordered hover>
      {tableHeader}
      <tbody>{ProvideNumbersTable}</tbody>
    </Table>
  );
};

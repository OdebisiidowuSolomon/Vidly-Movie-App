import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

export default function Table({ sortColumn, onSort, data, columns }) {
  console.log(data);
  return (
    <table className="table table-hover">
      <TableHeader sortColumn={sortColumn} onSort={onSort} columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

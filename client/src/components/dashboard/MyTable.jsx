import React from "react";
import { useTable } from "react-table";
import "./MyTableStyles.css";
import { MdDeleteForever } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import LoadingRecords from "./LoadingRecords";
const MyTable = ({ columns, data, onDelete, onEdit, loading }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{ width: "82%", margin: "30px auto", height: "300px" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            <th style={{ width: "100px" }}>Action</th>
          </tr>
        ))}
      </thead>
      {loading ? (
        <LoadingRecords />
      ) : (
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                <td>
                  <div className='action-buttons'>
                    <button onClick={() => onEdit(row.original)}>
                      <LiaEdit />
                    </button>
                    <button onClick={() => onDelete(row.original)}>
                      <MdDeleteForever />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
};
export default MyTable;

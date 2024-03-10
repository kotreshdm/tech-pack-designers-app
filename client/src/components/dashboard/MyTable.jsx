import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import "./MyTableStyles.css";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineFolderView } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import LoadingRecords from "./LoadingRecords";
import { Banner, Button, Label, Pagination, TextInput } from "flowbite-react";
import { useDashboardContext } from "../../context/DashboardContext";
const MyTable = ({
  addNewRecord,
  columns,
  currentPage,
  data,
  loading,
  onDelete,
  onEdit,
  onView,
  setCurrentPage,
  tableHeader,
  refreshData,
}) => {
  const { perPageRecords } = useDashboardContext();
  const [pageSize, setPageSize] = perPageRecords;

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const onPageChange = (page) => setCurrentPage(page);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } =
    useTable({ columns, data }, usePagination);
  return (
    <div className='container mx-auto'>
      <div className='table-header'>
        <Banner>
          <div className='flex w-full items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700'>
            <div className='flex w-full items-center'>
              <div className='flex-shrink-0'>{tableHeader}</div>
              <div className='ml-auto flex'>
                {addNewRecord && <Button onClick={addNewRecord}>Add</Button>}
                {refreshData && (
                  <Button onClick={refreshData} className='ml-2'>
                    Refresh
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Banner>
      </div>
      <div
        className='grid grid-cols-1 gap-4'
        style={{
          maxWidth: "90%",
          overflow: "scroll",
          margin: "20px auto",
          height: "320px",
          overflowX: "auto",
        }}
      >
        <div>
          <table {...getTableProps()} className='container mx-auto'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <th style={{ width: "100px" }}>SL No</th>

                  {headerGroup.headers.map((column) => (
                    <th style={{ width: "100px" }} {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                  <th style={{ width: "100px" }}>Action</th>
                </tr>
              ))}
            </thead>
            {loading ? (
              <LoadingRecords />
            ) : (
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  const serialNumber = index + 1;
                  if (index >= startIndex && index < endIndex) {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        <td>{serialNumber}</td>
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className='truncate max-w-xs'
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                        <td>
                          <div className='action-buttons'>
                            {onView && (
                              <button onClick={() => onView(row.original)}>
                                <AiOutlineFolderView />
                              </button>
                            )}
                            {onEdit && (
                              <button onClick={() => onEdit(row.original)}>
                                <LiaEdit />
                              </button>
                            )}
                            {onDelete && (
                              <button onClick={() => onDelete(row.original)}>
                                <MdDeleteForever />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <div className='pagination'>
        <div className='flex overflow-x-auto sm:justify-center'>
          <Pagination
            layout='pagination'
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            previousLabel='Go back'
            nextLabel='Go forward'
            showIcons
          />
        </div>
      </div>
      <div className='pagination'>
        <div className='flex overflow-x-auto sm:justify-center'>
          <div>
            Displaying {startIndex + 1} to {endIndex} of {totalItems}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyTable;

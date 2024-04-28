import { Banner, Tooltip } from "flowbite-react";
import React from "react";
import { FcAddImage, FcSynchronize } from "react-icons/fc";

const TableHeader = ({ addNewRecord, refreshData, tableHeader }) => {
  return (
    <div className='table-header'>
      <Banner>
        <div className='flex w-full items-center justify-between bg-gray-50 p-3 mt-4 dark:border-gray-600 dark:bg-gray-700'>
          <div className='flex w-full items-center'>
            <div className='flex-shrink-0'>{tableHeader}</div>
            <div className='ml-auto flex'>
              {addNewRecord && (
                <Tooltip content='Add new' placement='bottom'>
                  <button className='ml-5' onClick={addNewRecord}>
                    <FcAddImage />
                  </button>
                </Tooltip>
              )}
              {refreshData && (
                <Tooltip content='Refresh' placement='bottom'>
                  <button className='ml-5' onClick={refreshData}>
                    <FcSynchronize />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </Banner>
    </div>
  );
};

export default TableHeader;

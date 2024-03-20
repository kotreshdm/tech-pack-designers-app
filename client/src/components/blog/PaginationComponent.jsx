import { Pagination } from "flowbite-react";
import React from "react";

export default function PaginationComponent({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const onPageChange = (page) => setCurrentPage(page);

  return (
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
  );
}

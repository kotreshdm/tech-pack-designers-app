import { Button, Modal } from "flowbite-react";
import React from "react";
const ViewCategoryModel = ({ closeModel, selectedData }) => {
  return (
    <>
      <Modal.Header className='m-2 text-lg text-gray-500 dark:text-gray-400'>
        {selectedData.name} Details
      </Modal.Header>
      <Modal.Body>
        <div className=''>
          <div className='flex items-center'>
            <div className='mr-5'>
              {selectedData.catBanner && (
                <img
                  src={selectedData.catBanner}
                  alt='profilepic'
                  width='100px'
                />
              )}
            </div>
            <div>
              <p className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Id : {selectedData.categoryId}
              </p>
              <h3 className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Slug : {selectedData.slug}
              </h3>
              <h3 className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Description : {selectedData.description}
              </h3>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ViewCategoryModel;

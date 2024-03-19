import { Button, Modal } from "flowbite-react";
import React from "react";
const ViewPostModel = ({ closeModel, selectedData }) => {
  return (
    <>
      <Modal.Header className='m-2 text-lg text-gray-500 dark:text-gray-400'>
        {selectedData.postName} Details
      </Modal.Header>
      <Modal.Body>
        <div className=''>
          <div className='flex items-center'>
            <div className='mr-5'>
              {selectedData.bannerImage && (
                <img
                  src={selectedData.bannerImage}
                  alt='profilepic'
                  width='100px'
                />
              )}
            </div>
            <div>
              <p className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Id : {selectedData.postId}
              </p>
              <h3 className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Slug : {selectedData.postSlug}
              </h3>
              <h3 className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Description :
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedData.postDescription,
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ViewPostModel;

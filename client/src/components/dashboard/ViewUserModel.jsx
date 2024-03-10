import { Button, Modal } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const ViewUserModel = ({ closeModel, selectedData }) => {
  return (
    <>
      <Modal.Header className='m-2 text-lg text-gray-500 dark:text-gray-400'>
        User Details
      </Modal.Header>
      <Modal.Body>
        <div className=''>
          <div className='flex items-center'>
            <div className='mr-5'>
              <img
                src={selectedData.profilePicture}
                alt='profilepic'
                width='100px'
              />
            </div>
            <div>
              <p className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Id : {selectedData.userId}
              </p>
              <h3 className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Name : {selectedData.userName}
              </h3>
              <h3 className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Email : {selectedData.email}
              </h3>
              <h3 className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
                Is Admin : {selectedData.isAdmin ? "True" : "False"}
              </h3>
            </div>
          </div>
          <div className='flex justify-center gap-4'>
            <Button color='gray' onClick={closeModel}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ViewUserModel;

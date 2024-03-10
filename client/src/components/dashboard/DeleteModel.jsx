import { Button, Modal } from "flowbite-react";
import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const DeleteModel = ({ closeModel, handleSubmit }) => {
  return (
    <>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
          <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
            Are you sure you want to delete this record?
          </h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleSubmit}>
              Yes, I'm sure
            </Button>
            <Button color='gray' onClick={closeModel}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default DeleteModel;

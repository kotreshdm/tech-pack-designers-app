import { Modal } from "flowbite-react";
import { Spinner } from "flowbite-react";
const LoadingRecords = () => {
  return (
    <Modal show={true}>
      <Modal.Body className='m-auto p-40'>
        <Spinner aria-label='Extra large spinner example' size='xl' />
      </Modal.Body>
    </Modal>
  );
};

export default LoadingRecords;

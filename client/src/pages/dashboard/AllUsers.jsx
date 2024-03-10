import React, { useEffect, useState } from "react";
import MyTable from "../../components/dashboard/MyTable";
import { deleteUserAPI, getAllUsersAPI } from "./apiConfig/AllUsers";
import { useDashboardContext } from "../../context/DashboardContext";
import DeleteModel from "../../components/dashboard/DeleteModel";
import { Alert, Modal } from "flowbite-react";
import ViewUserModel from "../../components/dashboard/ViewUserModel";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { allUserData, allUsersCurrentPageNo } = useDashboardContext();
  const [allUsers, setAllUsers] = allUserData;
  const [allUsersCurrentPage, setAllUsersCurrentPage] = allUsersCurrentPageNo;
  const [loading, setLoading] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [apiError, setApiError] = useState(null);
  useEffect(() => {
    if (allUsers.length === 0) {
      getAllUsers();
    }
  }, []);
  const getAllUsers = async () => {
    setLoading(true);
    await getAllUsersAPI().then((response) => {
      if (response.status === 200) {
        setAllUsers(response.data);
      } else {
        console.log(response.message);
      }
    });
    setLoading(false);
  };
  const columns = [
    { Header: "User Id", accessor: "userId" },
    { Header: "User Name", accessor: "userName" },
    { Header: "Email", accessor: "email" },
    { Header: "Is Admin", accessor: "isAdmin" },
  ];

  const handleDelete = (item) => {
    setDeleteData(true);
    setSelectedData(item);
  };
  const handleDleteUser = async () => {
    await deleteUserAPI(selectedData.userId).then((response) => {
      console.log(response);
      if (response.status === 200) {
        getAllUsers();
        toast.success(`${selectedData.userName} deleted successfully !!! `);
      } else {
        toast.error(response.message.sqlMessage);
      }
      setDeleteData(false);
    });
    setSelectedData({});
  };
  const handleView = (item) => {
    setViewData(true);
    setSelectedData(item);
  };

  return (
    <div className='container grid grid-cols-1 gap-0'>
      <div
        className='container mx-auto'
        style={{
          maxWidth: "90%",
        }}
      >
        {apiError && (
          <Alert className='mt-5' color='failure'>
            {apiError}
          </Alert>
        )}
      </div>
      <div>
        <MyTable
          columns={columns}
          currentPage={allUsersCurrentPage}
          data={allUsers}
          loading={loading}
          onDelete={handleDelete}
          onView={handleView}
          setCurrentPage={setAllUsersCurrentPage}
          tableHeader={"User Data"}
          refreshData={getAllUsers}
        />
      </div>

      <Modal
        show={deleteData}
        onClose={() => setDeleteData(false)}
        popup
        size='md'
      >
        <DeleteModel
          handleSubmit={handleDleteUser}
          closeModel={() => setDeleteData(false)}
        />
      </Modal>
      <Modal
        show={viewData}
        onClose={() => setViewData(false)}
        popup
        class='m-auto w-1/2 h-3/4'
      >
        <ViewUserModel
          selectedData={selectedData}
          closeModel={() => setViewData(false)}
        />
      </Modal>
    </div>
  );
};

export default AllUsers;

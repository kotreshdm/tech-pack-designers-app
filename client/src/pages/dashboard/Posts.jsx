import React, { useEffect, useState } from "react";
import MyTable from "../../components/dashboard/MyTable";
import { useDashboardContext } from "../../context/DashboardContext";
import DeleteModel from "../../components/dashboard/DeleteModel";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import {
  deletePostAPI,
  getAllPostsAPI,
} from "../../components/dashboard/apiConfig/postAPIConfig";
import AddPost from "../../components/dashboard/AddPost";
import EditPostDescription from "../../components/dashboard/EditPostDescription";
import TableHeader from "../../components/dashboard/TableHeader";
import ViewPostModel from "../../components/dashboard/ViewPostModel";

const Posts = () => {
  const { allPosts, postCurrentPageNo, postFilter } = useDashboardContext();
  const [posts, setPosts] = allPosts;
  const [postsCurrentPage, setPostsCurrentPage] = postCurrentPageNo;
  const [isAddEditPost, setIsAddEditPost] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [filterPost, setFilterPost] = postFilter;
  useEffect(() => {
    if (posts.length === 0) {
      getAllPosts();
    }
  }, []);
  useEffect(() => {
    console.log();
  }, [posts, filterPost]);
  const getAllPosts = async () => {
    setLoading(true);
    await getAllPostsAPI().then((response) => {
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        toast.error(response.message);
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };
  const columns = [
    // { Header: "Post Id", accessor: "_id" },
    { Header: "Post Name", accessor: "postName" },
    // { Header: "Slug", accessor: "postSlug" },
    // { Header: "Cat Id", accessor: "categoryId" },
    { Header: "Status", accessor: "status" },
  ];
  const addButton = () => {
    setIsAddEditPost(true);
    setSelectedData({});
  };
  const deleteButton = (item) => {
    setDeleteData(true);
    setSelectedData(item);
  };
  const handleDletePost = async () => {
    await deletePostAPI(selectedData._id).then((response) => {
      if (response.status === 200) {
        getAllPosts();
        toast.success(`${selectedData.postName} deleted !!! `);
      } else {
        toast.error(response.message);
      }
      setDeleteData(false);
    });
    setSelectedData({});
  };
  const viewButton = (item) => {
    setViewData(true);
    setSelectedData(item);
  };
  const editButton = (item) => {
    setIsAddEditPost(true);
    setSelectedData(item);
  };
  const editDescriptionButton = (item) => {
    setEditDescription(true);
    setSelectedData(item);
  };
  return (
    <div className='container grid grid-cols-1 gap-0 mt-3'>
      {isAddEditPost ? (
        <AddPost
          selectedData={selectedData}
          backToPost={() => setIsAddEditPost(false)}
          refreshAfterAdd={getAllPosts}
        />
      ) : editDescription ? (
        <EditPostDescription
          selectedData={selectedData}
          backToPost={() => setEditDescription(false)}
          refreshAfterAdd={getAllPosts}
        />
      ) : (
        <>
          <div>
            <TableHeader
              addNewRecord={addButton}
              tableHeader={"Posts"}
              refreshData={getAllPosts}
            />
          </div>
          <div>
            <MyTable
              columns={columns}
              data={posts}
              loading={loading}
              onDelete={deleteButton}
              onEdit={editButton}
              onEditDescription={editDescriptionButton}
              onView={viewButton}
              currentPage={postsCurrentPage}
              setCurrentPage={setPostsCurrentPage}
            />
          </div>
          <div>
            <Modal
              show={deleteData}
              onClose={() => setDeleteData(false)}
              popup
              className='m-auto'>
              <DeleteModel
                handleSubmit={handleDletePost}
                closeModel={() => setDeleteData(false)}
              />
            </Modal>
            <Modal
              show={viewData}
              onClose={() => setViewData(false)}
              popup
              className='m-auto'>
              <ViewPostModel
                selectedData={selectedData}
                closeModel={() => setViewData(false)}
              />
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;

import React, { useEffect, useState } from "react";
import MyTable from "../../components/dashboard/MyTable";
import { useDashboardContext } from "../../context/DashboardContext";
import DeleteModel from "../../components/dashboard/DeleteModel";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { deleteCategoryAPI } from "../../components/dashboard/apiConfig/categoriesAPIConfig";
import ViewCategoryModel from "../../components/dashboard/ViewCategoryModel";
import AddCategoryModel from "../../components/dashboard/AddCategoryModel";
import {
  deletePostAPI,
  getAllPostsAPI,
} from "../../components/dashboard/apiConfig/postAPIConfig";
import AddPost from "../../components/dashboard/AddPost";

const Posts = () => {
  const { allPosts, postCurrentPageNo, postFilter } = useDashboardContext();
  const [posts, setPosts] = allPosts;
  const [postsCurrentPage, setPostsCurrentPage] = postCurrentPageNo;
  const [isAddEditPost, setIsAddEditPost] = useState(true);
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
    setLoading(false);
  };
  const columns = [
    { Header: "Post Id", accessor: "postId" },
    { Header: "Post Name", accessor: "postName" },
    { Header: "Slug", accessor: "postSlug" },
    { Header: "Category Id", accessor: "categoryId" },
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
    await deletePostAPI(selectedData.postId).then((response) => {
      if (response.status === 200) {
        getAllPosts();
        toast.success(`${selectedData.postName} Post successfully !!! `);
      } else {
        toast.error(response.message.sqlMessage);
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
  return (
    <div className='container grid grid-cols-1 gap-0 mt-3'>
      {isAddEditPost ? (
        <AddPost
          selectedData={selectedData}
          backToPost={() => setIsAddEditPost(false)}
          refreshAfterAdd={getAllPosts}
        />
      ) : (
        <>
          <div>
            <MyTable
              addNewRecord={addButton}
              columns={columns}
              data={posts}
              loading={loading}
              onDelete={deleteButton}
              onEdit={editButton}
              onView={viewButton}
              currentPage={postsCurrentPage}
              setCurrentPage={setPostsCurrentPage}
              tableHeader={"Posts"}
              refreshData={getAllPosts}
            />
          </div>
          <div>
            <Modal
              show={deleteData}
              onClose={() => setDeleteData(false)}
              popup
              className='m-auto'
            >
              <DeleteModel
                handleSubmit={handleDletePost}
                closeModel={() => setDeleteData(false)}
              />
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;

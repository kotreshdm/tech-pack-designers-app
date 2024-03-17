import React, { useEffect, useState } from "react";
import MyTable from "../../components/dashboard/MyTable";
import { useDashboardContext } from "../../context/DashboardContext";
import DeleteModel from "../../components/dashboard/DeleteModel";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import {
  deleteCategoryAPI,
  getAllCategoriesAPI,
} from "../../components/dashboard/apiConfig/categoriesAPIConfig";
import ViewCategoryModel from "../../components/dashboard/ViewCategoryModel";
import AddCategoryModel from "../../components/dashboard/AddCategoryModel";
import { getAllPostsAPI } from "../../components/dashboard/apiConfig/postsAPIConfig";

const Category = () => {
  const { allPosts, postCurrentPageNo } = useDashboardContext();
  const [posts, setPosts] = allPosts;
  const [postsCurrentPage, setPostsCurrentPage] = postCurrentPageNo;
  const [loading, setLoading] = useState(false);
  const [addData, setAddData] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  useEffect(() => {
    if (posts.length === 0) {
      getAllPosts();
    }
  }, []);
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
    { Header: "Category Id", accessor: "categoryId" },
    { Header: "Category Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    { Header: "Slug", accessor: "slug" },
  ];
  const addCategoryButton = () => {
    setAddData(true);
    setSelectedData({});
  };
  const deleteButton = (item) => {
    setDeleteData(true);
    setSelectedData(item);
  };
  const handleDletecategory = async () => {
    await deleteCategoryAPI(selectedData.categoryId).then((response) => {
      if (response.status === 200) {
        getAllCategories();
        toast.success(`${selectedData.userName} Category successfully !!! `);
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
    setAddData(true);
    setSelectedData(item);
  };
  return (
    <div className='container grid grid-cols-1 gap-0'>
      <div>
        <MyTable
          addNewRecord={addCategoryButton}
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
    </div>
  );
};

export default Category;

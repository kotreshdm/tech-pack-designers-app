import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import {
  getAllCategoriesAPI,
  getAllPostsAPI,
} from "../../components/blog/BlogAPIConfig";
import { toast } from "react-toastify";
import CategoriesBanner from "../../components/blog/CategoriesBanner";

function Blog() {
  const {
    perPageRecords,
    allCategories,
    allPosts,
    postCurrentPageNo,
    postFilter,
  } = useUserContext();
  const [pageSize, setPageSize] = perPageRecords;
  const [categories, setCategories] = allCategories;
  const [posts, setPosts] = allPosts;
  const [postsCurrentPage, setPostsCurrentPage] = postCurrentPageNo;
  const [filterPost, setFilterPost] = postFilter;
  const [loading, setLoading] = useState(false);
  const [loadingCat, setLoadingCat] = useState(false);
  useEffect(() => {
    getAllCategories(), getAllPosts();
  }, []);
  const getAllCategories = async () => {
    setLoadingCat(true);
    await getAllCategoriesAPI().then((response) => {
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        toast.error(response.message);
      }
    });
    setLoadingCat(false);
  };
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

  return (
    <div>
      <CategoriesBanner categories={categories} />
      {JSON.stringify(posts)} {JSON.stringify(categories)}
    </div>
  );
}

export default Blog;

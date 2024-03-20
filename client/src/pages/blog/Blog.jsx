import React, { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import PaginationComponent from "../../components/blog/PaginationComponent";

function Blog() {
  const {
    perPageRecords,
    allCategories,
    allPosts,
    postCurrentPageNo,
    postFilter,
  } = useUserContext();
  const [pageSize, setPageSize] = perPageRecords;
  const [posts, setPosts] = allPosts;
  const [postsCurrentPage, setPostsCurrentPage] = postCurrentPageNo;
  const [categories, setCategories] = allCategories;
  const [filterPost, setFilterPost] = postFilter;

  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div>
      {/* <DispalyBlog posts={[]} /> */}
      <PaginationComponent
        currentPage={postsCurrentPage}
        setCurrentPage={setPostsCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Blog;

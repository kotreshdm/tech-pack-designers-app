import React, { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import PaginationComponent from "../../components/blog/PaginationComponent";
import DispalyBlog from "../../components/blog/DispalyBlog";

function Blog() {
  const { posts, pageSize, postsCurrentPage, setPostsCurrentPage } =
    useUserContext();

  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div>
      <DispalyBlog posts={posts} />
      <div className='pb-10'>
        <PaginationComponent
          currentPage={postsCurrentPage}
          setCurrentPage={setPostsCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default Blog;

import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import PaginationComponent from "../../components/blog/PaginationComponent";
import DispalyBlog from "../../components/blog/DispalyBlog";

function Blog() {
  const { posts, pageSize, postsCurrentPage, setPostsCurrentPage } =
    useUserContext();
  const [dispalyPost, setDispalyPost] = useState([]);

  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (postsCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  useEffect(() => {
    if (posts) {
      const filterPost = posts.filter(
        (item, index) => index > startIndex - 1 && index < endIndex
      );
      setDispalyPost(filterPost);
    }
  }, [posts, pageSize, postsCurrentPage]);

  return (
    <div>
      <DispalyBlog posts={dispalyPost}/>
      <div className='pb-10'>
        {totalPages > 1 ? (
          <PaginationComponent
            currentPage={postsCurrentPage}
            setCurrentPage={setPostsCurrentPage}
            totalPages={totalPages}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Blog;

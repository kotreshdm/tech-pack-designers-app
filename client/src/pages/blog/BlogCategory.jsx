import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import PaginationComponent from "../../components/blog/PaginationComponent";
import DispalyBlog from "../../components/blog/DispalyBlog";
function BlogCategory() {
  const { slug } = useParams();

  const { posts, pageSize, postsCurrentPage, setPostsCurrentPage } =
    useUserContext();
  const [catPost, setCatPost] = useState([]);
  const [dispalyPost, setDispalyPost] = useState([]);
  const totalItems = catPost.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (postsCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  useEffect(() => {
    if (posts) {
      const filterOnCat = posts.filter((item) => item.categorySlug === slug);
      setCatPost(filterOnCat);
      setPostsCurrentPage(1);
    }
  }, [slug, posts]);
  useEffect(() => {
    if (catPost) {
      const filterPost = catPost.filter(
        (item, index) => index > startIndex - 1 && index < endIndex
      );
      setDispalyPost(filterPost);
    }
  }, [catPost, pageSize, postsCurrentPage]);
  return (
    <div>
      <DispalyBlog posts={dispalyPost} />
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

export default BlogCategory;

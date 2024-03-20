import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import DOMPurify from "dompurify"; // Import dompurify

const BlogDetails = () => {
  const { posts } = useUserContext();
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (slug && posts) {
      const foundPost = posts.find((post) => post.postSlug === slug);
      setPost(foundPost || null);
    }
  }, [slug, posts]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.postName}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.postDescription), // Use DOMPurify.sanitize
        }}
      />
    </div>
  );
};

export default BlogDetails;

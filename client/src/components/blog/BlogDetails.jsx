import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import DOMPurify from "dompurify"; // Import dompurify
import "./BlogDetails.css";
import Loading from "../Loading";
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
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className='details container'>
      <div class='grid grid-cols-2 md:grid-cols-12 '>
        <div class='col-span-3 md:col-span-3 p-4'></div>
        <div class='col-span-9 md:col-span-9 p-4'>
          <p className='dateAuthor'>
            {new Date(post.updatedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            BY <span>{post.userName}</span>
          </p>
          <h2 className='title'>{post.postName}</h2>
        </div>
      </div>
      <div class='grid grid-cols-2 md:grid-cols-12 gap-4 p-10'>
        <div class='col-span-3 md:col-span-3 bg-gray-200 p-4'>Item 1</div>
        <div class='col-span-9 md:col-span-9 p-4'>
          <div
            className='blog-description'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.postDescription), // Use DOMPurify.sanitize
            }}
          />
        </div>
        <div class='col-span-2 md:col-span-2 bg-gray-200 p-4'>Item 3</div>
      </div>
    </div>
  );
};

export default BlogDetails;

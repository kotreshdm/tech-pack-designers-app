import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import DOMPurify from "dompurify";
import "./BlogDetails.css";
import Loading from "../Loading";
import Constants from "../../utils/Constants";
import SharePost from "./SharePost";
import DispalyBlog from "./DispalyBlog";
const BlogDetails = () => {
  const { posts } = useUserContext();
  const [post, setPost] = useState(null);
  const [keepReading, setKeepReading] = useState([]);
  const { slug } = useParams();
  let location = useLocation();
  let url = Constants.baseURL + location.pathname;
  let quote = "";
  let hashtag = "#";
  if (post) {
    quote = post.postName;
    hashtag = "#" + post.postSlug + " #" + post.categorySlug;
  }
  useEffect(() => {
    if (slug && posts.length > 0) {
      const foundPost = posts.find((post) => post.postSlug === slug);
      setPost(foundPost || null);
      let filteredPosts = posts.filter(
        (post) =>
          post.categorySlug === foundPost.categorySlug &&
          post.postId != foundPost.postId
      );
      if (filteredPosts.length === 0) {
        filteredPosts = posts.filter((post) => post.postId != foundPost.postId);
      }
      const shuffledPosts = filteredPosts.sort(() => Math.random() - 0.5);
      const readMore = shuffledPosts.slice(0, 4);
      setKeepReading(readMore);
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
      <div className='grid grid-cols-2 md:grid-cols-12 '>
        <div className='col-span-1 md:col-span-1 p-4'></div>
        <div className='col-span-10 md:col-span-10 p-4'>
          {/* <p className='dateAuthor'>
            {new Date(post.updatedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            BY <span>{post.userName}</span>
          </p> */}
          <h2 className='title'>{post.postName}</h2>
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-12  p-3'>
        <div className='col-span-3 md:col-span-3 p-2'>
          <div className='grid items-center justify-center mb-4 share-scetion'>
            <div className='text-sm text-gray-500 dark:text-white mb-10'>
              <h4> Category :</h4>
              {post.categoryName}
            </div>
            <div className='text-sm text-gray-500 dark:text-white mb-10'>
              <h4> Created By :</h4>
              {post.userName}
            </div>

            <div className='text-sm text-gray-500 dark:text-white mb-10'>
              <h4> Crated At :</h4>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className='text-sm text-gray-500 dark:text-white mb-10'>
              <h4> Last updated :</h4>
              {new Date(post.updatedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className='text-sm text-gray-500 dark:text-white mb-10'>
              <h4>Share on :</h4>
              <SharePost
                url={url}
                quote={quote}
                hashtag={hashtag}
                className='side-bar'
              />
            </div>
          </div>
        </div>
        <div className='col-span-9 md:col-span-9 p-2'>
          <div
            className='blog-description'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.postDescription), // Use DOMPurify.sanitize
            }}
          />
          <div className='share-scetion'>
            <h4>Share On</h4>
          </div>
          <SharePost url={url} quote={quote} hashtag={hashtag} />
        </div>
      </div>
      {keepReading.length ? (
        <div className='grid grid-cols-2 md:grid-cols-12 p-0 keep-reading-container'>
          <div className='col-span-3 md:col-span-1 '></div>
          <div className='col-span-9 md:col-span-11 keep-reading-div'>
            <h2 className='keep-reading'>
              Keep <span> Reading ......</span>
            </h2>
          </div>
          <div className='col-span-3 md:col-span-1 '></div>
          <div className='col-span-9 md:col-span-12 pl-10 '>
            <DispalyBlog posts={keepReading} />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BlogDetails;

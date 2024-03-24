import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { MdReadMore } from "react-icons/md";
import DOMPurify from "dompurify";
import "./BlogDetails.css";
import Loading from "../Loading";
import Constants from "../../utils/Constants";
import SharePost from "./SharePost";
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
    console.log(slug, posts);
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
      const readMore = shuffledPosts.slice(0, 3);
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
              <h4>Share on :</h4>
              <SharePost
                url={url}
                quote={quote}
                hashtag={hashtag}
                className='side-bar'
              />
            </div>
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
            <div className='container grid grid-cols-3 m-auto pb-10'>
              {keepReading.map((post) => (
                <div
                  key={post.postSlug}
                  className='max-w-sm bg-white rounded-lg mt-10 shadow dark:bg-gray-800 dark:border-gray-700 '
                >
                  {post.bannerImage ? (
                    <a href='#'>
                      <img
                        className='rounded-t-lg h-60 m-auto'
                        src={post.bannerImage}
                        alt={post.postSlug}
                      />
                    </a>
                  ) : (
                    <div className='bg-gray-800 rounded-t-lg h-60 dark:bg-gray-800 dark:border-gray-700 noImageDiv flex justify-center items-center'>
                      <p className='text-white p-5'>{post.postName}</p>
                    </div>
                  )}
                  <div className='p-5'>
                    <a href='#'>
                      <h5
                        className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
                        style={{
                          maxHeight: "4.2rem",
                          minHeight: "4.2rem",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {post.postName}
                      </h5>
                    </a>
                    <p
                      className='mb-3 font-normal text-gray-700 dark:text-gray-400'
                      style={{
                        maxHeight: "9rem",
                        minHeight: "9rem",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post.SEODescription}
                    </p>
                    <a
                      href={`${Constants.Navagation.blog}/${post.postSlug}`}
                      className='font-knad inline-flex items-center px-3 py-2 text-sm font-medium text-center  rounded-lg hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      Read more
                      <svg
                        className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 10'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M1 5h12m0 0L9 1m4 4L9 9'
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BlogDetails;

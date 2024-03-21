import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import DOMPurify from "dompurify"; // Import dompurify
import "./BlogDetails.css";
import Loading from "../Loading";
import Constants from "../../utils/Constants";
const BlogDetails = () => {
  const { posts } = useUserContext();
  const [post, setPost] = useState(null);
  const [keepReading, setKeepReading] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    if (slug && posts) {
      const foundPost = posts.find((post) => post.postSlug === slug);
      setPost(foundPost || null);

      const readMore = posts.filter(
        (post) =>
          post.categorySlug === foundPost.categorySlug &&
          post.postId != foundPost.postId
      );
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
        <div className='col-span-3 md:col-span-3 p-4'></div>
        <div className='col-span-9 md:col-span-9 p-4'>
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
      <div className='grid grid-cols-2 md:grid-cols-12  p-3'>
        <div className='col-span-3 md:col-span-3 p-2'></div>
        <div className='col-span-9 md:col-span-9 p-2'>
          <div
            className='blog-description'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.postDescription), // Use DOMPurify.sanitize
            }}
          />
        </div>
        {keepReading.length ? (
          <>
            <div className='col-span-3 md:col-span-3 '></div>
            <div className='col-span-9 md:col-span-9  keep-reading-div'>
              <h2 className='keep-reading'>
                Keep <br /> Reading
              </h2>
            </div>
            <div className='col-span-3 md:col-span-3 '></div>
            <div className='col-span-9 md:col-span-9 '>
              <div className='grid grid-cols-2 md:grid-cols-12  p-3'>
                {keepReading.slice(0, 3).map((post) => (
                  <div className='col-span-4 md:col-span-4 p-2'>
                    <div
                      key={post.postSlug}
                      className='max-w-sm bg-white rounded-lg mt-10 shadow dark:bg-gray-800 dark:border-gray-700 '
                    >
                      {post.bannerImage ? (
                        <a href='#'>
                          <img
                            className='rounded-t-lg h-30 m-auto'
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
                          <h6 className='mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white'>
                            {post.postName}
                          </h6>
                        </a>

                        <a
                          href={`${Constants.Navagation.blog}/${post.postSlug}`}
                          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        >
                          Lets Go
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BlogDetails;

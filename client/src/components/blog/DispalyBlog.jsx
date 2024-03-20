import React from "react";
import Constants from "../../utils/Constants";

const DispalyBlog = ({ posts }) => {
  return (
    <div className='container grid grid-cols-3 m-auto pb-10'>
      {posts.map((post) => (
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
              <h5 classname='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {post.postName}
              </h5>
            </a>
            <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              {post.SEODescription}
            </p>
            <a
              href={`${Constants.Navagation.blog}/${post.postSlug}`}
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Read more
              <svg
                class='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DispalyBlog;

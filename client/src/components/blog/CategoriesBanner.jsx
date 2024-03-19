import { Banner } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const CategoriesBanner = ({ categories }) => {
  return (
    <Banner>
      <div className='flex w-full justify-between p-4 dark:border-gray-600 dark:bg-gray-700 catList'>
        <div className='mx-auto flex items-center'>
          <p className='flex items-center text-sm font-bold  text-gray-500  dark:text-gray-400'>
            {categories.map((cat) => (
              <span key={cat.slug} className='[&_p]:inline'>
                <Link
                  to={`/blogCategory/${cat.slug}`}
                  className='decoration-600 dark:decoration-500 inline font-medium underline decoration-solid underline-offset-2 hover:no-underline dark:text-cyan-900'
                >
                  {cat.name}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </Banner>
  );
};

export default CategoriesBanner;

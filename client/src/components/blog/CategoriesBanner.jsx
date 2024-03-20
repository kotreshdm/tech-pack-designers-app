import { Banner } from "flowbite-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Constants from "../../utils/Constants";
import { useUserContext } from "../../context/UserContext";

const CategoriesBanner = () => {
  const { allCategories } = useUserContext();

  const [categories] = allCategories;
  return (
    <div>
      <Banner>
        <div className='flex w-full justify-between p-4 dark:border-gray-600 dark:bg-gray-700 catList'>
          <div className='mx-auto flex items-center'>
            <p className='flex items-center text-sm font-bold  text-gray-500  dark:text-gray-400'>
              {categories.map((cat) => (
                <span key={cat.slug} className='[&_p]:inline'>
                  <Link
                    to={`${Constants.Navagation.categoty}${cat.slug}`}
                    className='decoration-600 dark:decoration-500 inline font-medium underline decoration-solid underline-offset-2 hover:no-underline'
                  >
                    {cat.name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      </Banner>
      <Outlet />
    </div>
  );
};

export default CategoriesBanner;

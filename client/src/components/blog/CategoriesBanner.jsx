import { Banner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Constants from "../../utils/Constants";
import { useUserContext } from "../../context/UserContext";

const CategoriesBanner = () => {
  const { categories } = useUserContext();
  const [bannerZIndex, setBannerZIndex] = useState(0);
  useEffect(() => {
    // Function to update z-index based on scroll position
    const updateZIndexOnScroll = () => {
      const scrollPosition = window.scrollY;
      const zIndexThreshold = 30;
      const newBannerZIndex = scrollPosition >= zIndexThreshold ? 40 : 0;
      setBannerZIndex(newBannerZIndex);
    };

    // Add scroll event listener to window
    window.addEventListener("scroll", updateZIndexOnScroll);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", updateZIndexOnScroll);
    };
  }, []);
  return (
    <div>
      <Banner
        style={{
          position: "sticky",
          top: "0",
          zIndex: bannerZIndex,
          maxHeight: "99",
        }}
      >
        <div className='flex w-full justify-between p-2 dark:border-gray-600 dark:bg-gray-700 catList'>
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

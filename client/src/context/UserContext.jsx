import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserContextWrapper = ({ children }) => {
  const [pageSize, setPageSize] = useState(9);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsCurrentPage, setPostsCurrentPage] = useState(1);
  const [filterPost, setFilterPost] = useState({});

  return (
    <UserContext.Provider
      value={{
        pageSize,
        setPageSize,
        categories,
        setCategories,
        posts,
        setPosts,
        postsCurrentPage,
        setPostsCurrentPage,
        filterPost,
        setFilterPost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextWrapper;

export function useUserContext() {
  return useContext(UserContext);
}

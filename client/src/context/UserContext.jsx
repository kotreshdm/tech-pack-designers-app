import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserContextWrapper = ({ children }) => {
  const [pageSize, setPageSize] = useState(3);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsCurrentPage, setPostsCurrentPage] = useState(1);
  const [filterPost, setFilterPost] = useState({});

  return (
    <UserContext.Provider
      value={{
        perPageRecords: [pageSize, setPageSize],
        allCategories: [categories, setCategories],
        allPosts: [posts, setPosts],
        postCurrentPageNo: [postsCurrentPage, setPostsCurrentPage],
        postFilter: [filterPost, setFilterPost],
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

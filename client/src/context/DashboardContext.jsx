import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();
const DashboardContextWrapper = ({ children }) => {
  const [pageSize, setPageSize] = useState(10);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersCurrentPage, setAllUsersCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoryCurrentPage, setCategoryCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [postsCurrentPage, setPostsCurrentPage] = useState(1);
  const [filterPost, setFilterPost] = useState({});
  return (
    <DashboardContext.Provider
      value={{
        perPageRecords: [pageSize, setPageSize],
        allUserData: [allUsers, setAllUsers],
        allUsersCurrentPageNo: [allUsersCurrentPage, setAllUsersCurrentPage],
        allCategories: [categories, setCategories],
        categoryCurrentPageNo: [categoryCurrentPage, setCategoryCurrentPage],
        allPosts: [posts, setPosts],
        postCurrentPageNo: [postsCurrentPage, setPostsCurrentPage],
        postFilter: [filterPost, setFilterPost],
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextWrapper;

export function useDashboardContext() {
  return useContext(DashboardContext);
}

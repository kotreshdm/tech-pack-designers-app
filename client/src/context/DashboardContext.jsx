import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext();
const DashboardContextWrapper = ({ children }) => {
  const [pageSize, setPageSize] = useState(10);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersCurrentPage, setAllUsersCurrentPage] = useState(1);
  const [categoryCurrentPage, setCategoryCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  return (
    <DashboardContext.Provider
      value={{
        allUserData: [allUsers, setAllUsers],
        allUsersCurrentPageNo: [allUsersCurrentPage, setAllUsersCurrentPage],
        perPageRecords: [pageSize, setPageSize],
        allCategories: [categories, setCategories],
        categoryCurrentPageNo: [categoryCurrentPage, setCategoryCurrentPage],
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

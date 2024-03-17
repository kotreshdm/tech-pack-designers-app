import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardContextWrapper from "../context/DashboardContext";
import DashboardSidebar from "../components/dashboard/Sidebar";
import Profile from "./dashboard/Profile";
import Category from "./dashboard/Category";
import Posts from "./dashboard/Posts";
import AllUsers from "./dashboard/AllUsers";

import { Unauthorized } from "../components/dashboard/Unauthorized";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get("tab");
  useEffect(() => {
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const isAdmin = currentUser && currentUser.isAdmin;
  return (
    <DashboardContextWrapper>
      <div className='min-h-screen flex flex-col md:flex-row '>
        <div className='md:w-56'>
          <DashboardSidebar tab={tab} />
        </div>

        <div className='md:w-full'>
          {tab === "profile" ? <Profile /> : ""}
          {tab === "users" ? isAdmin ? <AllUsers /> : <Unauthorized /> : ""}
          {tab === "category" ? isAdmin ? <Category /> : <Unauthorized /> : ""}
          {tab === "posts" ? isAdmin ? <Posts /> : <Unauthorized /> : ""}
        </div>
      </div>
    </DashboardContextWrapper>
  );
}

export default Dashboard;

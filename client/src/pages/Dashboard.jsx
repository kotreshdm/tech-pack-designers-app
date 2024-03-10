import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/Sidebar";
import Profile from "./dashboard/Profile";
import DashComments from "./dashboard/DashComments";
import DashPosts from "./dashboard/DashPosts";
import { useSelector } from "react-redux";
import { Unauthorized } from "../components/dashboard/Unauthorized";
import AllUsers from "./dashboard/AllUsers";
import DashboardContextWrapper from "../context/DashboardContext";
import Category from "./dashboard/Category";

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
      <div className='min-h-screen flex flex-col md:flex-row'>
        <div className='md:w-56'>
          <DashboardSidebar tab={tab} />
        </div>
        {tab === "profile" ? <Profile /> : ""}
        {tab === "users" ? isAdmin ? <AllUsers /> : <Unauthorized /> : ""}
        {tab === "category" ? isAdmin ? <Category /> : <Unauthorized /> : ""}
        {/* ////////////////////////////////////////////// */}
        {tab === "posts" ? isAdmin ? <DashPosts /> : <Unauthorized /> : ""}
        {tab === "comments" ? (
          isAdmin ? (
            <DashComments />
          ) : (
            <Unauthorized />
          )
        ) : (
          ""
        )}
        {tab === "dash" ? isAdmin ? <dash /> : <Unauthorized /> : ""}
        {/* {tab === ("profile" || "category") ? "" : <Unauthorized />} */}
      </div>
    </DashboardContextWrapper>
  );
}

export default Dashboard;

import React from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  HiUser,
  HiArrowSmRight,
  HiOutlineMenu,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiOutlineViewGridAdd,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { signOutAPI } from "../../pages/auth/authApiConfig";
const DashboardSidebar = ({ tab }) => {
  const { currentUser } = useSelector((state) => state.user);
  const handleSignout = async () => {
    await signOutAPI().then((response) => {
      if (response.status === 200) {
        dispatch(resetState(response.data));
        navigate(returnUrl);
      }
    });
  };
  return (
    <Sidebar className='w-full md:w-56 min-h-screen fixed'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && currentUser.isAdmin > 0 && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin > 0 && (
            <>
              <Link to='/dashboard?tab=category'>
                <Sidebar.Item
                  active={tab === "category"}
                  icon={HiOutlineMenu}
                  as='div'
                >
                  Category
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=posts'>
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={HiOutlineViewGridAdd}
                  as='div'
                >
                  Posts
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              {/* <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link> */}
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;

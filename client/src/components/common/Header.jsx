import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { resetState } from "../../redux/user/userSlice";
import { signOutAPI } from "../../pages/auth/authApiConfig";
import Constants from "../../utils/Constants";
function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSignout = async () => {
    await signOutAPI().then((response) => {
      if (response.status === 200) {
        dispatch(resetState(response.data));
        navigate("/");
      }
    });
  };
  return (
    <Navbar className='border-b-2 sticky top-0 z-30'>
      <div>
        <Link
          to='/dashboard'
          className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          Dashboard
        </Link>
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/blog"} as={"div"}>
          <Link to={"/blog"}>Posts</Link>
        </Navbar.Link>
      </Navbar.Collapse>

      <div className='flex gap-2 md:order-4'>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
        </Button>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }>
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.userName}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=posts"}>
              <Dropdown.Item>Post</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : null}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}

export default Header;

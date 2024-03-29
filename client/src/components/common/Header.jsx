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

  const navMenu = [
    {
      label: "Home",
      url: Constants.Navagation.home,
    },
    {
      label: "Blog",
      url: Constants.Navagation.blog,
    },
  ];
  const handleSubmit = () => {};
  return (
    <Navbar className='border-b-2 sticky top-0 z-30'>
      <div>
        <Link
          to='/'
          className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          {/* <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Sahand's
        </span> */}
          Blog
        </Link>
      </div>

      <Navbar.Collapse>
        {navMenu.map((menuItem) => (
          <Navbar.Link
            active={path === menuItem.url}
            as={"div"}
            key={menuItem.url}>
            <Link to={menuItem.url}>{menuItem.label}</Link>
          </Navbar.Link>
        ))}
      </Navbar.Collapse>

      <div className='flex gap-2 md:order-4'>
        <form onSubmit={handleSubmit}>
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
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

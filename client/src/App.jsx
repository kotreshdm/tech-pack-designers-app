import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import Header from "./components/common/Header";
import Footer from "./components/Footer";
import { PageNotFound } from "./pages/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Constants from "./utils/Constants";
import Blog from "./pages/blog/Blog";
import BlogCategory from "./pages/blog/BlogCategory";
import CategoriesBanner from "./components/blog/CategoriesBanner";
import { useUserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import {
  getAllCategoriesAPI,
  getAllPostsAPI,
} from "./components/blog/BlogAPIConfig";
import BlogDetails from "./components/blog/BlogDetails";

function App() {
  const { categories, setCategories, setPosts } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [loadingCat, setLoadingCat] = useState(false);
  useEffect(() => {
    getAllCategories(), getAllPosts();
  }, []);

  const getAllCategories = async () => {
    setLoadingCat(true);
    await getAllCategoriesAPI().then((response) => {
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        toast.error(response.message);
      }
    });
    setLoadingCat(false);
  };
  const getAllPosts = async () => {
    setLoading(true);
    await getAllPostsAPI().then((response) => {
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        toast.error(response.message);
      }
    });
    setLoading(false);
  };

  return (
    <BrowserRouter>
      <>
        <ToastContainer
          autoClose={10000}
          position='bottom-left'
          className='toast-container'
          toastClassName='dark-toast'
        />
        <Header />
        <Routes>
          <Route path={Constants.Navagation.home} element={<Home />} />
          <Route element={<CategoriesBanner />}>
            <Route path={Constants.Navagation.blog} element={<Blog />} />
            <Route
              path={`${Constants.Navagation.blog}/:slug`}
              element={<BlogDetails />}
            />
            <Route
              path={`${Constants.Navagation.categoty}:slug`}
              element={<BlogCategory />}
            />
          </Route>
          <Route path={Constants.Navagation.signIn} element={<SignIn />} />

          <Route element={<PrivateRoute />}>
            <Route
              path={Constants.Navagation.dashBoard}
              element={<Dashboard />}
            />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;

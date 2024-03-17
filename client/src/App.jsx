// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import Home from "./pages/Home";
import { About } from "./pages/About";
import SignIn from "./pages/auth/SignIn";
import Search from "./pages/Search";
import Header from "./components/common/Header";
import Footer from "./components/Footer";
import { PageNotFound } from "./pages/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import Constants from "./components/Constants";
import Blog from "./pages/blog/Blog";
// import CreatePost from "./pages/dashboard/CreatePost";
// import UpdatePost from "./pages/dashboard/UpdatePost";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        autoClose={10000}
        position='bottom-left'
        className='toast-container'
        toastClassName='dark-toast'
      />
      <Header />
      {/* <UploadForm /> */}
      <Routes>
        <Route path={Constants.Navagation.home} element={<Home />} />
        <Route path={Constants.Navagation.blog} element={<Blog />} />
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
    </BrowserRouter>
  );
}

export default App;

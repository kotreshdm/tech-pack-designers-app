// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import CreatePost from "./pages/dashboard/CreatePost";
import UpdatePost from "./pages/dashboard/UpdatePost";
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
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

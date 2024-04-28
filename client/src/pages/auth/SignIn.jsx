import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetState,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import { signInAPI } from "./authApiConfig";
import ApiConstants from "../../serviceIntegration/ApiConstants";
// import Oauth from "../components/Oauth";

function SignIn() {
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const [signUpForm, setSignUpForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const returnUrl =
    new URLSearchParams(location.search).get("returnUrl") || "/";

  const changeFrom = () => {
    setSignUpForm(!signUpForm);
    dispatch(resetState());
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields."));
    }
    if (!formData.userName && signUpForm) {
      return dispatch(signInFailure("Please fill out all fields."));
    }
    dispatch(signInStart());
    let url = ApiConstants.user.signIn;
    if (signUpForm) {
      url = ApiConstants.user.signUp;
    }
    await signInAPI({ data: formData, url }).then((response) => {
      if (response.status === 200) {
        dispatch(signInSuccess(response.data));
        navigate(returnUrl);
      } else {
        dispatch(signInFailure(response.message));
      }
    });
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <p className='text-sm mt-5'>
            You can sign in with your email and password or with Google.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            {signUpForm ? (
              <div>
                <Label value='Username' />
                <TextInput
                  type='text'
                  placeholder='Username'
                  id='userName'
                  onChange={handleChange}
                  value={formData.userName}
                />
              </div>
            ) : null}
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : signUpForm ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          {error && (
            <Alert className='mt-5' color='failure'>
              {error}
            </Alert>
          )}
          <div className='flex gap-2 text-sm mt-5'>
            <span>
              {signUpForm ? "Have an account?" : "Dont have an account?"}
            </span>
            <span
              className='text-blue-500 hover:cursor-pointer'
              onClick={() => changeFrom()}
            >
              {signUpForm ? "Sign In" : "Sign Up"}
            </span>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default SignIn;

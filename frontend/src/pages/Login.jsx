import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../redux/api/usersApiSlice";
import { setCredentials } from "../redux/features/auth/authSlice";
import Maskgroup from "../assets/Maskgroup.png";
import QuesLogo from "../assets/QuesLogo.png";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/projects";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isLogin) {
        res = await login({ email, password }).unwrap();
        toast.success("Login successful!");
      } else {
        res = await register({ username: name, email, password }).unwrap();
        toast.success("Registration successful!");
      }
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "An error occurred. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="flex">
      <div
        className="leftsideBanner bg-red h-[100vh] w-[70vw] bg-cover shadow p-20 bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom left, #c854ff, #3a0b63), url(${Maskgroup})`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div>
          <div
            className="headingLogo w-[270px] h-[58px]"
            style={{
              backgroundImage: `url(${QuesLogo})`,
            }}
          ></div>
          <div className="heroText">
            <p className="w-[30vw] text-white font-normal text-[8vh] mt-10">
              Your podcast
            </p>
            <p className="w-[30vw] text-white font-normal text-[8vh] -translate-y-[25%]">
              will no longer
            </p>
            <p className="text-white font-normal text-[8vh] -translate-y-[50%]">
              be just a hobby.
            </p>
            <p className="text-white text-[3vh] font-light -translate-y-[100%]">
              Supercharge Your Distribution
            </p>
            <p className="text-white text-[3vh] font-light -translate-y-[100%]">
              using our AI assistant!
            </p>
          </div>
        </div>
      </div>
      <div className="rightSideLogin flex flex-col w-[30vw]">
        <div className="flex justify-center items-center w-[100%] mt-20 flex-col">
          <div
            className="h-[100px] w-[100px] bg-cover bg-center"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
          <div className="flex justify-center flex-col items-center">
            <p className="text-[4vh] text-[#7E22CE]">Welcome to</p>
            <p className="text-[4vh] -translate-y-[40%] font-semibold text-[#7E22CE]">
              Ques.AI
            </p>
          </div>
        </div>
        <div className="inputSection p-20">
          <form onSubmit={submitHandler}>
            {!isLogin && (
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE]"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE]"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#7E22CE]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isLogin && (
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 text-gray-700 font-normal"
                  >
                    Remember Me
                  </label>
                </div>
                <div>
                  <a href="#" className="text-indigo-500 text-sm">
                    Forgot Password?
                  </a>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#7E22CE] text-[20px] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#64368f] transition-colors duration-300"
              disabled={isLoginLoading || isRegisterLoading}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <div className="flex gap-2 mt-5 justify-center">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              className="text-blue-500 font-semibold"
              onClick={toggleForm}
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

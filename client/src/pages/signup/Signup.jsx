import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
export default function Signup() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, signup } = useSignup();
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    // console.log(inputs);
  };
  const toggleShow = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className=" flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className=" w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className=" text-3xl font-semibold text-center text-gray-300 ">
          Sign Up
          <span className="ml-2 text-blue-500 ">ChatSpace</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className=" text-base label-text ">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className=" w-full input input-bordered h-10 "
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div className=" relative">
            <label className="label p-2">
              <span className=" text-base label-text ">Password</span>
            </label>
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Enter password"
              className=" w-full input input-bordered h-10 "
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
            {showPassword ? (
              <FaRegEyeSlash
                className=" absolute right-4 top-[50px] w-6 h-6  hover:cursor-pointer"
                onClick={toggleShow}
              />
            ) : (
              <FaRegEye
                className=" absolute right-4 top-[50px] w-6 h-6  hover:cursor-pointer"
                onClick={toggleShow}
              />
            )}
          </div>

          <Link to="/login" className=" text-sm  mt-2 inline-block ">
            Already have an account?
            <span className=" text-purple-500 ml-1 hover:text-blue-600">
              Signin
            </span>
          </Link>
          <div>
            <button
              type="submit"
              className=" btn btn-accent btn-block btn-sm mt-2 "
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

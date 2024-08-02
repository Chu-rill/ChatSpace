import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
export default function Signup() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    console.log(inputs);
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
              placeholder="John Doe"
              className=" w-full input input-bordered h-10 "
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className=" text-base label-text ">Email</span>
            </label>
            <input
              type="text"
              placeholder="johndoe@fake.com"
              className=" w-full input input-bordered h-10 "
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className=" text-base label-text ">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className=" w-full input input-bordered h-10 "
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <Link
            to="/login"
            className=" text-sm hover:underline hover:text-blue-600 mt-2 inline-block "
          >
            Already have an account?
          </Link>
          <div>
            <button
              type="submit"
              className=" btn btn-accent btn-block btn-sm mt-2 "
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

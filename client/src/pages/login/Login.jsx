import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className=" flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className=" w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className=" text-3xl font-semibold text-center text-gray-300 ">
          Login
          <span className="ml-2 text-blue-500 ">ChatSpace</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className=" text-base label-text ">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className=" w-full input input-bordered h-10 "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link
            to="/signup"
            className=" text-sm hover:underline hover:text-blue-600 mt-2 inline-block "
          >
            Don't have an account?
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
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

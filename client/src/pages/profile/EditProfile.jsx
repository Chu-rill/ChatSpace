import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function EditProfile() {
  const { authUser } = useAuthContext();
  console.log(authUser);
  return (
    <div className=" w-96 border-r border-slate-500 p-4 flex flex-col ">
      <Link to="/">
        <IoArrowBack className="w-6 h-6" />
      </Link>
      <div className="flex items-center mt-8">
        <img
          src={authUser.profilePicture}
          alt=""
          className={`${
            authUser.profilePicture ===
            "https://api.dicebear.com/9.x/adventurer/svg?seed=Molly"
              ? " w-16 h-16 rounded-full hover:cursor-pointer"
              : "w-14 h-14 rounded-full hover:cursor-pointer"
          }`}
        />
        <div className=" ml-4">
          <h1 className=" mb-2">{authUser.username}</h1>
          <p>{authUser.Bio}</p>
        </div>
      </div>
      <button className=" btn btn-neutral  btn-sm mt-5 w-28 ">
        Edit Profile
      </button>
    </div>
  );
}

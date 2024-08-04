import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function LogoutButton() {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();
  return (
    <div className=" mt-auto flex justify-between items-center px-4 pt-2 ">
      <BiLogOut
        className=" w-6 h-6 text-white cursor-pointer "
        onClick={logout}
      />
      <div
        className={`${
          authUser.profilePicture ===
          "https://api.dicebear.com/9.x/adventurer/svg?seed=Molly"
            ? "w-10 h-10 rounded-full hover:cursor-pointer"
            : "w-8 h-8 rounded-full hover:cursor-pointer"
        }`}
      >
        <Link to="/profile">
          <img
            src={authUser.profilePicture}
            alt="user avatar"
            className=" rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}

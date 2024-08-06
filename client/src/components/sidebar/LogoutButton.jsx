import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
// import {Tooltip as ReactTooltip} from "react-tooltip";
import "../../Tooltip.css"; // Create this CSS file
export default function LogoutButton() {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();
  return (
    <div className="  mt-auto flex justify-between items-center px-4 pt-2 ">
      <div className="w-10 h-10 rounded-full hover:cursor-pointer">
        <div className="tooltip-container w-full h-full">
          <BiLogOut
            className=" w-full h-full text-white cursor-pointer "
            onClick={logout}
          />
          <div className="tooltip">Logout</div>
        </div>
      </div>

      <div className="w-10 h-10 rounded-full hover:cursor-pointer">
        <Link to="/profile">
          <div className="tooltip-container w-full h-full">
            <img
              src={authUser.profilePicture}
              alt="user avatar"
              className=" w-full h-full rounded-full"
            />
            <div className="tooltip">Profile</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

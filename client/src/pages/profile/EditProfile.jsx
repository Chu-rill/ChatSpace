import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";
export default function EditProfile() {
  const { authUser, setAuthUser } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(authUser);

  console.log(authUser);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleUpdate = (updatedUser) => {
    setUserData(updatedUser); // Update authUser with the new values
  };
  return (
    <div className=" w-96 border-r border-slate-500 p-4 flex flex-col ">
      <Link to="/">
        <IoArrowBack className="w-6 h-6" />
      </Link>
      <div className="flex items-center mt-8">
        <img
          src={userData.profilePicture}
          alt=""
          className={`${
            authUser.profilePicture ===
            "https://api.dicebear.com/9.x/adventurer/svg?seed=Molly"
              ? " w-16 h-16 rounded-full hover:cursor-pointer"
              : "w-14 h-14 rounded-full hover:cursor-pointer"
          }`}
        />
        <div className=" ml-4">
          <h1 className=" mb-2">{userData.username}</h1>
          <p>{userData.Bio}</p>
        </div>
      </div>
      {showModal ? <EditModal toggleModal={toggleModal} /> : ""}
      <button
        className=" btn btn-neutral  btn-sm mt-5 w-28 "
        onClick={toggleModal}
      >
        Edit Profile
      </button>
    </div>
  );
}

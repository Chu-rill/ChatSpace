import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import EditModal from "./EditModal";
import useDeleteUser from "../../hooks/useDeleteUser";
import { toast } from "react-hot-toast";
export default function EditProfile() {
  const { authUser, setAuthUser } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(authUser);
  const { deleteUser, loading } = useDeleteUser();

  console.log("User Data:", userData);
  // console.log(authUser);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const handleUpdate = (updatedUser) => {
    setUserData(updatedUser); // Update authUser with the new values
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    // Check if userData and _id are defined
    if (!userData || !userData._id) {
      console.error("User data or user ID is missing");
      toast.error("Unable to delete user. Please try again.");
    }

    try {
      console.log(`to hook ${userData._id}`);
      await deleteUser(userData._id); // Pass user ID to the delete function
      setUserData(null); // Optionally, clear user from context after deletion
      localStorage.removeItem("user");
      toast.success("User deleted successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Failed to delete user:", error);
    }
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
      <div className="flex justify-around">
        <button
          className=" btn btn-neutral  btn-sm mt-5 w-28 "
          onClick={toggleModal}
        >
          Edit Profile
        </button>
        <button
          className=" btn  bg-red-600 btn-sm mt-5 w-32 hover:bg-red-800 "
          onClick={handleDelete}
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
}

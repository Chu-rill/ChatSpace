import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import useEdit from "../../hooks/useEdit";
import { MdEdit } from "react-icons/md";

export default function EditModal({ toggleModal, userdata }) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const { loading, edit } = useEdit();
  const [imageSrc, setImageSrc] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(`READER: ${reader.result}`);
        setImageSrc(reader.result);
        setProfilePicture(reader.result);
        console.log(`Profile Picture Set: ${reader.result}`);
      };
      reader.onerror = (error) => {
        console.error(`FileReader Error: ${error}`);
      };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await edit(username, bio, profilePicture);

    // Optionally, you might want to close the modal after the update
    toggleModal();

    // Reset form fields
    setUsername("");
    setBio("");
    setProfilePicture(""); // Clear profile picture state
    setImageSrc(""); // Clear image source state
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className=" relative w-96 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  ">
        <MdCancel
          className="w-6 h-6 absolute right-5 top-5 cursor-pointer"
          onClick={toggleModal}
        />

        <div className=" relative mt-5">
          <img
            src={imageSrc || userdata}
            className=" w-36 h-36 rounded-full mx-auto"
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Handle file input change
            className="hidden" // Hide the file input
          />
          <label className="btn btn-neutral btn-sm rounded-full w-10 h-10 absolute right-[100px] bottom-0 cursor-pointer">
            <MdEdit className="w-6 h-6" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" // Hide the file input
            />
          </label>
        </div>

        <div className="mt-5">
          <label className="label p-2">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="Edit Username"
            className="w-full input input-bordered h-10"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="label p-2">
            <span className="text-base label-text">Bio</span>
          </label>
          <input
            type="text"
            placeholder="Edit Bio"
            className="w-full input input-bordered h-10"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button
          className="btn btn-neutral btn-sm mt-5 btn-block"
          onClick={handleSubmit}
        >
          {loading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </div>
  );
}

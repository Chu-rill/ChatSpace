import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import useEdit from "../../hooks/useEdit";

export default function EditModal({ toggleModal }) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const { loading, edit } = useEdit();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await edit(username, bio);

    // Optionally, you might want to close the modal after the update
    toggleModal();

    // Reset form fields
    setUsername("");
    setBio("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="relative w-full max-w-md p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
        <MdCancel
          className="w-6 h-6 absolute right-5 top-5 cursor-pointer"
          onClick={toggleModal}
        />
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

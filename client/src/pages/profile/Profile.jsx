import React from "react";
import EditProfile from "./EditProfile";
import MessageContainer from "../../components/messages/MessageContainer";

export default function Profile() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
      <EditProfile />

      <MessageContainer />
    </div>
  );
}

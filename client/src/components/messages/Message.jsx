import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
export default function Message({ message }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const isSender = message.senderId === authUser._id;
  const chatClassName = isSender ? "chat-end" : "chat-start";
  const profilePic = isSender
    ? authUser.profilePicture
    : selectedConversation?.profilePicture;
  const bubbleBgColor = isSender ? "bg-blue-500" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className=" chat-image avatar ">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Tailwind chat bubble" />
        </div>
      </div>
      <div className={` chat-bubble text-white  ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className=" chat-footer opacity-50 text-xs flex gap-1 items-center ">
        12:42
      </div>
    </div>
  );
}

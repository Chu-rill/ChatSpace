import { React, useEffect } from "react";
import Messages from "./Messages";
import MessagesInput from "./MessagesInput";
import { TiMessage } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

export default function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className=" max-w-[600px] p-5 md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className=" bg-slate-500 px-4 py-2 mb-2">
            <span className=" label-text">To:</span>
            <span className=" ml-2 text-gray-900 font-bold">
              {selectedConversation.username}
            </span>
          </div>

          <Messages />
          <MessagesInput />
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.username} ❄ </p>
        <p>Select a chat to start messaging</p>
        <TiMessage className=" text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

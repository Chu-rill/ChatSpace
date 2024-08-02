import React from "react";
import Messages from "./Messages";
import MessagesInput from "./MessagesInput";
export default function MessageContainer() {
  return (
    <div className=" md:min-w-[450px] flex flex-col">
      <>
        {/* Header */}
        <div className=" bg-slate-500 px-4 py-2 mb-2">
          <span className=" label-text">To:</span>
          <span className=" text-gray-900 font-bold">John Doe</span>
        </div>

        <Messages />
        <MessagesInput />
      </>
    </div>
  );
}

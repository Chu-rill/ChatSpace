import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";

export default function Conversations() {
  const { loading, conversations } = useGetConversations();
  console.log(conversations);
  return (
    <div className=" py-2 flex flex-col overflow-auto ">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : null}
    </div>
  );
}

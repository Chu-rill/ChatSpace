import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { FaRegTrashAlt } from "react-icons/fa";
import "../../Tooltip.css";
import useDeleteMessage from "../../hooks/useDeleteMessage";

// export default function Message({ message, onDelete }) {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { authUser } = useAuthContext();
//   const formatedTime = extractTime(message.createdAt);
//   const isSender = message.senderId === authUser._id;
//   const chatClassName = isSender ? "chat-end" : "chat-start";
//   const profilePic = isSender
//     ? authUser.profilePicture
//     : selectedConversation?.profilePicture;
//   const bubbleBgColor = isSender ? "bg-blue-500" : "";
//   const shakeClass = message.shouldShake ? "shake" : "";
//   const { deleteMessage } = useDeleteMessage();

//   const handleDeleteMessage = async () => {
//     await deleteMessage(message._id);
//     if (onDelete) {
//       onDelete(); // Notify the Messages component to refetch
//     }
//   };
//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className=" chat-image avatar ">
//         <div className="w-10 rounded-full">
//           <img src={profilePic} alt="Tailwind chat bubble" />
//         </div>
//       </div>
//       <div
//         className={`container-message chat-bubble text-white  ${bubbleBgColor} ${shakeClass}`}
//       >
//         {message.message}
//         {isSender ? (
//           <FaRegTrashAlt
//             className="delete w-6 h-6 hover:cursor-pointer"
//             onClick={handleDeleteMessage}
//           />
//         ) : (
//           ""
//         )}
//       </div>
//       <div className=" chat-footer opacity-50 text-xs flex gap-1 items-center ">
//         {formatedTime}
//       </div>
//     </div>
//   );
// }

// ---------------------------------------------------------------------------

// export default function Message({ message, onDelete }) {
//   const { selectedConversation } = useConversation();
//   const { authUser } = useAuthContext();
//   const formatedTime = extractTime(message.createdAt);
//   const isSender = message.senderId === authUser._id;
//   const chatClassName = isSender ? "chat-end" : "chat-start";
//   const profilePic = isSender
//     ? authUser.profilePicture
//     : selectedConversation?.profilePicture;
//   const bubbleBgColor = isSender ? "bg-blue-500" : "";
//   const shakeClass = message.shouldShake ? "shake" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className="chat-image avatar">
//         <div className="w-10 rounded-full">
//           <img src={profilePic} alt="Tailwind chat bubble" />
//         </div>
//       </div>
//       <div
//         className={`container-message chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}
//       >
//         {message.message}
//         {isSender ? (
//           <FaRegTrashAlt
//             className="delete w-6 h-6 hover:cursor-pointer"
//             onClick={() => onDelete(message._id)}
//           />
//         ) : (
//           ""
//         )}
//       </div>
//       <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
//         {formatedTime}
//       </div>
//     </div>
//   );
// }

export default function Message({ message, onDelete }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const formatedTime = extractTime(message.createdAt);
  const isSender = message.senderId === authUser._id;
  const chatClassName = isSender ? "chat-end" : "chat-start";
  const profilePic = isSender
    ? authUser.profilePicture
    : selectedConversation?.profilePicture;
  const bubbleBgColor = isSender ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  const { deleteMessage } = useDeleteMessage(onDelete); // Pass onDelete callback

  const handleDeleteMessage = async () => {
    await deleteMessage(message._id);
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Tailwind chat bubble" />
        </div>
      </div>
      <div
        className={`container-message chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}
      >
        {message.message}
        {/* {isSender ? (
          <FaRegTrashAlt
            className="delete w-6 h-6 hover:cursor-pointer"
            onClick={handleDeleteMessage}
          />
        ) : (
          ""
        )} */}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatedTime}
      </div>
    </div>
  );
}

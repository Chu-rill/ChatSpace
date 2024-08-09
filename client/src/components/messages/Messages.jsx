import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeletons from "../skeletons/MessageSkeletons";
import useListenMessages from "../../hooks/useListenMessages";
import useDeleteMessage from "../../hooks/useDeleteMessage";

// export default function Messages() {
//   const { loading, messages, refetchMessages } = useGetMessages();
//   const [shouldRefetch, setShouldRefetch] = useState(false);
//   useListenMessages();
//   const lastMessageRef = useRef();

//   useEffect(() => {
//     if (shouldRefetch) {
//       refetchMessages(); // Re-fetch messages when shouldRefetch is true
//       setShouldRefetch(false);
//     }
//   }, [shouldRefetch, refetchMessages]);

//   useEffect(() => {
//     setTimeout(() => {
//       lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   }, [messages]);

//   const handleMessageDeleted = () => {
//     setShouldRefetch(true);
//   };

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {!loading &&
//         messages.length > 0 &&
//         messages.map((message, idx) => (
//           <div
//             key={message._id}
//             ref={idx === messages.length - 1 ? lastMessageRef : null}
//           >
//             <Message message={message} onDelete={handleMessageDeleted} />
//           </div>
//         ))}
//       {loading && [...Array(3)].map((_, idx) => <MessageSkeletons key={idx} />)}
//       {!loading && messages.length === 0 && (
//         <p className="text-center">Send a message to start the conversation</p>
//       )}
//     </div>
//   );
// }

// export default function Messages() {
//   const { loading, messages, refetchMessages } = useGetMessages();
//   useListenMessages();
//   // Pass refetchMessages to useDeleteMessage
//   const { deleteMessage } = useDeleteMessage(refetchMessages);

//   const lastMessageRef = useRef();

//   useEffect(() => {
//     lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleDeleteMessage = async (messageId) => {
//     // Call deleteMessage and pass refetchMessages as a callback
//     await deleteMessage(messageId);
//   };

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {!loading &&
//         messages.length > 0 &&
//         messages.map((message, idx) => (
//           <div
//             key={message._id}
//             ref={idx === messages.length - 1 ? lastMessageRef : null}
//           >
//             <Message
//               message={message}
//               onDelete={() => handleDeleteMessage(message._id)} // Handle deletion
//             />
//           </div>
//         ))}
//       {loading && [...Array(3)].map((_, idx) => <MessageSkeletons key={idx} />)}
//       {!loading && messages.length === 0 && (
//         <p className="text-center">Send a message to start the conversation</p>
//       )}
//     </div>
//   );
// }

export default function Messages() {
  const { loading, messages, refetchMessages } = useGetMessages();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  useListenMessages();

  // Pass refetchMessages to useDeleteMessage
  const { deleteMessage } = useDeleteMessage(refetchMessages);

  const lastMessageRef = useRef();

  useEffect(() => {
    if (shouldRefetch) {
      refetchMessages(); // Re-fetch messages when shouldRefetch is true
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetchMessages]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleMessageDeleted = () => {
    setShouldRefetch(true);
  };

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, idx) => (
          <div
            key={message._id}
            ref={idx === messages.length - 1 ? lastMessageRef : null}
          >
            <Message
              message={message}
              onDelete={handleMessageDeleted} // Pass the callback to Message component
            />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeletons key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { getToken } from "../jwt";
import { liveLink, localLink, localLink2 } from "./api";
// const useGetMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();
//   const token = getToken();
//   useEffect(() => {
//     const getMessages = async () => {
//       if (!selectedConversation?._id) return;
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `${localLink2}/api/msg/${selectedConversation._id}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const data = await res.json();
//         console.log(data);

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to fetch messages");
//         }

//         setMessages(data);
//       } catch (error) {
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (selectedConversation?._id) getMessages();
//   }, [selectedConversation?._id, setMessages]);

//   return { loading, messages };
// };
// export default useGetMessages;

// const useGetMessages = () => {
//   const [loading, setLoading] = useState(false);
//   const { messages, setMessages, selectedConversation } = useConversation();
//   const token = getToken();

//   const getMessages = async () => {
//     if (!selectedConversation?._id) return;
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${localLink2}/api/msg/${selectedConversation._id}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch messages");
//       }

//       const data = await res.json();
//       setMessages(data);
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedConversation?._id) getMessages();
//   }, [selectedConversation?._id]);

//   return { loading, messages, refetchMessages: getMessages };
// };

// export default useGetMessages;

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const token = getToken();

  const getMessages = async () => {
    if (!selectedConversation?._id) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${liveLink}/api/msg/${selectedConversation._id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();
      setMessages(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages, refetchMessages: getMessages };
};

export default useGetMessages;

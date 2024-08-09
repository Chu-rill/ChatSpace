import { getToken } from "../jwt";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { liveLink, localLink, localLink2 } from "./api";
// const useDeleteMessage = () => {
//   const [loading, setLoading] = useState(false);
//   const deleteMessage = async (messageId) => {
//     setLoading(true);
//     try {
//       const token = getToken(); // Ensure you have a function to get the token

//       const res = await fetch(`${localLink2}/api/msg/delete/${messageId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();
//       console.log(data);
//       if (!res.ok) {
//         throw new Error("Failed to delete message");
//       }
//       toast.success("message deleted");
//       return;
//     } catch (error) {
//       console.error("Error:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return { deleteMessage, loading };
// };

// export default useDeleteMessage;

// const useDeleteMessage = (onSuccess) => {
//   const [loading, setLoading] = useState(false);

//   const deleteMessage = async (messageId) => {
//     setLoading(true);
//     try {
//       const token = getToken(); // Ensure you have a function to get the token

//       const res = await fetch(`${localLink2}/api/msg/delete/${messageId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         throw new Error("Failed to delete message");
//       }

//       await res.json();
//       toast.success("Message deleted");

//       // Call the onSuccess callback to refresh messages
//       if (onSuccess) onSuccess();
//     } catch (error) {
//       console.error("Error:", error.message);
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { deleteMessage, loading };
// };

// export default useDeleteMessage;

const useDeleteMessage = (onSuccess) => {
  const [loading, setLoading] = useState(false);

  const deleteMessage = async (messageId) => {
    setLoading(true);
    try {
      const token = getToken(); // Ensure you have a function to get the token

      const res = await fetch(`${liveLink}/api/msg/delete/${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete message");
      }

      const data = await res.json();
      console.log(data);
      toast.success("Message deleted");

      // Call onSuccess callback if provided
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMessage, loading };
};

export default useDeleteMessage;

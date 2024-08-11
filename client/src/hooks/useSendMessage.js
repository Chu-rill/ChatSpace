import { useState } from "react";
import { toast } from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { getToken } from "../jwt";
import { liveLink, localLink, localLink2 } from "./api";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const token = getToken();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${localLink2}/api/msg/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (!data.message) {
        throw new Error(data.message);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};
export default useSendMessage;

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { getToken } from "../jwt";
import { liveLink, localLink, localLink2 } from "./api";
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const token = getToken();
  useEffect(() => {
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
        const data = await res.json();
        console.log(data);
        // if (data.error) {
        //   throw new Error(data.error);
        // }

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch messages");
        }

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { loading, messages };
};
export default useGetMessages;

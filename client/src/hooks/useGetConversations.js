import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getToken } from "../jwt";
import { liveLink, localLink, localLink2 } from "./api";
const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const token = getToken();
  // console.log(`get token: ${token}`);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${liveLink}/api/users/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        // console.log("Data from API:", data);
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
        // setConversations(data.conversations || []);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;

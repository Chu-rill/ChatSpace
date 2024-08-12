import { getToken } from "../jwt";
import { useState } from "react";
import { liveLink, localLink, localLink2 } from "./api";
const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      const token = getToken(); // Ensure you have a function to get the token

      const res = await fetch(`${liveLink}/api/users/delete/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // const data = await res.json();
      // if (res.ok) {
      //   console.log("User deleted:", data);
      // } else {
      //   throw new Error(data.message || "Failed to delete user");
      // }

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      return;
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return { deleteUser, loading };
};

export default useDeleteUser;

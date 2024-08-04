import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const useEdit = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const edit = async (username, Bio) => {
    const success = handleInputErrors(username, Bio);
    console.log(username);
    console.log(Bio);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/users/update/${authUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, Bio }),
      });
      const data = await res.json();
      console.log(data);
      if (data.message) {
        throw new Error(data.message);
      }

      // Update authUser state with new data
      // setAuthUser((prev) => ({ ...prev, username, bio }));
      toast.success("Edit Successful");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, edit };
};

export default useEdit;

function handleInputErrors(username, bio) {
  if (!username || !bio) {
    toast.error("Please fill all fields");
    return false;
  }
  return true;
}

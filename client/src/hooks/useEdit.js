import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { getToken } from "../jwt";
import { liveLink, localLink, localLink2 } from "./api";
const useEdit = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const token = getToken();

  const edit = async (username, Bio, profilePicture) => {
    // const success = handleInputErrors(username, Bio);
    console.log(username);
    console.log(Bio);
    // if (!success) return;
    setLoading(true);
    //text
    try {
      const res = await fetch(`${liveLink}/api/users/update/${authUser._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          Bio: Bio,
          profilePicture: profilePicture,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.message) {
        throw new Error(data.message);
      }

      // Update authUser state with new data
      // setAuthUser((prev) => ({ ...prev, username, Bio }));
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

import { useState } from "react";
import { toast } from "react-hot-toast"; // Make sure to install and import toast
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();

  const signup = async ({ username, email, password }) => {
    const success = handleInputErrors({ username, email, password });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //add to local storage
      localStorage.setItem("user", JSON.stringify(data));
      // add data value to context
      setauthUser(data);

      toast.success("Successfully Signed Up");

      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ username, email, password }) {
  if (!username || !email || !password) {
    toast.error("Please fill all fields");
    return false;
  }
  if (password.length < 6) {
    // Corrected typo here
    toast.error("Password must be more than 6 characters");
    return false;
  }
  return true; // Ensure the function returns true if all checks are passed
}

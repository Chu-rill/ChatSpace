import { useState } from "react";
import { toast } from "react-hot-toast"; // Make sure to install and import toast
import { useAuthContext } from "../context/AuthContext";
import { storeToken } from "../jwt";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();

  const signup = async ({ username, email, password }) => {
    const success = handleInputErrors({ username, email, password });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Check if response status is OK
        // Extract the token from the response
        const token = data.token;

        // Store the token in session storage or local storage
        storeToken(token);

        // Add user data to local storage
        localStorage.setItem("user", JSON.stringify(data));

        // Set user data in context
        setauthUser(data);

        toast.success("Successfully Signed Up");
        console.log(data);
      } else {
        throw new Error(data.error || "Signup failed");
      }
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

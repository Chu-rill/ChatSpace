import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { storeToken } from "../jwt";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();
  const login = async (username, password) => {
    const success = handleInputErrors(username, password);

    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://us-central1-chatspace-caee5.cloudfunctions.net/api/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.message) {
        throw new Error(data.message);
      }
      const token = data.token;
      // console.log("token:" + token);

      // Store token in session storage
      storeToken(token);
      localStorage.setItem("user", JSON.stringify(data));
      setauthUser(data);
      toast.success("Login Succesful");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill all fields");
    return false;
  }

  return true; // Ensure the function returns true if all checks are passed
}

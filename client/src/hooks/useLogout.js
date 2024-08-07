import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { getToken } from "../jwt";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();
  const token = getToken();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("user");
      setauthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;

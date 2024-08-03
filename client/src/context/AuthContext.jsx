import { Children, createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setauthUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setauthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

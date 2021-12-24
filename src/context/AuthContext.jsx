import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const overrideAuth = JSON.parse(localStorage.getItem("__auth__"));
  const [auth, setAuth] = useState(overrideAuth || null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

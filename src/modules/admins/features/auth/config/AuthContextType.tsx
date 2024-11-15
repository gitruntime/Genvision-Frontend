import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<DecodedToken | null>(token ? JSON.parse(localStorage.getItem("userData")!) : null);

  const login = (newToken: string) => {
    const decoded: DecodedToken = jwt_decode(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userData", JSON.stringify(decoded));
    setToken(newToken);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

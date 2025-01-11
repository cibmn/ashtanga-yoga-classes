import React, { createContext, useState } from "react";

// Crea el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para iniciar sesión
  const login = () => {
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

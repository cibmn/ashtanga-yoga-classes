import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Reservas from "../pages/Reservas";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  // Función para manejar el login
  const handleLogin = () => {
    setIsAuthenticated(true); // Iniciar sesión
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Cerrar sesión
  };

  return (
    <div>
      <Sidebar
        onLoginSuccess={handleLogin} // Pasar la función handleLogin a onLoginSuccess
        onLogout={handleLogout} // Pasar la función handleLogout
      />
      {isAuthenticated ? (
        <Reservas /> // Mostrar Reservas.jsx solo si el usuario está autenticado
      ) : (
        <div>
          <h2>Bienvenido a la página principal</h2>
          <p>Por favor, inicia sesión para acceder a las reservas de clases.</p>
        </div> // Mostrar el Home cuando no esté autenticado
      )}
    </div>
  );
};

export default Home;

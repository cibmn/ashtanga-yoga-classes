import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Reservas from "../pages/Reservas";
import yogaImage from "../assets/fypa.jpg";
import "../styles/global.scss";


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
          <h2>Hola!</h2>
          <p>Por favor, inicia sesión para acceder a las reservas de clases.</p>

          <div className="image-container">
        <img src={yogaImage} alt="Imagen de yoga" />
      </div>


        </div> // Mostrar el Home cuando no esté autenticado
      )}
    </div>
  );
};

export default Home;

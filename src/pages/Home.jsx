import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Reservas from "../pages/Reservas";
import yogaImage from "../assets/fypa.jpg";
import "../styles/global.scss";
import { AuthContext } from "../context/authContext"; 

const Home = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext); // Obtén los valores del contexto

  return (
    <div>
      <Sidebar
        onLoginSuccess={login}  // Usa la función login del contexto
        onLogout={logout}       // Usa la función logout del contexto
      />
      {isAuthenticated ? (
        <Reservas />  // Muestra Reservas si el usuario está autenticado
      ) : (
        <div>
          <h2>Hola!</h2>
          <p>Por favor, inicia sesión para acceder a las reservas de clases.</p>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img 
              src={yogaImage} 
              alt="Imagen de yoga" 
              style={{ maxWidth: "40%", height: "auto", borderRadius: "3px" }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

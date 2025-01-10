import React, { useState } from "react";
import "../styles/Sidebar.scss";

const Sidebar = ({ onLoginSuccess, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isRegistering, setIsRegistering] = useState(false); // Estado para controlar si está en el modo de registro

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token); 
        alert("Login exitoso"); 
        onLoginSuccess(); 
        setIsOpen(false); 
      } else {
        alert(data.message); 
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      alert("Hubo un error al intentar hacer login");
    }
  };

  // Función para manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registro exitoso"); 
        setIsRegistering(false); // Volver al modo de login después del registro
      } else {
        alert(data.message); 
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al intentar registrar el usuario");
    }
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setIsAuthenticated(false); 
    localStorage.removeItem("token"); 
    setUser(""); 
    setPassword(""); 
    alert("Has cerrado sesión.");
    onLogout(); // Llamar a la función de logout para cambiar el estado en Home
  };

  return (
    <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <button
        className={`sidebar__toggle ${isAuthenticated ? "logout-btn" : ""}`}
        onClick={isAuthenticated ? handleLogout : toggleSidebar}
      >
        {isAuthenticated ? "Salir" : "Login"}
      </button>
      {isOpen && !isAuthenticated && !isRegistering && (
        <form className="sidebar__form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={user}
            onChange={(e) => setUser(e.target.value)} 
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={() => setIsRegistering(true)} // Cambiar a registro
          >
            Registrarse
          </button>
        </form>
      )}
      {isOpen && !isAuthenticated && isRegistering && (
        <form className="sidebar__form" onSubmit={handleRegister}>
          <h2>Registro</h2>
          <input
            type="email"
            placeholder="Email"
            value={user}
            onChange={(e) => setUser(e.target.value)} 
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <button type="submit">Registrar</button>
          <button
            type="button"
            onClick={() => setIsRegistering(false)} // Volver al login
          >
            Volver a Login
          </button>
        </form>
      )}
      {isAuthenticated && (
        <div>
          <p>¡Bienvenido, {user}!</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

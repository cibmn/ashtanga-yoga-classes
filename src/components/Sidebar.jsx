import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import "../styles/Sidebar.scss";

const Sidebar = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext); // Consume el contexto
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

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
        login(); // Llama al método login del contexto
        localStorage.setItem("token", data.token);
        alert("Login exitoso");
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
        setIsRegistering(false);
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
    logout(); // Llama al método logout del contexto
    localStorage.removeItem("token");
    setUser("");
    setPassword("");
    alert("Has cerrado sesión.");
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
          <h2>Campus virtual</h2>
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
          <button type="submit">Entrar</button>
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
          <button type="submit">Registrame</button>
          <button
            type="button"
            onClick={() => setIsRegistering(false)} // Volver a Login
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

import React, { useState } from "react";
import "../styles/Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <button className="sidebar__toggle" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Login"}
      </button>
      {isOpen && (
        <form className="sidebar__form">
          <h2>Login</h2>
          <input type="user" placeholder="User" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Sidebar;

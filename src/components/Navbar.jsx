import React from "react";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import vacaImage from "../assets/vaca.png"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img id="vaca" src={vacaImage} alt="vaca" className="navbar__logo-image" /> 
        <Link to="/">Gokulam Yoga</Link>
      </div>
      <ul className="navbar__links">
        <li><Link to="/classes">Classes</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

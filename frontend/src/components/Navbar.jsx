import React from 'react';
/* // import './Navbar.css'; // Opcional, si quieres añadir estilos

const Navbar = () => {
  return (
    <nav className="navbar">
      <nav>
  <ul>
    <li><a href="/">Inicio</a></li>
    <li><a href="/productos">Productos</a></li>
    <li><a href="/contacto">Contacto</a></li>
  </ul>
</nav>
    </nav>
  );
};

export default Navbar; */
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Belleza</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* ms-auto alinea la lista a la derecha */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
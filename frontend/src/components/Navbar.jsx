import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        {/* Logo o nombre de la marca */}
        <Link className="navbar-brand" to="/">Belleza</Link>

        {/* Opciones de navegación */}
        <div className="d-flex align-items-center ms-auto">
          <Link className="nav-link me-3" to="/">Inicio</Link>
          <Link className="nav-link me-3" to="/contacto">Contacto</Link>
          <Link className="btn btn-primary text-white" to="/inicio-sesion">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
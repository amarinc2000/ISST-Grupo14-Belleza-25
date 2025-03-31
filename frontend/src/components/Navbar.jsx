import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#F3DFEC' }}>
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#DF98E8',
            fontFamily: 'sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
          onMouseLeave={(e) => e.target.style.color = '#DF98E8'}
        >
          BELLEZA
        </Link>

        {/* Opciones de navegación */}
        <div className="d-flex align-items-center ms-auto">
          <Link className="nav-link me-3" to="/"
            style={{
              color: '#000000',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
            Inicio
          </Link>

          <Link className="nav-link me-3" to="/contacto"
            style={{
              color: '#000000',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
            Contacto
          </Link>

          <Link className='nav-link NuevoServicio me-3' to="/NuevoServicio"
            style={{
              color: '#000000',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
            Creación de Servicio
          </Link>

          {/* Botón de inicio de sesión */}
          <Link
            className="btn"
            to="/inicio-sesion"
            style={{
              backgroundColor: '#DF98E8',
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: 'bold',
              transition: '0.3s',
              border: 'none'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#C57ACC'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#DF98E8'}
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



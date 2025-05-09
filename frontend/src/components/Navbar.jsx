import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const esNegocio = path.includes("/negocio");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#F3DFEC' }}>
      <div className="container">
        <Link
          className={esNegocio ? "navbar-title-negocio" : "navbar-brand"}
          to={esNegocio ? "/negocio/" : "/"}
          onClick={(e) => {
            if (!esNegocio) {
              e.preventDefault();
              window.location.href = "/";
            }
          }}
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: esNegocio ? '#BFA181' : '#DF98E8',
            fontFamily: 'sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => e.target.style.color = esNegocio ? '#FFF8DC' : '#FFFFFF'}
          onMouseLeave={e => e.target.style.color = esNegocio ? '#BFA181' : '#DF98E8'}
        >
          {esNegocio ? "BELLEZA | NEGOCIO" : "BELLEZA"}
        </Link>

        <div className="d-flex align-items-center ms-auto">
          <Link className="nav-link me-3" to={esNegocio ? "/negocio/" : "/"} style={{ color: '#000000', fontSize: '18px', fontWeight: 'bold' }}>
            Inicio
          </Link>

          <Link className="nav-link me-3" to={esNegocio ? "/negocio/contacto" : "/contacto"} style={{ color: '#000000', fontSize: '18px', fontWeight: 'bold' }}>
            Contacto
          </Link>

          {/* PERFIL Desplegable */}
          {!esNegocio && (
            <div
              className="nav-item dropdown me-3"
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
              style={{ position: 'relative' }}
            >
              <span
                className="nav-link"
                style={{
                  color: '#000000',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Perfil ▾
              </span>

              {showProfile && (
                <div
                  className="dropdown-menu show"
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px',
                    minWidth: '200px',
                    zIndex: 1000,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Link to="/mis-reservas" className="dropdown-item">Mis Reservas</Link>
                  <Link to="/favoritos" className="dropdown-item">Mis Favoritos</Link>
                </div>
              )}
            </div>
          )}

          {/* Botón de sesión o admin */}
          <Link
            className="btn"
            to={esNegocio ? "/negocio/adminmenu" : "/inicio-sesion"}
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
            {esNegocio ? "Admin Menu" : "Iniciar Sesión"}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const esNegocio = path.includes("/negocio");
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#F3DFEC' }}>
      <div className="container">

        
        <Link
          className={esNegocio ? "navbar-title-negocio" : "navbar-brand"} // Cambia la clase según el estado
          to={esNegocio ? "/negocio/" : "/"} // Cambia la ruta según el estado
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
          {esNegocio ? "BELLEZA | NEGOCIO" : "BELLEZA"} {/* Cambia el texto según el estado */}
        </Link>


        {/* Opciones de navegación */}
        <div className="d-flex align-items-center ms-auto">
          <Link className="nav-link me-3" to={esNegocio ? "/negocio/":"/"} 
            onClick={(e) => {
              if (!esNegocio) {
                e.preventDefault();
                window.location.href = "/";
              }
            }}   
            style={{
              color: '#000000',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
            Inicio
          </Link>

          {/* Ruta de contacto para clientes y negocios */}
          <Link className="nav-link me-3" to={esNegocio ? "/negocio/contacto":"/contacto"}
            style={{
              color: '#000000',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
            Contacto
          </Link>

            {/* Ruta de mis reservas para clientes */}
            {!esNegocio && (
              <Link 
                className="nav-link me-3" 
                to="/mis-reservas"
                style={{
                  color: '#000000',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                Mis reservas
              </Link>
            )}


          {/* Botón de inicio de sesión si no es Negocio */}
          {/* Botón de Menu de Admin si es Negocio, para creación de servicios, ver listado de servicios y hacer modificaciones o asignaciones en servicios ya creados*/}
          <Link
            className="btn"
            to={esNegocio ? "/negocio/adminmenu":"/inicio-sesion"}
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



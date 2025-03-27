import React from 'react';
import { Link } from 'react-router-dom';

import peluqueriaImg from "../assets/Peluqueria.png";
import uñasImg from "../assets/uñas.jpg"
import pestañasImg from "../assets/pestañas.jpg"
import depilacionImg from "../assets/depilacion.png"
import facialesImg from "../assets/faciales.jpg"
import corporalesImg from "../assets/corporales.png"
import masajesImg from "../assets/masajes.jpg"
import bronceadoImg from "../assets/bronceado.png"

function HomePage() {
  return (
    <div className="homepage">
      <div className="header">
        <h1>Belleza</h1>
        <div>
          <Link to="/inicio-sesion">
            <button>Iniciar Sesión</button>
          </Link>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscador de servicios"
          className="search-input"
        />
      </div>
      
      {/* NOTA: HAY QUE REVISAR LOS ENLACES A CADA SERVICIO NO ESTA PROGRAMADO AUN */} 
      <div className="card-container">
        <Link to="/Peluqueria" className="card-button"> 
          <img src={peluqueriaImg} alt="Servicios" className="card-image" />
          <h3 className="card-title">Peluqueria</h3>
        </Link>

        <Link to="/Uñas" className="card-button">
          <img src={uñasImg}alt="Productos" className="card-image" />
          <h3 className="card-title">Uñas</h3>
        </Link>

        <Link to="/Pestañas" className="card-button">
          <img src={pestañasImg} alt="Contacto" className="card-image" />
          <h3 className="card-title">Pestañas</h3>
        </Link>

        <Link to="/Depilacion" className="card-button">
          <img src={depilacionImg} alt="Depilacion" className="card-image" />
          <h3 className="card-title">Depilación</h3>
        </Link>

        <Link to="/Faciales" className="card-button">
          <img src={facialesImg} alt="Faciales" className="card-image" />
          <h3 className="card-title">Faciales</h3>
        </Link>

        <Link to="/Corporales" className="card-button">
          <img src={corporalesImg} alt="CorporalesFaciales" className="card-image" />
          <h3 className="card-title">Corporales</h3>
        </Link>

        <Link to="/Masajes" className="card-button">
          <img src={masajesImg} alt="Masajes" className="card-image" />
          <h3 className="card-title">Masajes</h3>
        </Link>

        <Link to="/Bronceado" className="card-button">
          <img src={bronceadoImg} alt="Bronceado" className="card-image" />
          <h3 className="card-title">Bronceado</h3>
        </Link>

        <div className="detalle-servicio-container" style={{ marginTop: "2rem" }}>
        <Link to="/detalle-servicio">
          <button className="detalle-servicio-btn">
            Ver Detalle de Servicio
          </button>
        </Link>
      </div>

      </div>

    </div>
  );
}

export default HomePage;
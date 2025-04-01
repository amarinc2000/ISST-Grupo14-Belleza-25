import React from "react";
import { Link } from "react-router-dom";
import "./inicio_sesion.css"; // Importa el archivo CSS

const InicioSesion = () => {
  return (
    <div className="inicio-sesion-container">
      <div className="contenedor-secciones">
        <div className="seccion">
          <h2 className="titulo-seccion">CLIENTES</h2>
          <input
            type="email"
            placeholder="Email"
            className="input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input"
          />
          <button className="boton-acceder">ACCEDER</button>
          <button className="boton-crear-cuenta">CREAR NUEVA CUENTA</button>
        </div>

        <div className="seccion">
          <h2 className="titulo-seccion">EMPRESAS</h2>
          <input
            type="email"
            placeholder="Email Profesional"
            className="input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input"
          />
          <button className="boton-acceder">ACCEDER</button>
          <button className="boton-crear-cuenta">CREAR CUENTA EMPRESA</button>
        </div>
      </div>

      <Link to="/">
        <button className="boton-volver">VOLVER A INICIO</button>
      </Link>
    </div>
  );
};

export default InicioSesion; 
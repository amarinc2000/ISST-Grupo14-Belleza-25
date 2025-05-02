import React, { useState } from "react";
import { Link } from 'react-router-dom';

import peluqueriaImg from "../assets/Peluqueria.png";
import uñasImg from "../assets/uñas.jpg";
import pestañasImg from "../assets/pestañas.jpg";
import depilacionImg from "../assets/depilacion.png";
import facialesImg from "../assets/faciales.jpg";
import corporalesImg from "../assets/corporales.png";
import masajesImg from "../assets/masajes.jpg";
import bronceadoImg from "../assets/bronceado.png";
import { peticioneshttps } from "../utils/functions/peticionesHTTPS";
import Lista_servicios from "./Lista_Servicios";
import "./Buscador.css";

const BuscadorConSubvista = () => {
  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState([]);

  // Maneja la búsqueda y actualiza la subvista
  const manejarCambio = async (e) => {
    const nuevoValor = e.target.value;
    setValor(nuevoValor);

    if (nuevoValor.length > 2) {
      try {
        const data = await peticioneshttps('buscador','informacion',null, null ,nuevoValor);
        setResultados(data);
      } catch (error) {
        console.error("Error al buscar:", error);
        setResultados([]);
      }
    } else {
      setResultados([]);
    }
  };

  return (
    <div className="buscador-container">
      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar..."
        value={valor}
        onChange={manejarCambio}
        className="buscador-input"
      />

      {/* Subvista */}
      <div className="subvista-buscador-container">
        {(resultados.length > 0 && valor.length > 3) ? (
          <ul className="resultados-buscador-container">
            {resultados.map((item, index) => (
              <div key={index} className="negocio-resultado-item">
                <Lista_servicios negocio={item} />
              </div>
            ))}
          </ul>
        ) : (
          <div className="card-container">
            {/* Botón para cambiar la categoría */}
            <button onClick={() => cambiarCategoria("Peluqueria")} className="card-button">
              <img src={peluqueriaImg} alt="Peluqueria" className="card-image" />
              <h3 className="card-title">Peluquería</h3>
            </button>
            <button onClick={() => cambiarCategoria("Uñas")} className="card-button">
              <img src={uñasImg} alt="Uñas" className="card-image" />
              <h3 className="card-title">Uñas</h3>
            </button>
            <button onClick={() => cambiarCategoria("Pestañas")} className="card-button">
              <img src={pestañasImg} alt="Pestañas" className="card-image" />
              <h3 className="card-title">Pestañas</h3>
            </button>
            <button onClick={() => cambiarCategoria("Depilación")} className="card-button">
              <img src={depilacionImg} alt="Depilación" className="card-image" />
              <h3 className="card-title">Depilación</h3>
            </button>
            <button onClick={() => cambiarCategoria("Faciales")} className="card-button">
              <img src={facialesImg} alt="Faciales" className="card-image" />
              <h3 className="card-title">Faciales</h3>
            </button>
            <button onClick={() => cambiarCategoria("Corporales")} className="card-button">
              <img src={corporalesImg} alt="Corporales" className="card-image" />
              <h3 className="card-title">Corporales</h3>
            </button>
            <button onClick={() => cambiarCategoria("Masajes")} className="card-button">
              <img src={masajesImg} alt="Masajes" className="card-image" />
              <h3 className="card-title">Masajes</h3>
            </button>
            <button onClick={() => cambiarCategoria("Bronceado")} className="card-button">
              <img src={bronceadoImg} alt="Bronceado" className="card-image" />
              <h3 className="card-title">Bronceado</h3>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscadorConSubvista;

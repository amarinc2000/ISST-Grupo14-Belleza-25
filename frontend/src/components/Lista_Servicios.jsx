import React from "react";
import { Link } from "react-router-dom"; 
import "./Lista_Servicios.css";

const Lista_servicios = ({ negocio }) => {
  // Verificar si 'negocio' y 'negocio.servicios' están definidos para evitar errores
  if (!negocio || !negocio.servicios) {
    return <div>No hay información del negocio disponible.</div>;
  }

  return (
    <div className="tarjeta-negocio">
      <div className="info-negocio">
        <h1 className="negocio-nombre"> {negocio.nombre || "Nombre no disponible"} </h1>
        <h2 className="negocio-direccion"> {negocio.direccion || "Dirección no disponible"} </h2>
        <h3 className="negocio-telefono">📞 {negocio.telefono || "Teléfono no disponible"} </h3>

        <div className="puntuacion">
          <span>Puntuación</span>
          <div className="estrellas">
            {/* Calcular la puntuación de manera dinámica. Asumimos que la puntuación es un número entre 0 y 5 */}
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index}>
                {index < negocio.puntuacion ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="servicios-lista">
        {negocio.servicios.map((item, index) => (
          <div key={index} className="servicio-card">
            <div className="servicio-info">
              <h4 className="servicio-nombre">{item.nombre}</h4>
              <p className="servicio-precio">{item.precio}€</p>
            </div>
            <p className="servicio-descripcion">{item.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Link para redirigir a la página de detalle del servicio */}
      <Link to="/detalle-servicio" state={{ negocio }} className="boton-reservar-link">
        <button className="boton-reservar">RESERVAR</button>
      </Link>
    </div>
  );
};

export default Lista_servicios;

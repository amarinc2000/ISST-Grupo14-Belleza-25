import React from "react";
import "./Lista_Servicios.css";

const Lista_servicios = ({ negocio }) => {
  return (
    <div className="tarjeta-negocio">
      <div className="info-negocio">
        <h1 className="negocio-nombre"> {negocio.nombre} </h1>
        <h2 className="negocio-direccion"> {negocio.direccion} </h2>
        <h3 className="negocio-telefono">📞 {negocio.telefono} </h3>
        <div className="puntuacion">
          <span>Puntuación</span>
          <div className="estrellas">
            {"★".repeat(4)}
            {"☆".repeat(1)}
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

      <button className="boton-reservar">RESERVAR</button>
    </div>
  );
};

export default Lista_servicios;
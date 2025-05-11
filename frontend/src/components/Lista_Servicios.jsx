import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Lista_Servicios.css";

const Lista_servicios = ({ negocio }) => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  if (!negocio || !negocio.servicios) {
    return <div>No hay información del negocio disponible.</div>;
  }

  const handleReservarClick = (e) => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      e.preventDefault();
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000);
    }
  };

  return (
    <div className="tarjeta-negocio">
      <div className="info-negocio">
        {negocio.logo_url && negocio.logo_url.trim() !== "" && (
          <img
            src={negocio.logo_url}
            alt="Logo del negocio"
            className="logo-negocio"
          />
        )}

        <h1 className="negocio-nombre">
          {negocio.nombre || "Nombre no disponible"}
        </h1>
        <h2 className="negocio-direccion">
          {negocio.direccion || "Dirección no disponible"}
        </h2>
        <h3 className="negocio-telefono">
          📞 {negocio.telefono || "Teléfono no disponible"}
        </h3>

        <div className="puntuacion">
          <span>Puntuación</span>
          <div className="estrellas">
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

      {showLoginMessage && (
        <div className="login-message">
          Debes iniciar sesión para poder reservar
        </div>
      )}

      <div className="boton-reservar-contenedor">
        <Link
          to="/detalle-servicio"
          state={{
            negocio: {
              ...negocio,
              logo_url: negocio.logo_url || "",
            }
          }}
          className="boton-reservar-link"
          onClick={handleReservarClick}
        >
          <button className="boton-reservar">RESERVAR</button>
        </Link>
      </div>
    </div>
  );
};

export default Lista_servicios;

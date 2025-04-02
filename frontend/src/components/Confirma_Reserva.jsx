import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmaReserva = () => {
  const location = useLocation();
  const { selectedTime } = location.state || {}; // Obtén la hora seleccionada

  return (
    <div className="confirmation-container">
      <h1>Reserva realizada con éxito</h1>
      <p>¡Gracias por reservar con nosotros!</p>
    </div>
  );
};

export default ConfirmaReserva;
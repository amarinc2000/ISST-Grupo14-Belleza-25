import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmaReserva = () => {
  const location = useLocation();
  const { selectedTime } = location.state || {}; // Obtén la hora seleccionada

  return (
    <div className="confirmation-container">
      <h1>Reserva realizada con éxito</h1>
      {selectedTime ? (
        <p>Reserva realizada con éxito a la hora: {selectedTime}</p>
      ) : (
        <p>No se ha seleccionado ninguna hora.</p>
      )}
    </div>
  );
};

export default ConfirmaReserva;
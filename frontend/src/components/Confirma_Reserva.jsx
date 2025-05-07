import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { peticioneshttps } from "../utils/functions/peticionesHTTPS";  // Asegúrate de tener esta función configurada

const ConfirmaReserva = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener el ID de la reserva desde el estado de la navegación
  const { reservaId } = location.state || {};  // Si no existe, el valor será undefined.

  const [reserva, setReserva] = useState(null); // Estado para guardar la reserva
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    if (reservaId) {
      // Llamada al backend para obtener los detalles de la reserva usando el ID
      peticioneshttps(`reservas/${reservaId}`, "GET")
        .then((response) => {
          setReserva(response.data); // Guardamos la reserva
          setLoading(false); // Termina el estado de carga
        })
        .catch((error) => {
          console.error("Error al obtener la reserva:", error);
          setLoading(false); // Termina el estado de carga en caso de error
        });
    } else {
      setLoading(false); // Si no hay ID de reserva, terminamos el loading
    }
  }, [reservaId]);

  if (loading) {
    return <div>Cargando...</div>;  // Mostramos un mensaje mientras cargamos
  }

  if (!reserva) {
    return <div>No se pudo obtener la reserva</div>;  // En caso de que no haya reserva
  }

  return (
    <div className="confirmation-container">
      <h1>Reserva realizada con éxito</h1>
      <p>¡Gracias por reservar con nosotros!</p>
      
      <div className="reserva-info">
        <p><strong>Servicio:</strong> {reserva.servicio.nombre}</p>
        <p><strong>Fecha y Hora:</strong> {new Date(reserva.fecha_hora).toLocaleString()}</p>
        <p><strong>Cliente:</strong> {reserva.cliente.nombre}</p>
        <p><strong>Confirmada:</strong> {reserva.confirmada ? "Sí" : "No"}</p>
      </div>
      
      <button onClick={() => navigate("/")}>Volver a la página principal</button>
    </div>
  );
};

export default ConfirmaReserva;
import React, { useState } from "react";
import Navbar from "./Navbar";
import "./DetalleServicios.css";

const DetalleServicios = () => {
  // Estados para fecha y hora seleccionadas
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Función para manejar la reserva (ej. enviar datos a una API)
  const handleBooking = () => {
    console.log("Reserva confirmada:", selectedDate, selectedTime);
    // Aquí agregarías la lógica para confirmar la reserva
  };

  return (
    <div className="service-detail-container">
      <Navbar />
      <div className="service-detail-content">
        <h1 className="service-title">Servicio: Peluquería</h1>
        <p className="service-description">
          Este servicio de peluquería incluye corte, peinado y tratamiento. Nuestros profesionales
          se encargarán de realzar tu estilo y brindarte una experiencia de belleza completa.
        </p>

        <div className="reservation-form">
          <h2>Reservar Cita</h2>
          <div className="form-group">
            <label htmlFor="date">Fecha:</label>
            <input 
              type="date" 
              id="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Hora:</label>
            <input 
              type="time" 
              id="time" 
              value={selectedTime} 
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
          <button className="btn-book" onClick={handleBooking}>
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleServicios;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importa useNavigate y useLocation
import Navbar from "./Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DetalleServicios.css";

const DetalleServicios = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const minutos_servicio = 30; // Duración del servicio en minutos
  const navigate = useNavigate(); // Hook para redirigir

  // Obtén los datos del servicio desde la ubicación (useLocation)
  const location = useLocation();
  const { nombre_servicio, descripcion_servicio } = location.state || {
    nombre_servicio: "Servicio no especificado",
    descripcion_servicio: "Descripción no disponible",
  };

  // Función para manejar la selección de fecha
  const handleDateChange = (date) => {
    const today = new Date();
    if (date < today.setHours(0, 0, 0, 0)) {
      return; // Evita seleccionar fechas pasadas
    }
    setSelectedDate(date);

    // Generar horarios disponibles dinámicamente
    setAvailableTimes(generateTimeSlots(minutos_servicio));
  };

  // Función para generar los intervalos de tiempo
  const generateTimeSlots = (interval) => {
    const times = [];
    const startHour = 9 * 60; // Convertir 9:00 AM a minutos (540 minutos)
    const endHour = 20 * 60; // Convertir 8:00 PM a minutos (1200 minutos)

    for (let time = startHour; time + interval <= endHour; time += interval) {
      const hours = Math.floor(time / 60).toString().padStart(2, "0");
      const minutes = (time % 60).toString().padStart(2, "0");
      times.push(`${hours}:${minutes}`);
    }

    return times;
  };

  // Función para manejar la reserva
  const handleBooking = () => {
    navigate("/confirma-reserva", { state: { selectedTime } }); // Redirige con la hora seleccionada
  };

  return (
    <div className="service-detail-container">
      <Navbar />
      <div className="service-detail-content">
        <h1 className="service-title">{nombre_servicio}</h1>
        <p className="service-description">{descripcion_servicio}</p>

        <div className="reservation-form">
          <h2>Reservar Cita</h2>
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} // Deshabilitar días pasados
            />
          </div>

          {selectedDate && (
            <div className="time-selection">
              <h3>Selecciona una hora:</h3>
              <div className="time-cards">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    className={`time-card ${selectedTime === time ? "selected" : ""}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {selectedTime && (
                <button className="btn-book" onClick={handleBooking}>
                  Reservar {selectedTime}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleServicios;

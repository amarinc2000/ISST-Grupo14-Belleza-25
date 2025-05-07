import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DetalleServicios.css';

import {
  crearReservaHttps,
  obtenerReservasHttps
} from '../utils/functions/peticionesHTTPS';

const DetalleServicios = () => {
  const location = useLocation();
  const negocio = location.state?.negocio || {
    id_negocio: 1,
    nombre: "Peluquería Pepo",
    email: "pepa@email.com",
    contraseña: "1236532@",
    trabajadores: [],
    servicios: [],
    direccion: "No disponible",
    telefono: "No disponible"
  };

  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [trabajadores, setTrabajadores] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [reservasOcupadas, setReservasOcupadas] = useState([]);

  const handleServiceChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const service = negocio.servicios.find((servicio) => servicio.id_servicio === selectedId);
    setSelectedService(service);
    setSelectedDate(null);
    setSelectedTime(null);
    setTrabajadores(negocio.trabajadores || []);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => setSelectedTime(time);

  const generateTimeSlots = () => {
    if (!selectedService) return [];
    const duration = selectedService.duracion;
    const slots = [];

    const start = new Date();
    start.setHours(9, 0, 0, 0);

    const end = new Date();
    end.setHours(20, 0, 0, 0);

    const latestStart = new Date(end.getTime() - duration * 60000);
    while (start <= latestStart) {
      slots.push(new Date(start));
      start.setMinutes(start.getMinutes() + duration);
    }

    return slots;
  };

  const handleReservation = async () => {
    if (selectedService && selectedDate && selectedTime) {
      try {
        const adjustedDate = new Date(selectedDate);
        adjustedDate.setDate(adjustedDate.getDate() - 1); // RESTAMOS UN DÍA
        
        const adjustedTime = new Date(selectedTime);
        adjustedDate.setHours(adjustedTime.getHours(), adjustedTime.getMinutes(), 0, 0);
        
        const fecha = adjustedDate.toISOString().split('T')[0];
        const horaInicio = adjustedDate.toTimeString().split(' ')[0];
        const horaFin = calcularHoraFin(horaInicio);

        const reservaData = {
          fecha_hora: fecha,
          hora_inicio: horaInicio,
          hora_fin: horaFin,
          confirmada: true,
          servicio: { id_servicio: selectedService.id_servicio },
          cliente: { id_cliente: 1 },
          ...(selectedWorker && { trabajador: { id_trabajador: parseInt(selectedWorker, 10) } })
        };

        const nuevaReserva = await crearReservaHttps(reservaData);
        console.log("Reserva creada:", nuevaReserva);

        window.history.pushState({ nuevaReserva }, '', '/confirma-reserva');
        window.location.href = '/confirma-reserva';

      } catch (error) {
        console.error("Error al hacer la reserva:", error);
        alert("Error en el servidor al guardar la reserva.");
      }
    }
  };

  function calcularHoraFin(horaInicioStr) {
    const [h, m] = horaInicioStr.split(':').map(Number);
    const fin = new Date(0, 0, 0, h, m + selectedService.duracion);
    return `${fin.getHours().toString().padStart(2, '0')}:${fin.getMinutes().toString().padStart(2, '0')}:00`;
  }

  const fetchReservasOcupadas = async () => {
    if (!selectedWorker || !selectedDate) return;
    const fechaStr = selectedDate.toISOString().split('T')[0];

    try {
      const data = await obtenerReservasHttps();
      const reservasFiltradas = data.filter(r =>
        r.confirmada === true &&
        r.trabajador?.id_trabajador === parseInt(selectedWorker, 10) &&
        r.fecha_hora === fechaStr
      );
      setReservasOcupadas(reservasFiltradas);
    } catch (err) {
      console.error("Error cargando reservas ocupadas:", err);
    }
  };

  useEffect(() => {
    fetchReservasOcupadas();
  }, [selectedWorker, selectedDate]);

  const isSlotOcupado = (slot) => {
    if (!reservasOcupadas.length) return false;
    const slotStart = slot.getHours() * 60 + slot.getMinutes();
    const slotEnd = slotStart + selectedService.duracion;

    return reservasOcupadas.some(r => {
      const [hInicio, mInicio] = r.hora_inicio.split(':').map(Number);
      const [hFin, mFin] = r.hora_fin.split(':').map(Number);
      const reservaInicio = hInicio * 60 + mInicio;
      const reservaFin = hFin * 60 + mFin;
      return slotStart < reservaFin && slotEnd > reservaInicio;
    });
  };

  return (
    <div className="detalle-servicios-container">
      <h1>{negocio.nombre}</h1>
      <p><strong>Dirección:</strong> {negocio.direccion}</p>
      <p><strong>Teléfono:</strong> {negocio.telefono}</p>
      <h2>Servicios disponibles</h2>

      <select onChange={handleServiceChange} defaultValue="">
        <option value="" disabled>Selecciona un servicio</option>
        {negocio.servicios.map(servicio => (
          <option key={servicio.id_servicio} value={servicio.id_servicio}>
            {servicio.nombre} - {servicio.categoria}
          </option>
        ))}
      </select>

      {selectedService && (
        <>
          <p><strong>Precio:</strong> {selectedService.precio}€</p>
          <p><strong>Duración:</strong> {selectedService.duracion} minutos</p>
          <p><strong>Descripción:</strong> {selectedService.descripcion || "Sin descripción."}</p>

          {trabajadores.length > 0 && (
            <div className="worker-selection">
              <label>Selecciona un trabajador:</label>
              <select onChange={e => setSelectedWorker(e.target.value)} defaultValue="">
                <option value="" disabled>Selecciona un trabajador</option>
                {trabajadores.map(trabajador => (
                  <option key={trabajador.id_trabajador} value={trabajador.id_trabajador}>
                    {trabajador.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedWorker && (
            <div className="calendar-container">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                maxDate={new Date(new Date().setMonth(new Date().getMonth() + 4))}
              />
            </div>
          )}
        </>
      )}

      {selectedDate && selectedWorker && (
        <div className="time-selection">
          <h3>Selecciona un horario:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} className="time-slots">
            {generateTimeSlots().map((slot, index) => {
              const ocupado = isSlotOcupado(slot);
              return (
                <button
                  key={index}
                  className="time-slot-button"
                  disabled={ocupado}
                  style={{
                    padding: '10px',
                    cursor: ocupado ? 'not-allowed' : 'pointer',
                    backgroundColor: selectedTime?.getTime() === slot.getTime()
                      ? 'orange' : ocupado ? '#ddd' : 'white',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    opacity: ocupado ? 0.5 : 1
                  }}
                  onClick={() => !ocupado && handleTimeSelect(slot)}
                >
                  {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedTime && (
        <div style={{ marginTop: '20px' }} className="reservation-confirmation">
          <button onClick={handleReservation} className="reservation-button">
            Reservar
          </button>
        </div>
      )}
    </div>
  );
};

export default DetalleServicios;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DetalleServicios.css';

import {
  crearReservaHttps,
  obtenerReservasHttps
} from '../utils/functions/peticionesHTTPS';

const DetalleServicios = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const negocio = location.state?.negocio || {
    id_negocio: 1,
    nombre: "Peluquería Pepo",
    logo_url: "https://via.placeholder.com/150",
    email: "pepa@email.com",
    contraseña: "1236532@",
    trabajadores: [],
    servicios: [],
    direccion: "No disponible",
    telefono: "No disponible",
    lunesAbierto: true,
    martesAbierto: true,
    miercolesAbierto: true,
    juevesAbierto: true,
    viernesAbierto: true,
    sabadoAbierto: false,
    domingoAbierto: false,
    hora_inicio: "09:00:00",
    hora_fin: "20:00:00"
  };

  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [trabajadores, setTrabajadores] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [reservasOcupadas, setReservasOcupadas] = useState([]);
  const [logoExists, setLogoExists] = useState(true);

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
    if (!selectedService || !selectedDate) return [];
    
    const dayOfWeek = selectedDate.getDay();
    const isOpen = 
      (dayOfWeek === 0 && negocio.domingoAbierto) ||
      (dayOfWeek === 1 && negocio.lunesAbierto) ||
      (dayOfWeek === 2 && negocio.martesAbierto) ||
      (dayOfWeek === 3 && negocio.miercolesAbierto) ||
      (dayOfWeek === 4 && negocio.juevesAbierto) ||
      (dayOfWeek === 5 && negocio.viernesAbierto) ||
      (dayOfWeek === 6 && negocio.sabadoAbierto);
    
    if (!isOpen) return [];

    const duration = selectedService.duracion;
    const slots = [];

    const [startHour, startMinute] = negocio.hora_inicio.split(':').map(Number);
    const [endHour, endMinute] = negocio.hora_fin.split(':').map(Number);

    const start = new Date(selectedDate);
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(endHour, endMinute, 0, 0);

    const latestStart = new Date(end.getTime() - duration * 60000);
    
    while (start <= latestStart) {
      slots.push(new Date(start));
      start.setMinutes(start.getMinutes() + duration);
    }

    return slots;
  };

  const isDayDisabled = ({ date }) => {
    const dayOfWeek = date.getDay();
    return !(
      (dayOfWeek === 0 && negocio.domingoAbierto) ||
      (dayOfWeek === 1 && negocio.lunesAbierto) ||
      (dayOfWeek === 2 && negocio.martesAbierto) ||
      (dayOfWeek === 3 && negocio.miercolesAbierto) ||
      (dayOfWeek === 4 && negocio.juevesAbierto) ||
      (dayOfWeek === 5 && negocio.viernesAbierto) ||
      (dayOfWeek === 6 && negocio.sabadoAbierto)
    );
  };

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const handleReservation = async () => {
    if (selectedService && selectedDate && selectedTime) {
      try {
        const adjustedDate = new Date(selectedDate);
        adjustedDate.setDate(adjustedDate.getDate());

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
        navigate(`/confirma-reserva/${nuevaReserva.id_reserva}`);
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
        isSameDay(new Date(r.fecha_hora), selectedDate)
      );
      setReservasOcupadas(reservasFiltradas);
    } catch (err) {
      console.error("Error cargando reservas ocupadas:", err);
    }
  };

  useEffect(() => {
    fetchReservasOcupadas();
    
    if (negocio.logo_url) {
      const img = new Image();
      img.onload = () => setLogoExists(true);
      img.onerror = () => setLogoExists(false);
      img.src = negocio.logo_url;
    }
  }, [selectedWorker, selectedDate, negocio.logo_url]);

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
      {logoExists && negocio.logo_url && (
        <div className="logo-container">
          <img
            src={negocio.logo_url}
            alt={`Logo de ${negocio.nombre}`}
            className="logo-negocio"
          />
        </div>
      )}

      <h1 className="negocio-nombre">{negocio.nombre}</h1>
      <div className="negocio-info">
        <p><strong>Dirección:</strong> {negocio.direccion}</p>
        <p><strong>Teléfono:</strong> {negocio.telefono}</p>
        <p><strong>Horario:</strong> {negocio.hora_inicio} - {negocio.hora_fin}</p>
      </div>

      <div className="service-section">
        <h2 className="section-title">Servicios disponibles</h2>
        <div className="custom-select">
          <select onChange={handleServiceChange} defaultValue="" className="service-select">
            <option value="" disabled>Selecciona un servicio</option>
            {negocio.servicios.map(servicio => (
              <option key={servicio.id_servicio} value={servicio.id_servicio}>
                {servicio.nombre} - {servicio.categoria}
              </option>
            ))}
          </select>
          <span className="select-arrow"></span>
        </div>
      </div>

      {selectedService && (
        <>
          <div className="service-details">
            <p><strong>Precio:</strong> {selectedService.precio}€</p>
            <p><strong>Duración:</strong> {selectedService.duracion} minutos</p>
            <p><strong>Descripción:</strong> {selectedService.descripcion || "Sin descripción."}</p>
          </div>

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
                tileDisabled={isDayDisabled}
              />
            </div>
          )}
        </>
      )}

      {selectedDate && selectedWorker && (
        <div className="time-selection">
          <h3>Selecciona un horario:</h3>
          {generateTimeSlots().length > 0 ? (
            <div className="time-slots">
              {generateTimeSlots().map((slot, index) => {
                const ocupado = isSlotOcupado(slot);
                return (
                  <button
                    key={index}
                    className={`time-slot-button ${ocupado ? 'ocupado' : ''} ${
                      selectedTime?.getTime() === slot.getTime() ? 'selected' : ''
                    }`}
                    disabled={ocupado}
                    onClick={() => !ocupado && handleTimeSelect(slot)}
                  >
                    {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="cerrado-message">
              <p>Este día estamos cerrados. Disculpe las molestias.</p>
              <p>Horario: {negocio.hora_inicio} - {negocio.hora_fin}</p>
            </div>
          )}
        </div>
      )}

      {selectedTime && (
        <div className="reservation-confirmation">
          <button onClick={handleReservation} className="reservation-button">
            Reservar
          </button>
        </div>
      )}
    </div>
  );
};

export default DetalleServicios;
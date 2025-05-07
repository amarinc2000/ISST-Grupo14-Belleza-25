import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { peticionesReserva } from '../utils/functions/peticionesHTTP';
import { peticionesReservaServicios } from '../utils/functions/peticionesHTTP';
import { crearReservaHttps, crearReservaServicioHttps } from '../utils/functions/peticionesHTTPS';
import './DetalleServicios.css';

const DetalleServicios = () => {
  const location = useLocation();
  const negocio = location.state?.negocio || {
    id_negocio: 1,
    nombre: "Peluquería Pepo",
    email: "pepa@email.com",
    contraseña: "1236532@",
    trabajadores: [],
    servicios: [
      {
        id_servicio: 3353,
        categoria: "Peluquería",
        nombre: "Tinte",
        duracion: 30,
        precio: 70.00,
        trabajadorServicios: [],
        descripcion: "Coloración profesional para tu cabello."
      },
      {
        id_servicio: 3352,
        categoria: "Peluquería",
        nombre: "Corte",
        duracion: 45,
        precio: 50.00,
        trabajadorServicios: [],
        descripcion: "Corte de cabello a la moda."
      },
      {
        id_servicio: 3304,
        categoria: "Peluquería",
        nombre: "Peinado",
        duracion: 40,
        precio: 40.00,
        trabajadorServicios: [],
        descripcion: "Peinado profesional para cualquier ocasión."
      }
    ],
    direccion: "No disponible",
    telefono: "No disponible"
  };

  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleServiceChange = (event) => {
    const selectedId = parseInt(event.target.value, 10);
    const service = negocio.servicios.find((servicio) => servicio.id_servicio === selectedId);
    setSelectedService(service);
    setSelectedDate(null);
    setSelectedTime(null);
    // Al seleccionar el servicio, obtener los trabajadores asociados a ese servicio
    const trabajadoresAsociados = negocio.trabajadores || [];
    setTrabajadores(trabajadoresAsociados); // Esto asigna los trabajadores al estado
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = new Date();
    start.setHours(9, 0, 0, 0);
    const end = new Date();
    end.setHours(20, 0, 0, 0);

    while (start < end) {
      slots.push(new Date(start));
      start.setMinutes(start.getMinutes() + 30);
    }

    return slots;
  };

  const handleReservation = async () => {
    if (selectedService && selectedDate && selectedTime) {
      try {
        const adjustedDate = new Date(selectedDate);
        const adjustedTime = new Date(selectedTime);
        adjustedDate.setHours(adjustedTime.getHours(), adjustedTime.getMinutes(), 0, 0);
  
        const year = adjustedDate.getFullYear();
        const month = (adjustedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = adjustedDate.getDate().toString().padStart(2, '0');
        const hours = adjustedDate.getHours().toString().padStart(2, '0');
        const minutes = adjustedDate.getMinutes().toString().padStart(2, '0');
  
        const fecha = `${year}-${month}-${day}`;         // LocalDate
        const horaInicio = `${hours}:${minutes}:00`;     // LocalTime
        const horaFin = calcularHoraFin(hours, minutes); // Calculamos duración
  
        const reservaData = {
          fecha_hora: fecha,
          hora_inicio: horaInicio,
          hora_fin: horaFin,
          confirmada: true,
          servicio: { id_servicio: selectedService.id_servicio },
          cliente: { id_cliente: 1 }, // ⚠️ Reemplazar en producción
          ...(selectedWorker && { trabajador: { id_trabajador: parseInt(selectedWorker, 10) } })
        };

        const nuevaReserva = await crearReservaHttps(reservaData);
        console.log("Reserva creada:", nuevaReserva);
  
        window.history.pushState({ nuevaReserva }, '', '/confirma-reserva');
        window.location.href = '/confirma-reserva';
  
      } catch (error) {
        console.error("Error al hacer la reserva:", error);
        alert("Error en el servidor al guardar la reserva. Revisa la consola para más detalles.");
      }
    }
  };
  
  // ⚙️ Utilidad para calcular hora de fin, ej. +30 min
  function calcularHoraFin(horaStr, minutosStr) {
    const h = parseInt(horaStr);
    const m = parseInt(minutosStr);
    const fin = new Date(0, 0, 0, h, m + 30); // Añade 30 minutos
    return `${fin.getHours().toString().padStart(2, '0')}:${fin.getMinutes().toString().padStart(2, '0')}:00`;
  }

  const [trabajadores, setTrabajadores] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);

  return (
    <div>
      <div>
        <p></p>
      </div>
      <div className="detalle-servicios-container">
        <h1>{negocio.nombre}</h1>
        <p><strong>Dirección:</strong> {negocio.direccion || "No disponible"}</p>
        <p><strong>Teléfono:</strong> {negocio.telefono || "No disponible"}</p>
        <h2>Servicios disponibles</h2>

        <select onChange={handleServiceChange} defaultValue="">
          <option value="" disabled>Selecciona un servicio</option>
          {negocio.servicios.map((servicio) => (
            <option key={servicio.id_servicio} value={servicio.id_servicio}>
              {servicio.nombre} - {servicio.categoria}
            </option>
          ))}
        </select>

        {selectedService && (
          <div className="service-details">
            <p><strong>Precio:</strong> {selectedService.precio}€</p>
            <p><strong>Duración:</strong> {selectedService.duracion} minutos</p>
            <p><strong>Descripción:</strong> {selectedService.descripcion || "Sin descripción disponible."}</p>

            {selectedService && trabajadores.length > 0 && (
              <div className="worker-selection">
                <label>Selecciona un trabajador:</label>
                <select
                  onChange={(e) => setSelectedWorker(e.target.value)} // Actualizamos el trabajador seleccionado
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona un trabajador</option>
                  {trabajadores.map((trabajador) => (
                    <option key={trabajador.id_trabajador} value={trabajador.id_trabajador}>
                      {trabajador.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()}
              maxDate={new Date(new Date().setMonth(new Date().getMonth() + 4))}
            />
            </div>
          </div>
        )}

        {selectedDate && (
          <div className="time-selection">
            <h3>Selecciona un horario:</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} className="time-slots">
              {generateTimeSlots().map((slot, index) => (
                <button className='time-slot-button'
                  key={index}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    backgroundColor: selectedTime === slot ? 'lightblue' : 'white',
                  }}
                  onClick={() => handleTimeSelect(slot)}
                >
                  {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTime && (
          <div style={{ marginTop: '20px' }} className="reservation-confirmation">
            <button
              onClick={handleReservation} // Llamamos a la función para hacer la reserva
              className='reservation-button'
            >
              Reservar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleServicios;


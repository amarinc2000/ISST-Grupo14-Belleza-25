import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { peticionesReserva } from '../utils/functions/peticionesHTTP';
import { peticionesReservaServicios } from '../utils/functions/peticionesHTTP';
import './DetalleServicios.css'; // Asegúrate de tener un archivo CSS para estilos personalizados

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

  const handleReservation = () => {
    if (selectedService && selectedDate && selectedTime) {
      // Combina la fecha seleccionada con la hora seleccionada
      const adjustedDate = new Date(selectedDate);
      const adjustedTime = new Date(selectedTime);

      // Combinamos la fecha y hora, pero asegurándonos de que la zona horaria local se mantenga
      adjustedDate.setHours(adjustedTime.getHours(), adjustedTime.getMinutes(), 0, 0);

      // Para asegurar que se guarda en la zona horaria local, no usamos toISOString()
      const year = adjustedDate.getFullYear();
      const month = (adjustedDate.getMonth() + 1).toString().padStart(2, '0');
      const day = adjustedDate.getDate().toString().padStart(2, '0');
      const hours = adjustedDate.getHours().toString().padStart(2, '0');
      const minutes = adjustedDate.getMinutes().toString().padStart(2, '0');

      // Crear el string de fecha y hora en formato ISO local sin la conversión a UTC
      const fechaHoraSeleccionada = `${year}-${month}-${day}T${hours}:${minutes}:00`;

      const reservaData = {
        usuario: { id_usuario: 1 },  // Aquí pones el ID del usuario que hace la reserva
        fechaHora: fechaHoraSeleccionada,
        confirmada: true,  // La reserva está confirmada por defecto
      };

      const reservaDataServicio = {
        reserva: { id_reserva: 1 },  // Aquí pones el ID de la reserva que acabas de crear
        servicio: { id_servicio: selectedService.id_servicio },  // ID del servicio seleccionado
      };

      // Llamar a la función peticionesReserva con los parámetros necesarios
      peticionesReserva('', 'POST', reservaData)
        .then(response => {
          console.log('Reserva confirmada:', response);
          // Si la respuesta es exitosa, redirigir al usuario o mostrar un mensaje de éxito
            window.location.href = '/confirma-reserva';  // Redirigir a la página de confirmación
            window.history.pushState({ reservaDataServicio }, '', '/confirma-reserva'); // Enviar el estado con la reserva
          })
          .catch(error => {
          console.error('Error al hacer la reserva:', error);
          // Mostrar un mensaje de error si la reserva no se realiza correctamente
        });
        peticionesReservaServicios('', 'POST', reservaDataServicio)
        .then(response => {
          console.log('Reserva confirmada:', response);
          // Si la respuesta es exitosa, redirigir al usuario o mostrar un mensaje de éxito
          window.location.href = '/confirma-reserva';  // Redirigir a la página de confirmación
        })
        .catch(error => {
          console.error('Error al hacer la reserva:', error);
          // Mostrar un mensaje de error si la reserva no se realiza correctamente
        });
    }
  };

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


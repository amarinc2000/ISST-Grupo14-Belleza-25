// ListaReservasTrabajador.js
import React, { useState, useEffect } from 'react';
import { obtenerReservasHttps, obtenerServiciosHttps } from '../utils/functions/peticionesHTTPS';
import './ListaReservas.css'; // Reutilizamos estilos

const ListaReservasTrabajador = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarFuturas, setMostrarFuturas] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        setLoading(true);
        const todas = await obtenerReservasHttps();
        const filtradas = todas.filter(r => r.trabajador?.id_trabajador === 1); // ← Trabajador simulado con id 1

        const reservasConNegocio = await Promise.all(filtradas.map(async (reserva) => {
          try {
            const servicio = await obtenerServiciosHttps(reserva.servicio.id_servicio);
            const negocioNombre = servicio.negocio ? servicio.negocio.nombre : 'Negocio no encontrado';
            return {
              ...reserva,
              negocioNombre
            };
          } catch (error) {
            console.error('Error al obtener servicio:', error);
            return reserva;
          }
        }));

        setReservas(reservasConNegocio);
      } catch (err) {
        console.error('Error al obtener reservas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const getReservaDateTime = (reserva) => {
    const reservaDate = new Date(reserva.fecha_hora);
    const [hInicio, mInicio] = reserva.hora_inicio.split(":").map(Number);
    reservaDate.setHours(hInicio, mInicio, 0, 0);
    return reservaDate;
  };

  const ordenarReservas = (reservasArray) => {
    return [...reservasArray].sort((a, b) => getReservaDateTime(a) - getReservaDateTime(b));
  };

  const now = new Date();
  const reservasFuturas = ordenarReservas(reservas.filter(r => getReservaDateTime(r) >= now));
  const reservasPasadas = ordenarReservas(reservas.filter(r => getReservaDateTime(r) < now));
  const reservasAMostrar = mostrarFuturas ? reservasFuturas : reservasPasadas;
  const tituloSeccion = mostrarFuturas ? "Reservas Futuras" : "Reservas Pasadas";

  return (
    <div className="lista-reservas-container">
      <h2>Reservas del Trabajador</h2>
      <div className="tabs-reservas">
        <button className={`tab ${mostrarFuturas ? 'activo' : ''}`} onClick={() => setMostrarFuturas(true)}>Futuras</button>
        <button className={`tab ${!mostrarFuturas ? 'activo' : ''}`} onClick={() => setMostrarFuturas(false)}>Pasadas</button>
      </div>
      <h3 className="titulo-seccion">{tituloSeccion}</h3>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Cargando reservas...</p>
        </div>
      ) : reservasAMostrar.length === 0 ? (
        <p>No hay reservas para mostrar.</p>
      ) : (
        <div className="reservas-grid">
          {reservasAMostrar.map(reserva => {
            const fechaFormateada = new Date(reserva.fecha_hora).toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            });

            return (
              <div className="reserva-card" key={reserva.id_reserva}>
                <h3>{reserva.servicio?.nombre}</h3>
                <p><strong>Cliente:</strong> {reserva.cliente?.nombre}</p>
                <p><strong>Fecha:</strong> {fechaFormateada}</p>
                <p><strong>Hora:</strong> {reserva.hora_inicio} - {reserva.hora_fin}</p>
                <p><strong>Negocio:</strong> {reserva.negocioNombre}</p>
                <p className={`reserva-estado ${!mostrarFuturas ? 'pasada' : reserva.confirmada ? 'confirmada' : 'pendiente'}`}>
                  {!mostrarFuturas ? 'Pasada' : reserva.confirmada ? 'Confirmada' : 'Pendiente'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListaReservasTrabajador;

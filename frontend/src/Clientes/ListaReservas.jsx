import React, { useState, useEffect } from 'react';
import { obtenerReservasHttps } from '../utils/functions/peticionesHTTPS';
import './ListaReservas.css';

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarFuturas, setMostrarFuturas] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const todas = await obtenerReservasHttps();
        const filtradas = todas.filter(r => r.cliente?.id_cliente === 1); //CUANDO HAYA LOGIN, CAMBIAR A ID DEL CLIENTE LOGUEADO
        setReservas(filtradas);
      } catch (err) {
        console.error('Error al obtener reservas:', err);
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
    return [...reservasArray].sort((a, b) => {
      const dateA = getReservaDateTime(a);
      const dateB = getReservaDateTime(b);
      return dateA - dateB;
    });
  };

  const now = new Date();
  const reservasFuturas = ordenarReservas(reservas.filter(r => {
    const reservaDate = getReservaDateTime(r);
    return reservaDate >= now;
  }));
  
  const reservasPasadas = ordenarReservas(reservas.filter(r => {
    const reservaDate = getReservaDateTime(r);
    return reservaDate < now;
  }));

  const reservasAMostrar = mostrarFuturas ? reservasFuturas : reservasPasadas;
  const tituloSeccion = mostrarFuturas ? "Reservas Actuales" : "Reservas Pasadas";

  return (
    <div className="lista-reservas-container">
      <h2>Mis Reservas</h2>
      <div className="tabs-reservas">
        <button 
          className={`tab ${mostrarFuturas ? 'activo' : ''}`}
          onClick={() => setMostrarFuturas(true)}>
          Reservas Actuales
        </button>
        <button 
          className={`tab ${!mostrarFuturas ? 'activo' : ''}`}
          onClick={() => setMostrarFuturas(false)}>
          Reservas Pasadas
        </button>
      </div>
      
      <h3 className="titulo-seccion">{tituloSeccion}</h3>
      
      {reservasAMostrar.length === 0 ? (
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
                <div className="reserva-card-header">
                  <h3 className="reserva-servicio">{reserva.servicio?.nombre}</h3>
                  <p className="reserva-fecha">
                    {fechaFormateada}
                  </p>
                  <p className="reserva-horas">
                    <span>Hora inicio:</span> {reserva.hora_inicio} - <span>Hora fin:</span> {reserva.hora_fin}
                  </p>
                </div>
                {/*
                <div className="reserva-negocio">
                  {Aquí irá el campo del negocio si alguien consigue que se haga bien la petición}
                </div>
                */}
                <div className="reserva-detalles">
                  <p><span>Trabajador:</span> {reserva.trabajador?.nombre || 'Sin asignar'}</p>
                  <p className={`reserva-estado ${
                    !mostrarFuturas ? 'pasada' : 
                    reserva.confirmada ? 'confirmada' : 'pendiente'
                  }`}>
                    {!mostrarFuturas ? 'Pasada' : 
                     reserva.confirmada ? 'Confirmada' : 'Pendiente'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListaReservas;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerReservasHttps, obtenerServiciosHttps } from '../utils/functions/peticionesHTTPS';
import './ConfirmaReserva.css';

const ConfirmaReserva = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [minLoadingComplete, setMinLoadingComplete] = useState(false);

  useEffect(() => {
    // Temporizador para la carga mínima de 1 segundo
    const minLoadingTimer = setTimeout(() => {
      setMinLoadingComplete(true);
    }, 1000);

    const cargarReserva = async () => {
      try {
        const todas = await obtenerReservasHttps();
        const miReserva = todas.find(r => r.id_reserva === parseInt(id));
        if (!miReserva) return;

        const servicio = await obtenerServiciosHttps(miReserva.servicio.id_servicio);
        const negocioNombre = servicio.negocio ? servicio.negocio.nombre : 'Negocio no encontrado';

        setReserva({
          ...miReserva,
          negocioNombre
        });
      } catch (err) {
        console.error("Error cargando la reserva:", err);
      } finally {
        // Esperamos a que termine el mínimo de 1 segundo antes de quitar el loading
        setTimeout(() => {
          if (minLoadingComplete) {
            setLoading(false);
          }
        }, 0);
      }
    };

    cargarReserva();

    return () => clearTimeout(minLoadingTimer);
  }, [id, minLoadingComplete]);

  // Mostrar spinner si loading es true o si no ha pasado el mínimo de 1 segundo
  const showLoading = loading || !minLoadingComplete;

  if (showLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando detalles de tu reserva...</p>
      </div>
    );
  }

  if (!reserva) {
    return (
      <div className="confirma-reserva-container">
        <h2>No se encontró la reserva</h2>
        <button 
          onClick={() => navigate('/')} 
          className="btn-ir-reservas"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const fechaFormateada = new Date(reserva.fecha_hora).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="confirma-reserva-container">
      <h1>¡Reserva Confirmada! 🎉</h1>
      <p className="subtitle">Gracias por confiar en nuestro servicio</p>
      
      <div className="reserva-card">
        <div className="reserva-card-header">
          <h3>{reserva.servicio?.nombre}</h3>
          <p><strong>Fecha:</strong> {fechaFormateada}</p>
          <p><strong>Hora:</strong> {reserva.hora_inicio.substring(0, 5)} - {reserva.hora_fin.substring(0, 5)}</p>
        </div>
        
        <div className="reserva-negocio">
          <p><strong>Negocio:</strong> {reserva.negocioNombre}</p>
        </div>
        
        <div className="reserva-detalles">
          <p><strong>Trabajador:</strong> {reserva.trabajador?.nombre || 'Sin asignar'}</p>
          <p>
            <strong>Estado:</strong> 
            <span className={reserva.confirmada ? 'confirmada' : 'pendiente'}>
              {reserva.confirmada ? 'Confirmada' : 'Pendiente'}
            </span>
          </p>
        </div>
      </div>

      <button 
        onClick={() => navigate('/mis-reservas')} 
        className="btn-ir-reservas"
      >
        Ver Mis Reservas
      </button>
    </div>
  );
};

export default ConfirmaReserva;
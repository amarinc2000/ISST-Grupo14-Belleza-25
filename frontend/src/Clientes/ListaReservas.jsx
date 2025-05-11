import React, { useState, useEffect } from 'react';
import { obtenerReservasHttps, obtenerServiciosHttps, eliminarReservaHttps } from '../utils/functions/peticionesHTTPS';
import './ListaReservas.css';
import ModalConfirmacion from './ModalConfirmacion'; // Importamos el modal


const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarFuturas, setMostrarFuturas] = useState(true);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar el modal
  const [reservaAEliminar, setReservaAEliminar] = useState(null); // ID de la reserva que queremos eliminar
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  let id_cliente_login = user?.cliente?.id_cliente;

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        setLoading(true); // Indicamos que comienza la carga
        const todas = await obtenerReservasHttps();
        const filtradas = todas.filter(r => r.cliente?.id_cliente === id_cliente_login); //CUANDO HAYA LOGIN, CAMBIAR A ID DEL CLIENTE LOGUEADO

        // Usamos Promise.all para hacer las peticiones en paralelo
        const reservasConNegocio = await Promise.all(filtradas.map(async (reserva) => {
          try {
            const servicio = await obtenerServiciosHttps(reserva.servicio.id_servicio); // Llamamos al servicio
            const negocioNombre = servicio.negocio ? servicio.negocio.nombre : 'Negocio no encontrado'; // Obtenemos el nombre del negocio
            return {
              ...reserva,
              negocioNombre: negocioNombre // Añadimos el nombre del negocio a la reserva
            };
          } catch (error) {
            console.error('Error al obtener servicio:', error);
            return reserva; // Si hay error, devolvemos la reserva sin cambios
          }
        }));

        setReservas(reservasConNegocio);
      } catch (err) {
        console.error('Error al obtener reservas:', err);
      } finally {
        setLoading(false); // Terminamos la carga
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

  const handleCancelarReserva = async () => {
    if (reservaAEliminar) {
      try {
        await eliminarReservaHttps(reservaAEliminar); // Eliminar reserva
        setReservas(reservas.filter(reserva => reserva.id_reserva !== reservaAEliminar)); // Eliminar de la UI
        setModalVisible(false); // Cerrar el modal
      } catch (error) {
        console.error("Error al cancelar la reserva:", error);
        alert("Hubo un problema al cancelar la reserva. Intenta nuevamente.");
      }
    }
  };

  const handleAbrirModal = (idReserva) => {
    setReservaAEliminar(idReserva);
    setModalVisible(true); // Mostrar el modal
  };

  const handleCerrarModal = () => {
    setModalVisible(false); // Cerrar el modal sin hacer nada
  };

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

      {loading ? ( // Si está cargando, mostramos un spinner
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
                <div className="reserva-card-header">
                  <h3 className="reserva-servicio">{reserva.servicio?.nombre}</h3>
                  <p className="reserva-fecha">
                    {fechaFormateada}
                  </p>
                  <p className="reserva-horas">
                    <span>Hora inicio:</span> {reserva.hora_inicio} - <span>Hora fin:</span> {reserva.hora_fin}
                  </p>
                </div>
                <div className="reserva-negocio">
                  <p><strong>Negocio:</strong> {reserva.negocioNombre}</p> {/* Aquí se muestra el nombre del negocio */}
                </div>
                <div className="reserva-detalles">
                  <p><span>Trabajador:</span> {reserva.trabajador?.nombre || 'Sin asignar'}</p>
                  <p className={`reserva-estado ${!mostrarFuturas ? 'pasada' : reserva.confirmada ? 'confirmada' : 'pendiente'}`}>
                    {!mostrarFuturas ? 'Pasada' : reserva.confirmada ? 'Confirmada' : 'Pendiente'}
                  </p>
                </div>
                {/* Mostrar el botón solo para las reservas futuras */}
                {mostrarFuturas && (
                  <button
                    className="btn-cancelar"
                    onClick={() => handleAbrirModal(reserva.id_reserva)}>
                    Cancelar Reserva
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {modalVisible && (
        <ModalConfirmacion
          mensaje="¿Estás seguro de que quieres cancelar la reserva? Este cambio no se puede deshacer."
          onConfirmar={handleCancelarReserva}
          onCancelar={handleCerrarModal}
        />
      )}
    </div>
  );
};

export default ListaReservas;

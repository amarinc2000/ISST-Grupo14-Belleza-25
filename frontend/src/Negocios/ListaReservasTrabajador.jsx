// Este componente muestra una lista de reservas asociadas a un trabajador, las reservas del día actual
// Aparece en /negocio/
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaReservasTrabajador = () => {
  // 1. Constante provisional para el trabajador
  const trabajadorId = 123; // <- Cámbialo si quieres probar con otro id

  // 2. Estado para reservas, carga y posible error
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Lógica de efecto para obtener datos
  useEffect(() => {
    axios
      .get('/api/reservas') // Ajusta la URL si tu endpoint es otro
      .then((response) => {
        // Filtrar por id_trabajador
        const filtradas = response.data.filter(
          (r) => r.id_trabajador === trabajadorId
        );
        setReservas(filtradas);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudieron cargar las reservas.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [trabajadorId]);

  // 4. Renderizado
  if (loading) return <p>Cargando reservas…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;
  if (reservas.length === 0)
    return <p>No tienes ninguna reserva asignada.</p>;

  return (
    <div className="space-y-4">
      {reservas.map((reserva) => (
        <div
          key={reserva.id}
          className="p-4 border rounded shadow-sm hover:shadow-md"
        >
          <p><strong>Servicio:</strong> {reserva.servicio}</p>
          <p><strong>Cliente:</strong> {reserva.cliente}</p>
          <p><strong>Fecha:</strong> {reserva.fecha}</p>
          {/* Añade más campos según tu modelo */}
        </div>
      ))}
    </div>
  );
};

export default ListaReservasTrabajador;

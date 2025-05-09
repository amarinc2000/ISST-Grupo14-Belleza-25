import React, { useEffect, useState } from "react";
import { obtenerTrabajadoresHttps } from "../utils/functions/peticionesHTTPS";
import "./InformacionTrabajador.css";

const InformacionTrabajador = () => {
  const [trabajador, setTrabajador] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrabajador = async () => {
      try {
        setLoading(true);
        const trabajadores = await obtenerTrabajadoresHttps();
        const seleccionado = trabajadores.find(t => t.id_trabajador === 1);
        setTrabajador(seleccionado);
      } catch (error) {
        console.error("Error al obtener trabajador:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrabajador();
  }, []);

  if (loading) return <p>Cargando información del trabajador...</p>;
  if (!trabajador) return <p>No se encontró información del trabajador.</p>;

  const negocio = trabajador.negocio;

  return (
    <div className="info-trabajador-card">
      <h3>{trabajador.nombre}</h3>
      <p><strong>Rol:</strong> {trabajador.is_admin ? "Administrador" : "Trabajador"}</p>

      <h4>Negocio Asociado</h4>
      <p><strong>Nombre:</strong> {negocio.nombre}</p>
      <p><strong>Descripción:</strong> {negocio.descripcion}</p>
      <p><strong>Dirección:</strong> {negocio.direccion}</p>
      <p><strong>Teléfono:</strong> {negocio.telefono}</p>
      <p><strong>Email:</strong> {negocio.email}</p>
      <p><strong>Horario:</strong> {negocio.hora_inicio} - {negocio.hora_fin}</p>

      {negocio.imagen && (
        <div className="negocio-imagen">
          <img src={negocio.imagen} alt="Logo del negocio" />
        </div>
      )}
    </div>
  );
};

export default InformacionTrabajador;

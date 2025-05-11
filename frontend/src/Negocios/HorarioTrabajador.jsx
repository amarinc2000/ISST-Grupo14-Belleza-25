
// Este componente muestra informacioón relevante para el trabajador como horario
// Aparece en /negocio/
import React, { useEffect, useState } from 'react';
import { peticioneshttps } from "../utils/functions/peticionesHTTPS";
import "./InformacionTrabajador.css";

const HorarioTrabajo = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [error, setError] = useState(null);
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const idtrabajadores = user?.trabajador?.id_trabajador; // Cambia este id por la constante para que se actualice en funcion de ella PARA CESAR
  useEffect(() => {
    const obtenerTrabajadores = async () => {
      try {
        const data = await peticioneshttps("trabajadores", "informacion", idtrabajadores);
        setTrabajadores(Array.isArray(data) ? data : [data]); // por si viene solo uno
      } catch (err) {
        console.error('Error al obtener trabajadores:', err);
        setError('No se pudieron cargar los trabajadores.');
      }
    };

    obtenerTrabajadores();
  }, []);

  if (error) return <div className="info-trabajador-card">{error}</div>;

  return (
    <div>
      <ul>
        {trabajadores.map((trabajador) => (
          <ul key={trabajador.id_trabajador} className="info-trabajador-card">
            <h3><strong>{trabajador.nombre}</strong> </h3>
            <p><strong>Negocio:</strong> {trabajador.negocio?.nombre}</p>
            <p><strong>Horario de atención:</strong> {trabajador.negocio?.hora_inicio} - {trabajador.negocio?.hora_fin}</p>

            <p><strong>Días de apertura:</strong></p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"].map((dia) => {
                const abierto = trabajador.negocio?.[`${dia}Abierto`];
                return (
                  <div
                    key={dia}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      backgroundColor: abierto ? "#f3c1e9" : "#e0e0e0",
                      color: "#333",
                      border: "1px solid #ddd",
                      minWidth: "90px",
                      textAlign: "center",
                      textTransform: "capitalize"
                    }}
                  >
                    {dia}
                  </div>
                );
              })}
            </div>
            <p></p>
            <p></p>
            <p>
              <strong>📞 Teléfono:</strong> {trabajador.negocio?.telefono}
            </p>
            <p>
              <strong>✉️ Email:</strong>{" "}
              <a href={`mailto:${trabajador.negocio?.email}`}>
                {trabajador.negocio?.email}
              </a>
            </p>
          </ul>
        ))}
      </ul>
    </div>
  );
}



export default HorarioTrabajo;


//CODIGO DE VICTORRR Y JAVII
/* import React, { useEffect, useState } from "react";
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

 */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./Lista_Servicios.css";

const Servicios = () => {
  const [servicios, setServicios] = useState([
    // DATOS SIMULADOS: Reemplazar este array con los datos reales de la base de datos
    {
      id_servicio: 1,
      nombre: "Corte de pelo",
      descripcion: "Un corte de pelo profesional.",
    },
    {
      id_servicio: 2,
      nombre: "Manicura",
      descripcion: "Manicura completa con esmalte.",
    },
    {
      id_servicio: 3,
      nombre: "Pedicura",
      descripcion: "Pedicura relajante con exfoliación.",
    },
  ]); // Estado para almacenar los servicios

  const navigate = useNavigate();
  const location = useLocation();

  // Variables relacionadas con el negocio
  const { nombre_negocio, descripcion_negocio } = location.state || {
    // DATOS SIMULADOS: Reemplazar estas variables con los datos reales del negocio
    nombre_negocio: "Negocio no disponible",
    descripcion_negocio: "Descripción no disponible",
  };

  // Función para manejar el clic en un servicio
  const handleServiceClick = (servicio) => {
    navigate("/detalle-servicio", { state: servicio });
  };

  return (
    <div>
      <Navbar />
      <div className="service-list-container">
        <h1>{nombre_negocio}</h1>
        <p>{descripcion_negocio}</p>
        <p className="simulated-data-warning">
          <strong>Nota:</strong> Los datos mostrados son simulados.
        </p>
        <div className="service-cards">
          {servicios.length > 0 ? (
            servicios.map((servicio) => (
              <div
                key={servicio.id_servicio}
                className="service-card"
                onClick={() => handleServiceClick(servicio)}
              >
                <h2>{servicio.nombre || "Servicio no disponible"}</h2>
                <p>{servicio.descripcion || "Descripción no disponible"}</p>
              </div>
            ))
          ) : (
            <p>No hay servicios disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Servicios;
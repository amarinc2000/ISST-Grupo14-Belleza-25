import React, { useState } from "react";
import './NuevoServicio.css'; // Asegúrate de tener el archivo CSS correspondiente

const FormularioDinamico = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    duracion: "",
    descripcion: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="formulario">
      <h2 className="titulo">CREAR NUEVO SERVICIO</h2>
      
      {/* Campo Nombre */}
      <input
        type="text"
        name="nombre"
        placeholder="Nombre Servicio"
        value={formData.nombre}
        onChange={handleChange}
        className="input"
      />
      
      {/* Campo Categoría */}
      {formData.nombre && (
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="select"
        >
          <option value="">Seleccionar categoría</option>
          <option value="opcion1">Peluquería</option>
          <option value="opcion2">Uñas</option>
          <option value="opcion1">Pestañas</option>
          <option value="opcion2">Depilación</option>
          <option value="opcion1">Faciales</option>
          <option value="opcion2">Corporales</option>
          <option value="opcion2">Masajes</option>
          <option value="opcion2">Bronceado</option>
        </select>
      )}
      
      {/* Campo Duración */}
      {formData.categoria && (
        <select
          name="duracion"
          value={formData.duracion}
          onChange={handleChange}
          className="select"
        >
          <option value="">Seleccionar duración</option>
          <option value="30min">30 Min</option>
          <option value="60min">60 Min</option>
          <option value="90min">90 Min</option>
          <option value="120min">120 Min</option>
        </select>
      )}
      
      {/* Campo Descripción */}
      {formData.duracion && (
        <textarea
          name="descripcion"
          placeholder="Descripción..."
          value={formData.descripcion}
          onChange={handleChange}
          className="textarea"
        />
      )}
      
      {/* Botón Crear */}
      {formData.descripcion && (
        <button className="boton">CREAR</button>
      )}
    </div>
  );
};

export default FormularioDinamico;

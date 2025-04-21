import React, { useState } from "react";
import './NuevoServicio.css'; // Asegúrate de tener el archivo CSS correspondiente
import { creacionServicioNegocio } from "../utils/functions/peticionesHTTP"; // Importación de la función
import { peticionesServicio } from "../utils/functions/peticionesHTTP";

const FormularioDinamico = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    duracion: "",
    descripcion: "",
    precio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Asegurar que el precio tenga máximo dos decimales
    if (name === "precio") {
      newValue = parseFloat(value).toFixed(2);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // Función que maneja la creación del servicio
  const handleCreate = async () => {
    try {
      // Llamada a la función `peticionesServicio` pasando los datos del formulario
      await peticionesServicio('',"POST",{
        "categoria":formData.categoria,
        "nombre":formData.nombre,
        "duracion":formData.duracion,
        "descripcion":formData.descripcion,
        "precio":formData.precio,
        "negocio":{"id_negocio" : 4752}
      });
      // Después de la llamada, reiniciamos el formulario
      setFormData({
        nombre: "",
        categoria: "",
        duracion: "",
        descripcion: "",
        precio: ""
      });

      // Puedes agregar aquí algún tipo de mensaje de éxito si es necesario

    } catch (error) {
      // Manejo de errores en caso de que falle la llamada
      console.error("Error al crear el servicio:", error);
    }
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
          <option value="peluqueria">Peluquería</option>
          <option value="unas">Uñas</option>
          <option value="pestanas">Pestañas</option>
          <option value="depilacion">Depilación</option>
          <option value="faciales">Faciales</option>
          <option value="corporales">Corporales</option>
          <option value="masajes">Masajes</option>
          <option value="bronceado">Bronceado</option>
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
          <option value="30">30 Min</option>
          <option value="60">60 Min</option>
          <option value="90">90 Min</option>
          <option value="120">120 Min</option>
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

      {/* Campo Precio */}
      {formData.descripcion && (
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          className="input w-full border-none focus:outline-none text-right"
          step="0.01"
          min="0"
          max="9999.99"
          pattern="^\d+(\.\d{1,2})?$"
        />
      )}
      
      {/* Botón Crear */}
      {formData.precio && (
        <button className="boton" onClick={handleCreate}>CREAR</button>
      )}
    </div>
  );
};

export default FormularioDinamico;
import React, { useState } from "react";
import './NuevoServicio.css';
import { peticioneshttps } from "../utils/functions/peticionesHTTPS";

const NuevoServicio = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    duracion: "",
    descripcion: "",
    precio: ""
  });

  const [trabajadorData, setTrabajadorData] = useState({
    nombre: "",
    username: "",
    password: "",
    is_admin: false
  });

  const [tab, setTab] = useState("servicio"); // 'servicio' o 'trabajador'

  const handleChangeServicio = (e) => {
    const { name, value } = e.target;
    let newValue = name === "precio" ? parseFloat(value).toFixed(2) : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleChangeTrabajador = (e) => {
    const { name, value, type, checked } = e.target;
    setTrabajadorData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleCreateServicio = async () => {
    try {
      await peticioneshttps("servicios", "crear", null, {
        categoria: formData.categoria,
        nombre: formData.nombre,
        duracion: formData.duracion,
        descripcion: formData.descripcion,
        precio: formData.precio,
        negocio: { id_negocio: 4752 }
      });

      setFormData({
        nombre: "",
        categoria: "",
        duracion: "",
        descripcion: "",
        precio: ""
      });

    } catch (error) {
      console.error("Error al crear servicio:", error);
    }
  };

  const handleCreateTrabajador = async () => {
    try {
      // 1. Crear Usuario
      const nuevoUsuario = await peticioneshttps("usuarios", "crear", null, {
        username: trabajadorData.username,
        password: trabajadorData.password,
        rol: "TRABAJADOR"
      });

      // 2. Crear Trabajador vinculado a ese usuario
      await peticioneshttps("trabajadores", "crear", null, {
        nombre: trabajadorData.nombre,
        is_admin: trabajadorData.is_admin,
        negocio: { id_negocio: 4752 },
        usuario: { id_usuario: nuevoUsuario.id_usuario }
      });

      setTrabajadorData({
        nombre: "",
        username: "",
        password: "",
        is_admin: false
      });

    } catch (error) {
      console.error("Error al crear trabajador:", error);
    }
  };

  return (
    <div className="formulario">
      <div className="tabs">
        <button
          className={`tab ${tab === "servicio" ? "activo" : ""}`}
          onClick={() => setTab("servicio")}
        >
          Crear Servicio
        </button>
        <button
          className={`tab ${tab === "trabajador" ? "activo" : ""}`}
          onClick={() => setTab("trabajador")}
        >
          Crear Trabajador
        </button>
      </div>

      {/* FORMULARIO CREAR SERVICIO (NO SE TOCA NADA DEL EXISTENTE) */}
      {tab === "servicio" && (
        <>
          <h2 className="titulo">CREAR NUEVO SERVICIO</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre Servicio"
            value={formData.nombre}
            onChange={handleChangeServicio}
            className="input"
          />

          {formData.nombre && (
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChangeServicio}
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

          {formData.categoria && (
            <select
              name="duracion"
              value={formData.duracion}
              onChange={handleChangeServicio}
              className="select"
            >
              <option value="">Seleccionar duración</option>
              <option value="30">30 Min</option>
              <option value="60">60 Min</option>
              <option value="90">90 Min</option>
              <option value="120">120 Min</option>
            </select>
          )}

          {formData.duracion && (
            <textarea
              name="descripcion"
              placeholder="Descripción..."
              value={formData.descripcion}
              onChange={handleChangeServicio}
              className="textarea"
            />
          )}

          {formData.descripcion && (
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChangeServicio}
              className="input w-full border-none focus:outline-none text-right"
              step="0.01"
              min="0"
              max="9999.99"
              pattern="^\d+(\.\d{1,2})?$"
            />
          )}

          {formData.precio && (
            <button className="boton" onClick={handleCreateServicio}>
              CREAR
            </button>
          )}
        </>
      )}

      {/* FORMULARIO CREAR TRABAJADOR */}
      {tab === "trabajador" && (
        <>
          <h2 className="titulo">CREAR NUEVO TRABAJADOR</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre del trabajador"
            value={trabajadorData.nombre}
            onChange={handleChangeTrabajador}
            className="input"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={trabajadorData.username}
            onChange={handleChangeTrabajador}
            className="input"
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={trabajadorData.password}
            onChange={handleChangeTrabajador}
            className="input"
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="is_admin"
              checked={trabajadorData.is_admin}
              onChange={handleChangeTrabajador}
            />
            Es administrador
          </label>

          {trabajadorData.nombre && trabajadorData.username && trabajadorData.password && (
            <button className="boton" onClick={handleCreateTrabajador}>
              CREAR TRABAJADOR
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default NuevoServicio;

import React from "react";
import FormularioDinamico from "./NuevoServicio";
import ListaReservasTrabajador from "./ListaReservasTrabajador";
import "./AdminMenu.css";

function AdminMenu() {
  return (
    <div className="admin-menu">
      <div className="right-column">
        <div className="botones">
          <div className="boton-nuevo-servicio"></div>
          <div className="boton-nuevo-trabajador"></div>
        </div>
        <div className="formulario">
          <FormularioDinamico />
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;

import React from "react";
import FormularioDinamico from "./NuevoServicio";
import ListaServicios from "./ListaServicios";

import "./AdminMenu.css";

function AdminMenu() {
  return (
    <div className="admin-menu">
      <div className="left-column">
        <ListaServicios idNegocio={1} />
       
      </div>
      <div className="formulario">
        <FormularioDinamico />
      </div>
    </div>
  );
}

export default AdminMenu;
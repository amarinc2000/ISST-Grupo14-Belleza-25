import React from "react";
import FormularioDinamico from "./NuevoServicio";
import ListaServicios from "./ListaServicios";
import "./AdminMenu.css"; // Asegúrate de tener este archivo CSS para estilos

function AdminMenu() {
  return (
    <div className="admin-menu">
        <div className="left-column">
        <ListaServicios idNegocio={1} /> {/* Cambia el ID según sea necesario */}    
        </div>
        <div className="right-column">
            <div className="botones">
                <div className= "boton-nuevo-servicio">

                </div>
                <div className= "boton-nuevo-trabajador">
                </div>
            </div>
            <div className="formulario">
                <FormularioDinamico />
            </div>
        </div>
    </div>
    );
}

export default AdminMenu;
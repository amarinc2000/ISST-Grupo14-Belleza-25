// Este componente permite ver un listado con todos los servicios existentes en la base de datos.
// Aparace en la ruta /negocio/AdminMenu
import React from "react";
import { peticionesServicio } from "../utils/functions/peticionesHTTPS";

const ListaServicios = () => {
//REVISAR
    return(
        <div className="container-ListaServicios">
            <h1>Servicios</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Duración</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="servicios-lista">
                    {/* Aquí se llenará la tabla con los servicios */}
                </tbody>
            </table>
        </div>
    );
}


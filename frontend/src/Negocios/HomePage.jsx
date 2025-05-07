import React from "react";
import ListaReservasTrabajador from "./ListaReservasTrabajador";
//import Valoraciones from "./Valoraciones";
import InformacionTrabajador from "./HorarioTrabajador";
import "./HomePage.css"; // Asegúrate de tener este archivo CSS para estilos

/* HomePage de trabajador */
function HomePageNegocio() {
    return (
        <div className="homepage">
            {/* Columna izquierda: Perfil y Valoraciones */}
            <div className="left-column">
                <div className="perfil">
                    <h2>Espacio para Perfil</h2>
                    <InformacionTrabajador />
                </div>
                <div className="valoraciones">
                    <h2> Espacio para Valoraciones</h2>

                </div>
            </div>
            {/* Columna derecha: Reservas */}
            <div className="right-column">
                <h2>Espacio para Reservas</h2>
                <ListaReservasTrabajador />
            </div>
        </div>
    );
}

export default HomePageNegocio;
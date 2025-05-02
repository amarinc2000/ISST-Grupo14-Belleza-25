// Este componente muestra informacioón relevante para el trabajador como horario
// Aparece en /negocio/
import React from "react";

function InformacionTrabajador() {
    return (
        <div className="informacion-trabajador">
            <h2>Información del Trabajador</h2>
            <p><strong>Nombre:</strong> Juan Pérez</p>
            <p><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 5:00 PM</p>
            <p><strong>Teléfono:</strong> +34 123 456 789</p>
            <p><strong>Email:</strong></p>
        </div>);
}

export default InformacionTrabajador;
// Este componente muestra informacioón relevante para el trabajador como horario
// Aparece en /negocio/
import React, { useEffect, useState } from 'react';
import { peticioneshttps } from "../utils/functions/peticionesHTTPS";


const HorarioTrabajo = () => {
    const [trabajadores, setTrabajadores] = useState([]);
    const [error, setError] = useState(null);
    const idtrabajadores = 4; // Cambia este id por la constante para que se actualice en funcion de ella PARA CESAR
    useEffect(() => {
        const obtenerTrabajadores = async () => {
            try {
                const data = await peticioneshttps("trabajadores", "informacion", idtrabajadores);
                setTrabajadores(Array.isArray(data) ? data : [data]); // por si viene solo uno
            } catch (err) {
                console.error('Error al obtener trabajadores:', err);
                setError('No se pudieron cargar los trabajadores.');
            }
        };

        obtenerTrabajadores();
    }, []);

    if (error) return <div>{error}</div>;
    return (
        <div>
            
            <ul>
                {trabajadores.map((trabajador) => (
                    <li key={trabajador.id_trabajador}>
                     
                        
                            {trabajadores.map((trabajador) => (
                                <li
                                    key={trabajador.id_trabajador}
                                    style={{
                                        border: "1px solid #ccc",
                                        padding: "1rem",
                                        marginBottom: "1rem",
                                        borderRadius: "8px"
                                    }}
                                >
                                    <p><strong>Nombre:</strong> {trabajador.nombre}</p>
                                    <p><strong>Negocio:</strong> {trabajador.negocio?.nombre}</p>
                                    <p><strong>Horario de atención:</strong> {trabajador.negocio?.hora_inicio} - {trabajador.negocio?.hora_fin}</p>

                                    <p><strong>Días de apertura:</strong></p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        {[
                                            "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"
                                        ].map((dia) => {
                                            const abierto = trabajador.negocio?.[`${dia}Abierto`];
                                            return (
                                                <div
                                                    key={dia}
                                                    style={{
                                                        padding: "6px 12px",
                                                        borderRadius: "6px",
                                                        backgroundColor: abierto ? "#f3c1e9" : "#e0e0e0", // rosa claro o rojo claro
                                                        color: "#333",
                                                        border: "1px solid #ddd",
                                                        minWidth: "90px",
                                                        textAlign: "center",
                                                        textTransform: "capitalize"
                                                    }}
                                                >
                                                    {dia}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </li>
                            ))}
                        
                    </li>
                ))}
            </ul>
        </div>
    )

}

/* function InformacionTrabajador() {
    return (
        <div className="informacion-trabajador">
            <h2>Información del Trabajador</h2>
            <p><strong>Nombre:</strong> Juan Pérez</p>
            <p><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 5:00 PM</p>
            <p><strong>Teléfono:</strong> +34 123 456 789</p>
            <p><strong>Email:</strong></p>
        </div>);
}
 */

export default HorarioTrabajo;
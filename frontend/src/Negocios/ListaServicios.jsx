import React, { useEffect, useState } from 'react';
import { peticioneshttps, peticioneshttpsEliminarServicio } from "../utils/functions/peticionesHTTPS";
import './ListaServicios.css';

const REFRESH_INTERVAL = 1000; // 10 segundos

const ListaServicios = () => {
    const [servicios, setServicios] = useState([]);
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const idNegocio = user?.trabajador?.negocio?.id_negocio;

    // Obtener servicios del negocio
    const obtenerServicios = async () => {
        try {
            const data = await peticioneshttps("negocios", "informacion", idNegocio);
            setServicios(data.servicios || []);
        } catch (error) {
            console.error('Error al obtener los servicios:', error);
        }
    };
    useEffect(() => {
        if (idNegocio) {
            obtenerServicios();
            const intervalId = setInterval(obtenerServicios, REFRESH_INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [idNegocio]);

    return (
        <div className='container_lista'>
            <h2>Lista de Servicios 📝</h2>
            <div className="tarjetas-container">
                {servicios.map((servicio) => (
                    <div className="tarjeta" key={servicio.id ?? servicio.nombre}>
                        <h3 className="tarjeta-titulo">{servicio.nombre}</h3>
                        <p className="tarjeta-descripcion"><strong>✏️ Descripción:</strong> {servicio.descripcion}</p>
                        <p className="tarjeta-precio"><strong>💵</strong> {servicio.precio} €</p>
                        <p className="tarjeta-duracion"><strong>⏳ </strong> {servicio.duracion} minutos</p>
                        <button
                            className="eliminar-btn"
                            onClick={() => {
                                if (window.confirm("¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.")) {
                                    peticioneshttpsEliminarServicio(servicio.id_servicio);
                                }
                            }}
                        >
                            Eliminar 🗑️
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaServicios;






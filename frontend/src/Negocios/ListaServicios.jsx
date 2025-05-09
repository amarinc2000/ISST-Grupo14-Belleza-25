// Este componente permite ver un listado con todos los servicios existentes en la base de datos.
// Aparace en la ruta /negocio/AdminMenu
import React, { useEffect, useState } from 'react';
import { peticioneshttps } from "../utils/functions/peticionesHTTPS";
import './ListaServicios.css';


const ListaServicios = () => {
    const [servicios, setServicios] = useState([]);
    const idNegocio = 1; // Cambia este ID según sea necesario

    useEffect(() => {
        const obtenerServicios = async () => {
            try {
                const data = await peticioneshttps("negocios", "informacion", idNegocio);
                setServicios(data.servicios);
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            } 
        };

        obtenerServicios();
    }, [idNegocio]);



    
    return (
        <div>
            <h2>Lista de Servicios 📝</h2>
            <div className="tarjetas-container">
                {servicios.map((servicio) => (
                    <div className="tarjeta" key={servicio.id}>
                        <h3 className="tarjeta-titulo">{servicio.nombre}</h3>
                        <p className="tarjeta-descripcion"><strong>✏️ Descripción:</strong> {servicio.descripcion}</p>
                        <p className="tarjeta-precio"><strong>💵</strong> {servicio.precio} €</p>
                        <p className="tarjeta-duracion"><strong>⏳ </strong> {servicio.duracion} minutos</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListaServicios;




import React, { useEffect, useState } from 'react';
import {
  obtenerFavoritosPorCliente,
  eliminarFavorito,
  obtenerTodosLosFavoritos
} from '../utils/functions/peticionesHTTPS';
import './Favoritos.css';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const idCliente = user?.cliente?.id_cliente;

useEffect(() => {
  const fetchFavoritos = async () => {
    try {
      const todosLosFavoritos = await obtenerTodosLosFavoritos(); // Llamamos a todos los favoritos
      const favoritosDelCliente = todosLosFavoritos.filter(f => f.cliente?.id_cliente === idCliente);
      setFavoritos(favoritosDelCliente);
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  };
  fetchFavoritos();
}, []);

  const handleEliminarFavorito = async (idFavorito) => {
    try {
      await eliminarFavorito(idFavorito);
      setFavoritos(prev => prev.filter(f => f.id_favorito !== idFavorito));
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
      alert("No se pudo eliminar el favorito.");
    }
  };

  return (
    <div className="favoritos-container">
      <h2>Mis Servicios Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No tienes servicios favoritos aún.</p>
      ) : (
        <div className="favoritos-grid">
          {favoritos.map(fav => {
            const servicio = fav.servicio;
            const negocio = servicio?.negocio;

            return (
              <div key={fav.id_favorito} className="servicio-card">
                <div className="servicio-info">
                  <h4>{servicio?.nombre}</h4>
                  <p>{servicio?.precio} €</p>
                  <p>{servicio?.descripcion}</p>
                </div>
                {negocio && (
                  <div className="info-negocio">
                    <p><strong>Negocio:</strong> {negocio.nombre}</p>
                    <p><strong>Dirección:</strong> {negocio.direccion}</p>
                    <p><strong>Teléfono:</strong> {negocio.telefono}</p>
                  </div>
                )}
                <button
                  className="boton-estrella"
                  title="Eliminar de favoritos"
                  onClick={() => handleEliminarFavorito(fav.id_favorito)}
                >
                  ★
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import peluqueriaImg from "../assets/Peluqueria.png";
import uñasImg from "../assets/uñas.jpg";
import pestañasImg from "../assets/pestañas.jpg";
import depilacionImg from "../assets/depilacion.png";
import facialesImg from "../assets/faciales.jpg";
import corporalesImg from "../assets/corporales.png";
import masajesImg from "../assets/masajes.jpg";
import bronceadoImg from "../assets/bronceado.png";
import Buscador from './Buscador';

function HomePage() {
  const [resultados, setResultados] = useState([]);
  const [categoria, setCategoria] = useState(""); // Estado para la categoría seleccionada

  // Función que se ejecutará cada vez que cambie el valor del input
  const manejarCambioBusqueda = (valor) => {
    console.log("Valor del buscador:", valor);
    // Aquí puedes definir la lógica que se ejecutará con el nuevo valor
    // Por ejemplo, filtrar resultados o realizar una petición HTTP
  };
  // Función para cambiar la categoría
  const cambiarCategoria = (nuevaCategoria) => {
    setCategoria(nuevaCategoria); // Actualiza el estado de la categoría
  };

  return (
    <div className="homepage">
      {/* Barra de búsqueda */}
      <div className="search-container">
        <Buscador
          placeholder="Buscar por servicio o negocio"
          onChange={manejarCambioBusqueda} // Pasa la función al componente Buscador
        />
      </div>

      <div className="subvista de /servicios">
        {resultados.length > 0 ? (
          <div className="resultados-container">
            {resultados.map((resultado) => (
              <div key={resultado.id} className="resultado-item">
                <Link to={`/servicios/${resultado.id}`} className="resultado-link">
                  <img src={resultado.imagen} alt={resultado.nombre} />
                  <h3>{resultado.nombre}</h3>
                  <p>{resultado.descripcion}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-container">
             {/* Botón para cambiar la categoría */}
        <button onClick={() => cambiarCategoria("Peluqueria")} className="card-button">
          <img src={peluqueriaImg} alt="Peluqueria" className="card-image" />
          <h3 className="card-title">Peluquería</h3>
        </button>
        <button onClick={() => cambiarCategoria("Uñas")} className="card-button">
          <img src={uñasImg} alt="Uñas" className="card-image"/>
          <h3 className="card-title">Uñas</h3>
        </button>
        <button onClick={() => cambiarCategoria("Pestañas")} className="card-button">
          <img src={pestañasImg} alt="Pestañas" className="card-image"/>
          <h3 className="card-title">Pestañas</h3>
        </button>
        <button onClick={() => cambiarCategoria("Depilación")} className="card-button">
          <img src={depilacionImg} alt="Depilación" className="card-image"/>
          <h3 className="card-title">Depilación</h3>
        </button>
        <button onClick={() => cambiarCategoria("Faciales")} className="card-button">
          <img src={facialesImg} alt="Faciales" className="card-image"/>
          <h3 className="card-title">Faciales</h3>
        </button>
        <button onClick={() => cambiarCategoria("Corporales")} className="card-button">
          <img src={corporalesImg} alt="Corporales" className="card-image"/>
          <h3 className="card-title">Corporales</h3>
        </button>
        <button onClick={() => cambiarCategoria("Masajes")} className="card-button">
          <img src={masajesImg} alt="Masajes" className="card-image"/>
          <h3 className="card-title">Masajes</h3>
        </button>
        <button onClick={() => cambiarCategoria("Bronceado")} className="card-button">
          <img src={bronceadoImg} alt="Bronceado" className="card-image"/>
          <h3 className="card-title">Bronceado</h3>
        </button>
          </div>
        )}
      </div>
    </div>
    
  );
}

export default HomePage;
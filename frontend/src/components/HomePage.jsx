
import React from 'react';

import { Link } from 'react-router-dom';


function HomePage() {
  return (
    <div>
      <h1>Belleza</h1>
      <Link to="/inicio-sesion">
        <button>Iniciar Sesión</button>
      </Link>
      

      <div className="search-container">
      
      </div>

      {/* Si lo deseas, puedes agregar más contenido aquí */}

      
    </div>
  );
}

export default HomePage;
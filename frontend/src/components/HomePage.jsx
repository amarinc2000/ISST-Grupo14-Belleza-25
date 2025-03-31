import React from 'react';
import Buscador from './Buscador';

function HomePage() {
  return (
    <div className="homepage">
      {/* Barra de búsqueda */}
      <div className="search-container">
        <Buscador/>
      </div>
    </div>
    
  );
}

export default HomePage;
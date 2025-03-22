import React from 'react';
// import './Navbar.css'; // Opcional, si quieres añadir estilos

const Navbar = () => {
  return (
    <nav className="navbar">
      <nav>
  <ul>
    <li><a href="/">Inicio</a></li>
    <li><a href="/productos">Productos</a></li>
    <li><a href="/contacto">Contacto</a></li>
  </ul>
</nav>
    </nav>
  );
};

export default Navbar;
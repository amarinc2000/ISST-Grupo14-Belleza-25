import React from 'react';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './components/inicio_sesion';
import HomePage from './components/HomePage'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import DetalleServicios from './components/DetalleServicios';
import ConfirmaReserva from './components/Confirma_Reserva'; 
import Contacto from './components/Contacto';

import HomePageNegocio from './Negocios/HomePage';
import AdminMenu from './Negocios/AdminMenu';
import ContactoNegocio from './Negocios/Contacto';
import ListaReservas from './Clientes/ListaReservas';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/detalle-servicio" element={<DetalleServicios />} />
        <Route path="/confirma-reserva" element={<ConfirmaReserva />} />
        <Route path="/confirma-reserva/:id" element={<ConfirmaReserva />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/negocio/" element={<HomePageNegocio />} />
        <Route path="/negocio/adminmenu" element={<AdminMenu />} />
        <Route path="/negocio/contacto" element={<ContactoNegocio />} />
        <Route path="/mis-reservas" element={<ListaReservas />} />
      </Routes>
    </Router>
  );
}

export default App;
// cd frontend
// npm install 
// npm run dev para ejecutarlo
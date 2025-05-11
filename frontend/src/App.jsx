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
import Favoritos from './Clientes/Favoritos';

import RoleBasedRoute from './utils/context/RoleBasedRoute';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/detalle-servicio" element={<DetalleServicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />

        {/* Rutas protegidas para Clientes */}
        <Route path="/mis-reservas" element={
          <RoleBasedRoute roles={['CLIENTE']}>
          <ListaReservas />
          </RoleBasedRoute>
          } />
        <Route path="/favoritos" element={
          <RoleBasedRoute roles={['CLIENTE']}>
          <Favoritos />
          </RoleBasedRoute>
          } />
        <Route path="/confirma-reserva" element={
          <RoleBasedRoute roles={['CLIENTE']}>
          <ConfirmaReserva />
          </RoleBasedRoute>
          } />
        <Route path="/confirma-reserva/:id" element={
          <RoleBasedRoute roles={['CLIENTE']}>
          <ConfirmaReserva />
          </RoleBasedRoute>
          } />

        {/* Rutas protegidas para Trabajadores de Negocios */}
        <Route path="/negocio/" element={
          <RoleBasedRoute roles={['TRABAJADOR']}>
          <HomePageNegocio />
          </RoleBasedRoute>
          } />
        <Route path="/negocio/adminmenu" element={
          <RoleBasedRoute roles={['TRABAJADOR']}>
          <AdminMenu />
          </RoleBasedRoute>
          } />
        <Route path="/negocio/contacto" element={
          <RoleBasedRoute roles={['TRABAJADOR']}>
          <ContactoNegocio />
          </RoleBasedRoute>
          } />

      </Routes>
    </Router>
  );
}

export default App;
// cd frontend
// npm install 
// npm run dev para ejecutarlo
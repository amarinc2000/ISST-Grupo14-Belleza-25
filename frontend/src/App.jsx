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
import NuevoServicio from './components/vistasEmpresa/NuevoServicio';
import Lista_Servicios from './components/Lista_Servicios';
import Contacto from './components/Contacto';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/detalle-servicio" element={<DetalleServicios />} />
        <Route path="/confirma-reserva" element={<ConfirmaReserva />} />
        <Route path="/NuevoServicio" element={<NuevoServicio />} />
        <Route path="/lista-servicios" element={<Lista_Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}

export default App;
// cd frontend
// npm install 
// npm run dev para ejecutarlo
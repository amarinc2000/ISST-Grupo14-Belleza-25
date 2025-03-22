import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './components/inicio_sesion';
import HomePage from './components/HomePage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
      </Routes>
    </Router>
  );
}

export default App

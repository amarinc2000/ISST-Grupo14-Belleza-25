import React from 'react'; 
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './components/inicio_sesion';
import HomePage from './components/HomePage'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
      </Routes>
    </Router>
  );
}

export default App
// cd frontend
// npm install 
// npm run dev para ejecutarlo
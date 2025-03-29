import React from "react";
import { Link } from "react-router-dom";

const InicioSesion = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <h1 className="text-5xl font-extrabold text-white mb-10 drop-shadow-lg">BELLEZA</h1>

      <div className="flex flex-col items-center p-6 rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300">
        {/* Sección Cliente */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4">CLIENTE</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-64 p-3 mb-3 border rounded-lg text-gray-600 italic bg-white"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-64 p-3 mb-3 border rounded-lg text-gray-600 italic bg-white"
          />
          <button className="w-64 p-4 mb-4 bg-purple-500 text-white font-bold rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300">
            ACCEDER
          </button>
          <button className="w-64 p-4 mb-4 bg-purple-500 text-white font-bold rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300">
            CREAR NUEVA CUENTA
          </button>
        </div>

        {/* Sección Negocio */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4">NEGOCIO</h2>
          <input
            type="email"
            placeholder="Email Profesional"
            className="w-64 p-3 mb-3 border rounded-lg text-gray-600 italic bg-white focus:border-purple-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-64 p-3 mb-3 border rounded-lg text-gray-600 italic bg-white"
          />
          <button className="w-64 p-4 mb-4 bg-purple-500 text-white font-bold rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300">
            ACCEDER
          </button>
          <button className="w-64 p-4 mb-4 bg-purple-500 text-white font-bold rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300">
            CREAR CUENTA NEGOCIO
          </button>
        </div>
      </div>

      
      {/* Botón para volver a la página principal */}
      <Link to="/">
        <button className="mt-16 w-64 p-3 bg-gray-500 text-white font-bold rounded-lg">
          VOLVER A INICIO
        </button>
      </Link>
    </div>
  );
};

export default InicioSesion;

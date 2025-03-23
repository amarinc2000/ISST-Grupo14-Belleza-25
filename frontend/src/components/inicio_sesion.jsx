import React from "react";
import { Link } from "react-router-dom";

const InicioSesion = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <h1 className="text-4xl font-bold text-orange-500 mb-8">BELLEZA</h1>

      <div className="grid grid-cols-2 gap-8 bg-gray-100 p-6 rounded-lg shadow-lg">
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
          <button className="w-64 p-3 mb-2 bg-purple-400 text-white font-bold rounded-lg">
            ACCEDER
          </button>
          <button className="w-64 p-3 bg-purple-300 text-white font-bold rounded-lg">
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
          <button className="w-64 p-3 mb-2 bg-purple-400 text-white font-bold rounded-lg">
            ACCEDER
          </button>
          <button className="w-64 p-3 bg-purple-300 text-white font-bold rounded-lg">
            CREAR CUENTA NEGOCIO
          </button>
        </div>
      </div>

      {/* Botón para volver a la página principal */}
      <Link to="/">
        <button className="mt-20 w-64 p-3 bg-gray-500 text-white font-bold rounded-lg">
          VOLVER A INICIO
        </button>
      </Link>
    </div>
  );
};

export default InicioSesion;

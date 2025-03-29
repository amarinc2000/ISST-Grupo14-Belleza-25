import React, { useState, useEffect } from "react";
import { peticionesServicio } from "../utils/functions/peticionesHTTP";

const Buscador = ({ placeholder = "Buscar...", onResults }) => {
  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState([]);

  // Función para manejar cambios en el input
  const manejarCambio = async (e) => {
    const nuevoValor = e.target.value;
    setValor(nuevoValor);

    if (nuevoValor.length > 2) { // Evita buscar si el texto es muy corto
      try {
        const data = await peticionesServicio(`/buscador/${nuevoValor}`, "GET");
        setResultados(data);
        if (onResults) onResults(data); // Llama a la función que maneja los resultados
      } catch (error) {
        console.error("Error al buscar:", error);
        setResultados([]);
      }
    } else {
      setResultados([]); // Limpia los resultados si el texto es corto
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={valor}
        onChange={manejarCambio}
        className="buscador-input w-full border p-2 rounded"
      />
      {resultados.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md mt-1">
          {resultados.map((item, index) => (
            <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer">
              {item.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Buscador;

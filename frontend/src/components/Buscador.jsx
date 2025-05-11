import React, { useState, useEffect } from "react";
import peluqueriaImg from "../assets/Peluqueria.png";
import uñasImg from "../assets/uñas.png";
import pestañasImg from "../assets/pestañas.png";
import depilacionImg from "../assets/depilacion.png";
import facialesImg from "../assets/faciales.png";
import corporalesImg from "../assets/corporales.png";
import masajesImg from "../assets/masajes.png";
import bronceadoImg from "../assets/bronceado.png";
import { peticioneshttps } from "../utils/functions/peticionesHTTPS";
import Lista_servicios from "./Lista_Servicios";
import { useLocation } from "react-router-dom";
import "./Buscador.css";

const BuscadorConSubvista = () => {
  const [valor, setValor] = useState("");
  const [resultados, setResultados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [negociosFiltrados, setNegociosFiltrados] = useState([]);

  const location = useLocation();

  // Efecto para resetear estados si se vuelve a la ruta raíz
  useEffect(() => {
    if (location.pathname === "/") {
      setValor("");
      setResultados([]);
      setCategoriaSeleccionada("");
      setNegociosFiltrados([]);
    }
  }, [location]);

  const manejarCambio = async (e) => {
    const nuevoValor = e.target.value;
    setValor(nuevoValor);

    if (nuevoValor.length > 2) {
      try {
        const data = await peticioneshttps("buscador", "informacion", null, null, nuevoValor);
        setResultados(data);
      } catch (error) {
        console.error("Error al buscar:", error);
        setResultados([]);
      }
    } else {
      setResultados([]);
    }
  };

  const cambiarCategoria = async (categoria) => {
    setCategoriaSeleccionada(categoria);

    try {
      const data = await peticioneshttps("servicios", "informacion");
      const categoriaMin = categoria.toLowerCase();

      const serviciosFiltrados = data.filter(
        (servicio) => servicio.tipo.toLowerCase() === categoriaMin
      );

      const negociosMap = {};

      serviciosFiltrados.forEach((servicio) => {
        const id = servicio.negocio.id_negocio;

        if (!negociosMap[id]) {
          negociosMap[id] = {
            ...servicio.negocio,
            servicios: [],
          };
        }

        negociosMap[id].servicios.push({
          id_servicio: servicio.id_servicio,
          nombre: servicio.nombre,
          descripcion: servicio.descripcion,
          precio: servicio.precio,
          duracion: servicio.duracion,
          tipo: servicio.tipo,
        });
      });

      const negociosAgrupados = Object.values(negociosMap);
      setNegociosFiltrados(negociosAgrupados);
    } catch (error) {
      console.error("Error al filtrar por categoría:", error);
      setNegociosFiltrados([]);
    }
  };

  const eliminarFiltro = () => {
    setCategoriaSeleccionada("");
    setNegociosFiltrados([]);
  };

  const categoriaMap = {
    peluqueria: "Peluquería",
    unas: "Uñas",
    pestanas: "Pestañas",
    depilacion: "Depilación",
    faciales: "Faciales",
    corporales: "Corporales",
    masajes: "Masajes",
    bronceado: "Bronceado",
  };

  return (
    <div className="buscador-container">
      {!categoriaSeleccionada && (
        <input
          type="text"
          placeholder="Buscar..."
          value={valor}
          onChange={manejarCambio}
          className="buscador-input"
        />
      )}

      <div className="subvista-buscador-container">
        {categoriaSeleccionada ? (
          <div>
            <h2 className="titulo-categoria">
              {categoriaMap[categoriaSeleccionada.toLowerCase()] || categoriaSeleccionada}
            </h2>
            <button onClick={eliminarFiltro} className="boton-volver">
              Volver
            </button>
            <ul className="resultados-buscador-container">
              {negociosFiltrados.map((negocio, index) => (
                <div key={index} className="negocio-resultado-item">
                  <Lista_servicios negocio={negocio} />
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <>
            {resultados.length > 0 && valor.length > 3 ? (
              <ul className="resultados-buscador-container">
                {resultados.map((item, index) => (
                  <div key={index} className="negocio-resultado-item">
                    <Lista_servicios negocio={item} />
                  </div>
                ))}
              </ul>
            ) : (
              <div className="card-container">
                <button onClick={() => cambiarCategoria("peluqueria")} className="card-button">
                  <img src={peluqueriaImg} alt="Peluquería" className="card-image" />
                  <h3 className="card-title">Peluquería</h3>
                </button>
                <button onClick={() => cambiarCategoria("unas")} className="card-button">
                  <img src={uñasImg} alt="Uñas" className="card-image" />
                  <h3 className="card-title">Uñas</h3>
                </button>
                <button onClick={() => cambiarCategoria("pestanas")} className="card-button">
                  <img src={pestañasImg} alt="Pestañas" className="card-image" />
                  <h3 className="card-title">Pestañas</h3>
                </button>
                <button onClick={() => cambiarCategoria("depilacion")} className="card-button">
                  <img src={depilacionImg} alt="Depilación" className="card-image" />
                  <h3 className="card-title">Depilación</h3>
                </button>
                <button onClick={() => cambiarCategoria("faciales")} className="card-button">
                  <img src={facialesImg} alt="Faciales" className="card-image" />
                  <h3 className="card-title">Faciales</h3>
                </button>
                <button onClick={() => cambiarCategoria("corporales")} className="card-button">
                  <img src={corporalesImg} alt="Corporales" className="card-image" />
                  <h3 className="card-title">Corporales</h3>
                </button>
                <button onClick={() => cambiarCategoria("masajes")} className="card-button">
                  <img src={masajesImg} alt="Masajes" className="card-image" />
                  <h3 className="card-title">Masajes</h3>
                </button>
                <button onClick={() => cambiarCategoria("bronceado")} className="card-button">
                  <img src={bronceadoImg} alt="Bronceado" className="card-image" />
                  <h3 className="card-title">Bronceado</h3>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BuscadorConSubvista;
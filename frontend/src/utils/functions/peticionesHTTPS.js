import axios from 'axios';

// Autenticación básica
const USERNAME = "admin";
const PASSWORD = "admin123";

// URLs de la API
const URL_BASE = "https://backend-isst-2025.onrender.com/";
const URL_SERVICIOS = URL_BASE + "servicios";
const URL_NEGOCIOS = URL_BASE + "negocios";
const URL_TRABAJADORES = URL_BASE + "trabajadores";
const URL_CLIENTES = URL_BASE + "clientes";
const URL_RESERVAS = URL_BASE + "reservas";
const URL_FAVORITOS = URL_BASE + "favoritos";
const URL_USUARIOS = URL_BASE + "usuarios";

const TiposURL = {
  SERVICIOS: 'servicios',
  NEGOCIOS: 'negocios',
  TRABAJADORES: 'trabajadores',
  CLIENTES: 'clientes',
  RESERVAS: 'reservas',
  FAVORITOS: 'favoritos',
  USUARIOS: 'usuarios',
  BUSCADOR: 'buscador',
  RESERVA_SERVICIOS: 'reservaServicios'
};

function URL_FINAL(tipo) {
  switch (tipo) {
    case TiposURL.SERVICIOS: return URL_SERVICIOS;
    case TiposURL.NEGOCIOS: return URL_NEGOCIOS;
    case TiposURL.TRABAJADORES: return URL_TRABAJADORES;
    case TiposURL.CLIENTES: return URL_CLIENTES;
    case TiposURL.RESERVAS: return URL_RESERVAS;
    case TiposURL.FAVORITOS: return URL_FAVORITOS;
    case TiposURL.USUARIOS: return URL_USUARIOS + "/register";
    case TiposURL.BUSCADOR: return URL_NEGOCIOS + "/buscador";
    case TiposURL.RESERVA_SERVICIOS: return URL_BASE + "reservaServicios";
    default: throw new Error("URL no válida");
  }
}

const Metodos = {
  GET: 'informacion',
  POST: 'crear',
  PUT: 'modificar',
  DELETE: 'eliminar'
};

function METODO_FINAL(metodo) {
  switch (metodo) {
    case Metodos.GET: return "GET";
    case Metodos.POST: return "POST";
    case Metodos.PUT: return "PUT";
    case Metodos.DELETE: return "DELETE";
    default: throw new Error("Método no válido");
  }
}

export async function peticioneshttps(tabla, tipo, id = null, body = null, textoBuscador = null) {
  let urlFinal = URL_FINAL(tabla);

  if (id) urlFinal += `/${id}`;
  if (textoBuscador) urlFinal += `/${textoBuscador}`;

  const metodo = METODO_FINAL(tipo);

  const config = {
    method: metodo,
    url: urlFinal,
    headers: { "Content-Type": "application/json" },
    auth: { username: USERNAME, password: PASSWORD }
  };

  if (body && (metodo === "POST" || metodo === "PUT")) {
    config.data = body;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
}

export async function obtenerReservasHttps() {
  return await peticioneshttps(TiposURL.RESERVAS, Metodos.GET);
}
// Función para crear un usuario
export async function crearUsuarioHttps(usuarioData) {
    try {
        const nuevoUsuario = await peticioneshttps(
            TiposURL.USUARIOS,  // tabla
            Metodos.POST,       // tipo
            null,               // id
            usuarioData         // body
        );
        return nuevoUsuario;
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
}

// Función para crear un trabajador
export async function crearTrabajadorHttps(trabajadorData) {
    try {
        const nuevoTrabajador = await peticioneshttps(
            TiposURL.TRABAJADORES,
            Metodos.POST,
            null,
            trabajadorData
        );
        return nuevoTrabajador;
    } catch (error) {
        console.error("Error al crear trabajador:", error);
        throw error;
    }
}

// Crear reserva
export async function crearReservaHttps(reservaData) {
    try {
        const nuevaReserva = await peticioneshttps(
            TiposURL.RESERVAS,
            Metodos.POST,
            null,
            reservaData
        );
        return nuevaReserva;
    } catch (error) {
        console.error("Error al crear reserva:", error);
        throw error;
    }
}

// Asociar servicio a la reserva
export async function crearReservaServicioHttps(reservaServicioData) {
    try {
        const nuevaAsociacion = await peticioneshttps(
            TiposURL.RESERVA_SERVICIOS,
            Metodos.POST,
            null,
            reservaServicioData
        );
        return nuevaAsociacion;
    } catch (error) {
        console.error("Error al asociar servicio a reserva:", error);
        throw error;
    }
}

export async function obtenerServiciosHttps(idServicio) {
  try {
    const servicio = await peticioneshttps(TiposURL.SERVICIOS, Metodos.GET, idServicio);
    return servicio;
  } catch (error) {
    console.error('Error al obtener servicio:', error);
    throw error;
  }
}

export async function eliminarReservaHttps(id_reserva) {
  try {
    const respuesta = await peticioneshttps(
      TiposURL.RESERVAS,   // Tabla 'reservas'
      Metodos.DELETE,      // Método DELETE
      id_reserva           // ID de la reserva a eliminar
    );
    return respuesta; // Devuelve la respuesta del servidor, si es necesario
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    throw error; // Lanza el error si algo sale mal
  }
}

export async function obtenerFavoritosPorCliente(idCliente) {
  try {
    return await peticioneshttps(TiposURL.FAVORITOS, Metodos.GET, `cliente/${idCliente}`);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    throw error;
  }
}

export async function agregarFavoritoHttps(favoritoData) {
  try {
    return await peticioneshttps(TiposURL.FAVORITOS, Metodos.POST, null, favoritoData);
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    throw error;
  }
}

export async function eliminarFavorito(idFavorito) {
  try {
    return await peticioneshttps(TiposURL.FAVORITOS, Metodos.DELETE, idFavorito);
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    throw error;
  }
}

export const obtenerTrabajadoresHttps = async () => {
  try {
    const trabajadores = await peticioneshttps(TiposURL.TRABAJADORES, Metodos.GET);
    return trabajadores;
  } catch (error) {
    console.error("Error al obtener trabajadores:", error);
    throw error;
  }
};
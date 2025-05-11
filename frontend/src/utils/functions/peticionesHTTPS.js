import axios from 'axios';

// Autenticación básica
const USERNAMESERVIDOR = "admin";
const PASSWORDSERVIDOR = "admin123";

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
  LOGIN: 'login',
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
    case TiposURL.LOGIN: return URL_USUARIOS + "/login";
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
    auth: { username: USERNAMESERVIDOR, password: PASSWORDSERVIDOR }
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

export const obtenerFavoritosCliente = async (idCliente) => {
  try {
    const response = await axios.get(`${URL_BACKEND}/favoritos/cliente/${idCliente}`);
    return response.data; // Suponiendo que devuelve un array de servicios favoritos
  } catch (error) {
    console.error("Error en la petición de favoritos: ", error);
    throw error;
  }
};

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

export async function obtenerTodosLosFavoritos() {
  try {
    return await peticioneshttps(TiposURL.FAVORITOS, Metodos.GET);
  } catch (error) {
    console.error("Error al obtener todos los favoritos:", error);
    throw error;
  }
}

// Función para obtener la verificación de login
// Esta función se encarga de verificar el login del usuario
export async function obtenerVerificacionLogin(LoginData) {
  try {
    return await peticioneshttps(TiposURL.LOGIN, Metodos.POST, null, LoginData);
  } catch (error) {
    console.error("Error al verificar el login:", error);
    throw error;
  }
}

// REGISTRAR USUARIO
// Esta función se encarga de registrar un nuevo usuario
export async function registrarUsuarioHttps(body) {
  const URL_REGISTRO = `${URL_BASE}usuarios/register`;
  try {
    const config = {
      method: "POST",
      url: URL_REGISTRO,
      headers: { "Content-Type": "application/json" },
      auth: {
        username: USERNAMESERVIDOR,
        password: PASSWORDSERVIDOR
      }
    };
    config.data = body;
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error("Error en la petición:", error);
      throw error;
    }

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

// Funcion para registrar un nuevo cliente
export async function registrarCliente(bodyCliente, bodyUsuario) {
  const URL_CLIENTE_EMAIL = `${URL_BASE}clientes/email/${encodeURIComponent(bodyCliente.email)}`;

  try {
    // 1. POST Cliente - Crear el cliente
    const clienteCreado = await peticioneshttps(
      TiposURL.CLIENTES,
      Metodos.POST,
      null,
      bodyCliente
    );

    // 2. GET Cliente - Obtener el ID del cliente recién creado
    const config = {
      method: "GET",
      url: URL_CLIENTE_EMAIL,
      headers: { "Content-Type": "application/json" },
      auth: {
        username: USERNAMESERVIDOR,
        password: PASSWORDSERVIDOR
      }
    };

    const responseCliente = await axios(config);
    const idCliente = responseCliente.data.id_cliente;

    // 3. POST Usuario - Crear usuario asociado al cliente
    const usuarioCreado = await crearUsuarioHttps(
      {
        ...bodyUsuario,
        rol: "CLIENTE", // Asignar rol de cliente
        cliente: { id_cliente: idCliente } // Asocia el usuario al cliente creado
      }
    );

  } catch (error) {
    console.error("Error en el proceso completo:", {
      paso: error.step || "desconocido",
      detalle: error.response?.data || error.message
    });

    // Error personalizado con contexto
    const errorMessage = error.response?.data?.message || "Error en el registro";
    const customError = new Error(`Fallo en ${error.step || 'proceso'}: ${errorMessage}`);
    customError.step = error.step || "registro";
    throw customError;
  }
}


// Funcion para crear un nuevo negocio y asociar un trabajador que sera administrador
export async function crearNegocioYTrabajador(bodyNegocio, bodyTrabajador, bodyUsuario) {
  const URL_NEGOCIO_EMAIL = `${URL_BASE}negocios/email/${encodeURIComponent(bodyNegocio.email)}`;
  try {
    // 1. POST Negocio - Crear el negocio
    const negocioCreado = await peticioneshttps(
      TiposURL.NEGOCIOS,
      Metodos.POST,
      null,
      bodyNegocio
    );

    // 2. GET Negocio - Obtener el ID del negocio recién creado
    const config = {
      method: "GET",
      url: URL_NEGOCIO_EMAIL,
      headers: { "Content-Type": "application/json" },
      auth: {
        username: USERNAMESERVIDOR,
        password: PASSWORDSERVIDOR
      }
    };
    const responseNegocio = await axios(config);
    const idNegocio = responseNegocio.data.id_negocio;

    // 3. POST Trabajador - Crear trabajador asociado al negocio
    const trabajadorCreado = await peticioneshttps(
      TiposURL.TRABAJADORES,
      Metodos.POST,
      null,
      {
        ...bodyTrabajador,
        is_admin: true, // Asignar rol de administrador
        negocio: { id_negocio: idNegocio } // Asocia el trabajador al negocio creado
      }
    );

    // 4. GET NEGOCIO - Obtener el ID del trabajador recién creado
    const responseNegocioTrabajador = await peticioneshttps(
      TiposURL.NEGOCIOS,
      Metodos.GET,
      idNegocio);

    // 5. POST Usuario - Crear usuario asociado al trabajador

    const usuarioCreado = await crearUsuarioHttps(
      {
        ...bodyUsuario,
        rol: "TRABAJADOR", // Asignar rol de trabajador
        trabajador: { id_trabajador: responseNegocioTrabajador.trabajadores[0].id_trabajador } // Asocia el usuario al trabajador creado
      }
    );
  }
  catch (error) {
    console.error("Error al crear negocio y trabajador:", error);
    throw error;
  }
}

// Funcion para eliminar servicio por id
export async function peticioneshttpsEliminarServicio(idServicio) {
  const URL_ELIMINAR_SERVICIO = `${URL_BASE}servicios/${idServicio}`;
    const config = {
      method: "DELETE",
      url: URL_ELIMINAR_SERVICIO,
      headers: { "Content-Type": "application/json" },
      auth: {
        username: USERNAMESERVIDOR,
        password: PASSWORDSERVIDOR
      }
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error("Error en la petición:", error);
      throw error;
    }
}
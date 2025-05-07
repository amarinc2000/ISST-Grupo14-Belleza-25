    import axios from 'axios';
    //FUNCIONES PARA HACER PETICIONES HTTP A LA API REST
    // // Esta función se puede usar para realizar peticiones GET, POST, PUT y DELETE a la API de servicios

    // Definimos datos de la autnenticacion basica
    const USERNAME = "admin"; // Cambia esto a tu nombre de usuario
    const PASSWORD = "admin123"; // Cambia esto a tu contraseña

    // La api es la siguiente
    //const URL_BASE = "http://localhost:8080/"; // Esta url la usamos para probar frontend y backend en local
    const URL_BASE = "https://backend-isst-2025.onrender.com/"; // Cambia esto a la URL de tu API
    const URL_SERVICIOS = URL_BASE + "servicios"; // Cambia esto a la URL de tu API de servicios
    const URL_NEGOCIOS = URL_BASE + "negocios"; // Cambia esto a la URL de tu API de negocios
    const URL_TRABAJADORES = URL_BASE + "trabajadores"; // Cambia esto a la URL de tu API de trabajadores
    const URL_CLIENTES = URL_BASE + "clientes"; // Cambia esto a la URL de tu API de clientes
    const URL_RESERVAS = URL_BASE + "reservas"; // Cambia esto a la URL de tu API de reservas
    const URL_FAVORITOS = URL_BASE + "favoritos"; // Cambia esto a la URL de tu API de favoritos
    const URL_USUARIOS = URL_BASE + "usuarios"; // Cambia esto a la URL de tu API de usuarios

    const TiposURL = {
        SERVICIOS: 'servicios',
        NEGOCIOS: 'negocios',
        TRABAJADORES: 'trabajadores',
        CLIENTES: 'clientes',
        RESERVAS: 'reservas',
        FAVORITOS: 'favoritos',
        USUARIOS: 'usuarios',
        BUSCADOR: 'buscador'
    };

    // Función para obtener la URL final según el tipo de petición
    function URL_FINAL(tipo) {
        switch (tipo) {
            case TiposURL.SERVICIOS:
                return URL_SERVICIOS;
            case TiposURL.NEGOCIOS:
                return URL_NEGOCIOS;
            case TiposURL.TRABAJADORES:
                return URL_TRABAJADORES;
            case TiposURL.CLIENTES:
                return URL_CLIENTES;
            case TiposURL.RESERVAS:
                return URL_RESERVAS;
            case TiposURL.FAVORITOS:
                return URL_FAVORITOS;
            case TiposURL.USUARIOS:
            return URL_USUARIOS + "/register"; // Cambié esto para apuntar a /register
            case TiposURL.BUSCADOR:
                return URL_NEGOCIOS + "/buscador"; // Cambia esto a la URL de tu API de buscador
            default:
                throw new Error("URL no válida");
        }
    }

    // Definimos los métodos HTTP que vamos a usar
    // GET, POST, PUT, DELETE
    const Metodos = {
        GET: 'informacion',
        POST: 'crear',
        PUT: 'modificar',
        DELETE: 'eliminar'
    };

    function METODO_FINAL(metodo) {
        switch (metodo) {
            case Metodos.GET:
                return "GET";
            case Metodos.POST:
                return "POST";
            case Metodos.PUT:
                return "PUT";
            case Metodos.DELETE:
                return "DELETE";
            default:
                throw new Error("Método no válido");
        }
    }

    // tabla: servicios, negocios, trabajadores, clientes, reservas, favoritos, usuarios,buscador
    // tipo: informacion, crear, modificar, eliminar
    // id: id del objeto a modificar (opcional), usar solo si es algo muy particular (ID)
    // body: cuerpo de la petición (opcional), usar solo para POST y PUT
    // textoBuscador: texto a buscar (opcional), usar solo para buscador
    export function peticioneshttps(tabla, tipo, id = null, body = null, textoBuscador = null) {

        let urlFinal = URL_FINAL(tabla);
        // Si se proporciona un ID, lo añadimos a la URL
        if (id) {
            urlFinal += `/${id}`;
        }

        if (textoBuscador) {
            urlFinal += `/${textoBuscador}`; // Añadimos el texto a buscar a la URL
        }

        const metodo = METODO_FINAL(tipo);

        // Configuración de la petición para axios
        const config = {
            method: metodo,
            url: urlFinal,
            headers: {
                "Content-Type": "application/json"
            },
            auth: {
                username: USERNAME,
                password: PASSWORD
            }
        };
        

        // Agregar el cuerpo solo si el método lo necesita
        if (body && (metodo === "POST" || metodo === "PUT")) {
            config.data = body;
        }

        return axios(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error en la petición:", error);
                throw error;
            });
    }

// Función para crear un usuario
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



// Función para realizar peticiones HTTP a la API de servicios
// Esta función se puede usar para realizar peticiones GET, POST, PUT y DELETE a la API de servicios
export function peticionesServicio(url, method, body = null) {
    // Definir la URL base de la API
    const urlBase = "http://localhost:8080/servicios";
    const urlFinal = urlBase + url;

    // Configuración de la petición
    const opciones = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Agregar el cuerpo solo si el método lo necesita
    if (body && (method === "POST" || method === "PUT")) {
        opciones.body = JSON.stringify(body);
    }

    return fetch(urlFinal, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error en la petición:", error);
            throw error;
        });
}
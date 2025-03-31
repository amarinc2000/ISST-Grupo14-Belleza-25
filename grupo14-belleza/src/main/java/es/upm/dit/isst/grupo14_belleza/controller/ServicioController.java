package es.upm.dit.isst.grupo14_belleza.controller;

import es.upm.dit.isst.grupo14_belleza.model.Servicio;
import es.upm.dit.isst.grupo14_belleza.model.Negocio; // Asegúrate de importar la clase Negocio
import es.upm.dit.isst.grupo14_belleza.repository.ServicioRepository;
import es.upm.dit.isst.grupo14_belleza.repository.NegocioRepository; // Asegúrate de tener el repositorio de Negocio
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/servicios")
public class ServicioController {

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private NegocioRepository negocioRepository; // Repositorio de Negocio

   
    @GetMapping
    public List<Map<String, Object>> getAllServicios() {
        // Obtener todos los servicios desde el repositorio
        List<Servicio> servicios = (List<Servicio>) servicioRepository.findAll();
        
        // Lista para almacenar los servicios con los negocios
        List<Map<String, Object>> response = new ArrayList<>();

        for (Servicio servicio : servicios) {
            // Crear un mapa para cada servicio
            Map<String, Object> servicioInfo = new HashMap<>();
            servicioInfo.put("categoria", servicio.getCategoria());
            servicioInfo.put("nombre", servicio.getNombre());
            servicioInfo.put("duracion", servicio.getDuracion());
            servicioInfo.put("precio", servicio.getPrecio());

            // Si el servicio tiene un negocio relacionado, agregar la información del negocio
            if (servicio.getNegocio() != null) {
                Negocio negocio = servicio.getNegocio(); // Obtener el negocio asociado
                Map<String, Object> negocioInfo = new HashMap<>();
                negocioInfo.put("id_negocio", negocio.getId_negocio());
                negocioInfo.put("nombre_negocio", negocio.getNombre());
                servicioInfo.put("negocio", negocioInfo); // Agregar al servicio
            }

            // Agregar el mapa de servicio al resultado
            response.add(servicioInfo);
        }

        // Retornar la lista de servicios con los negocios
        return response;
    }
    

    @GetMapping("/{id_servicio}")
    public Optional<Servicio> getServicioById(@PathVariable Long id_servicio) {
        return servicioRepository.findById(id_servicio);
    }

    //Para buscar negocios por nombre o servicios
    @GetMapping("buscador/{nombre}")
    public List<String> buscarNegociosPorNombreOServicios(@PathVariable String nombre) {
        return servicioRepository.findNegociosByNombreOServicios(nombre.toLowerCase());
    }

    @PostMapping
public ResponseEntity<Servicio> createServicio(@RequestBody Servicio servicio) {
    Long negocioId = servicio.getNegocio().getId_negocio(); // Asumimos que se pasa el ID del negocio
    Optional<Negocio> negocioOpt = negocioRepository.findById(negocioId);
    
    if (negocioOpt.isPresent()) {
        Negocio negocio = negocioOpt.get();
        servicio.setNegocio(negocio); // Asignamos el negocio encontrado al servicio
        Servicio savedServicio = servicioRepository.save(servicio); // Guardamos el servicio con el negocio relacionado
        return ResponseEntity.ok(savedServicio); // Retornamos el servicio guardado
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(null); // Respuesta 404 si no se encuentra el negocio
    }
}

    @PutMapping("/{id_servicio}")
    public Servicio updateServicio(@PathVariable Long id_servicio, @RequestBody Servicio servicio) {
        if (servicioRepository.existsById(id_servicio)) {
            servicio.setId_servicio(id_servicio);
            return servicioRepository.save(servicio);
        }
        return null;
    }

    @DeleteMapping("/{id_servicio}")
    public void deleteServicio(@PathVariable Long id_servicio) {
        servicioRepository.deleteById(id_servicio);
    }
}
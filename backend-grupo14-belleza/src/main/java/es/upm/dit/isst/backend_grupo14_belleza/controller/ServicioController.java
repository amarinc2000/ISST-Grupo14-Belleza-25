package es.upm.dit.isst.backend_grupo14_belleza.controller;

import org.springframework.web.bind.annotation.*;
import es.upm.dit.isst.backend_grupo14_belleza.model.Servicio;
import es.upm.dit.isst.backend_grupo14_belleza.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import java.util.Optional;


@RestController
@RequestMapping("/servicios")  // URL base para los servicios
public class ServicioController {

    @Autowired
    private ServicioRepository servicioRepository;

    // Crear un nuevo servicio
    @PostMapping
    public ResponseEntity<Servicio> crearServicio(@Valid @RequestBody Servicio servicio) {
        Servicio servicioGuardado = servicioRepository.save(servicio);
        return new ResponseEntity<>(servicioGuardado, HttpStatus.CREATED);
    }

    // Obtener todos los servicios
    @GetMapping
    public Iterable<Servicio> obtenerTodosLosServicios() {
        return servicioRepository.findAll();
    }

    // Obtener un servicio por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Servicio> obtenerServicioPorId(@PathVariable Long id) {
        Optional<Servicio> servicio = servicioRepository.findById(id);
        return servicio.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Obtener un servicio por su nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Servicio> obtenerServicioPorNombre(@PathVariable String nombre) {
        Optional<Servicio> servicio = servicioRepository.findByNombre(nombre);
        return servicio.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Actualizar casi todos los campos de un servicio (excepto el id)
    @PutMapping("/{id}")
    public ResponseEntity<Servicio> actualizarServicio(@PathVariable Long id, @Valid @RequestBody Servicio servicio) {
        Optional<Servicio> servicioOptional = servicioRepository.findById(id);
        
        if (servicioOptional.isPresent()) {
            Servicio servicioExistente = servicioOptional.get();
            
            // Solo actualizamos los campos que no sean null (excepto id)
            if (servicio.getNombre() != null) {
                servicioExistente.setNombre(servicio.getNombre());
            }
            if (servicio.getTipo() != null) {
                servicioExistente.setTipo(servicio.getTipo());
            }
            if (servicio.getDescripcion() != null) {
                servicioExistente.setDescripcion(servicio.getDescripcion());
            }
            if (servicio.getDuracion() != null) {
                servicioExistente.setDuracion(servicio.getDuracion());
            }
            if (servicio.getPrecio() != null) {
                servicioExistente.setPrecio(servicio.getPrecio());
            }

            Servicio servicioActualizado = servicioRepository.save(servicioExistente);
            return new ResponseEntity<>(servicioActualizado, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Eliminar un servicio por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarServicio(@PathVariable Long id) {
        Optional<Servicio> servicioOptional = servicioRepository.findById(id);
        
        if (servicioOptional.isPresent()) {
            servicioRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}

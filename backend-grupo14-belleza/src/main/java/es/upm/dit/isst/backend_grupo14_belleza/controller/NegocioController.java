package es.upm.dit.isst.backend_grupo14_belleza.controller;

import es.upm.dit.isst.backend_grupo14_belleza.model.Negocio;
import es.upm.dit.isst.backend_grupo14_belleza.repository.NegocioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/negocios")  // URL base para los negocios
public class NegocioController {

    @Autowired
    private NegocioRepository negocioRepository;

    // Crear un nuevo negocio
    @PostMapping
    public ResponseEntity<Negocio> crearNegocio(@Valid @RequestBody Negocio negocio) {
        Negocio negocioGuardado = negocioRepository.save(negocio);
        return new ResponseEntity<>(negocioGuardado, HttpStatus.CREATED);
    }

    // Obtener todos los negocios
    @GetMapping
    public Iterable<Negocio> obtenerTodosLosNegocios() {
        return negocioRepository.findAll();
    }

    // Obtener un negocio por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Negocio> obtenerNegocioPorId(@PathVariable Long id) {
        Optional<Negocio> negocio = negocioRepository.findById(id);
        return negocio.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Obtener un negocio por su nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Negocio> obtenerNegocioPorNombre(@PathVariable String nombre) {
        Optional<Negocio> negocio = negocioRepository.findByNombre(nombre);
        return negocio.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Actualizar casi todos los campos de un negocio (excepto el id)
    @PutMapping("/{id}")
    public ResponseEntity<Negocio> actualizarNegocio(@PathVariable Long id, @Valid @RequestBody Negocio negocio) {
        Optional<Negocio> negocioOptional = negocioRepository.findById(id);
        
        if (negocioOptional.isPresent()) {
            Negocio negocioExistente = negocioOptional.get();
            
            // Solo actualizamos los campos que no sean null (excepto id)
            if (negocio.getNombre() != null) {
                negocioExistente.setNombre(negocio.getNombre());
            }
            if (negocio.getDescripcion() != null) {
                negocioExistente.setDescripcion(negocio.getDescripcion());
            }
            if (negocio.getDireccion() != null) {
                negocioExistente.setDireccion(negocio.getDireccion());
            }
            if (negocio.getTelefono() != null) {
                negocioExistente.setTelefono(negocio.getTelefono());
            }
            if (negocio.getEmail() != null) {
                negocioExistente.setEmail(negocio.getEmail());
            }
            if (negocio.getHorario() != null) {
                negocioExistente.setHorario(negocio.getHorario());
            }
            if (negocio.getImagen() != null) {
                negocioExistente.setImagen(negocio.getImagen());
            }
            
            // Guardamos el negocio con los campos actualizados
            Negocio negocioActualizado = negocioRepository.save(negocioExistente);
            return ResponseEntity.ok(negocioActualizado);  // Retornamos el negocio actualizado
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Si no encontramos el negocio
        }
    }

    // Eliminar un negocio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNegocio(@PathVariable Long id) {
        if (!negocioRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        negocioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}


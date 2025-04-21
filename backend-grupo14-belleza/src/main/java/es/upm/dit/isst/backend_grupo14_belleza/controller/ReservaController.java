package es.upm.dit.isst.backend_grupo14_belleza.controller;

import es.upm.dit.isst.backend_grupo14_belleza.repository.ReservaRepository;
import es.upm.dit.isst.backend_grupo14_belleza.model.Reserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Valid;
import java.util.*;


@RestController
@RequestMapping("/reservas") // URL base para las reservas
public class ReservaController {

    @Autowired
    public ReservaController(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }
    private final ReservaRepository reservaRepository;

    // Crear una nueva reserva
    @PostMapping
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva) {
        Reserva reservaGuardada = reservaRepository.save(reserva);
        return ResponseEntity.status(201).body(reservaGuardada);
    }

    // Obtener todas las reservas
    @GetMapping
    public ResponseEntity<Iterable<Reserva>> obtenerTodasLasReservas() {
        Iterable<Reserva> reservas = reservaRepository.findAll();
        return ResponseEntity.ok(reservas);
    }

    // Obtener una reserva por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> obtenerReservaPorId(@PathVariable Long id) {
        return reservaRepository.findById(id)
                .map(reserva -> ResponseEntity.ok(reserva))
                .orElse(ResponseEntity.notFound().build());
    }

    // Actualizar una reserva por su ID
    @PutMapping("/{id}")
    public ResponseEntity<Reserva> actualizarReserva(@PathVariable Long id, @Valid @RequestBody Reserva reserva) {
        return reservaRepository.findById(id).map(reservaExistente -> {
            // Actualizar los campos de la reserva existente
            reservaExistente.setFecha_hora(reserva.getFecha_hora());
            reservaExistente.setHora_inicio(reserva.getHora_inicio());
            reservaExistente.setHora_fin(reserva.getHora_fin());
            reservaExistente.setConfirmada(reserva.getConfirmada());
            reservaExistente.setServicio(reserva.getServicio());
            reservaExistente.setCliente(reserva.getCliente());
    
            // Guardar los cambios
            Reserva reservaActualizada = reservaRepository.save(reservaExistente);
            return ResponseEntity.ok(reservaActualizada);
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Eliminar una reserva por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNegocio(@PathVariable Long id) {
        if (!reservaRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        reservaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

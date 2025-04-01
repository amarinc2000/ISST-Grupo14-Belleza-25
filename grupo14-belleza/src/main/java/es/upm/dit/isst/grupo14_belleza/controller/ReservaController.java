package es.upm.dit.isst.grupo14_belleza.controller;

import es.upm.dit.isst.grupo14_belleza.model.Reserva;
import es.upm.dit.isst.grupo14_belleza.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> getAllReservas() {
        return (List<Reserva>) reservaRepository.findAll();
    }

    @GetMapping("/{id_reserva}")
    public Optional<Reserva> getReservaById(@PathVariable Long id_reserva) {
        return reservaRepository.findById(id_reserva);
    }

    @PostMapping
    public Reserva createReserva(@RequestBody Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @PutMapping("/{id_reserva}")
    public Reserva updateReserva(@PathVariable Long id_reserva, @RequestBody Reserva reserva) {
        if (reservaRepository.existsById(id_reserva)) {
            reserva.setId_reserva(id_reserva);
            return reservaRepository.save(reserva);
        }
        return null;
    }

    @DeleteMapping("/{id_reserva}")
    public void deleteReserva(@PathVariable Long id_reserva) {
        reservaRepository.deleteById(id_reserva);
    }
}

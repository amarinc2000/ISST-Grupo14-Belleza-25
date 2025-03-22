package es.upm.dit.isst.grupo14_belleza.controller;

import es.upm.dit.isst.grupo14_belleza.model.Reserva;
import es.upm.dit.isst.grupo14_belleza.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> getAllReservas() {
        return (List<Reserva>) reservaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Reserva> getReservaById(@PathVariable Long id) {
        return reservaRepository.findById(id);
    }

    @PostMapping
    public Reserva createReserva(@RequestBody Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @PutMapping("/{id}")
    public Reserva updateReserva(@PathVariable Long id, @RequestBody Reserva reserva) {
        if (reservaRepository.existsById(id)) {
            reserva.setId_reserva(id);
            return reservaRepository.save(reserva);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteReserva(@PathVariable Long id) {
        reservaRepository.deleteById(id);
    }
}

package es.upm.dit.isst.grupo14_belleza.controller;

import es.upm.dit.isst.grupo14_belleza.model.ReservaServicio;
import es.upm.dit.isst.grupo14_belleza.repository.ReservaServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/reservaServicios")
public class ReservaServicioController {

    @Autowired
    private ReservaServicioRepository reservaServicioRepository;

    @GetMapping
    public List<ReservaServicio> getAllReservasServicios() {
        return (List<ReservaServicio>) reservaServicioRepository.findAll();
    }

    @PostMapping
    public ReservaServicio createReservaServicio(@RequestBody ReservaServicio reservaServicio) {
        return reservaServicioRepository.save(reservaServicio);
    }

    @DeleteMapping("/{id}")
    public void deleteReservaServicio(@RequestBody ReservaServicio reservaServicio) {
        reservaServicioRepository.delete(reservaServicio);
    }
    
}

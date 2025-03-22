package es.upm.dit.isst.grupo14_belleza.controller;

import es.upm.dit.isst.grupo14_belleza.model.Servicio;
import es.upm.dit.isst.grupo14_belleza.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servicios")
public class ServicioController {

    @Autowired
    private ServicioRepository servicioRepository;

    @GetMapping
    public List<Servicio> getAllServicios() {
        return (List<Servicio>) servicioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Servicio> getServicioById(@PathVariable Long id) {
        return servicioRepository.findById(id);
    }

    @PostMapping
    public Servicio createServicio(@RequestBody Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    @PutMapping("/{id}")
    public Servicio updateServicio(@PathVariable Long id, @RequestBody Servicio servicio) {
        if (servicioRepository.existsById(id)) {
            servicio.setId_servicio(id);
            return servicioRepository.save(servicio);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteServicio(@PathVariable Long id) {
        servicioRepository.deleteById(id);
    }
}

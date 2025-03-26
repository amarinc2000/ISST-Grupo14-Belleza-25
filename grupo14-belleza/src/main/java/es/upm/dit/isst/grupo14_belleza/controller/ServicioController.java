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

    @GetMapping("/{id_servicio}")
    public Optional<Servicio> getServicioById(@PathVariable Long id_servicio) {
        return servicioRepository.findById(id_servicio);
    }

    @PostMapping
    public Servicio createServicio(@RequestBody Servicio servicio) {
        return servicioRepository.save(servicio);
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

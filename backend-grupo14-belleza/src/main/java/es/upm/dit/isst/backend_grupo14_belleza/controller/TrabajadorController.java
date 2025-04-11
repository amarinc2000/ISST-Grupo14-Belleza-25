package es.upm.dit.isst.backend_grupo14_belleza.controller;

import es.upm.dit.isst.backend_grupo14_belleza.model.Trabajador;
import es.upm.dit.isst.backend_grupo14_belleza.repository.TrabajadorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

public class TrabajadorController {
    @Autowired
    private TrabajadorRepository trabajadorRepository;

    @GetMapping("/trabajadores")
    public Iterable<Trabajador> getAllTrabajadores() {
        return trabajadorRepository.findAll();
    }

    @GetMapping("/trabajadores/{id}")
    public Trabajador getTrabajadorById(@PathVariable Long id) {
        return trabajadorRepository.findById(id).orElse(null);
    }

    @PostMapping("/trabajadores")
    public Trabajador createTrabajador(@RequestBody Trabajador trabajador) {
        return trabajadorRepository.save(trabajador);
    }

    @PutMapping("/trabajadores/{id}")
    public Trabajador updateTrabajador(@PathVariable Long id, @RequestBody Trabajador trabajador) {
        trabajador.setId_trabajador(id);
        return trabajadorRepository.save(trabajador);
    }

    @DeleteMapping("/trabajadores/{id}")
    public void deleteTrabajador(@PathVariable Long id) {
        trabajadorRepository.deleteById(id);
    }

}

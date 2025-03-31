package es.upm.dit.isst.grupo14_belleza.controller;

import es.upm.dit.isst.grupo14_belleza.model.Negocio;
import es.upm.dit.isst.grupo14_belleza.model.Servicio;
import es.upm.dit.isst.grupo14_belleza.repository.NegocioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/negocios")
public class NegocioController {

    @Autowired
    private NegocioRepository negocioRepository;

    @GetMapping
    public List<Negocio> getAllNegocios() {
        return (List<Negocio>) negocioRepository.findAll();
    }

    @GetMapping("/{id_negocio}")
    public Optional<Negocio> getNegocioById(@PathVariable Long id_negocio) {
        return negocioRepository.findById(id_negocio);
    }

    
    @GetMapping("/{id_negocio}/servicios")
  
    @PostMapping
    public Negocio createNegocio(@RequestBody Negocio negocio) {
        return negocioRepository.save(negocio);
    }

    @PutMapping("/{id_negocio}")
    public Negocio updateNegocio(@PathVariable Long id_negocio, @RequestBody Negocio negocio) {
        if (negocioRepository.existsById(id_negocio)) {
            negocio.setId_negocio(id_negocio);
            return negocioRepository.save(negocio);
        }
        return null;
    }

    @DeleteMapping("/{id_negocio}")
    public void deleteNegocio(@PathVariable Long id_negocio) {
        negocioRepository.deleteById(id_negocio);
    }
}

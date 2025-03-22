package es.upm.dit.isst.grupo14_belleza.controller;

import es.upm.dit.isst.grupo14_belleza.model.Negocio;
import es.upm.dit.isst.grupo14_belleza.repository.NegocioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/negocios")
public class NegocioController {

    @Autowired
    private NegocioRepository negocioRepository;

    @GetMapping
    public List<Negocio> getAllNegocios() {
        return (List<Negocio>) negocioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Negocio> getNegocioById(@PathVariable Long id) {
        return negocioRepository.findById(id);
    }

    @PostMapping
    public Negocio createNegocio(@RequestBody Negocio negocio) {
        return negocioRepository.save(negocio);
    }

    @PutMapping("/{id}")
    public Negocio updateNegocio(@PathVariable Long id, @RequestBody Negocio negocio) {
        if (negocioRepository.existsById(id)) {
            negocio.setId_negocio(id);
            return negocioRepository.save(negocio);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteNegocio(@PathVariable Long id) {
        negocioRepository.deleteById(id);
    }
}

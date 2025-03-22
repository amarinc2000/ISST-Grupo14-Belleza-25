package es.upm.dit.isst.grupo14_belleza.controller;

import es.upm.dit.isst.grupo14_belleza.model.Favorito;
import es.upm.dit.isst.grupo14_belleza.repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/favoritos")
public class FavoritoController {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @GetMapping
    public List<Favorito> getAllFavoritos() {
        return (List<Favorito>) favoritoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Favorito> getFavoritoById(@PathVariable Long id) {
        return favoritoRepository.findById(id);
    }

    @PostMapping
    public Favorito createFavorito(@RequestBody Favorito favorito) {
        return favoritoRepository.save(favorito);
    }

    @PutMapping("/{id}")
    public Favorito updateFavorito(@PathVariable Long id, @RequestBody Favorito favorito) {
        if (favoritoRepository.existsById(id)) {
            favorito.setId_favorito(id);
            return favoritoRepository.save(favorito);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteFavorito(@PathVariable Long id) {
        favoritoRepository.deleteById(id);
    }
}

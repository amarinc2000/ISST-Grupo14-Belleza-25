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

    @GetMapping("/{id_favorito}")
    public Optional<Favorito> getFavoritoById(@PathVariable Long id_favorito) {
        return favoritoRepository.findById(id_favorito);
    }

    @PostMapping
    public Favorito createFavorito(@RequestBody Favorito favorito) {
        return favoritoRepository.save(favorito);
    }

    @PutMapping("/{id_favorito}")
    public Favorito updateFavorito(@PathVariable Long id_favorito, @RequestBody Favorito favorito) {
        if (favoritoRepository.existsById(id_favorito)) {
            favorito.setId_favorito(id_favorito);
            return favoritoRepository.save(favorito);
        }
        return null;
    }

    @DeleteMapping("/{id_favorito}")
    public void deleteFavorito(@PathVariable Long id_favorito) {
        favoritoRepository.deleteById(id_favorito);
    }
}

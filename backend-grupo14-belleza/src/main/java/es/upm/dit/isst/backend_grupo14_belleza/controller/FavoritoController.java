package es.upm.dit.isst.backend_grupo14_belleza.controller;

import es.upm.dit.isst.backend_grupo14_belleza.model.Favorito;
import es.upm.dit.isst.backend_grupo14_belleza.repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@CrossOrigin(origins = "http://localhost:5173")
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
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @PostMapping
    public Favorito createFavorito(@RequestBody Favorito favorito) {
        return favoritoRepository.save(favorito);
    }

    @PutMapping("{id_favorito}")
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

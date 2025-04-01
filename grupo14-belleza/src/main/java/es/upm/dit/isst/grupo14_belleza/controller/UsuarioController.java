package es.upm.dit.isst.grupo14_belleza.controller;

import es.upm.dit.isst.grupo14_belleza.model.Usuario;
import es.upm.dit.isst.grupo14_belleza.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return (List<Usuario>) usuarioRepository.findAll();
    }

    @GetMapping("/{id_usuario}")
    public Optional<Usuario> getUsuarioById(@PathVariable Long id_usuario) {
        return usuarioRepository.findById(id_usuario);
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/{id_usuario}")
    public Usuario updateUsuario(@PathVariable Long id_usuario, @RequestBody Usuario usuario) {
        if (usuarioRepository.existsById(id_usuario)) {
            usuario.setId_usuario(id_usuario);
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    @DeleteMapping("/{id_usuario}")
    public void deleteUsuario(@PathVariable Long id_usuario) {
        usuarioRepository.deleteById(id_usuario);
    }
}

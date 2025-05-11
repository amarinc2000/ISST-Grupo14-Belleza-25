package es.upm.dit.isst.backend_grupo14_belleza.controller;

import es.upm.dit.isst.backend_grupo14_belleza.model.Cliente;
import es.upm.dit.isst.backend_grupo14_belleza.model.Usuario;
import es.upm.dit.isst.backend_grupo14_belleza.repository.ClienteRepository;
import es.upm.dit.isst.backend_grupo14_belleza.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /*
     * @Autowired
     * private PasswordEncoder passwordEncoder; // para cifrar la contraseña
     */

    // Registrar nuevo usuario
    @PostMapping("/register")
    public Usuario createUsuario(@RequestBody Usuario usuario) {

        return usuarioRepository.save(usuario);
        // Cifrar la contraseña antes de guardarla
        // String hashedPassword = passwordEncoder.encode(usuario.getContraseña());
        // usuario.setContraseña(hashedPassword);

    }

    // Listar usuarios (para pruebas) DESACTIVAR ESTO CUANDO FUNCIONE
    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return (List<Usuario>) usuarioRepository.findAll();
    }

    @GetMapping("/{id_usuario}")
    public Usuario getUsuarioById(@PathVariable Long id_usuario) {
        return usuarioRepository.findById(id_usuario).orElse(null);
    }

    @DeleteMapping("/{id_usuario}")
    public void deleteUsuario(@PathVariable Long id_usuario) {
        usuarioRepository.deleteById(id_usuario);
    }

    // Verificar si el usuario existe y la contraseña coincide
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        String username = usuario.getUsername();
        String password = usuario.getPassword();

        // Buscar el usuario por su nombre de usuario
        Usuario foundUsuario = usuarioRepository.findByUsername(username);

        // Verificar si el usuario existe y si la contraseña coincide
        if (foundUsuario != null && foundUsuario.getPassword().equals(password)) {
            return ResponseEntity.ok(foundUsuario); // Devolver el usuario encontrado con 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado o contraseña incorrecta"); // 401
                                                                                                                         // Unauthorized
        }
    }

}

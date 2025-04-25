/* package es.upm.dit.isst.backend_grupo14_belleza.config;


import es.upm.dit.isst.backend_grupo14_belleza.model.Usuario;
import es.upm.dit.isst.backend_grupo14_belleza.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
         // Llamar al repositorio para obtener el usuario por su email
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el correo: " + email));

       // Retorna un objeto User de Spring Security con la información del usuario
       return new User(
        usuario.getEmail(),                      // username (email)
        usuario.getContraseña(),                 // contraseña
        Collections.singletonList(               // roles -> permisos
                new SimpleGrantedAuthority("ROLE_" + usuario.getRol())
        ));
    }
}
 */
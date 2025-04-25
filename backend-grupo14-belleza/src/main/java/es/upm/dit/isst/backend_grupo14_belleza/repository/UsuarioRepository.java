package es.upm.dit.isst.backend_grupo14_belleza.repository;

import es.upm.dit.isst.backend_grupo14_belleza.model.Usuario;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long> { // proporciona operaciones CRUD (Crear,
                                                                                 // Leer, Actualizar, Eliminar) básicas
                                                                                 // sobre entidades

    // Poner aqui metodos opcionales
  // Método para buscar por nombre
   
}

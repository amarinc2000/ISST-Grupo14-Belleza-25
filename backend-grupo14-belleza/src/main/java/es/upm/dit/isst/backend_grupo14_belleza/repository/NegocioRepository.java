package es.upm.dit.isst.backend_grupo14_belleza.repository;

import es.upm.dit.isst.backend_grupo14_belleza.model.Negocio;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NegocioRepository extends CrudRepository<Negocio, Long> {
    
    // Método para buscar por nombre
    Optional<Negocio> findByNombre(String nombre);
}

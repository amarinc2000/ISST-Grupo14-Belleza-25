package es.upm.dit.isst.backend_grupo14_belleza.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import es.upm.dit.isst.backend_grupo14_belleza.model.Servicio;
import java.util.Optional;

@Repository
public interface ServicioRepository extends CrudRepository<Servicio, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    
    // Método para buscar por nombre
    Optional<Servicio> findByNombre(String nombre);
}

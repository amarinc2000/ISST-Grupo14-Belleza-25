package es.upm.dit.isst.backend_grupo14_belleza.repository;

import es.upm.dit.isst.backend_grupo14_belleza.model.Negocio;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface NegocioRepository extends CrudRepository<Negocio, Long> {
    
    // Método para buscar por nombre
    Optional<Negocio> findByNombre(String nombre);

    // Método para buscar por ID
    Optional<Negocio> findById(Long id);
    

    // Metodo para buscar negocios por nombre de servicio o nombre de negocio
     @Query("""
        SELECT n FROM Negocio n 
        JOIN n.servicios s 
        WHERE UPPER(n.nombre) LIKE UPPER(CONCAT('%', :texto, '%')) 
           OR UPPER(s.nombre) LIKE UPPER(CONCAT('%', :texto, '%'))
        """)
    List<Negocio> buscarPorNombreNegocioOServicio(@Param("texto") String texto);
}

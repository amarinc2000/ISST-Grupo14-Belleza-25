package es.upm.dit.isst.grupo14_belleza.repository;

import es.upm.dit.isst.grupo14_belleza.model.Servicio;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServicioRepository extends CrudRepository<Servicio, Long> {
    // Poner aqui metodos opcionales
@Query("SELECT DISTINCT s.negocio.nombre FROM Servicio s " +
        "WHERE LOWER(s.nombre) LIKE %:nombre% OR LOWER(s.negocio.nombre) LIKE %:nombre%")
List<String> findNegociosByNombreOServicios(@Param("nombre") String nombre);
}

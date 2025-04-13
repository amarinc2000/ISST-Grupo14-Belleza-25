package es.upm.dit.isst.backend_grupo14_belleza.repository;

import es.upm.dit.isst.backend_grupo14_belleza.model.Cliente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ClienteRepository extends CrudRepository<Cliente, Long> { // proporciona operaciones CRUD (Crear, Leer,

} 



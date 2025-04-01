package es.upm.dit.isst.grupo14_belleza.repository;

import es.upm.dit.isst.grupo14_belleza.model.ReservaServicio;
import org.springframework.data.repository.CrudRepository; 
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaServicioRepository extends CrudRepository<ReservaServicio, Long> { // proporciona operaciones CRUD (Crear,Leer,
                                                                           // Actualizar, Eliminar) básicas sobre
                                                                           // entidades

    // Poner aqui metodos opcionales

}

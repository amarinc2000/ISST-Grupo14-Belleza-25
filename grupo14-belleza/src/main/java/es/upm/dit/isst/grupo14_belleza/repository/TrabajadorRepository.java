package es.upm.dit.isst.grupo14_belleza.repository;

import es.upm.dit.isst.grupo14_belleza.model.Trabajador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrabajadorRepository extends CrudRepository<Trabajador, Long> { // proporciona operaciones CRUD (Crear,
                                                                                 // Leer, Actualizar, Eliminar) básicas
                                                                                 // sobre entidades

    // Poner aqui metodos opcionales

}
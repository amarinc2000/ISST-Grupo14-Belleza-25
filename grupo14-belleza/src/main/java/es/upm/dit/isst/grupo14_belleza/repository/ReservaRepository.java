package es.upm.dit.isst.grupo14_belleza.repository;

import es.upm.dit.isst.grupo14_belleza.model.Reserva;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaRepository extends CrudRepository<Reserva, Long> { // proporciona operaciones CRUD (Crear,Leer,
                                                                           // Actualizar, Eliminar) básicas sobre
                                                                           // entidades

    // Poner aqui metodos opcionales

}

package es.upm.dit.isst.grupo14_belleza.repository;

import es.upm.dit.isst.grupo14_belleza.model.Negocio;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NegocioRepository extends CrudRepository<Negocio, Long> { // proporciona operaciones CRUD (Crear,Leer,
                                                                           // Actualizar, Eliminar) básicas sobre
                                                                           // entidades

    // Poner aqui metodos opcionales

}
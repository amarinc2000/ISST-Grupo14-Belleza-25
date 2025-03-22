package es.upm.dit.isst.grupo14_belleza.repository;

import es.upm.dit.isst.grupo14_belleza.model.Favorito;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritoRepository extends CrudRepository<Favorito, Long> { // proporciona operaciones CRUD (Crear,
                                                                             // Leer, Actualizar, Eliminar) básicas
                                                                             // sobre entidades

    // Poner aqui metodos opcionales
    Iterable<Favorito> findByNombre(String nombre);
}

/**
 * Este comment es para que veais los metodos que tiene la clase CrudRepository,
 * importada en todos los repositorys
 * public interface CrudRepository<T,ID> extends Repository<T,ID> {
 * long count();
 * void delete(T entity);
 * void deleteAll();
 * void deleteById(ID id);
 * boolean existsById(ID id);
 * Iterable<T> findAll();
 * Optional<T> findById(ID id);
 * <S extends T> S save(S entity);
 * }
 */

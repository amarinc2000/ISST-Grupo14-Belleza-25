package es.upm.dit.isst.backend_grupo14_belleza.repository;

import es.upm.dit.isst.backend_grupo14_belleza.model.Favorito;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritoRepository extends CrudRepository<Favorito, Long> { 

}

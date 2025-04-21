package es.upm.dit.isst.backend_grupo14_belleza.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import es.upm.dit.isst.backend_grupo14_belleza.model.Reserva;
import es.upm.dit.isst.backend_grupo14_belleza.model.Servicio;
import es.upm.dit.isst.backend_grupo14_belleza.model.Cliente;
import es.upm.dit.isst.backend_grupo14_belleza.model.Negocio;
import es.upm.dit.isst.backend_grupo14_belleza.model.Trabajador;
import java.util.List;
import java.util.Optional;
import java.util.Date;

@Repository
public interface ReservaRepository extends CrudRepository<Reserva, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
    // Por ejemplo, para buscar reservas por fecha, cliente, etc.

    // Método para buscar por fecha
    //Optional<Reserva> findByFecha(Date fecha);

    // Método para buscar por cliente
    //Optional<Reserva> findByCliente(Cliente cliente);

    // Método para buscar por negocio
    //List<Reserva> findByNegocio(Negocio negocio);

    // Método para buscar por trabajador
    //List<Reserva> findByTrabajador(Trabajador trabajador);

    // Método para buscar por servicio
    //List<Reserva> findByServicio(Servicio servicio);
}

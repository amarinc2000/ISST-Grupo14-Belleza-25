package es.upm.dit.isst.grupo14_belleza.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reserva_servicio")
public class ReservaServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_reserva", nullable = false)
    private Reserva reserva;

    @ManyToOne
    @JoinColumn(name = "id_servicio", nullable = false)
    private Servicio servicio;

    public ReservaServicio() {}

    public ReservaServicio(Reserva reserva, Servicio servicio) {
        this.reserva = reserva;
        this.servicio = servicio;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }
}

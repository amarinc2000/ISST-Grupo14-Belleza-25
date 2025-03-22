package es.upm.dit.isst.grupo14_belleza.model;

import jakarta.persistence.*;

@Entity
@Table(name = "trabajador_servicio")
public class TrabajadorServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_trabajador", nullable = false)
    private Trabajador trabajador;

    @ManyToOne
    @JoinColumn(name = "id_servicio", nullable = false)
    private Servicio servicio;

    // Constructor vacío
    public TrabajadorServicio() {}

    // Constructor con parámetros
    public TrabajadorServicio(Trabajador trabajador, Servicio servicio) {
        this.trabajador = trabajador;
        this.servicio = servicio;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }
}

package es.upm.dit.isst.grupo14_belleza.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8,unique = true)
    private Long id_reserva;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario; // Relación con Usuario

    @ManyToOne
    @JoinColumn(name = "id_servicio", nullable = false)
    private Servicio servicio; // Relación con Servicio

    @NotNull(message = "La fecha y hora de la reserva no puede ser nula")
    @Column(name = "fecha_hora", nullable = false)
    private java.time.LocalDateTime fechaHora; // Fecha y hora de la reserva

    @NotNull(message = "El estado de la reserva debe ser especificado")
    @Column(name = "confirmada", nullable = false)
    private Boolean confirmada; // Indica si la reserva está confirmada o no

    // Constructor
    public Reserva(Long id_reserva, Usuario usuario, Servicio servicio, LocalDateTime fechaHora, Boolean confirmada) {
        this.id_reserva = id_reserva;
        this.usuario = usuario;
        this.servicio = servicio;
        this.fechaHora = fechaHora;
        this.confirmada = confirmada;
    }

    // Getters
    public Long getId_reserva() {
        return id_reserva;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public java.time.LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public Boolean getConfirmada() {
        return confirmada;
    }

    // Setters
    public void setId_reserva(Long id_reserva) {
        this.id_reserva = id_reserva;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

    public void setFechaHora(java.time.LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public void setConfirmada(Boolean confirmada) {
        this.confirmada = confirmada;
    }

}

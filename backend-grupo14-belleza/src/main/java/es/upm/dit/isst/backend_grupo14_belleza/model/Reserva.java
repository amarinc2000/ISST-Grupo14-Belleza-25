package es.upm.dit.isst.backend_grupo14_belleza.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.*;
import java.time.*;

import org.springframework.cglib.core.Local;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "reserva")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8, unique = true)
    private Long id_reserva;

    @Column(name = "fecha_hora", nullable = false)
    @NotNull(message = "La fecha y hora de la reserva no puede estar vacía")
    private LocalDate fecha_hora; // Fecha y hora de la reserva

    @Column(name = "hora_inicio", nullable = false)
    @NotNull(message = "La hora de inicio no puede estar vacía")
    private LocalTime hora_inicio; // Hora de inicio de la reserva

    @Column(name = "hora_fin", nullable = false)
    @NotNull(message = "La hora de fin no puede estar vacía")
    private LocalTime hora_fin; // Hora de fin de la reserva

    @Column(name = "confirmada", nullable = false)
    @NotNull(message = "La confirmación de la reserva no puede estar vacía")
    private Boolean confirmada = false; // Confirmación de la reserva (por defecto es false)

    @ManyToOne 
    @JoinColumn(name = "id_servicio", nullable = false)
    @JsonIgnoreProperties({"reservas", "negocios", "trabajadores"})
    private Servicio servicio;
    
    @ManyToOne 
    @JoinColumn(name = "id_cliente", nullable = false)
    @JsonIgnoreProperties({"reservas", "favoritos"})
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_trabajador", nullable = true)
    @JsonIgnoreProperties({"reservas", "negocios", "servicios"})
    private Trabajador trabajador; // Trabajador asignado a la reserva (opcional)

    //VALORAR SI SE PONE TRABAJADOR O NO

    public Reserva() {}

    public Reserva(Long id_reserva, LocalDate fecha_hora, LocalTime hora_inicio, LocalTime hora_fin, Boolean confirmada, Servicio servicio, Cliente cliente, Trabajador trabajador) {
        this.id_reserva = id_reserva;
        this.fecha_hora = fecha_hora;
        this.hora_inicio = hora_inicio;
        this.hora_fin = hora_fin;
        this.confirmada = confirmada;
        this.servicio = servicio;
        this.cliente = cliente;
        this.trabajador = trabajador;
    }

    // Getters
    public Long getId_reserva() {
        return id_reserva;
    }
    public LocalDate getFecha_hora() {
        return fecha_hora;
    }
    public LocalTime getHora_inicio() {
        return hora_inicio;
    }
    public LocalTime getHora_fin() {
        return hora_fin;
    }
    public Boolean getConfirmada() {
        return confirmada;
    }
    public Servicio getServicio() {
        return servicio;
    }
    public Cliente getCliente() {
        return cliente;
    }
    public Trabajador getTrabajador() {
        return trabajador;
    }

    // Setters
    public void setId_reserva(Long id_reserva) {
        this.id_reserva = id_reserva;
    }
    public void setFecha_hora(LocalDate fecha_hora) {
        this.fecha_hora = fecha_hora;
    }
    public void setHora_inicio(LocalTime hora_inicio) {
        this.hora_inicio = hora_inicio;
    }
    public void setHora_fin(LocalTime hora_fin) {
        this.hora_fin = hora_fin;
    }
    public void setConfirmada(Boolean confirmada) {
        this.confirmada = confirmada;
    }
    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }
    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }
}

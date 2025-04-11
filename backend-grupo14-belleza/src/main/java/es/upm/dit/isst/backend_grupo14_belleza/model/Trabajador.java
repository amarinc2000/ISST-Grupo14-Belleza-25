package es.upm.dit.isst.backend_grupo14_belleza.model;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.lang.annotation.Inherited;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.processing.Generated;

@Entity
@Table(name = "trabajador")
public class Trabajador {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8, unique = true)
    private Long id_trabajador;

    @ManyToOne
    @JoinColumn(name = "id_negocio", nullable = false)
    private Negocio negocio; // Relación con Negocio

    @NotEmpty(message = "El nombre del trabajador no puede estar vacío")
    @Size(max = 255, message = "El nombre del trabajador debe tener máximo 255 caracteres")
    @Column(name = "nombre", length = 255, nullable = false)
    private String nombre; // Nombre del trabajador

    // Constructor vacío (obligatorio para JPA)
    public Trabajador() {}
    // Constructor con parámetros (opcional para crear objetos más fácilmente)
    public Trabajador(Negocio negocio, String nombre) {
        this.negocio = negocio;
        this.nombre = nombre;
    }
    // Getters
    public Long getId_trabajador() {
        return id_trabajador;
    }
    public Negocio getId_negocio() {
        return negocio;
    }
    public String getNombre() {
        return nombre;
    }   
    // Setters
    public void setId_trabajador(Long id_trabajador) {
        this.id_trabajador = id_trabajador;
    }
    public void setNegocio(Negocio negocio) {
        this.negocio = negocio;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
}

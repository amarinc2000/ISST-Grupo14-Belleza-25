package es.upm.dit.isst.grupo14_belleza.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.Digits;

import java.util.*;

@Entity
@Table(name = "negocio")
public class Negocio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Digits(integer = 8, fraction = 0, message = "El ID del negocio debe tener máximo 8 dígitos")
    @Column(length = 8, unique = true)
    private Long id_negocio;

    @NotEmpty(message = "El nombre del negocio no puede estar vacío")
    @Size(max = 100, message = "El nombre del negocio debe tener máximo 100 caracteres")
    @Column(length = 100)
    private String nombre;

    @NotEmpty(message = "La dirección email del negocio no puede estar vacía")
    @Email(message = "Debe ser un correo electrónico válido")
    @Size(max = 255, message = "El email debe tener máximo 255 caracteres")
    @Column(length = 255, unique = true)
    private String email;

    @NotEmpty(message = "La contraseña no puede estar vacía")
    
    @Size(min = 8, max = 255, message = "La contraseña debe tener entre 8 y 255 caracteres")
    @Column(length = 255)
    private String contraseña;

    @OneToMany(mappedBy = "negocio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Trabajador> trabajadores;

    @OneToMany(mappedBy = "negocio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("negocio")
    private Set<Servicio> servicios;

    @Size(min = 3, max = 255)
    @Column(length = 255)
    private String direccion;

    @Size(min = 3, max = 9)
    @Column(length = 255)
    private String telefono;


    // Constructor sin parámetros necesario para jpa
    public Negocio() {
}
    // Constructor
    public Negocio(Long id_negocio, String nombre, String email, String contraseña, List<Trabajador> trabajadores,
            Set<Servicio> servicios, String direccion, String telefono) {
        this.id_negocio = id_negocio;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
        this.trabajadores = trabajadores;
        this.servicios = servicios;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    // Getters
    public Long getId_negocio() {
        return id_negocio;
    }

    public String getNombre() {
        return nombre;
    }

    public String getEmail() {
        return email;
    }

    public String getContraseña() {
        return contraseña;
    }

    public List<Trabajador> getTrabajadores() {
        return trabajadores;
    }

    public Set<Servicio> getServicios() {
        return servicios;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    // Setters
    public void setId_negocio(Long id_negocio) {
        this.id_negocio = id_negocio;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public void setTrabajadores(List<Trabajador> trabajadores) {
        this.trabajadores = trabajadores;
    }

    public void setServicios(Set<Servicio> servicios) {
        this.servicios = servicios;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

}
package es.upm.dit.isst.backend_grupo14_belleza.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "cliente")
public class Cliente{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8, unique = true)
    private Long id_cliente;

    @NotEmpty(message = "El nombre del cliente no puede estar vacío")
    @Size(max = 100, message = "El nombre del cliente debe tener máximo 100 caracteres")
    @Column(length = 100)
    private String nombre;

    @NotEmpty(message = "La dirección email del cliente no puede estar vacía")
    @Email(message = "Debe ser un correo electrónico válido")
    @Size(max = 255, message = "El email debe tener máximo 255 caracteres")
    @Column(length = 255, unique = true)
    private String email;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("cliente")
    private List<Reserva> reservas; // Relación con Cita

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("cliente")
    private List<Favorito> favoritos; // Relación con los favoritos 

    @OneToOne(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("cliente")
    private Usuario usuario;

    public Cliente() {}
    public Cliente(Long id_cliente, String nombre, String email, String contraseña, List<Favorito> favoritos, List<Reserva> reservas, Usuario usuario) {
        this.id_cliente = id_cliente;
        this.nombre = nombre;
        this.email = email;
        this.favoritos = favoritos;
        this.reservas = reservas; 
    }

    // Getters
    public Long getId_cliente() {
        return id_cliente;
    }
    public String getNombre() {
        return nombre;
    }
    public String getEmail() {
        return email;
    }
    public List<Favorito> getFavoritos() {
        return favoritos;
    } 
    public Usuario getUsuario() {
        return usuario;
    }
  
    // Setters
    public void setId_cliente(Long id_cliente) {
        this.id_cliente = id_cliente;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setFavoritos(List<Favorito> favoritos) {
        this.favoritos = favoritos;
    } 
    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }
    public List<Reserva> getReservas() {
        return reservas;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}      
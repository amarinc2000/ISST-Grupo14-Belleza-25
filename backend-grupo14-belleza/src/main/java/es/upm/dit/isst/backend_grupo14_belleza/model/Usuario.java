package es.upm.dit.isst.backend_grupo14_belleza.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nimbusds.jose.shaded.gson.annotations.JsonAdapter;

import jakarta.persistence.*;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotEmpty;


@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_usuario;

    @NotEmpty(message = "El username no puede estar vacío")
    @Size(min = 3, max = 20, message = "El username debe tener entre 3 y 20 caracteres")
    @Column(length = 255 ,unique = true)
    private String username;

    @NotEmpty(message = "La contraseña no puede estar vacía")
    @Size(min = 8, max = 255, message = "La contraseña debe tener entre 8 y 255 caracteres")
    @Column(length = 255)
    private String password;

    private String rol; // "CLIENTE" o "TRABAJADOR"

    
    @OneToOne
    @JsonIgnoreProperties("usuario")
    private Cliente cliente; // nullable

    @OneToOne
    @JsonIgnoreProperties("usuario")
    private Trabajador trabajador; // nullable

    // Constructor vacío (obligatorio para JPA)
    public Usuario() {}
    // Constructor con parámetros (opcional para crear objetos más fácilmente)
    public Usuario(String username, String password, String rol, Cliente cliente, Trabajador trabajador) {
        this.username = username;   
        this.password = password;
        this.rol = rol; 
       
    }
    // Getters
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public Long getId_usuario() {
        return id_usuario;
    }

    public String getRol() {
        return rol;
    }
    public Cliente getCliente() {
        return cliente;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }
    // Setters
    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }   
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
  
    public void setRol(String rol) {
        this.rol = rol;
    }
    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }
}

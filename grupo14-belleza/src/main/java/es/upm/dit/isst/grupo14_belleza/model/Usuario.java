package es.upm.dit.isst.grupo14_belleza.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8)
    private Long id_favorito;

    @NotEmpty(message = "El nombre del usuario no puede estar vacío")
    @Size(max = 100, message = "El nombre del usuario debe tener máximo 100 caracteres")
    @Column(length = 100)
    private String nombre;

    @NotEmpty(message = "La dirección email del usuario no puede estar vacía")
    @Email(message = "Debe ser un correo electrónico válido")
    @Size(max = 255, message = "El email debe tener máximo 255 caracteres")
    @Column(length = 255, unique = true)
    private String email;

    @NotEmpty(message = "La contraseña no puede estar vacía")
    @Pattern(regexp = "^(?=.[!@#$%^&]).{8,255}$", message = "La contraseña debe contener al menos un carácter especial (!@#$%^&)")
    @Size(min = 8, max = 255, message = "La contraseña debe tener entre 8 y 255 caracteres")
    @Column(length = 255)
    @JsonIgnore
    private String contraseña;

    // Relación con los favoritos (1 usuario tiene muchos favoritos)
    @OneToMany(mappedBy = "id_usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorito> favoritos; // Relación con los favoritos

    public Usuario(Long id_favorito, String nombre, String email, String contraseña, List<Favorito> favoritos) {
        this.id_favorito = id_favorito;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
        this.favoritos = favoritos;
    }

    // Getters
    public Long getId_favorito() {
        return id_favorito;
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

    public List<Favorito> getFavoritos() {
        return favoritos;
    }

    // Setters
    public void setId_favorito(Long id_favorito) {
        this.id_favorito = id_favorito;
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

    public void setFavoritos(List<Favorito> favoritos) {
        this.favoritos = favoritos;
    }

}

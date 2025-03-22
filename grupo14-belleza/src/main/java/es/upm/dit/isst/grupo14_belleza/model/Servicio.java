package es.upm.dit.isst.grupo14_belleza.model;

import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "servicio")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Digits(integer = 8, fraction = 0, message = "El ID del usuario debe tener máximo 8 dígitos")
    @Column(length = 8, unique = true)
    private Long id_usuario;

    @NotEmpty(message = "El nombre del usuario no puede estar vacío")
    @Size(max = 100, message = "El nombre del usuario debe tener máximo 100 caracteres")
    @Column(length = 100)
    private String nombre;

    @NotEmpty(message = "El correo electrónico no puede estar vacío")
    @Email(message = "Debe ser un correo electrónico válido")
    @Size(max = 255, message = "El correo electrónico debe tener máximo 255 caracteres")
    @Column(length = 255, unique = true)
    private String email;

    @NotEmpty(message = "La contraseña no puede estar vacía")
    @Pattern(regexp = "^(?=.[!@#$%^&]).{8,255}$", message = "La contraseña debe contener al menos un carácter especial (!@#$%^&)")
    @Size(min = 8, max = 255, message = "La contraseña debe tener entre 8 y 255 caracteres")
    @Column(length = 255)
    @JsonIgnore
    private String contraseña;

    @OneToMany(mappedBy = "id_usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Favorito> favoritos; // Relación con los favoritos

    // Constructor
    public Servicio(Long id_usuario, String nombre, String email, String contraseña, Set<Favorito> favoritos) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
        this.favoritos = favoritos;
    }

    // Getters
    public Long getId_usuario() {
        return id_usuario;
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

    public Set<Favorito> getFavoritos() {
        return favoritos;
    }

    // Setters
    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
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

    public void setFavoritos(Set<Favorito> favoritos) {
        this.favoritos = favoritos;
    }
}

package es.upm.dit.isst.grupo14_belleza.model;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "negocio")
public class Negocio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Size(max = 8, message = "El id del negocio debe tener máximo 8 caracteres")
    @Column(length = 8)
    private Long id_negocio;

    @NotEmpty(message = "El nombre del negocio no puede estar vacío")
    @Size(max = 100, message = "El nombre del negocio debe tener máximo 100 caracteres")
    @Column(length = 100)
    private String nombre;

    @NotEmpty(message = "La dirección del negocio no puede estar vacía")
    @Email(message = "Debe ser un correo electrónico válido")
    @Size(max = 255, message = "El email debe tener máximo 255 caracteres")
    @Column(length = 255, unique = true)
    private String email;

    @NotEmpty(message = "La contraseña no puede estar vacía")
    @Size(min = 8, max = 255, message = "La contraseña debe tener entre 8 y 255 caracteres")
    @Column(length = 255)
    private String contraseña;
}

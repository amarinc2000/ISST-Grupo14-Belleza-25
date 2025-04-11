package es.upm.dit.isst.backend_grupo14_belleza.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.*;

@Entity
@Table(name = "negocio")
public class Negocio {
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String nombre;

    @Size(max = 255, message = "La descripción no puede tener más de 255 caracteres")
    private String descripcion;

    private String direccion;

    @Pattern(regexp = "^\\+?\\d{1,3}\\s?\\(?\\d{2,3}\\)?\\s?\\d{4,5}\\s?\\d{4}$", 
             message = "Número de teléfono inválido")
    private String telefono;

    @Email(message = "Correo electrónico no válido")
    private String email;

    private String horario;
    private String imagen;

    @OneToMany(mappedBy = "negocio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Trabajador> trabajadores;

    public Negocio() {
        this.trabajadores = new ArrayList<>();
    }

    public Negocio(String nombre, String descripcion, String direccion, String telefono, 
                   String email, String horario, String imagen) {
        if (nombre == null || nombre.isEmpty()) {
            throw new IllegalArgumentException("El nombre del negocio es obligatorio");
        }
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("El correo electrónico es obligatorio");
        }

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.horario = horario;
        this.imagen = imagen;
        this.trabajadores = new ArrayList<>();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getHorario() { return horario; }
    public void setHorario(String horario) { this.horario = horario; }

    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }

    public List<Trabajador> getTrabajadores() { return trabajadores; }
    public void setTrabajadores(List<Trabajador> trabajadores) { this.trabajadores = trabajadores; }

    // Método para agregar trabajador
    public void agregarTrabajador(Trabajador trabajador) {
        trabajadores.add(trabajador);
        trabajador.setNegocio(this); // Asegura la relación bidireccional
    }
}


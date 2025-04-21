package es.upm.dit.isst.backend_grupo14_belleza.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "negocio")
public class Negocio {
        
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8, unique = true)
    private Long id_negocio;

    @NotEmpty(message = "El nombre del negocio no puede estar vacío")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String nombre;

    @Size(max = 255, message = "La descripción no puede tener más de 255 caracteres")
    private String descripcion;

    private String direccion;
    
    private String telefono;

    @Email(message = "Correo electrónico no válido")
    @NotEmpty(message = "El correo electrónico no puede estar vacío")
    @Column(length = 255 ,unique = true)
    private String email;

    private String horario;
    private String imagen;

    @OneToMany(mappedBy = "negocio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("negocio")
    private List<Trabajador> trabajadores;

    @ManyToMany (cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "negocio_servicio",
        joinColumns = @JoinColumn(name = "id_negocio"),
        inverseJoinColumns = @JoinColumn(name = "id_servicio")
    )
    @JsonIgnoreProperties("negocios")
    private List<Servicio> servicios;


    public Negocio() {
        this.trabajadores = new ArrayList<>();
        this.servicios = new ArrayList<>(); // Inicializa la lista de servicios
    }

    public Negocio(Long id_negocio ,String nombre, String descripcion, String direccion, String telefono, 
                   String email, String horario, String imagen) {
        if (nombre == null || nombre.isEmpty()) {
            throw new IllegalArgumentException("El nombre del negocio es obligatorio");
        }
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("El correo electrónico es obligatorio");
        }

        this.id_negocio = id_negocio;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.horario = horario;
        this.imagen = imagen;
        this.trabajadores = new ArrayList<>();
        this.servicios = new ArrayList<>(); // Inicializa la lista de servicios
    }

    // Getters and Setters
    public Long getId_negocio() { return id_negocio; }
    public void setId_negocio(Long id_negocio) { this.id_negocio = id_negocio; }
    
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

    public List<Servicio> getServicios() {
        return servicios;
    }
    public void setServicios(List<Servicio> servicios) {
        this.servicios = servicios;
    }
}


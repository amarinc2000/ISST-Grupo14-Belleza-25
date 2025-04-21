package es.upm.dit.isst.backend_grupo14_belleza.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "servicio")
public class Servicio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8, unique = true)
    private Long id_servicio;

    @NotEmpty(message = "El nombre del servicio no puede estar vacío")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String nombre;

    @NotEmpty(message = "El tipo de servicio no puede estar vacío")
    @Size(min = 3, max = 10, message = "El tipo de servicio debe tener entre 3 y 10 caracteres")
    private String tipo;

    @Size(max = 255, message = "La descripción no puede tener más de 255 caracteres")
    @Column(length = 255)
    private String descripcion;

    @Column(name = "duracion", nullable = false)
    @NotNull(message = "La duración no puede estar vacía")
    @Min(value = 1, message = "La duración debe ser al menos 1 minuto")
    @Max(value = 360, message = "La duración no puede superar los 360 minutos")
    private Long duracion;

    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "El precio no puede estar vacío")
    private String precio;

    @ManyToMany(mappedBy = "servicios", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("servicios")
    private List<Negocio> negocios = new ArrayList<>(); // Relación con Negocio

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("servicio")
    private List<Favorito> favoritos; // Relación con Cita

    @ManyToMany (cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "servicio_trabajador",
        joinColumns = @JoinColumn(name = "id_servicio"),
        inverseJoinColumns = @JoinColumn(name = "id_trabajador")
    )
    @JsonIgnoreProperties("negocios")
    private List<Trabajador> trabajadores; // Relación con Trabajador

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("servicio")
    private List<Reserva> reservas; // Relación con Cita

    public Servicio() {
        this.negocios = new ArrayList<>(); // Inicializa la lista de negocios
        this.favoritos = new ArrayList<>(); // Inicializa la lista de favoritos
    }

    public Servicio(Long id_servicio, String nombre, String tipo, String descripcion, Long duracion, String precio, List<Negocio> negocios) {
        this.id_servicio = id_servicio;
        this.nombre = nombre;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.precio = precio;
        this.negocios = negocios;
        this.favoritos = new ArrayList<>(); // Inicializa la lista de favoritos
        this.trabajadores = new ArrayList<>(); // Inicializa la lista de trabajadores
    }

    // Getters y Setters
    public Long getId_servicio() {
        return id_servicio;
    }
    public void setId_servicio(Long id_servicio) {
        this.id_servicio = id_servicio;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public Long getDuracion() {
        return duracion;
    }
    public void setDuracion(Long duracion) {
        this.duracion = duracion;
    }
    public String getPrecio() {
        return precio;
    }
    public void setPrecio(String precio) {
        this.precio = precio;
    }
    public List<Negocio> getNegocios() {
        return negocios;
    }
    public void setNegocios(List<Negocio> negocios) {
        this.negocios = negocios;
    }
    public List<Favorito> getFavoritos() {
        return favoritos;
    }
    public void setFavoritos(List<Favorito> favoritos) {
        this.favoritos = favoritos;
    }
    public List<Trabajador> getTrabajadores() {
        return trabajadores;
    }
    public void setTrabajadores(List<Trabajador> trabajadores) {
        this.trabajadores = trabajadores;
    }
}

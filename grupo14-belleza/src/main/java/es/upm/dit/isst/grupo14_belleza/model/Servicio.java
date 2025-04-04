package es.upm.dit.isst.grupo14_belleza.model;

import java.math.BigDecimal;
import java.util.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.Digits;

@Entity
@Table(name = "servicio")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Digits(integer = 8, fraction = 0, message = "El ID del usuario debe tener máximo 8 dígitos")
    @Column(length = 8, unique = true)
    private Long id_servicio;

    @ManyToOne
    @JoinColumn(name = "id_negocio", nullable = false)
    private Negocio negocio;

    @NotEmpty(message = "El campo de categoría no puede estar vacío")
    @Column(length = 100)
    private String categoria;

    @NotEmpty(message = "El nombre del usuario no puede estar vacío")
    @Size(max = 100, message = "El nombre del usuario debe tener máximo 100 caracteres")
    @Column(length = 100)
    private String nombre;

    @Column(name = "duracion", nullable = false)
    @NotNull(message = "La duración no puede estar vacía")
    @Min(value = 1, message = "La duración debe ser al menos 1 minuto")
    @Max(value = 360, message = "La duración no puede superar los 360 minutos")
    private Long duracion;

    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "El precio no puede estar vacío")
    private String precio;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TrabajadorServicio> trabajadorServicios;

    @Column(name = "descripcion", length = 255)
    @Size(max = 250, message = "La descripcion debe tener máximo 250 caracteres")
    private String descripcion;

    // Constructor vacío (obligatorio para JPA)
    public Servicio() {

    }

    // Constructor con parámetros
    public Servicio(Long id_servicio, String categoria, String nombre, Long duracion, String precio, Negocio negocio, List<TrabajadorServicio> trabajadorServicios, String descripcion) {
        this.id_servicio = id_servicio;
        this.negocio = negocio;
        this.categoria = categoria;
        this.nombre = nombre;
        this.duracion = duracion;
        this.precio = precio;
        this.trabajadorServicios = new ArrayList<>();
        this.descripcion = descripcion;
    }

    // Getters y Setters
    public Long getId_servicio() {
        return id_servicio;
    }

    public void setId_servicio(Long id_servicio) {
        this.id_servicio = id_servicio;
    }

    public Negocio getNegocio() {
        return negocio;
    }

    public void setNegocio(Negocio negocio) {
        this.negocio = negocio;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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

    public List<TrabajadorServicio> getTrabajadorServicios() {
        return trabajadorServicios;
    }

    public void setTrabajadorServicios(List<TrabajadorServicio> trabajadorServicios) {
        this.trabajadorServicios = trabajadorServicios;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
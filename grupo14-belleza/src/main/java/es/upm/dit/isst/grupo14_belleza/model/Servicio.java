package es.upm.dit.isst.grupo14_belleza.model;

import java.math.BigDecimal;
import java.util.*;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

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
    private Negocio id_negocio;

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
    @DecimalMin(value = "0.01", message = "El precio debe ser al menos 0.01€")
    @Digits(integer = 8, fraction = 2, message = "El precio debe tener un máximo de 8 dígitos enteros y 2 decimales")
    private BigDecimal precio;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TrabajadorServicio> trabajadorServicios;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservaServicio> reservaServicios;

  ////////////////////////////////////////////////////////////////////////////////

     // Constructor vacío (obligatorio para JPA)
    public Servicio() {}
    // Constructor con parámetros (Opcional para crear objetos más fácilmente)
    public Servicio(Long id_servicio, String categoria, String nombre, Long duracion, BigDecimal precio, Negocio id_negocio, List<TrabajadorServicio> trabajadorServicios, List<ReservaServicio> reservaServicios) {
        this.id_servicio = id_servicio;
        this.id_negocio = id_negocio;
        this.categoria = categoria;
        this.nombre = nombre;
        this.duracion = duracion;
        this.precio = precio;
        this.trabajadorServicios = new ArrayList<>();
        this.reservaServicios = new ArrayList<>();
    }

    //  Getters
    public Long getId_servicio() {
        return id_servicio;
    }

    public Negocio getId_Negocio() {
        return id_negocio;
    }

    public String getCategoria() {
        return categoria;
    }

    public String getNombre() {
        return nombre;
    }

    public Long getDuracion() {
        return duracion;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public List<TrabajadorServicio> getTrabajadorServicios() {
        return trabajadorServicios;
    }

    public List<ReservaServicio> getReservaServicios() {
        return reservaServicios;
    }

    // Setters
    public void setId_servicio(Long id_servicio) {
        this.id_servicio = id_servicio;
    }

    public void setId_negocio(Negocio id_negocio) {
        this.id_negocio = id_negocio;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDuracion(Long duracion) {
        this.duracion = duracion;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public void setTrabajadorServicios(List<TrabajadorServicio> trabajadorServicios) {
        this.trabajadorServicios = trabajadorServicios;
    }

    public void setReservaServicios(List<ReservaServicio> reservaServicios) {
        this.reservaServicios = reservaServicios;
    }
}
package es.upm.dit.isst.backend_grupo14_belleza.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalTime;
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

    private boolean lunesAbierto;
    private boolean martesAbierto;
    private boolean miercolesAbierto;
    private boolean juevesAbierto;
    private boolean viernesAbierto;
    private boolean sabadoAbierto;
    private boolean domingoAbierto;

    @Column(name = "hora_inicio", nullable = false)
    @NotNull(message = "La hora de inicio no puede estar vacía")
    private LocalTime hora_inicio; // Hora de inicio de la reserva

    @Column(name = "hora_fin", nullable = false)
    @NotNull(message = "La hora de fin no puede estar vacía")
    private LocalTime hora_fin; // Hora de fin de la reserva

    private String imagen;

    @OneToMany(mappedBy = "negocio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("negocio")
    private List<Trabajador> trabajadores;

    // Relación 1 a N con Servicio
    @OneToMany(mappedBy = "negocio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("negocio")
    private List<Servicio> servicios; // Relación con Servicio


    public Negocio() {
        this.trabajadores = new ArrayList<>();
        this.servicios = new ArrayList<>(); // Inicializa la lista de servicios
    }

    public Negocio(Long id_negocio ,String nombre, String descripcion, String direccion, String telefono, 
                   String email, String imagen, LocalTime hora_inicio, LocalTime hora_fin, Boolean lunesAbierto,
                   Boolean martesAbierto, Boolean miercolesAbierto, Boolean juevesAbierto, Boolean viernesAbierto,
                   Boolean sabadoAbierto, Boolean domingoAbierto) {
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
        this.hora_inicio = hora_inicio;
        this.hora_fin = hora_fin;
        this.lunesAbierto = lunesAbierto;
        this.martesAbierto = martesAbierto;
        this.miercolesAbierto = miercolesAbierto;
        this.juevesAbierto = juevesAbierto;
        this.viernesAbierto = viernesAbierto;
        this.sabadoAbierto = sabadoAbierto;
        this.domingoAbierto = domingoAbierto;
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

    public LocalTime getHora_inicio() { return hora_inicio; }
    public void setHora_inicio(LocalTime hora_inicio) { this.hora_inicio = hora_inicio; }

    public LocalTime getHora_fin() { return hora_fin; }
    public void setHora_fin(LocalTime hora_fin) { this.hora_fin = hora_fin; }

    public boolean getLunesAbierto() { return lunesAbierto; }
    public void setLunesAbierto(boolean lunesAbierto) { this.lunesAbierto = lunesAbierto; }

    public boolean getMartesAbierto() { return martesAbierto; }
    public void setMartesAbierto(boolean martesAbierto) { this.martesAbierto = martesAbierto; }

    public boolean getMiercolesAbierto() { return miercolesAbierto; }
    public void setMiercolesAbierto(boolean miercolesAbierto) { this.miercolesAbierto = miercolesAbierto; }

    public boolean getJuevesAbierto() { return juevesAbierto; }
    public void setJuevesAbierto(boolean juevesAbierto) { this.juevesAbierto = juevesAbierto; }

    public boolean getViernesAbierto() { return viernesAbierto; }
    public void setViernesAbierto(boolean viernesAbierto) { this.viernesAbierto = viernesAbierto; }

    public boolean getSabadoAbierto() { return sabadoAbierto; }
    public void setSabadoAbierto(boolean sabadoAbierto) { this.sabadoAbierto = sabadoAbierto; }

    public boolean getDomingoAbierto() { return domingoAbierto; }
    public void setDomingoAbierto(boolean domingoAbierto) { this.domingoAbierto = domingoAbierto; }

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



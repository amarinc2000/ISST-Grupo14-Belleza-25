package es.upm.dit.isst.grupo14_belleza.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "favorito")
public class Favorito {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8)
    private Long id_favorito;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario; // Relación con Usuario

    @ManyToOne
    @JoinColumn(name = "id_servicio", nullable = false)
    private Servicio servicio; // Relación con Servicio

    // Constructor
    public Favorito(Long id_favorito, Usuario usuario, Servicio servicio) {
        this.id_favorito = id_favorito;
        this.usuario = usuario;
        this.servicio = servicio;
    }

    // Getters
    public Long getId_favorito() {
        return id_favorito;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Servicio getServicio() {
        return servicio;
    }

    // Setters
    public void setId_favorito(Long id_favorito) {
        this.id_favorito = id_favorito;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

}

package es.upm.dit.isst.grupo14_belleza.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.*;

@Entity
@Table(name = "favorito")
public class Favorito {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8, unique = true)
    private Long id_favorito;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario id_usuario; // Relación con Usuario

    @ManyToOne // REVISAR RELACION PARA VER SI HACEMOS Na1 O NaM, ListFavoritos para cada id
               // usuario o ListFavoritos asociado cada uno a LitsUsuarios
    @JoinColumn(name = "id_servicio", nullable = false)
    private Servicio id_servicio; // Relación con Servicio

    // Constructor
    public Favorito(Long id_favorito, Usuario usuario, Servicio servicio) {
        this.id_favorito = id_favorito;
        this.id_usuario = usuario;
        this.id_servicio = servicio;
    }

    // Getters
    public Long getId_favorito() {
        return id_favorito;
    }

    public Usuario getUsuario() {
        return id_usuario;
    }

    public Servicio getServicio() {
        return id_servicio;
    }

    // Setters
    public void setId_favorito(Long id_favorito) {
        this.id_favorito = id_favorito;
    }

    public void setUsuario(Usuario usuario) {
        this.id_usuario = usuario;
    }

    public void setServicio(Servicio servicio) {
        this.id_servicio = servicio;
    }

}

package es.upm.dit.isst.backend_grupo14_belleza.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "favorito")
public class Favorito {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(length = 8, unique = true)
    private Long id_favorito;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    @JsonIgnoreProperties("favoritos")
    private Cliente cliente; 
    
    @ManyToOne 
    @JoinColumn(name = "id_servicio", nullable = false)
    private Servicio servicio; 
 
    // Constructor
    public Favorito() {}
    public Favorito(Long id_favorito, Cliente cliente , Servicio servicio ) {
        this.id_favorito = id_favorito;
        this.cliente = cliente;
        this.servicio = servicio; 
    }
    // Getters  
    public Long getId_favorito() {
        return id_favorito;
    }
    public Cliente getCliente() {
        return cliente;
    }
    public Servicio getServicio() {
        return servicio;
    } 
    // Setters
    public void setId_favorito(Long id_favorito) {
        this.id_favorito = id_favorito;
    }
    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    } 
   

}

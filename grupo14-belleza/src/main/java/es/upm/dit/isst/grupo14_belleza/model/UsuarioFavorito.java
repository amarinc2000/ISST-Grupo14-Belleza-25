package es.upm.dit.isst.grupo14_belleza.model;

import jakarta.persistence.*;
@Entity
@Table(name = "usuario_favorito")
public class UsuarioFavorito {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_favorito", nullable = false)
    private Favorito favorito;

    public UsuarioFavorito() {}

    public UsuarioFavorito(Usuario usuario, Favorito favorito) {
        this.usuario = usuario;
        this.favorito = favorito;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Favorito getFavorito() {
        return favorito;
    }

    public void setFavorito(Favorito favorito) {
        this.favorito = favorito;
    }
}

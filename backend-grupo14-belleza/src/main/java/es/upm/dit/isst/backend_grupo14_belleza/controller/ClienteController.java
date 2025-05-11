package es.upm.dit.isst.backend_grupo14_belleza.controller;

import es.upm.dit.isst.backend_grupo14_belleza.model.Cliente;
import es.upm.dit.isst.backend_grupo14_belleza.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/clientes")
public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return (List<Cliente>) clienteRepository.findAll();
    }

    @GetMapping("/{id_cliente}")
    public Cliente getClienteById(@PathVariable Long id_cliente) {
        return clienteRepository.findById(id_cliente).orElse(null);
    }

    // Método para buscar cliente por email
    @GetMapping("/email/{email}")
    public Cliente getClienteByEmail(@PathVariable String email) {
        return clienteRepository.findByEmail(email);
    } 

    @PostMapping
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @PutMapping("/{id_cliente}")
    public Cliente updateCliente(@PathVariable Long id_cliente, @RequestBody Cliente cliente) {
        if (clienteRepository.existsById(id_cliente)) {
            cliente.setId_cliente(id_cliente);
            return clienteRepository.save(cliente);
        }
        return null;
    }

    @DeleteMapping("/{id_cliente}")
    public void deleteCliente(@PathVariable Long id_cliente) {
        clienteRepository.deleteById(id_cliente);
    }

}

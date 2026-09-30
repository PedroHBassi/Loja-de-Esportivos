package com.powerplay.controller;

import com.powerplay.dto.PedidoRequest;
import com.powerplay.model.Pedido;
import com.powerplay.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loja/api/v1/pedidos")
@CrossOrigin(origins = "*")
public class PedidoApiController {

    private final PedidoService service;

    public PedidoApiController(PedidoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody PedidoRequest request) {
        try {
            return ResponseEntity.ok(service.criar(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Pedido> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> findById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

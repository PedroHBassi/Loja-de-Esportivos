package com.powerplay.controller;

import com.powerplay.model.Produto;
import com.powerplay.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loja/api/v1/produtos")
@CrossOrigin(origins = "*")
public class ProdutoApiController {

    private final ProdutoService service;

    public ProdutoApiController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Produto> findAll(@RequestParam(required = false) String categoria) {
        if (categoria != null && !categoria.isBlank()) {
            return service.findByCategoria(categoria);
        }
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> findById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Produto> save(@RequestBody Produto produto) {
        return ResponseEntity.ok(service.save(produto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> update(@PathVariable Integer id,
                                          @RequestBody Produto produto) {
        return service.update(id, produto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!service.delete(id)) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }
}

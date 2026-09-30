package com.powerplay.controller;

import com.powerplay.dto.LoginRequest;
import com.powerplay.model.Usuario;
import com.powerplay.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loja/api/v1")
@CrossOrigin(origins = "*")
public class UsuarioApiController {

    private final UsuarioService service;

    public UsuarioApiController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(service.save(usuario));
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody LoginRequest request) {
        return service.login(request.email(), request.senha())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}

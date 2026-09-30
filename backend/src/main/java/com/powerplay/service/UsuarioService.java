package com.powerplay.service;

import com.powerplay.model.Usuario;
import com.powerplay.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario save(Usuario usuario) {
        return repository.save(usuario);
    }

    public Optional<Usuario> login(String email, String senha) {
        return repository.findByEmail(email)
                .filter(u -> u.getSenha().equals(senha));
    }

    public Optional<Usuario> findById(Integer id) {
        return repository.findById(id);
    }
}

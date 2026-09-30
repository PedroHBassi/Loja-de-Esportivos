package com.powerplay.service;

import com.powerplay.model.Produto;
import com.powerplay.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {
    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public List<Produto> findAll() {
        return repository.findAll();
    }

    public Optional<Produto> findById(Integer id) {
        return repository.findById(id);
    }

    public List<Produto> findByCategoria(String categoria) {
        return repository.findByCategoriaIgnoreCase(categoria);
    }

    public Produto save(Produto produto) {
        return repository.save(produto);
    }

    public Optional<Produto> update(Integer id, Produto dados) {
        return repository.findById(id).map(p -> {
            p.setNome(dados.getNome());
            p.setDescricao(dados.getDescricao());
            p.setCategoria(dados.getCategoria());
            p.setPreco(dados.getPreco());
            p.setImagem(dados.getImagem());
            p.setEstoque(dados.getEstoque());
            p.setPagina(dados.getPagina());
            return repository.save(p);
        });
    }

    public boolean delete(Integer id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}

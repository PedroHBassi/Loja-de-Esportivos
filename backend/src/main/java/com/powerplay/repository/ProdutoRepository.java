package com.powerplay.repository;

import com.powerplay.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    List<Produto> findByCategoriaIgnoreCase(String categoria);
}

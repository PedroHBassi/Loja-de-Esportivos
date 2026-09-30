package com.powerplay.service;

import com.powerplay.dto.ItemPedidoRequest;
import com.powerplay.dto.PedidoRequest;
import com.powerplay.model.*;
import com.powerplay.repository.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final UsuarioRepository usuarioRepository;

    public PedidoService(PedidoRepository pedidoRepository,
                         ProdutoRepository produtoRepository,
                         UsuarioRepository usuarioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Pedido criar(PedidoRequest request) {
        Pedido pedido = new Pedido();

        if (request.usuarioId() != null) {
            Usuario usuario = usuarioRepository.findById(request.usuarioId())
                    .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));
            pedido.setUsuario(usuario);
        }

        pedido.setEndereco(request.endereco());
        pedido.setCidade(request.cidade());
        pedido.setEstado(request.estado());
        pedido.setPagamento(request.pagamento());

        BigDecimal total = BigDecimal.ZERO;

        for (ItemPedidoRequest req : request.itens()) {
            Produto produto = produtoRepository.findById(req.produtoId())
                    .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado: " + req.produtoId()));

            if (req.quantidade() == null || req.quantidade() <= 0) {
                throw new IllegalArgumentException("Quantidade inválida.");
            }

            if (produto.getEstoque() < req.quantidade()) {
                throw new IllegalArgumentException("Estoque insuficiente para: " + produto.getNome());
            }

            ItemPedido item = new ItemPedido();
            item.setPedido(pedido);
            item.setProduto(produto);
            item.setQuantidade(req.quantidade());
            item.setPrecoUnitario(produto.getPreco());
            pedido.getItens().add(item);

            total = total.add(produto.getPreco()
                    .multiply(BigDecimal.valueOf(req.quantidade())));

            produto.setEstoque(produto.getEstoque() - req.quantidade());
            produtoRepository.save(produto);
        }

        pedido.setTotal(total);
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> findById(Integer id) {
        return pedidoRepository.findById(id);
    }
}

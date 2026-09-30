package com.powerplay.dto;

import java.util.List;

public record PedidoRequest(
        Integer usuarioId,
        String endereco,
        String cidade,
        String estado,
        String pagamento,
        List<ItemPedidoRequest> itens
) {}

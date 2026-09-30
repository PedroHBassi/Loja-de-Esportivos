const API = "http://localhost:8080/loja/api/v1";

document.getElementById("checkout-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const carrinho = JSON.parse(localStorage.getItem("powerplay_carrinho") || "[]");
    const usuario = JSON.parse(localStorage.getItem("powerplay_usuario") || "null");

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const payment = document.querySelector('input[name="payment"]:checked');

    const pedido = {
        usuarioId: usuario ? usuario.id : null,
        endereco: document.getElementById("address").value,
        cidade: document.getElementById("city").value,
        estado: document.getElementById("state").value,
        pagamento: payment ? payment.value : "",
        itens: carrinho.map(item => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade
        }))
    };

    try {
        const response = await fetch(API + "/pedidos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(pedido)
        });

        if (!response.ok) {
            const mensagem = await response.text();
            throw new Error(mensagem);
        }

        const pedidoCriado = await response.json();

        localStorage.removeItem("powerplay_carrinho");

        document.getElementById("checkout-form").classList.add("hidden");
        document.getElementById("confirmation-message").classList.remove("hidden");
        document.getElementById("numero-pedido").textContent = pedidoCriado.id;

    } catch (erro) {
        alert("Não foi possível finalizar: " + erro.message);
    }
});

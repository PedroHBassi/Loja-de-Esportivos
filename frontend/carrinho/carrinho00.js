const API = "http://localhost:8080/loja/api/v1";

async function renderCart() {
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("total-price");
    const carrinho = JSON.parse(localStorage.getItem("powerplay_carrinho") || "[]");

    container.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio. <a href='../index.html'>Adicionar produtos</a></p>";
        totalElement.textContent = "0,00";
        return;
    }

    for (const item of carrinho) {
        const response = await fetch(`${API}/produtos/${item.produtoId}`);
        const produto = await response.json();

        const subtotal = Number(produto.preco) * item.quantidade;
        total += subtotal;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="../img/${produto.imagem}" alt="${produto.nome}" style="width:100px">
            <div class="cart-item-details">
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${Number(produto.preco).toFixed(2).replace(".", ",")}</p>
                <label>Quantidade:
                    <input type="number" min="1" value="${item.quantidade}"
                           onchange="alterarQuantidade(${item.produtoId}, this.value)">
                </label>
            </div>
            <strong>Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}</strong>
            <button onclick="remover(${item.produtoId})">Excluir</button>
        `;

        container.appendChild(div);
    }

    totalElement.textContent = total.toFixed(2).replace(".", ",");
}

function alterarQuantidade(id, quantidade) {
    const carrinho = JSON.parse(localStorage.getItem("powerplay_carrinho") || "[]");
    const item = carrinho.find(i => i.produtoId === id);

    if (item) {
        item.quantidade = Math.max(1, parseInt(quantidade) || 1);
    }

    localStorage.setItem("powerplay_carrinho", JSON.stringify(carrinho));
    renderCart();
}

function remover(id) {
    let carrinho = JSON.parse(localStorage.getItem("powerplay_carrinho") || "[]");
    carrinho = carrinho.filter(i => i.produtoId !== id);
    localStorage.setItem("powerplay_carrinho", JSON.stringify(carrinho));
    renderCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    const carrinho = JSON.parse(localStorage.getItem("powerplay_carrinho") || "[]");

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    window.location.href = "../finalizar/finalizar.html";
});

renderCart();

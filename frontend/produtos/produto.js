const API = "http://localhost:8080/loja/api/v1";

// Seleção de tamanho
const sizeOptions = document.querySelectorAll(".size-option");
sizeOptions.forEach(button => {
    button.addEventListener("click", () => {
        sizeOptions.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// Seleção de cor, quando existir
const colorOptions = document.querySelectorAll(".color-option");
colorOptions.forEach(button => {
    button.addEventListener("click", () => {
        colorOptions.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});

// Comprar Agora: adiciona o produto ao carrinho e abre o checkout.
const buyButton = document.getElementById("buy-now");
if (buyButton) {
    buyButton.addEventListener("click", () => {
        const produtoId = Number(buyButton.dataset.productId);
        const carrinho = JSON.parse(localStorage.getItem("powerplay_carrinho") || "[]");
        const item = carrinho.find(i => Number(i.produtoId) === produtoId);

        if (item) item.quantidade++;
        else carrinho.push({ produtoId, quantidade: 1 });

        localStorage.setItem("powerplay_carrinho", JSON.stringify(carrinho));
        window.location.href = "../finalizar/finalizar.html";
    });
}

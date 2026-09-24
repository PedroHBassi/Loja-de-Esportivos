const cartItems = [
    { id: 1, name: "Manto Auvinegro", price: 159.90, image: "file:///C:/Users/pedro/OneDrive/%C3%81rea%20de%20Trabalho/loja/img/cor1.jpeg", quantity: 1, size: "M" 
    },
    { id: 2, name: "Manto Rubronegro", price: 249.90, image: "file:///C:/Users/pedro/OneDrive/%C3%81rea%20de%20Trabalho/loja/img/fla.jpeg", quantity: 1, size: "M" 
    },
];

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElem = document.getElementById("total-price");

    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Preço: R$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-options">
                <label for="size-${item.id}">Tamanho:</label>
                <select id="size-${item.id}" onchange="updateSize(${item.id}, this.value)">
                    <option value="S" ${item.size === "P" ? "selected" : ""}>P</option>
                    <option value="M" ${item.size === "M" ? "selected" : ""}>M</option>
                    <option value="L" ${item.size === "G" ? "selected" : ""}>G</option>
                    <option value="XL" ${item.size === "GG" ? "selected" : ""}>GG</option>
                </select>

                <label for="quantity-${item.id}">Quantidade:</label>
                <input type="number" id="quantity-${item.id}" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
            </div>
            <div>
                <strong>Total: R$${itemTotal.toFixed(2)}</strong>
            </div>
            <a href="carrinho01.html"><i class="fas fa-trash lixeira"></i></a>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElem.innerText = totalPrice.toFixed(2);
}

function updateQuantity(itemId, newQuantity) {
    const item = cartItems.find((i) => i.id === itemId);
    item.quantity = parseInt(newQuantity);
    renderCart();
}

function updateSize(itemId, newSize) {
    const item = cartItems.find((i) => i.id === itemId);
    item.size = newSize;
    renderCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Compra finalizada! Total: R$" + document.getElementById("total-price").innerText);
});

renderCart();
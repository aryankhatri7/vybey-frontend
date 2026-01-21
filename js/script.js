let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    updateCart();
}

function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("cart-total").innerText = total;

    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price}</span>
                <button onclick="removeItem(${index})">X</button>
            </div>
        `;
    });
}

function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("open");
}
function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let container = document.getElementById("product-list");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="product-card">
                    <h4>${p.name}</h4>
                    <p>₹${p.price}</p>
                    <button onclick="addToCart('${p.name}', ${p.price})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let container = document.getElementById("product-list");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
            <div class="col-md-4 mb-5">
                <div class="product-card" style="position:relative;">
                    <div class="badge">TRENDING</div>
  <img 
    src="${p.image}"
    class="product-img"
    onerror="this.src='https://via.placeholder.com/300x350?text=No+Image'"
>


                    <div class="product-info">
                        <h4>${p.name}</h4>

                        <p class="price">
                            <span class="discount">₹${p.price - 300}</span>
                            <span class="mrp">₹${p.price}</span>
                            <span class="off">30% OFF</span>
                        </p>

                        <button 
                            class="add-btn"
                            onclick="addToCart('${p.name}', ${p.price - 300})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

loadProducts();


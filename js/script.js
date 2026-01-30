let cart = [];
let total = 0;

// ================= CART =================

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total");
    const cartItems = document.getElementById("cart-items");

    if (countEl) countEl.innerText = cart.length;
    if (totalEl) totalEl.innerText = total;
    if (!cartItems) return;

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
    if (!cart[index]) return;
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const cartBox = document.getElementById("cart");
    if (cartBox) cartBox.classList.toggle("open");
}


// ================= PRODUCTS LOAD =================

function loadProducts() {
    const container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = "<p>Loading products...</p>";

    // wake server
    fetch(API).catch(()=>{});

    fetch(API + "/api/products")
        .then(res => res.json())
        .then(products => {

            container.innerHTML = "";
            localStorage.setItem("products", JSON.stringify(products));

            products.forEach(p => {
                container.innerHTML += `
                    <div class="col-md-4 mb-5">
                        <div class="product-card">

                            <div class="badge">TRENDING</div>

                            <img src="${p.image}"
                                 class="product-img"
                                 onerror="this.src='https://via.placeholder.com/300x350?text=No+Image'">

                            <div class="product-info">
                                <h4>${p.name}</h4>

                                <p class="price">
                                    <span class="discount">₹${p.price - 300}</span>
                                    <span class="mrp">₹${p.price}</span>
                                    <span class="off">30% OFF</span>
                                </p>

                                <button class="add-btn"
                                  onclick="addToCart('${p.name}', ${p.price - 300})">
                                  Add to Cart
                                </button>

                            </div>
                        </div>
                    </div>
                `;
            });

        })
        .catch(err => {
            container.innerHTML = "<p>Failed to load products</p>";
        });
}


// ================= INIT =================

loadProducts();

let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value.trim();

    if (!name || !price || !image) {
        alert("Please fill all fields");
        return;
    }

    products.push({
        name,
        price: Number(price),
        image
    });

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";

    renderProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
}

function renderProducts() {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach((p, i) => {
        list.innerHTML += `
            <div class="admin-product">
                <img src="${p.image}">
                <span>${p.name} - ₹${p.price}</span>
                <button class="delete-btn" onclick="deleteProduct(${i})">
                    Delete
                </button>
            </div>
        `;
    });
}

renderProducts();

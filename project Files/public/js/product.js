const API_URL = "http://localhost:5000/api/products";

document.addEventListener("DOMContentLoaded", fetchProducts);

function fetchProducts() {
  fetch(API_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    })
    .then((data) => displayProducts(data))
    .catch((err) => alert("Failed to fetch products."));
}

function displayProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.productname}" />
      <h3>${product.productname}</h3>
      <p>₹${product.price}</p>
      <p>Category: ${product.category}</p>
      <p>Stock: ${product.countInStock}</p>
      <p>Rating: ${product.rating}</p>
    `;

    container.appendChild(card);
  });
}

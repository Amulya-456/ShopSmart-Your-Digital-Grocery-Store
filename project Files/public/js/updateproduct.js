document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    alert("❌ No product ID provided");
    return;
  }

  // Fetch product data and populate form
  try {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`);
    const product = await res.json();

    document.getElementById("productname").value = product.productname || "";
    document.getElementById("price").value = product.price || "";
    document.getElementById("rating").value = product.rating || "";
    document.getElementById("image").value = product.image || "";
    document.getElementById("category").value = product.category || "";
    document.getElementById("countInStock").value = product.countInStock || "";
    document.getElementById("description").value = product.description || "";

  } catch (err) {
    console.error("❌ Failed to fetch product:", err);
    alert("Failed to load product details");
  }

  // Handle form submission
  document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productname: document.getElementById("productname").value.trim(),
      price: parseFloat(document.getElementById("price").value),
      rating: parseFloat(document.getElementById("rating").value),
      image: document.getElementById("image").value.trim(),
      category: document.getElementById("category").value,
      countInStock: parseInt(document.getElementById("countInStock").value),
      description: document.getElementById("description").value.trim()
    };

    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update product");
      }

      alert("✅ Product updated successfully!");
      window.location.href = "products.html"; // Go back to product list
    } catch (error) {
      console.error("❌ Update error:", error);
      alert("Error updating product");
    }
  });
});

// Extract product ID from URL
const productId = new URLSearchParams(window.location.search).get('id');
const form = document.getElementById('updateForm');

if (!productId) {
  alert("No product ID provided.");
  window.location.href = 'products.html';
}

// Populate form with existing product data
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`);
    const product = await res.json();

    document.getElementById('name').value = product.productname;
    document.getElementById('rating').value = product.rating;
    document.getElementById('price').value = product.price;
    document.getElementById('image').value = product.image;
    document.getElementById('category').value = product.category;
    document.getElementById('countInStock').value = product.countInStock;
    document.getElementById('description').value = product.description;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
});

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const updatedProduct = {
    productname: document.getElementById('name').value,
    rating: parseFloat(document.getElementById('rating').value),
    price: parseFloat(document.getElementById('price').value),
    image: document.getElementById('image').value,
    category: document.getElementById('category').value,
    countInStock: parseInt(document.getElementById('countInStock').value),
    description: document.getElementById('description').value
  };

  try {
    const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });

    if (res.ok) {
      alert('Product updated successfully!');
      window.location.href = 'products.html';
    } else {
      alert('Failed to update product.');
    }
  } catch (error) {
    console.error('Update error:', error);
    alert('An error occurred while updating the product.');
  }
});

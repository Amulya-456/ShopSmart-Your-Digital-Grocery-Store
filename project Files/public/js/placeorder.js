document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const paymentMethod = document.getElementById("paymentMethod").value;

  // Get buyNowItem or cart items
  const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Prepare order items
  let items = [];
  if (buyNowItem) {
    if (!buyNowItem.quantity) buyNowItem.quantity = 1;
    items.push(buyNowItem);
  } else if (cartItems.length > 0) {
    items = cartItems;
  }

  // If missing fields or no items, reject
  if (!firstName || !lastName || !phone || !address || !paymentMethod || items.length === 0) {
    return showMessage("❌ Please fill all the fields and select a product.");
  }

  // Convert price "₹40 / kg" to 40 (Number)
  const sanitizedItems = items.map(item => ({
    name: item.name,
    price: Number(item.price.replace(/[^0-9]/g, "")),
    quantity: item.quantity || 1,
    image: item.image
  }));

  // Calculate total
  const total = sanitizedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Send to backend
  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        address,
        paymentMethod,
        items: sanitizedItems,
        total
      })
    });

    const data = await res.json();
    if (res.ok) {
      showMessage("✅ Order placed successfully!");

      // Clear cart/buyNow
      localStorage.removeItem("cart");
      localStorage.removeItem("buyNowItem");

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "orders.html";
      }, 2000);
    } else {
      showMessage("❌ Failed to place order: " + (data.message || ""));
    }

  } catch (err) {
    console.error(err);
    showMessage("❌ Server error. Please try again later.");
  }
});

function showMessage(msg) {
  const toast = document.getElementById("statusMessage");
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 3000);
}
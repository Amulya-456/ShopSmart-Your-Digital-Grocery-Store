window.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("ordersContainer");

  try {
    const response = await fetch("http://localhost:5000/api/orders");

    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const orders = await response.json();

    // ✅ Filter only Pending orders
    const pendingOrders = orders.filter(order => order.status === "Pending");

    if (!pendingOrders.length) {
      container.innerHTML = "<p>No pending orders found.</p>";
      return;
    }

    container.innerHTML = "";

    pendingOrders.forEach(order => {
      const card = document.createElement("div");
      card.className = "order-card";

      let itemsList = order.items.map(item => `
        <li>${item.name} × ${item.quantity} — ₹${item.price * item.quantity}</li>
      `).join("");

      card.innerHTML = `
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Name:</strong> ${order.firstName} ${order.lastName}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Date:</strong> ${new Date(order.placedAt).toLocaleString()}</p>
        <p><strong>Total:</strong> ₹${order.total}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Payment:</strong> ${order.paymentMethod}</p>
        <ul>${itemsList}</ul>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = "<p>⚠️ Error loading orders. Try again later.</p>";
    console.error("Error fetching orders:", err);
  }
});

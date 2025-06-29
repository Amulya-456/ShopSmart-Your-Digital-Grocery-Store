document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/users");
    const users = await response.json();

    const tbody = document.getElementById("userTableBody");
    users.forEach((user, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${user._id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><button class="view-btn" onclick="viewUser('${user._id}')">View</button></td>
      `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("❌ Failed to fetch users:", error);
  }
});

function viewUser(userId) {
  alert(`Viewing details for user ID: ${userId}`);


};

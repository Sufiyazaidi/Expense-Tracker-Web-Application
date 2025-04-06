const API_URL = "http://localhost:8080/expenses"; // Ensure this matches your backend

// Fetch and display expenses from the backend
async function fetchExpenses() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const expenses = await response.json();
        console.log("Fetched data:", expenses); // Debugging line
        
        if (!Array.isArray(expenses)) {
            console.error("Expected an array but got:", expenses);
            return;
        }

        let total = 0;
        let tableContent = expenses.map(expense => {
            total += expense.amount;
            return `
                <tr>
                    <td>${expense.description}</td>
                    <td>₹${expense.amount}</td>
                    <td>${expense.date}</td>
                    <td><button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button></td>
                </tr>
            `;
        }).join("");

        document.getElementById("expenseTable").innerHTML = tableContent;
        document.getElementById("totalExpense").innerText = `₹${total.toFixed(2)}`;
    } catch (error) {
        console.error("Error fetching expenses:", error);
    }
}

// Add a new expense
async function addExpense() {
    const desc = document.getElementById("desc").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    if (!desc || isNaN(amount) || !date) {
        alert("Please fill all fields correctly!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: desc, amount, date })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        fetchExpenses(); // Refresh the table
    } catch (error) {
        console.error("Error adding expense:", error);
    }
}

// Delete an expense
async function deleteExpense(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        fetchExpenses(); // Refresh the table
    } catch (error) {
        console.error("Error deleting expense:", error);
    }
}

// Load expenses on page load
document.addEventListener("DOMContentLoaded", fetchExpenses);

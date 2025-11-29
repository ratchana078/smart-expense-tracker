const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateUI() {
    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        const li = document.createElement("li");
        li.innerHTML = `
            ${expense.name} - ₹${expense.amount}
            <span class="delete-btn" onclick="deleteExpense(${index})">X</span>
        `;
        expenseList.appendChild(li);
    });

    totalAmount.textContent = total;
    localStorage.setItem("expenses", JSON.stringify(expenses));
}


addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);

    if (!name || !amount) return alert("Please enter valid details!");

    expenses.push({ name, amount });
    nameInput.value = "";
    amountInput.value = "";
    updateUI();
});

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateUI();
}

updateUI();

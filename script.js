// Load expenses from localStorage or empty array
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Initial render
displayExpenses();
calculateTotal();

function addExpense() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (amount === "" || category === "") {
    alert("Please fill all fields");
    return;
  }

  let expense = {
    amount: Number(amount),
    category: category
  };

  expenses.push(expense);

  // Save to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  calculateTotal();

  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
}

function displayExpenses() {
  let list = document.getElementById("expenseList");
  list.innerHTML = "";

  expenses.forEach((exp, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${exp.category} - ₹${exp.amount}
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);

  // Update localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  calculateTotal();
}

function calculateTotal() {
  let total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("total").innerText = total;
}

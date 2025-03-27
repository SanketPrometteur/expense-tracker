let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to update the UI with transactions
function updateUI() {
  const transactionList = document.getElementById('transaction-list');
  const totalIncome = document.getElementById('total-income');
  const totalExpenses = document.getElementById('total-expenses');
  const balance = document.getElementById('balance');

  // Clear the list
  transactionList.innerHTML = '';

  // Calculate total income, expenses, and balance
  let income = 0;
  let expense = 0;

  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.textContent = `${transaction.description}: ${transaction.amount}`;
    listItem.classList.add(transaction.type);
    
    // Add delete button to each transaction
    const deleteBtn = document.createElement('button');
    // deleteBtn.classList.add('btn-delete')
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTransaction(transaction.id);
    listItem.appendChild(deleteBtn);

    transactionList.appendChild(listItem);

    if (transaction.type === 'income') {
      income += parseFloat(transaction.amount);
    } else {
      expense += parseFloat(transaction.amount);
    }
  });

  totalIncome.textContent = income;
  totalExpenses.textContent = expense;
  balance.textContent = income - expense;

  // Store updated transactions in localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Add transaction
document.getElementById('transaction-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('transaction-type').value;

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

  transactions.push(transaction);
  updateUI();

  // Clear the form
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
});

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateUI();
}

// Initial UI update
updateUI();
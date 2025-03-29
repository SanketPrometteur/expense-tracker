class Transaction {
    id = Date.now();
    description;
    amount;
    type;

    constructor(description, amount, type) {
        this.id = Date.now();
        this.description = description;
        this.amount = parseFloat(amount).toFixed(2);
        this.type = type;
    }
}


class ExpenseTracker {
    transactions;

    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    }

    addTransaction(description, amount, type) {
        const transaction = new Transaction(description, amount, type);

        this.transactions.push(transaction);
        this.updateLocalStorage();
        this.updateUI();
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(transaction => transaction.id !== id);
        this.updateLocalStorage();
        this.updateUI();
    }

    updateUI() {
        const transactionList = document.getElementById('transaction-list');
        const totalIncome = document.getElementById('total-income');
        const totalExpenses = document.getElementById('total-expenses');
        const balance = document.getElementById('balance');

        // Clear the list
        transactionList.innerHTML = '';

        // Calculate total income, expenses, and balance
        let income = 0;
        let expense = 0;

        this.transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            
            // Apply background color based on the transaction type and Calculate total income and expenses
            if (transaction.type === 'income') {
                listItem.style.backgroundColor = '#d4edda'; 
                income += parseFloat(transaction.amount); 
            } else if (transaction.type === 'expense') {
                listItem.style.backgroundColor = '#f8d7da'; 
                expense += parseFloat(transaction.amount); 
            }

            
            listItem.textContent = `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} - ${transaction.description}: ₹${parseFloat(transaction.amount).toFixed(2)}`;

            // Add delete button to each transaction
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => this.deleteTransaction(transaction.id);
            listItem.appendChild(deleteBtn);

            transactionList.appendChild(listItem);

            // Calculate total income and expenses
            // if (transaction.type === 'income') {
            //     income += parseFloat(transaction.amount);
            // } else {
            //     expense += parseFloat(transaction.amount);
            // }
        });

        // Display total income, total expenses, and balance with ₹ symbol
        totalIncome.textContent = `₹${income.toFixed(2)}`;
        totalExpenses.textContent = `₹${expense.toFixed(2)}`;
        balance.textContent = `₹${(income - expense).toFixed(2)}`;
    }

    updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
}

const tracker = new ExpenseTracker();

// Add transaction event listener
document.getElementById('transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = Number(document.getElementById('amount').value);
    const type = document.getElementById('transaction-type').value;
    if(amount>0){


        tracker.addTransaction(description, amount, type);
    }else{
        alert('Amount should be greater than 0.');
    }

    // Clear the form
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
});

// Initial UI update
tracker.updateUI();

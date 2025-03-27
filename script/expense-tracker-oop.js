export class Transaction{
    id = Date.now();
    description;
    amount;
    type;

    constructor(description,amount,type){
        this.id = Date.now();
        this.description = description;
        this.amount = amount;
        this.type = type;
    }

}

class ExpenseTracker{
    transactions;

    constructor(){
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    }

    addTransaction(description,amount,type){
        const transaction = new Transaction(description,amount,type);

        this.transactions.push(transaction);
        this.updateLocalStorage();
        this.updateUI();
    }

    deleteTransaction(id){
        this.transactions = this.transactions.filter(transaction=> transaction.id !== id);
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
          listItem.textContent = `${transaction.description}: ${transaction.amount}`;
          listItem.classList.add(transaction.type);
    
          // Add delete button to each transaction
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.onclick = () => this.deleteTransaction(transaction.id);
          listItem.appendChild(deleteBtn);
    
          transactionList.appendChild(listItem);
    
          if (transaction.type === 'income') {
            income += transaction.amount;
          } else {
            expense += transaction.amount;
          }
        });
    
        totalIncome.textContent = income;
        totalExpenses.textContent = expense;
        balance.textContent = income - expense;
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
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('transaction-type').value;

  tracker.addTransaction(description, amount, type);

  // Clear the form
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
});

// Initial UI update
tracker.updateUI();

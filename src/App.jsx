import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const addTransaction = (newTransaction) => {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    updateLocalStorage(updatedTransactions);
    
    if (newTransaction.type === 'income') {
      setIncome(income + newTransaction.amount);
    } else {
      setExpense(expense + newTransaction.amount);
    }
  };

  const removeTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
    updateLocalStorage(updatedTransactions);

  };

  const updateLocalStorage = (updatedTransactions) => {
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);

    const storedIncome = storedTransactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0);
    
    const storedExpense = storedTransactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0);

    setIncome(storedIncome);
    setExpense(storedExpense);
  }, []);

  const totalAmount = income - expense;

  return (
    <div className="App">
      <h1>Available budget in November 2023</h1>
      <p className='total'>Total: ${totalAmount}</p>
      <div className="summary">
        <div className="income-summary">
          <p>INCOME</p>
          <p className="green-text">+${income}</p>
        </div>
        <div className="expense-summary">
          <p>EXPENSE</p>
          <p className="red-text">-${expense}</p>
        </div>
      </div>
      <div className="transaction-form-container">
        <TransactionForm addTransaction={addTransaction} />
      </div>
      <TransactionList transactions={transactions} removeTransaction={removeTransaction} />
      <div className="summary-table">
      </div>
    </div>
  );
};

export default App;

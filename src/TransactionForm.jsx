import React, { useState } from 'react';

const TransactionForm = ({ addTransaction }) => {
  const [type, setType] = useState('+');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type && description && amount) {
      const newTransaction = {
        id: new Date().getTime().toString(),
        type: type === '+' ? 'income' : 'expense',
        description,
        amount: parseFloat(amount),
      };

      addTransaction(newTransaction);

      setType('+');
      setDescription('');
      setAmount('');
    }
  };

  return (
    <div>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Value"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;

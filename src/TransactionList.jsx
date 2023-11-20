import React from 'react';

const TransactionList = ({ transactions, removeTransaction }) => {
  return (
    <div>
      <h3>Transaction History</h3>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.type === 'income' ? `$${transaction.amount}` : ''}</td>
              <td>{transaction.type === 'expense' ? `$${transaction.amount}` : ''}</td>
              <td>
                <button onClick={() => removeTransaction(transaction.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;


const fs = require('fs');

class TransactionAnalyzer {
  constructor(transactions) {
    this.transactions = transactions;
  }

  addTransaction(newTransaction) {
    this.transactions.push(newTransaction);
  }

  getAllTransactions() {
    return this.transactions;
  }

  // Другие методы анализа транзакций будут добавлены далее
}

// Чтение данных из transactions.json
fs.readFile('transactions.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const transactions = JSON.parse(data);
    const analyzer = new TransactionAnalyzer(transactions);
    console.log('Transactions loaded:', analyzer.getAllTransactions());
    // Здесь вы можете вызывать другие методы анализа транзакций
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
class TransactionAnalyzer {
    constructor(transactions) {
      this.transactions = transactions;
    }
  
    addTransaction(newTransaction) {
      this.transactions.push(newTransaction);
    }
  
    getAllTransactions() {
      return this.transactions;
    }
  
    getUniqueTransactionTypes() {
      const typesSet = new Set();
      this.transactions.forEach(transaction => {
        typesSet.add(transaction.transaction_type);
      });
      return Array.from(typesSet);
    }
  
    calculateTotalAmount() {
      return this.transactions.reduce((total, transaction) => {
        return total + parseFloat(transaction.transaction_amount);
      }, 0);
    }
  
    calculateTotalAmountByDate(year, month, day) {
      let total = 0;
      this.transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        if (
          (!year || transactionDate.getFullYear() === year) &&
          (!month || transactionDate.getMonth() + 1 === month) &&
          (!day || transactionDate.getDate() === day)
        ) {
          total += parseFloat(transaction.transaction_amount);
        }
      });
      return total;
    }
  
    getTransactionsByType(type) {
      return this.transactions.filter(
        transaction => transaction.transaction_type === type
      );
    }
  
    // Другие методы анализа транзакций будут добавлены далее
  }
  
  module.exports = TransactionAnalyzer;
  class TransactionAnalyzer {
    constructor(transactions) {
      this.transactions = transactions;
    }
  
    addTransaction(newTransaction) {
      this.transactions.push(newTransaction);
    }
  
    getAllTransactions() {
      return this.transactions;
    }
  
    getUniqueTransactionTypes() {
      const typesSet = new Set();
      this.transactions.forEach(transaction => {
        typesSet.add(transaction.transaction_type);
      });
      return Array.from(typesSet);
    }
  
    calculateTotalAmount() {
      return this.transactions.reduce((total, transaction) => {
        return total + parseFloat(transaction.transaction_amount);
      }, 0);
    }
  
    calculateTotalAmountByDate(year, month, day) {
      let total = 0;
      this.transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        if (
          (!year || transactionDate.getFullYear() === year) &&
          (!month || transactionDate.getMonth() + 1 === month) &&
          (!day || transactionDate.getDate() === day)
        ) {
          total += parseFloat(transaction.transaction_amount);
        }
      });
      return total;
    }
  
    getTransactionsByType(type) {
      return this.transactions.filter(
        transaction => transaction.transaction_type === type
      );
    }
  
    getTransactionsInDateRange(startDate, endDate) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      return this.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }
  
    getTransactionsByMerchant(merchantName) {
      return this.transactions.filter(
        transaction => transaction.merchant_name === merchantName
      );
    }
  
    calculateAverageTransactionAmount() {
      const totalAmount = this.calculateTotalAmount();
      return totalAmount / this.transactions.length;
    }
  
    getTransactionsByAmountRange(minAmount, maxAmount) {
      return this.transactions.filter(transaction => {
        const amount = parseFloat(transaction.transaction_amount);
        return amount >= minAmount && amount <= maxAmount;
      });
    }
  
    calculateTotalDebitAmount() {
      return this.transactions.reduce((total, transaction) => {
        if (transaction.transaction_type === 'debit') {
          return total + parseFloat(transaction.transaction_amount);
        }
        return total;
      }, 0);
    }
  
    findMostTransactionsMonth() {
      const transactionsByMonth = {};
      this.transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        const monthYear = `${transactionDate.getMonth() + 1}-${transactionDate.getFullYear()}`;
        if (!transactionsByMonth[monthYear]) {
          transactionsByMonth[monthYear] = 0;
        }
        transactionsByMonth[monthYear]++;
      });
      let mostTransactionsMonth;
      let maxTransactions = 0;
      for (const monthYear in transactionsByMonth) {
        if (transactionsByMonth[monthYear] > maxTransactions) {
          mostTransactionsMonth = monthYear;
          maxTransactions = transactionsByMonth[monthYear];
        }
      }
      return mostTransactionsMonth;
    }
  
    findMostDebitTransactionMonth() {
      const debitTransactionsByMonth = {};
      this.transactions.forEach(transaction => {
        if (transaction.transaction_type === 'debit') {
          const transactionDate = new Date(transaction.transaction_date);
          const monthYear = `${transactionDate.getMonth() + 1}-${transactionDate.getFullYear()}`;
          if (!debitTransactionsByMonth[monthYear]) {
            debitTransactionsByMonth[monthYear] = 0;
          }
          debitTransactionsByMonth[monthYear]++;
        }
      });
      let mostDebitTransactionMonth;
      let maxDebitTransactions = 0;
      for (const monthYear in debitTransactionsByMonth) {
        if (debitTransactionsByMonth[monthYear] > maxDebitTransactions) {
          mostDebitTransactionMonth = monthYear;
          maxDebitTransactions = debitTransactionsByMonth[monthYear];
        }
      }
      return mostDebitTransactionMonth;
    }
  
    mostTransactionTypes() {
      const debitCount = this.transactions.filter(transaction => transaction.transaction_type === 'debit').length;
      const creditCount = this.transactions.filter(transaction => transaction.transaction_type === 'credit').length;
      if (debitCount > creditCount) {
        return 'debit';
      } else if (debitCount < creditCount) {
        return 'credit';
      } else {
        return 'equal';
      }
    }
  
    getTransactionsBeforeDate(date) {
      date = new Date(date);
      return this.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        return transactionDate < date;
      });
    }
  
    findTransactionById(id) {
      return this.transactions.find(transaction => transaction.transaction_id === id);
    }
  
    mapTransactionDescriptions() {
      return this.transactions.map(transaction => transaction.transaction_description);
    }
  }
  
  module.exports = TransactionAnalyzer;
  const TransactionAnalyzer = require('./TransactionAnalyzer');

  // Чтение данных из transactions.json
  const fs = require('fs');
  fs.readFile('transactions.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    try {
      const transactions = JSON.parse(data);
      const analyzer = new TransactionAnalyzer(transactions);
  
      console.log('Unique transaction types:', analyzer.getUniqueTransactionTypes());
      console.log('Total amount of transactions:', analyzer.calculateTotalAmount());
      console.log('Total amount by date (2019-01-01):', analyzer.calculateTotalAmountByDate(2019, 1, 1));
      console.log('Transactions by type (debit):', analyzer.getTransactionsByType('debit'));
      console.log('Transactions in date range (2019-01-01 to 2019-01-10):', analyzer.getTransactionsInDateRange('2019-01-01', '2019-01-10'));
      console.log('Transactions by merchant (SuperMart):', analyzer.getTransactionsByMerchant('SuperMart'));
      console.log('Average transaction amount:', analyzer.calculateAverageTransactionAmount());
      console.log('Transactions by amount range (50.00 to 150.00):', analyzer.getTransactionsByAmountRange(50.00, 150.00));
      console.log('Total debit amount:', analyzer.calculateTotalDebitAmount());
      console.log('Month with most transactions:', analyzer.findMostTransactionsMonth());
      console.log('Month with most debit transactions:', analyzer.findMostDebitTransactionMonth());
      console.log('Most frequent transaction type:', analyzer.mostTransactionTypes());
      console.log('Transactions before 2019-01-05:', analyzer.getTransactionsBeforeDate('2019-01-05'));
      console.log('Transaction with ID 1:', analyzer.findTransactionById('1'));
      console.log('Transaction descriptions:', analyzer.mapTransactionDescriptions());
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
    
  

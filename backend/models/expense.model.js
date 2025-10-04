module.exports = (sequelize, Sequelize) => {
  const Expense = sequelize.define("expense", {
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'USD'
    },
    category: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
      defaultValue: 'Pending'
    },
    receiptUrl: {
      type: Sequelize.STRING // URL to the stored receipt image
    }
  });

  return Expense;
};
// Migration script to add name column to users table
const db = require('../models');

// Add name column to users table
db.sequelize.getQueryInterface().addColumn('users', 'name', {
  type: db.Sequelize.STRING,
  allowNull: true
}).then(() => {
  console.log('Name column added to users table successfully.');
}).catch((error) => {
  console.error('Error adding name column to users table:', error);
});
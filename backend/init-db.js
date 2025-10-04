// init-db.js
// Script to initialize the database with tables

const db = require('./models');

// Sync database tables
db.sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized successfully.');
}).catch((err) => {
  console.error('Failed to synchronize database:', err);
});
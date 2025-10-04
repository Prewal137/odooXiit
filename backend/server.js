// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./models'); // Imports the models index file

// --- Initialize Express App ---
const app = express();

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// --- Database Synchronization ---
// In development, you can use { force: true } to drop and re-sync db.
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize.sync()
  .then(() => {
    console.log("Synced db successfully.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// --- Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Expense Management API!' });
});

require('./routes/auth.routes')(app);
require('./routes/expense.routes')(app);


// --- Start Server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}.`);
});
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false, // <-- ADD THIS LINE to hide SQL queries
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// --- Import Models ---
db.company = require("./company.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.expense = require("./expense.model.js")(sequelize, Sequelize);

// --- Define Associations ---

// Company can have multiple Users
db.company.hasMany(db.user, { as: "users" });
db.user.belongsTo(db.company, {
  foreignKey: "companyId",
  as: "company",
});

// User can have multiple Expenses
db.user.hasMany(db.expense, { as: "expenses" });
db.expense.belongsTo(db.user, {
  foreignKey: "userId",
  as: "employee",
});

// A Manager (who is also a User) is associated with an Employee (User)
db.user.belongsTo(db.user, { as: 'manager', foreignKey: 'managerId' });

module.exports = db;
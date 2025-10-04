module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'USD' // Default currency
    }
  });

  return Company;
};
const db = require("../models");
const User = db.user;
const Company = db.company;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Signup creates a new Company and an Admin User for it
exports.signup = async (req, res) => {
  try {
    // Create a new Company
    const company = await Company.create({
      name: req.body.companyName,
      currency: req.body.currency || 'USD' // Fetched from an API in a real app
    });

    // Create a new User (Admin) for that company
    const user = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: 'Admin', // First user is always an Admin
      companyId: company.id
    });

    res.send({ message: "User was registered successfully!" });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      email: user.email,
      role: user.role,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
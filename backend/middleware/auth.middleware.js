const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isManager = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === "Manager" || user.role === "Admin") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Manager or Admin Role!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


const authJwt = {
  verifyToken,
  isManager,
};
module.exports = authJwt;
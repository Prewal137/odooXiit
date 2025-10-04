const controller = require("../controllers/expense.controller");
const authJwt = require("../middleware/auth.middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new expense
  app.post("/api/expenses", [authJwt.verifyToken], controller.create);

  // Get all expenses for the logged-in user
  app.get("/api/expenses", [authJwt.verifyToken], controller.findAllForUser);

  // Get expenses waiting for a manager's approval
  app.get("/api/expenses/pending", [authJwt.verifyToken, authJwt.isManager], controller.findPending);

  // Approve or reject an expense
  app.put("/api/expenses/:id/status", [authJwt.verifyToken, authJwt.isManager], controller.updateStatus);
};
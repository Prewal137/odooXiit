const db = require("../models");
const Expense = db.expense;

// Create and Save a new Expense
exports.create = async (req, res) => {
  try {
    // Prepare expense data
    const expenseData = {
      description: req.body.description,
      amount: req.body.amount,
      currency: req.body.currency,
      category: req.body.category,
      date: req.body.date,
      userId: req.userId // Set from the JWT middleware
    };
    
    // Add paidBy field if it exists in the request
    if (req.body.paidBy) {
      expenseData.paidBy = req.body.paidBy;
    }

    const expense = await Expense.create(expenseData);
    res.send({ 
      message: "Expense submitted successfully!", 
      data: expense 
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Retrieve all Expenses for the logged-in user
exports.findAllForUser = async (req, res) => {
    try {
        const expenses = await Expense.findAll({ where: { userId: req.userId } });
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Find all pending expenses for employees managed by the logged-in manager
exports.findPending = async (req, res) => {
    // This logic is simplified. A real app would query for users where managerId = req.userId
    // and then find expenses for those users.
    try {
        const expenses = await Expense.findAll({ where: { status: 'Pending' } });
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update the status of an expense (Approve/Reject)
exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status, comments } = req.body; // Expecting { "status": "Approved" } or { "status": "Rejected" }

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).send({ message: "Invalid status." });
        }

        const [num] = await Expense.update({ status: status, comments: comments }, { where: { id: id } });

        if (num === 1) {
            res.send({ message: "Expense status was updated successfully." });
        } else {
            res.send({ message: `Cannot update Expense with id=${id}. Maybe Expense was not found!` });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating Expense with id=" + id });
    }
};
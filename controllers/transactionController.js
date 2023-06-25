const db = require("../models");
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

// Create and save a new Transaction
exports.create = (req, res) => {
  // Validate request
  if (!req.body.total) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Transaction
  const transaction = {
    total: req.body.total,
    quantity: req.body.quantity,
    productId: req.body.productId,
  };

  // Save Transaction in database
  Transaction.create(transaction)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Transaction",
      });
    });
};

// Retrieve all Transaction from the database
exports.findAll = (req, res) => {
  Transaction.findAll({
    include: ["productInfo"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Transaction.",
      });
    });
};

// Find a single Transaction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Transaction.findByPk(id, {
    include: ["productInfo"],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Transaction with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Transaction with id=" + id,
      });
    });
};

// Delete a Transaction with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Transaction.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Transaction was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Transaction with id=" + id,
      });
    });
};

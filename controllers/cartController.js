const db = require('../models');
const Cart = db.carts;
// const Product = db.products;
const Op = db.Sequelize.Op;

// Create and save a new Cart
exports.create = (req, res) => {
    // Validate request
    if(!req.body.quantity) {
        res.status(400).send({ 
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Cart
    const cart = {
      quantity: req.body.quantity,
      productId: req.body.productId
    };

    // Save Cart in database
    Cart.create(cart)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Cart"
            });
        });
};

// Retrieve all Cart from the database 
exports.findAll = (req, res) => { 

  Cart.findAll({
    include:
    [
      'productInfo'
    ] 
  }) 
    .then(data => { 
      res.send(data); 
    }) 
    .catch(err => { 
      res.status(500).send({ 
        message: err.message || "Some error occurred while retrieving cart." 
      }); 
    }); 
};

// Find a single Cart with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cart.findByPk(id, 
    { 
      include: [
        'productInfo'
      ] 
    })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cart with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cart with id=" + id
      });
    });
};

// Delete a Cart with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cart was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cart with id=" + id
      });
    });
};

// Delete all Cart from database
exports.deleteAll = (req, res) => {
  Cart.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cart were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Cart."
      });
    });
};
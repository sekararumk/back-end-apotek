const db = require('../models');
const Category = db.categories;
const Op = db.Sequelize.Op;

// Create and save a new category
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nama) {
        res.status(400).send({ 
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a category
    const category = {
        nama: req.body.nama
    };

    // Save category in database
    Category.create(category)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Category"
            });
        });
};

// Retrieve all Categories from the database 
exports.findAll = (req, res) => { 
  const nama = req.query.nama; 
  var condition = nama ? { nama: { [Op.iLike]: `%${nama}%` } } : null; // With condition where nama=?

  Category.findAll({
    where : condition,
    include: [
      'productInfo'
    ]
  }) 
    .then(data => { 
      res.send(data); 
    }) 
    .catch(err => { 
      res.status(500).send({ 
        message: err.message || "Some error occurred while retrieving category." 
      }); 
    }); 
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id, { include: ["productInfo"] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Category with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id
      });
    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
};
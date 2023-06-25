const db = require('../models');
const Product = db.products;
// const Cart = db.cartProducts;
const Op = db.Sequelize.Op;

// Create and save a new product
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nama) {
        res.status(400).send({ 
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a product
    const product = {
        nama: req.body.nama,
        harga: req.body.harga,
        expired: req.body.expired,
        deskripsi: req.body.deskripsi,
        categoryId: req.body.categoryId
    };

    // Save product in database
    Product.create(product)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Product"
            });
        });
};

// Retrieve all Products from the database 
exports.findAll = (req, res) => { 
    const nama = req.query.nama; 
    var condition = nama ? { nama: { [Op.iLike]: `%${nama}%` } } : null; // With condition where nama=?
    
    Product.findAll({ 
      where : condition,
      include: [
        'categoryInfo'
      ]
    }) 
        .then(data => { 
            res.send(data); 
        }) 
        .catch(err => { 
            res.status(500).send({ 
                message: err.message || "Some error occurred while retrieving products." 
        }); 
    }); 
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id, { 
    include: [
      'categoryInfo'
    ] 
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};


// Update a Product by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Product.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
          res.send({
            message: "Product was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Product with id=" + id
        });
      });
  };

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// exports.addCart = (req, res) => {
//   return Product
//     .findByPk(req.body.productId, {
//       include: [{
//         model: Cart,
//         as: 'cartInfo'
//       },],
//     })
//     .then((product) => {
//       if (!product) {
//         return res.status(404).send({
//           message: 'Product Not Found',
//         });
//       }
//       Cart.findByPk(req.body.cartId).then((cart) => {
//         if (!cart) {
//           return res.status(404).send({
//             message: 'Cart Not Found',
//           });
//         }
//         student.addCart(cart);
//         return res.status(200).send(product);
//       })
//     })
//     .catch((error) => res.status(400).send(error));
//   }
  // Delete all Products from database
  // exports.deleteAll = (req, res) => {
  //   Product.destroy({
  //     where: {},
  //     truncate: false
  //   })
  //     .then(nums => {
  //       res.send({ message: `${nums} Products were deleted successfully!` });
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while removing all products."
  //       });
  //     });
  // };
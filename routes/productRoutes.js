const {authJwt} = require('../middleware');
const products = require("../controllers/productController.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers","Authorization",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();
  
  // Retrieve all Products
    router.get("/", [authJwt.verifyToken], products.findAll);

  // Create a new Product
    router.post("/", [authJwt.verifyToken], products.create); 

  // Retrieve a single Product with id
    router.get("/:id", [authJwt.verifyToken], products.findOne);
  
  // Update a Product with id
    router.put("/:id", [authJwt.verifyToken], products.update); 
  
  // Delete a Product with id
    router.delete("/:id", [authJwt.verifyToken], products.delete); 
  
    app.use('/api/products', router);
  };
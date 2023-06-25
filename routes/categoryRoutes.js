const {authJwt} = require('../middleware');
const categories = require("../controllers/categoryController.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();
  
  // Create a new Category
    router.post("/", [authJwt.verifyToken], categories.create); 
  
  // Retrieve all Categories
    router.get("/", [authJwt.verifyToken], categories.findAll); 
  
  // Retrieve a single Category with id
    router.get("/:id", [authJwt.verifyToken], categories.findOne); 

  // Update a Category with id
    router.put("/:id", [authJwt.verifyToken], categories.update); 
  
  // Delete a Category with id
    router.delete("/:id", [authJwt.verifyToken], categories.delete); 

    app.use('/api/categories', router);
  };
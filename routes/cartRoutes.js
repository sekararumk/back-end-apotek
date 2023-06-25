const {authJwt} = require('../middleware');
const carts = require("../controllers/cartController.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();
  
  // Create a new Cart
    router.post("/", [authJwt.verifyToken], carts.create); 
  
  // Retrieve all Cart
    router.get("/", [authJwt.verifyToken], carts.findAll); 
  
  // Retrieve a single Cart with id
    router.get("/:id", [authJwt.verifyToken], carts.findOne); 
    
  // Delete a Cart with id
    router.delete("/:id", [authJwt.verifyToken], carts.delete); 

  // Delete All Cart
    router.delete("/", [authJwt.verifyToken], carts.deleteAll);
    
    app.use('/api/carts', router);
  };
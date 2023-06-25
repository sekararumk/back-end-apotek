const {authJwt} = require('../middleware');
const transactions = require("../controllers/transactionController.js");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();
  
  // Create a new Transaction
    router.post("/", [authJwt.verifyToken], transactions.create); 
  
  // Retrieve all Transactions
    router.get("/", [authJwt.verifyToken], transactions.findAll); 
  
  // Retrieve a single Transaction with id
    router.get("/:id", [authJwt.verifyToken], transactions.findOne); 
    
  // Delete a Cart with id
    router.delete("/:id", [authJwt.verifyToken], transactions.delete); 


    app.use('/api/transactions', router);
  };
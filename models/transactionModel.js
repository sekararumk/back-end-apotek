module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
      total: {
        type: Sequelize.DECIMAL,
      },
      quantity: {
        type: Sequelize.DECIMAL,
      },
      productId: {
        type: Sequelize.INTEGER
      }
    });
  
    return Transaction;
  };
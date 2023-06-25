module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
      quantity: {
        type: Sequelize.DECIMAL,
      },
      productId: {
        type: Sequelize.INTEGER
      }
    });
  
    return Cart;
  };
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      nama: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.DECIMAL
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      expired: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
          const date = this.getDataValue('expired');
          return new Date(date).toLocaleDateString();
        }
      }
    });
  
    return Product;
  };
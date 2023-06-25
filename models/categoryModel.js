module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      nama: {
        type: Sequelize.STRING
      }
    });
  
    return Category;
  };
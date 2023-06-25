// Initialize Sequelize

const dbConfig = require("../config/dbConfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel.js")(sequelize, Sequelize);
db.role = require("./roleModel.js")(sequelize, Sequelize);
db.products = require("./productModel.js")(sequelize, Sequelize);
db.categories = require("./categoryModel.js")(sequelize, Sequelize);
db.carts = require("./cartModel.js")(sequelize, Sequelize);
db.transactions = require("./transactionModel.js")(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["kasir", "admin"];

db.categories.hasMany(db.products, {
  foreignKey: "categoryId",
  as: "productInfo",
});

db.products.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "categoryInfo"
})

db.carts.belongsTo(db.products, {
  foreignKey: "productId",
  as: "productInfo"
})

db.transactions.belongsTo(db.products, {
  foreignKey: "productId",
  as: "productInfo"
})

module.exports = db;
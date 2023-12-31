// Configure PostgreSQL database & Sequelize

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "12345678",
    DB: "apotekdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
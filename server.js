const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./models");

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
//   initial();
// });

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
  
const Role = db.role;

function initial() {
    Role.create({
        id: 1,
        name: 'admin'
    });
    Role.create({
        id: 2,
        name: 'kasir'
    });
}

var corsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token']
}
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/categoryRoutes')(app);
require('./routes/cartRoutes')(app);
require('./routes/transactionRoutes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
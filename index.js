const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
// const sequelize = require("./config/db_config");
const app = express();
const port = 8000;
const router = require("./population");
// const Population = require("./models/population");
const { sequelize } = require("./models");
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connected to the database and synchronized models");
    app.listen(port, (req, res) => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = app;

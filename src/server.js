require("pg");
const express = require("express");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const db = require("./model");
const userRoutes = require("./routes");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync({ force: true }).then(() => {
  console.log("DB has been re sync");
});

/* Base API URL */
const BASE_URL = "/.netlify/functions/server";
const ROOT_URL = "/api/v1/beatbuzz/users";

app.use(BASE_URL + ROOT_URL, userRoutes);

module.exports = app;
module.exports.handler = serverless(app);

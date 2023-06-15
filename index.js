require("dotenv").config();
const express = require("express");
const sequlize = require("sequelize");
const cookieParser = require("cookie-parser");

const db = require("./model");
const userRoutes = require("./routes");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync({ force: true }).then(() => {
  console.log("DB has been re sync");
});

app.use("/api/v1/beatbuzz/users", userRoutes);

const PORT = 7998;

app.listen(PORT, () => console.log(`User service is running on PORT ${PORT}`));

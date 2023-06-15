const { Sequelize, DataTypes } = require("sequelize");
const { DB_CONFIG } = require("../config");

//DB Connection
const { USER_NAME, PASSWORD, DB, HOST, PORT } = DB_CONFIG;

const DATABASE_URL = `postgresql://${USER_NAME}:${PASSWORD}@${HOST}:${PORT}/${DB}`;

const sequelize = new Sequelize(DATABASE_URL, { dialect: "postgres" });

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require("./user")(sequelize, DataTypes);

//exporting module
module.exports = db;

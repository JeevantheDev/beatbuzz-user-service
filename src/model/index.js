const { Sequelize, DataTypes } = require("sequelize");
const { DB_CONFIG } = require("../config");

//DB Connection
const { USER_NAME, PASSWORD, DB, HOST, PORT } = DB_CONFIG;

const DATABASE_URL = `postgresql://${USER_NAME}:${PASSWORD}@${HOST}:${PORT}/${DB}`;

console.log("DATABASE_URL", DATABASE_URL);
const sequelize = new Sequelize(DATABASE_URL, { dialectModule: require("pg") });

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log("DB connection:: ", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require("./user")(sequelize, DataTypes);

//exporting module
module.exports = db;

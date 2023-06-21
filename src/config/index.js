const isProd = () => process.env.NODE_ENV !== "development";

module.exports.DB_CONFIG = {
  USER_NAME: isProd() ? process.env.USER_NAME : "postgres",
  PASSWORD: isProd() ? process.env.PASSWORD : "root",
  DB: isProd() ? process.env.DB : "beatbuzz-user-service",
  HOST: isProd() ? process.env.HOST : "localhost",
  PORT: isProd() ? process.env.DB_PORT : "5432",
};

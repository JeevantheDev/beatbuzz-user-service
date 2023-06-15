const isProd = () => process.env.NODE_ENV !== "development";

module.exports.DB_CONFIG = {
  USER_NAME: isProd() ? "dashjeevanjyoti" : "postgres",
  PASSWORD: isProd() ? "7RZ2UP4dcE_L0FzNRCUP4g" : "root",
  DB: isProd()
    ? "beatbuzz-user-db?sslmode=verify-full"
    : "beatbuzz-user-service",
  HOST: isProd() ? "beat-buzz-2663.7s5.cockroachlabs.cloud" : "localhost",
  PORT: isProd() ? "26257" : "5432",
};

require("dotenv").config();

const app = require("./src/server");

const PORT = process.env.PORT || 7998;

app.listen(PORT, console.log(`User service is running on PORT ${PORT}`));

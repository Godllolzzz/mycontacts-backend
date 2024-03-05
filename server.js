const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection,");
const port = process.env.PORT || 3000;
// const userModel = require("./models/userModel");

connectDb();
app.use(bodyParser.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

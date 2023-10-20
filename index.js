const express = require("express");
require("dotenv").config();
const connectToDB = require("./config/connectToDB");
const PORT = 6000 || process.env.PORT;
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");

// Connect DataBase
connectToDB();

// Init App
const app = express();

// CORS policy
app.use(cors());
// Routes
app.use("/api/v1/images", require("./routes/imageRoute"));

app.use(errorHandler);

// Run Surver
app.listen(PORT, () =>
  console.log(
    `Server Is Running In ${process.env.NODE_ENV} Mode On Port ${PORT}`
  )
);

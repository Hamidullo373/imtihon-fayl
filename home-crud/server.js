require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/database");
const { createTable } = require("./models/home.js");
const homeRoutes = require("./routes/homeRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/homes", homeRoutes);

const startServer = async () => {
  await connectDB();
  await createTable();
  app.listen(PORT, () => {
    console.log(` Server ${PORT} portda ishga tushdi`);
  });
};

startServer();

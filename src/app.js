require("dotenv").config();

const express = require("express");
const path = require("path");
const fs = require("fs");
const { PORT} = require('./config/config')

const usersFilePath = path.join(__dirname, "/data/users.json");

if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([]));
  console.log("File created successfully with initial data.");
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

module.exports = app;
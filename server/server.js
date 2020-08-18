const express = require("express");
require("dotenv").config();
const articleRouter = require("./article/router");
const server = express();
const PORT = process.env.PORT || 4000;

// to format requests into JSON
server.use(express.json());
// to correctly get the information from submissions
server.use(express.urlencoded({ extended: false }));

const mongoose = require("mongoose");
// connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// open the connection
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB connection established."));

server.use("/articles", articleRouter);
server.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}`)
);

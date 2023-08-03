const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


const index = require("./routes/index");
const noteRoute = require("./routes/notes.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(index);
app.use("/api/", noteRoute);

module.exports = app;

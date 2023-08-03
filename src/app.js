const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const { swaggerUi, specs } = require('./docs');
// ...

// Add the following before defining your routes



const index = require("./routes/index");
const noteRoute = require("./routes/notes.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(index);
app.use("/api/", noteRoute);

module.exports = app;

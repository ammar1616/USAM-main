const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json());
const fs = require("fs");
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/main"))

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


let createtable = require("./routes/index")
createtable()


app.listen(process.env.PORT, () => console.log(`Running on port: ${process.env.PORT}`))
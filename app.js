const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/main"))

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


// index page
let createtable = require("./routes/index")
createtable()


// require('./routes')(app)

app.listen(4000, () => console.log(`Running on port: 4000`))
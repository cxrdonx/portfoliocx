const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({encoded:false}));

const projects = require('./routes/routes');
//setts
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
//midd
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/', projects);
app.use(express.static(path.join( __dirname, 'public')));
module.exports = app;
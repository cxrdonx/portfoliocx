const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({encoded:false}));
app.use(express.json());

const projects = require('./routes/routes');
//setts
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
//midd
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*' );
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/', projects);
app.use(express.static(path.join( __dirname, 'public')));

app.use(express.static(__dirname + '/dist/project-web-app'));
app.get('/portafolio', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/portafolio/index.html'));
});
module.exports = app;
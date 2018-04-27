var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var helmet = require('helmet');

var app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('app/public/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(expressSession({
	secret: 'd41d8cd98f00b204e9800998ecf8427e',
	resave: false,
	saveUninitialized: false
}));
app.use(helmet());

consign()
	.include('app/routes')
	.then('config/db.js')
	.then('app/controllers')
	.then('app/models')
	.into(app);

module.exports = function() {
	return app;
}
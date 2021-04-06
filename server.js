//dependancies for node.js server
var express = require('express');
var app = express();
var url = require('url');
var fs = require('fs');
var http = require('http');
var path = require('path');
const bodyParser = require("body-parser");
const { response } = require('express');
const router = express.Router();

//allows the app to use .ejs files with a view engine
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

/*
Index/ Maps page
*/
app.get('/', function(req, res) {
    res.render('./pages/index',{
        my_title: "index",
        data: ``
    })
});

/*
Documentation Page
*/
app.get('/documentation', function(req, res) {
    res.render('./pages/documentation',{
        my_title: "documentation",
        data: ``
    })
});

/*
Formative Portfolio I Page
*/
app.get('/formative_portfolio_I', function(req, res) {
    res.render('./pages/formative_portfolio_I',{
        my_title: "formative_portfolio_I",
        data: ``
    })
});

/*
Formative Portfolio II Page
*/
app.get('/formative_portfolio_II', function(req, res) {
    res.render('./pages/formative_portfolio_II',{
        my_title: "formative_portfolio_II",
        data: ``
    })
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});
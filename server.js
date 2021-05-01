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

//store mapbox requirements
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const { Console } = require('console');
var mapBoxToken = process.env.MAPBOX_ACCESS;

//store array of map style urls
var styles = [
    'mapbox://styles/griffenck1/cko5o40nd2dkr18nydaxv9xn0',
    'mapbox://styles/griffenck1/cko4z9oud0bze18rzjf7cu1j9',
    'mapbox://styles/griffenck1/cko5ohgss2e3b18pdxm7p8crq',
    'mapbox://styles/griffenck1/cko5ooip628ar17qvf38c9cw4',
    'mapbox://styles/griffenck1/cko5or8q02egn17n1xujoxyds',
    'mapbox://styles/griffenck1/cko5oubno1v2417s2yfo4sq20',
    'mapbox://styles/griffenck1/cko5oyoi21rw917queylhekfr',
    'mapbox://styles/griffenck1/cko5p36f91v6417pi7lx2pd0u',
    'mapbox://styles/griffenck1/cko5p6qf328va17mn9ikwbfcd',
    'mapbox://styles/griffenck1/cko5p9h2s1vbx17pimhuvcjbr',
    'mapbox://styles/griffenck1/cko5pc35c1s9i17qu7vzenubk'
]

//connect to postgres
//Create Database Connection
var pgp = require('pg-promise')();

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

var db = pgp(dbConfig);

/*
Index/ Maps page
*/
app.get('/', function(req, res) {
    res.render('./pages/index',{
        my_title: "index",
        mapBoxToken: mapBoxToken,
        style: 'mapbox://styles/mapbox/streets-v11'
    })
});

/*
Index/ Maps page except user chooses what slide they see
*/
app.post('/', function(req, res) {

    res.render('./pages/index',{
        my_title: "index",
        mapBoxToken: mapBoxToken,
        style: ``
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
//import our helper code
var destinationHandler = require('./resources/js/destinationHandler.js')

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
var mapBoxToken = process.env.MAPBOX_ACCESS;

//connect to postgres
const { Client } = require('pg');
const { cachedDataVersionTag } = require('v8');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/*
Index/ Maps page
*/
app.get('/', function(req, res) {
    //Query the database for needed information
    client.connect();

    var destinations = [];

    //query the database for the required information
    client.query(`SELECT s.label, count(ip), latitude, longitude FROM buffbus_data.session
                    INNER JOIN buffbus_data.stop s on s.id = session.estimated_departure_stop
                    INNER JOIN buffbus_data.location l on l.label = s.label
                    WHERE start_time > '09:00:00' AND start_time < '10:00:00'
                    GROUP BY s.label, latitude, longitude;`, (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            destinations.push(JSON.stringify(row));
        }
        client.end();
    });

    res.render('./pages/index',{
        my_title: "index",
        data: destinations,
        mapBoxToken: mapBoxToken
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
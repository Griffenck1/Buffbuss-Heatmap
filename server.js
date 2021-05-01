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
const { Console } = require('console');
var mapBoxToken = process.env.MAPBOX_ACCESS;

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

    var destinations = []

    var query = `SELECT s.label, count(ip), latitude, longitude FROM buffbus_data.session
                    INNER JOIN buffbus_data.stop s on s.id = session.estimated_departure_stop
                    INNER JOIN buffbus_data.location l on l.label = s.label
                    WHERE start_time > '09:00:00' AND start_time < '10:00:00'
                    GROUP BY s.label, latitude, longitude;`

    //Query the database for needed information
    db.task('get-everything', task => {
        return task.batch([
            task.any(query),
        ]);
    })
    .then(info => {
        var i = 0;
        while(i < info[0].length){
            destinations.push(new destinationHandler.destinationHandler(info[0][i].label, info[0][i].count, info[0][i].latitude, info[0][i].longitude));
            i+=1;
        }

        //Load location data
        var locations = {
            'type': 'FeatureCollection',
            'features': []
            };

        for(var destination in destinations){
            locations.features.push(
                `{
                    'type': 'Feature',
                    'properties': {
                        'description': `+destination.label+`,
                        'icon': 'circle-15',
                        'count': `+destination.count+`
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [`+destination.lng+`,`+ destination.lat+`]
                    }
                }`
            )
        }

        console.log(locations);

        //build the script to be injected client side
        var mapboxScript = 
        `
            <script>
                mapboxgl.accessToken = '` + mapBoxToken +`';
                var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [-105.258, 40.007],
                    zoom: 13.66
                });
            </script>
        `;

        //Seperate these up becuase together is was cuasing issues
        var addPointsScript = 
        `
            map.on('load', function () {
                // Add a GeoJSON source containing place coordinates and information.
                map.addSource('locations', {
                    'type': 'geojson',
                    'data':` + locations + `
                });
                
                map.addLayer({
                    'id': 'poi-labels',
                    'type': 'symbol',
                    'source': 'locations',
                    'paint': {
                        // make circles larger as the user zooms from z12 to z22
                        'circle-radius': 10,
                        'circle-color': red
                        }
                });
            });
        `;

        res.render('./pages/index',{
            my_title: "index",
            data: mapboxScript,
            data2: addPointsScript
        })
    })
    .catch(err => {
            console.log('error', err);
    });
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
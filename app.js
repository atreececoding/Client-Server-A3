/*
* This app will consume a rest service to give information about health and fitness
*/
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
const path = require('path');
app.use(express.static(__dirname));

/*
*
* variables used in calculating Newtonian force
*/
var gravity = 9.8;

var force;
var fm1;
var acceleration;
var angle;

/*
*
* variables used in calculating momentum for elastic collisions
*/
var ECM1i;
var ECV1i;
var ECM2i;
var ECV2i;
var ECV1f;
var ECV2f;
var totalElasticMomentum;

/*
*
* variables used in calculating momentum for inelastic collisions
*/
var INM1;
var INV1;
var INM2;
var INV2;
var totalInelasticMomentum;

/*
*
* variables used in calculating gravitational force
*/
var m1;
var m2;
var r;
var gravitationalForce;

/*
* Express functionality for reading JSON data 
*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*
* Enabling the use of cors and all other requests
*/
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

/*
* function for displaying index.html at port 3000
*/
app.get('/', function (req, res) {
    res.status(200);
    res.sendFile(path.join(__dirname+"/index.html"));
});

/*
* data retrieved from form for calculation of Newtonian force
*/
app.post('/force', function (req, res) {
    data = req.body;
    for(var i = 0; i < data.length; i++) {
        if (data[i] === undefined || data[i] === "" || isNaN(data[i])) {
            alert("Please enter only valid values");
            return;
        }
    }
    fm1 = parseFloat(data.Mass);
    acceleration = parseFloat(data.acceleration);
    angle = parseFloat(data.angle);
    if(angle == 0) {
        force = fm1 * acceleration;
    }
    else
    force = fm1 * gravity * Math.sin(angle);
});

/*
* data for computed force calculation
*/
app.get('/force', function (req, res) {
    res.json({"result": force});
})

/*
* data retrieved from form for calculation of momentum in elastic collisions
*/
app.post('/elastic-collisions', function(req, res) {
    data = req.body;
    console.log(data);
    for(var i = 0; i < data.length; i++) {
        if (data[i] === undefined || data[i] === "" || isNaN(data[i])) {
            alert("Please enter only valid values");
            return;
        }
    }
    
    ECM1i = data.m1i;
    ECV1i = data.v1i;
    ECM2i = data.m2i;
    ECV2i = data.v2i;
    ECV1f = data.v1f;
    ECV2f = data.v2f;

    totalElasticMomentum = ECV2f * ECM2i + ECV1f * ECM1i;
    
});

/*
* data for computed force calculation
*/
app.get('/elastic-collisions', function(req, res) {
    res.json({"result": totalElasticMomentum}); 
})

/*
* data retrieved from form for calculation of momentum in inelastic collisions
*/
app.post('/inelastic-collisions', function(req, res) {
    data = req.body;
    res.send(data);
    for(var i = 0; i < data.length; i++) {
        if (data[i] === undefined || data[i] === "" || isNaN(data[i])) {
            alert("Please enter only valid values");
            return;
        }
    }
    INM1 = parseFloat(data.m1);
    INV1 = parseFloat(data.v1);
    INM2 = parseFloat(data.m2);
    INV2 = parseFloat(data.v2);
    totalInelasticMomentum = (INM1 + INM2) * INV2
});

/*
* data for computed inelastic collision calculation
*/
app.get('/inelastic-collisions', function(req, res) {
    res.json({"result": totalInelasticMomentum});
});

/*
* data retrieved from form for calculation of gravitational force
*/
app.post('/gravity', function(req, res) {
    data = req.body;
    res.send(data);
    for(var i = 0; i < data.length; i++) {
        if (data[i] === undefined || data[i] === "" || isNaN(data[i])) {
            alert("Please enter only valid values");
            return;
        }
    }
    m1 = parseFloat(data.m1);
    m2 = parseFloat(data.m2);
    r = parseFloat(data.r);
    var G = 6.6743*Math.pow(10, -11);
    gravitationalForce = (G * m1 * m2)/(r * r);
});

/*
* data for computed gravitational force calculation
*/
app.get('/gravity', function(req, res) {
    res.json({"result": gravitationalForce});
})

// enable a port to listen to incoming HTTP requests
app.listen(3000, function () {
    console.log("API version 1.0.0 is running on port 3000");
});
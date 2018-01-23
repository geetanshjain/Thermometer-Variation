//import express package
var express = require("express");

//import mongodb package
var mongodb = require("mongodb");

//MongoDB connection URL - mongodb://host:port/dbName
var dbHost = "mongodb://localhost:27017/thermometerdb";

//DB Object
var dbObject;

//get instance of MongoClient to establish connection
var MongoClient = mongodb.MongoClient;

//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
MongoClient.connect(dbHost, function(err, db){
  if ( err ) throw err;
  dbObject = db;
});

function getData(responseObj){
  //use the find() API and pass an empty query object to retrieve all records
  dbObject.collection("temp_variations").find({}).toArray(function(err, docs){
    if ( err ) throw err;
    var hourArray = [];
    var tempArray = [];


    for ( index in docs){
      var doc = docs[index];

      var hour = doc['hour'];

      var temp = doc['temp'];

      hourArray.push({"label": hour});
      tempArray.push({"value" : temp});

    }

    var dataset = [
      {
        "seriesname" : "Temperature(in degrees)",
        "data" : tempArray
      },

    ];

    var response = {
      "dataset" : dataset,
      "categories" : hourArray
    };
    responseObj.json(response);
  });
}

var app = express();
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));
app.get("/tempVariance", function(req, res){
  getData(res);
});
app.get("/", function(req, res){
  res.render("chart");
});

app.listen("3300", function(){
  console.log('Server up: http://localhost:3300');
});

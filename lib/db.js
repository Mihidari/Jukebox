//Connexion à la base de données Mongodb

var app = require('express')();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb"); 

    
  //Pour le form
  const bodyParser = require("body-parser");

  app.use(bodyParser.urlencoded({
      extended: true
  }));
 
  app.use(bodyParser.json());
  

  //Envoie dans la base de donnée
  app.post("/", function (req, res) {
    var objs = { urll: req.body.url.urll}; // exemple a modifié
      dbo.collection("url").insertOne(objs, function(err, res) { // exemple a modifié
      if (err) throw err;
      console.log("1 document inserted");
      });
    });
});

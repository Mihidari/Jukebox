//Connexion à la base de données Mongodb

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb"); 

    //Inserer un objet dans la base de données
    dbo.collection("url").insertOne(objs, function(err, res) { // exemple a modifié
      if (err) throw err;
      console.log("1 document inserted");
    });
  
});

module.exports = MongoClient;
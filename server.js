var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var favicon = require('serve-favicon');
var streaming = require('./lib/streaming');
var url = require("url");
var videoData = require('./lib/video_duration');
var barre = 0;
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

//On lance le serveur sur le port 8080 de la machine
server.listen(8080);

//Déclaration du chemin d'accès de nos ressources
app.use((express.static(__dirname + '/public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

//Connexion à la page principale
/*TODO:
Création des modules de routing indépendants
*/
var newVideo = "";
app.get('/', function(req, res) {
    newVideo = req.query.video;
    if (newVideo != undefined && newVideo != '') {
        var DataId = url.parse(newVideo, true).query.v;
        streaming.id.push(DataId);
        videoData(DataId);
        res.redirect( req.originalUrl.split("?").shift());
        io.emit('newVideo', streaming.id);
    }
    else {
        res.render('index.ejs');
    }
    
});


//Pour le form
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


//Connection MongoDb
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
  
    //Récupération du formulaire
    app.post("/", function (req, res) {
        var adr = req.body.urlNouvelleVideo;
        var ctg1 = req.body.genre1;
        var ctg2 = req.body.genre2;
        var ctg3 = req.body.genre3;

        //Récup id video
        var url = require("url");
        var q = url.parse(adr, true);
        var urlComparaison =q.query.v;

        //Vérification id video
        if (urlComparaison!==undefined){
            var qDataId = { url: urlComparaison, genre1: ctg1, genre2: ctg2, genre3: ctg3}; 
            console.log(qDataId); 

            //Envoie db
            dbo.collection("url").insertOne(qDataId, function(err, res) { // nom de la collection a modifié
            if (err) throw err;
            console.log("1 url inserted");
            });
        }
    });
});

//Evenement "connexion" du client et envoi des sockets de données vidéo
io.on('connection', function (socket) {
    console.log('Un client est connecté !');
    console.log("Id vidéo en cours(serveur): " + streaming.id[0]);
    console.log("Timecode vidéo en cours: " + streaming.timecode );
    socket.emit('timecode', streaming.timecode );
    socket.emit('id_video', streaming.id);
    socket.vote = false;
    socket.emit('socket_vote', socket.vote);
    socket.emit('progress_barre', barre);
    socket.on("vote", function(data) {
        barre = data;
        console.log(barre);
        socket.vote = true;
        socket.emit('socket_vote', socket.vote);
        socket.broadcast.emit('newVote', data)
    });
});


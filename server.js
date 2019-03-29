var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var favicon = require('serve-favicon');
var streaming = require('./lib/streaming');
var url = require("url");
var videoData = require('./lib/video_duration');

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
    if (newVideo != undefined) {
        var DataId = url.parse(newVideo, true).query.v;
        console.log(DataId);
        streaming.id.push(DataId);
        videoData(DataId);
        res.redirect( req.originalUrl.split("?").shift() );
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

//Récupération du formulaire
app.post("/nouvelleVideo.nj", function (req, res) {
    //var objs = { urll: req.body.url.urll}; // exemple a modifié
    var q = url.parse(req.body.urlNouvelleVideo, true);
    console.log(q.query.v);
});

//Evenement "connexion" du client et envoi des sockets de données vidéo
io.on('connection', function (socket) {
    console.log('Un client est connecté !');
    console.log("Id vidéo en cours(serveur): " + streaming.id[0]);
    console.log("Timecode vidéo en cours: " + streaming.timecode );
    socket.emit('timecode', streaming.timecode );
    socket.emit('id_video', streaming.id);
    });


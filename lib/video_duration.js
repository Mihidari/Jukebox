//Connexion à l'API youtube pour récupérer la durée des vidéos
//Pas encore utilisé [en attente base de données]

var request = require('request');
var token = "AIzaSyDuKwD8cUmJzSEtYPgq4E3alJsKIMtb_bk";
var id = ['qfqA1sTKhmw', '507d9xto6Og', 'VYOjWnS4cMY', 'gQ5gtInauiI', 'er416Ad3R1g'];
var duration = 0;

function videoData(id) {
    request('https://www.googleapis.com/youtube/v3/videos?id=' + id + '&part=contentDetails&key=AIzaSyDuKwD8cUmJzSEtYPgq4E3alJsKIMtb_bk', function(error, response, body) {
        var data = JSON.parse(body);
        duration = data.items[0].contentDetails.duration;
        duration = convert_time(duration);
    });
}
//Conversion du format "PT[Heures]H[minutes]M[Secondes]S" en secondes
function convert_time(duration) {
    var a = duration.match(/\d+/g);

    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
        a = [0, a[0], 0];
    }

    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
        a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
        a = [a[0], 0, 0];
    }

    duration = 0;

    if (a.length == 3) {
        duration = duration + parseInt(a[0]) * 3600;
        duration = duration + parseInt(a[1]) * 60;
        duration = duration + parseInt(a[2]);
    }

    if (a.length == 2) {
        duration = duration + parseInt(a[0]) * 60;
        duration = duration + parseInt(a[1]);
    }

    if (a.length == 1) {
        duration = duration + parseInt(a[0]);
    }
    return duration
}

module.exports = videoData;
module.exports = convert_time;

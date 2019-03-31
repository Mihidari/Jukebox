//Simule la lecture vidéo côté serveur
var timecode = 0;

//Liste vidéo + durée en attendant le dialogue base de données
var id = ['LkHNbsQMxPI', 'VYOjWnS4cMY', 'gQ5gtInauiI', 'er416Ad3R1g'];
var duration = [96, 245, 377, 255];


function streaming() {
    timecode += 1;
    module.exports.timecode = timecode;
    module.exports.id = id;
    module.exports.duration = duration;
    if (timecode >= duration[0]) {
        timecode = 0;
        
        //A modifier quand base de données op
        duration.push(duration[0]);
        duration.shift();
        id.push(id[0]);
        id.shift();
        }
    }

var intervalID = setInterval(streaming, 1000);

module.exports = streaming;


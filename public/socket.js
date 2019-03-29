var socket = io.connect('http://localhost:8080');

socket.on('timecode', function (data) {
    timecode = data;
});
socket.on('id_video', function(data) { 
    identifiant = data;
});
socket.on('newVideo', function(data) {
    identifiant = data;
    thumbnail();
});
socket.on('socket_vote', function(data) {
    vote = data;
});
socket.on('progress_barre', function(data) {
    document.getElementById("barre").value = data;
});
socket.on('newVote', function(data) {
    document.getElementById("barre").value = data;
});
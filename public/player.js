//Code minimal intégration api youtube iframe
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Déclaration et affichage du player youtube
function onYouTubeIframeAPIReady() {
    var player = new YT.Player('player', {
        height: '340',
        width: '60%',
        videoId: identifiant[0],
        playerVars: { 'autoplay': 1, 'controls': 0, 'disablekb': 0, 'rel': 0, 'modestbranding': 1, 'showinfo': 0, 'start' : timecode },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    thumbnail();
}

//Quand le player est affiché et chargé, lance la vidéo associée (player.videoId)
function onPlayerReady(event) {
    event.target.playVideo();
    }

//Récupération et affichage des miniatures des vidéos suivantes
function thumbnail() {
    document.getElementById("thumbnail").innerHTML = "<img src='https://img.youtube.com/vi/" + identifiant[1] + "/maxresdefault.jpg'><img src='https://img.youtube.com/vi/" + identifiant[2] + "/maxresdefault.jpg'><img src='https://img.youtube.com/vi/" + identifiant[3] + "/maxresdefault.jpg'><img src='https://img.youtube.com/vi/" + identifiant[4] + "/maxresdefault.jpg'>";
}

//Quand la vidéo est fini le player charge la prochainne vidéo
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        event.target.loadVideoById(identifiant[1]);
        identifiant.push(identifiant[0]);
        identifiant.shift();
        thumbnail();
     }
}



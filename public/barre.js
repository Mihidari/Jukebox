var barre = 0;

function votepour(){
        if (vote == false) {
                document.getElementById("barre").value -= 1;
                socket.emit("vote", document.getElementById("barre").value);
        }
        
}
function votecontre(){
        if (vote == false) {
                document.getElementById("barre").value += 1;
                barre = document.getElementById("barre").value;
                if (barre == 8) {
                        barre = 0;
                        player.loadVideoById('gQ5gtInauiI');
                }
                socket.emit("vote", barre);
        }
    }
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
                        document.getElementById("barre").value = barre;
                        onPlayerStateChange('next');
                        socket.emit("next");
                }
                socket.emit("vote", barre);
        }
    }
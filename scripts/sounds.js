var sounds = [];
sounds[0] = new Audio("sounds/bonita.mp3");
sounds[1] = new Audio("sounds/cissy.mp3");
sounds[2] = new Audio("sounds/proceed.mp3");
sounds[3] = new Audio("sounds/heartbeats.mp3");
sounds[4] = new Audio("sounds/cooler.MP3");
sounds[5] = new Audio("sounds/lovetrain.mp3");

var i = Math.round(Math.random()*(sounds.length-1));
/*
sounds[i].addEventListener('ended', function() {
    console.log("Hey I'm looping");
    i = Math.round(Math.random()*(sounds.length-1));
    sounds[i].currentTime = 0;
    sounds[i].play();
}, false);

sounds[i].play(); */

function lowerVolume(){
    if(sounds[i].volume > 0){
        sounds[i].volume -= .2;
    };
}

function raiseVolume(){
    if(sounds[i].volume < 1){
        sounds[i].volume += .2;
    };
}

function skipSong(){
    sounds[i].pause();
    sounds[i].currentTime = 0;
    i = Math.round(Math.random()*(sounds.length-1));
    sounds[i].play();
}
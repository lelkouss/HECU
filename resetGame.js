function resetGame(){
    $('#game-over').hide();
    frameCount = 0; //reset score system
    setup();
    if(boss != null){
        boss.phase_two = false;
        currentRoom.purpleTiles = true;
        boss.health = 100; //reset the boss's health
    }
    while(walkers.length > 0){
        walkers.pop();
    }
    loop();
}

function hardReset(){
    visited_rooms = [];
    found_cores = 0;
    boss = null;
    while(walkers.length > 0){
        walkers.pop();
    }
    setup();
}

let gameOver = () => { //show game over screen and compute score
    let score_ = Math.ceil(frameCount/60);
    $('#score').append(`<p>${score_}</p>`);
    $('#game-over').css('display', 'flex');
    console.log(frameCount / 60);
    noLoop();
}

function beatGame(){
    $('#game-won').css('display', 'flex');
    $('#credits').ready(() => {
        $('#credits').addClass('move-up'); //roll credits
    })
}
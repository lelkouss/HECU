function resetGame(){
    $('#game-over').hide();
    frameCount = 0; //reset score system
    setup();
    loop();
}

let gameOver = () => { //show game over screen and compute score
    let score_ = Math.ceil(frameCount/60);
    $('#score').append(`<p>${score_}</p>`);
    $('#game-over').css('display', 'flex');
    console.log(frameCount / 60);
    noLoop();
}

function startGame(){
    
}
function resetGame(){
    $('#game-over').hide();
    setup();
    loop();
}

let gameOver = () => {
    $('#game-over').show();
    noLoop();
}

function startGame(){
    
}

function keyClicked(){
    console.log("ENDING GAME");

    if(key == 'g'){
        console.log("ENDING GAME");
        gameOver();
    }
}
function resetGame(){
    $('#game-over').hide();
    setup();
}

let gameOver = () => {
    $('#game-over').show();
    noLoop();
    $('.btn').click(function() {
        console.log("clicked");
        resetGame();
    })
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
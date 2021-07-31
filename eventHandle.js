function mousePressed(){
    player.shoot();
}

function getKeyboardInput() {
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        player.dx--;
    }
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        player.dx++;
    }
    if(keyIsDown(UP_ARROW) || keyIsDown(87)) {
        player.dy--;
    }
    if(keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        player.dy++;
    }
}

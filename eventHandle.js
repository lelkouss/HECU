function mouseClicked(){
    player.shoot();
}

function keyPressed(){
    if(key.toLowerCase() == 'a' || keyCode == LEFT_ARROW) {
        player.dx = -1;
    }
    if(key.toLowerCase() == 'd' || keyCode == RIGHT_ARROW) {
        player.dx = 1;
    }
    if(key.toLowerCase() == 'w' || keyCode == UP_ARROW) {
        player.dy = -1;
    }
    if(key.toLowerCase() == 's' || keyCode == DOWN_ARROW) {
        player.dy = 1;
    }
}

function keyReleased(){
    if( (key.toLowerCase() == 'a' && !keyIsDown(68)) || (keyCode == 37 && !keyIsDown(39))) {
        player.dx = 0;
    }
    if((key.toLowerCase() == 'd' && !keyIsDown(65)) || (keyCode == 39 && !keyIsDown(37))) {
        player.dx = 0;
    }
    if((key.toLowerCase() == 'w' && !keyIsDown(83)) || (keyCode == 38 && !keyIsDown(40))) {
        player.dy = 0;
    }
    if((key.toLowerCase() == 's' && !keyIsDown(87)) || (keyCode == 40 && !keyIsDown(38))) {
        player.dy = 0;
    }
}

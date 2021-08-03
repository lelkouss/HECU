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

function getMouseInput() {
    if(mouseIsPressed) {
        player.shooting = true;
        player.shotCoolDown--;
        if(player.shotCoolDown < 0) {
            player.shoot();
            player.shotCoolDown = 10;
        }
        
    } else {
        player.shooting = false;
        player.shotCoolDown = 10;
    }
}

class Bullet {
    constructor(x, y, v, team) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.velX = v.x;
        this.velY = v.y;
        this.team = team;

        this.frame = 0;
        this.sprite = 0;
    }

    update() {
        this.move();
        this.display();
        this.frame = (this.frame + 1) % 8;
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;

        //see if hit an enemy
        for(const enemy of enemies) {
            if(this.team == 0 && collideRectCircle(enemy.x, enemy.y, enemy.width, enemy.height, this.x, this.y, this.radius*2)) {
                enemy.shot();
                bullets.splice(bullets.indexOf(this), 1);
            }
        }

        //see if hit player
        if(this.team == 1 && collideRectCircle(player.x, player.y, player.width, player.height, this.x, this.y, this.radius*2)) {
            player.shot();
            bullets.splice(bullets.indexOf(this), 1);
        }

        //if boss fit is active, check collision
        if(boss != null && this.team == 0 && collideRectCircle(boss.x, boss.y, boss.width, boss.height, this.x, this.y, this.radius*2)){
            boss.shot();
            bullets.splice(bullets.indexOf(this), 1);
        }

        //remove bullet if hits a border
        if(this.x-this.radius < currentRoom.borderOffset || this.x+this.radius > currentRoom.width-currentRoom.borderOffset ||
             this.y-this.radius < currentRoom.borderOffset || this.y+this.radius > currentRoom.height-currentRoom.borderOffset ) {
            bullets.splice(bullets.indexOf(this), 1);
        }
        //remove bullet if hits a wall
        for(let i=0; i<currentRoom.tiles.length; i++) {
            for(let j=0; j<currentRoom.tiles[i].length; j++) {
                if(currentRoom.tiles[i][j] == 1 && collideRectCircle(j*currentRoom.tileWidth+currentRoom.borderOffset, i*currentRoom.tileHeight+currentRoom.borderOffset, currentRoom.tileWidth, currentRoom.tileHeight, this.x, this.y, this.radius*2)) {
                    bullets.splice(bullets.indexOf(this), 1);
                } 
            }
        }
    }

    display() {
        let data = SPRITE_BULLETS[this.team + "" + floor(this.frame/2)];
        canvasBuffer.image(data[0], this.x-data[1]/2, this.y-data[2]/2, data[1], data[2]);
    }
}
const BULLET_COLORS = {0:[0, 255, 255, 200], 1:[255, 20, 20, 230]};

class Bullet {
    constructor(x, y, v, team) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.velX = v.x;
        this.velY = v.y;
        this.team = team;
    }

    update() {
        this.move();
        this.display();
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
        canvasBuffer.fill(BULLET_COLORS[this.team]);
        canvasBuffer.stroke(0, 100, 100);
        canvasBuffer.ellipse(this.x, this.y, this.radius*2);
        canvasBuffer.stroke(0);
        canvasBuffer.fill(255);
    }
}
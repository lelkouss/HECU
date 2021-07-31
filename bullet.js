class Bullet {
    constructor(x, y, v) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.velX = v.x;
        this.velY = v.y;
    }

    update() {
        this.move();
        this.display();
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;

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
        canvasBuffer.fill(0, 255, 255, 200);
        canvasBuffer.stroke(0, 100, 100);
        canvasBuffer.ellipse(this.x, this.y, this.radius*2);
        canvasBuffer.stroke(0);
        canvasBuffer.fill(255);
    }
}
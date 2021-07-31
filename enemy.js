class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.type = type;
        this.health = 10;
        this.shootCoolDown = 120;

        this.colorMap = {0: color(0, 100, 100), 1:color(120, 100, 100), 2:color(240, 100, 100)};
    }

    update() {     
        this.display();
        this.shootCoolDown--;
        //shoots every 2 seconds
        if(this.shootCoolDown < 0) {
            this.shoot();
            this.shootCoolDown = 120;
        }
        
    }

    display() {
        fill(this.colorMap[this.type]);
        canvasBuffer.rect(this.x, this.y, this.width, this.height);
    }

    shoot() {
        let playerVector = createVector( (player.x+player.width/2) - (this.x+this.width/2), (player.y+player.height/2) - (this.y+this.height/2));
        playerVector.normalize();

        let new_bullet = new Bullet(this.x+this.width/2, this.y+this.height/2, playerVector.mult(4.5), 1);
        bullets.push(new_bullet);
    }

    shot() {
        this.health -= 5;
        if(this.health <= 0) {
            enemies.splice(enemies.indexOf(this), 1);
        }
    }
}
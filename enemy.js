//move/health is dependent on inheritance - To be implemented

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        //this.type = type;
        this.health = 10; //needs to be dependent on type - inheritance
        this.shootCoolDown = 120;

        //this.colorMap = {0: [0, 100, 100], 1:[120, 100, 100], 2:[240, 100, 100]};
    }

    update(){

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

class Roomba extends Enemy{
    constructor(x, y) {
        super(x, y);
        this.health = 10;
        this.speedX = 1;
        //this.speedY = 0;
      }

    update() {
      super.update();     
      canvasBuffer.rect(this.x, this.y, this.width, this.height);
      this.shootCoolDown--;
      //shoots every 2 seconds
      if(this.shootCoolDown < 0) {
          this.shoot();
          this.shootCoolDown = 120;
      } 
      this.move();
  }


      move() {
        let oldX = this.x;
        let oldY = this.y;
        
        if(speedX > 0){
          speedY = 0;
        }
        else if(speedY > 0){
          speedX = 0;
        }
        //random movement for roomba
        this.x = this.x + speedX;
        this.y = this.y + 0;

        if(this.x > width){
          speedX = speedX * -1;
        }
        if(this.x < 0){
          speedX = speedX * -1;
        }
        /*if(this.y < 0){
          speedY = speedY * -1;
        }
        if(this.y > height){
          speedY = speedY * -1;
        } */
        
        /*constructor(position_  = createVector(random(-0.01, 0.01), -r/2), velocity_ = createVector(random(-30, 30), random(-30, 30))){
          this.pos = position_;
          this.v = velocity_;
          this.a = createVector(0, a);
          this.r = 0.5;
          this.points = [];
          this.drawing = true;
        }*/

        /*// check if collided with a wall on the x axis
        for(let i=0; i<currentRoom.tiles.length; i++) {
          for(let j=0; j<currentRoom.tiles[i].length; j++) {
            if(currentRoom.tiles[i][j] == 1 && collideRectRect(this.x, this.y, this.width, this.height, j*currentRoom.tileWidth+currentRoom.borderOffset, i*currentRoom.tileHeight+currentRoom.borderOffset, currentRoom.tileWidth, currentRoom.tileHeight)) {
              this.x = oldX;
              break;
            } 
          }
        }
        
        // check if colldied with player on x axis
          if(collideRectRect(this.x, this.y, this.width, this.height, player.x, player.y, player.width, player.height)) {
            this.x = oldX;
          }

        // check if collided with a wall on the y axis
        for(let i=0; i<currentRoom.tiles.length; i++) {
          for(let j=0; j<currentRoom.tiles[i].length; j++) {
            if(currentRoom.tiles[i][j] == 1 && collideRectRect(this.x, this.y, this.width, this.height, j*currentRoom.tileWidth+currentRoom.borderOffset, i*currentRoom.tileHeight+currentRoom.borderOffset, currentRoom.tileWidth, currentRoom.tileHeight)) {
              this.y = oldY;
              break;
            }
          }
        }
        
        // check if colldied with player on y axis
          if(collideRectRect(this.x, this.y, this.width, this.height, player.x, player.y, player.width, player.height)) {
            this.y = oldY;
          }

  
        // check if collided with a border on the x axis
        if(this.x < currentRoom.borderOffset || this.x + this.width > currentRoom.width-currentRoom.borderOffset) {
          this.x = oldX;
        }
        //check if collided with a border on the y axis
        if(this.y < currentRoom.borderOffset || this.y + this.height > currentRoom.height-currentRoom.borderOffset) {
          this.y = oldY;
        }*/
        
      }
  
}
class Turret extends Enemy{
    constructor(x, y) {
        super(x, y);
        this.health = 15;
      }

  update() {
    this.display();
    if(this.shootCoolDown-- < 0) {
      super.shoot();
      this.shootCoolDown = 120;
    }
  }

}


//move/health is dependent on inheritance - To be implemented

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.health = 10; //needs to be dependent on type - inheritance
        this.shootCoolDown = 120;
    }
      
    display(sprite) {
      let data = SPRITE_ENEMIES[sprite];
      canvasBuffer.image(data[0], this.x-(data[1]-this.width)/2, this.y-(data[2]-this.height)/2, data[1], data[2]);
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
        this.speedY = 0;
        this.sprite = 'roomba';
      }

    update() {
      this.move();
      super.display(this.sprite);
      if(this.shootCoolDown-- < 0) {
        super.shoot();
        this.shootCoolDown = 120;
      }

  }

      move() {
        let oldX = this.x;
        let oldY = this.y;
        
        if(this.speedX > 0){
          this.speedY = 0;
        }
        if(this.speedY > 0){
          this.speedX = 0;
        }

        //random movement for roomba
        //
        if(this.x < 400){
          this.x = this.x + this.speedX;
        }
        if(this.y < 400){
          this.y = this.y + this.speedY;
        }

        if(this.x > 400){
          this.speedX = this.speedX * -1;
        }
        if(this.x < 0){
          this.speedX = this.speedX * -1;
        }
        if(this.y < 50){
          this.speedY = this.speedY * -1;
        }
        if(this.y > 400){
          this.speedY = this.speedY * -1;
        }
        


        /*// check if collided with a wall on the x axis
        for(let i=0; i<currentRoom.tiles.length; i++) {
          for(let j=0; j<currentRoom.tiles[i].length; j++) {
            if(currentRoom.tiles[i][j] == 1 && collideRectRect(this.x, this.y, this.width, this.height, j*currentRoom.tileWidth+currentRoom.borderOffset, i*currentRoom.tileHeight+currentRoom.borderOffset, currentRoom.tileWidth, currentRoom.tileHeight)) {
              this.x = oldX;
              break;
            } 
          }
        }*/
        
        //check if collidied with player on x axis
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
        /*
        // check if colldied with player on y axis
          if(collideRectRect(this.x, this.y, this.width, this.height, player.x, player.y, player.width, player.height)) {
            this.y = oldY;
          }

  
        // check if collided with a border on the x axis
        if(this.x < currentRoom.borderOffset || this.x + this.width > currentRoom.width-currentRoom.borderOffset) {
          //this.x = oldX;
          this.speedX = this.speedX * -1;
        }
        //check if collided with a border on the y axis
        if(this.y < currentRoom.borderOffset || this.y + this.height > currentRoom.height-currentRoom.borderOffset) {
          //this.y = oldY;
          this.speedY = this.speedY * -1;

        }*/
        
      }
  
}
class Turret extends Enemy{
  constructor(x, y) {
      super(x, y);
      this.health = 15;
      this.sprite = 'turret_closed';
    }

  update() { //
    super.display(this.sprite);
    if(this.inLineOfSight()) {
      if(this.shootCoolDown-- < 0) {
      super.shoot();
      this.shootCoolDown = 30;
      }
    }
  }

  //returns whether or not the player is in the line of sight
  inLineOfSight() {
    
    for(let i=0; i<currentRoom.tiles.length; i++) {
      for(let j=0; j<currentRoom.tiles[i].length; j++) {
        if(currentRoom.tiles[i][j] == 1 && collideLineRect(this.x+this.width/2, this.y+this.height/2, player.x+player.width/2, player.y+player.height/2, j*currentRoom.tileWidth+currentRoom.borderOffset, i*currentRoom.tileHeight+currentRoom.borderOffset, currentRoom.tileWidth, currentRoom.tileHeight)) {
          this.sprite = "turret_closed";
          return false;
        }
      }
    }

    this.sprite = "turret_static";
    return true;
  }
}
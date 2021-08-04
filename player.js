class Player {
    constructor(x, y, room) {
      this.x = x;
      this.y = y;
      this.dx = 0;
      this.dy = 0;
      this.width = 10;
      this.height = 10;
      this.room = currentRoom;
      this.sprite = 'right'; 
      this.shooting = false;
      this.shootingDirection = 'right';
      this.shotCoolDown = 10;
      this.frame = 0;
      this.health = 10;
      this.cores = 0;
      this.invincible = false;
      this.invincibleFrames = 0;
      this.moving = false;
      this.movingFrame = 10;
    }
  
    update() {
      getKeyboardInput();
      this.move();
      getMouseInput();
      this.setSprite();
      this.display();
      this.moving = this.dx == 0 && this.dy == 0? false: true;
      this.dx = 0;
      this.dy = 0;
      if(this.moving || this.shooting) {
        if(this.movingFrame++ > 10) {
          soundPlayerFootstep.play();
          this.movingFrame = 0;
        }
      } else {
        this.movingFrame = 10;
      }

      if(this.invincible) {
        if(this.invincibleFrames++ > 20) {
          this.invincible = false;
          this.invincibleFrames = 0;
        }
      }

    }
  
    display() {
      //getting sprite and draw
      let data = SPRITE_PLAYER[this.sprite];
      canvasBuffer.image(data[0].get(floor(this.frame/5)*data[1], 0, data[1], data[2]), this.x-(data[1]-this.width)/2, this.y-(data[2]-this.height)/2, data[1], data[2]);
    }
  
    move() {
      let oldX = this.x;
      let oldY = this.y;
      
      this.x += this.dx;
      // check if collided with a wall on the x axis
      for(let i=0; i<this.room.tiles.length; i++) {
        for(let j=0; j<this.room.tiles[i].length; j++) {
          if(this.room.tiles[i][j] == 1 && collideRectRect(this.x, this.y, this.width, this.height, j*this.room.tileWidth+this.room.borderOffset, i*this.room.tileHeight+this.room.borderOffset, this.room.tileWidth, this.room.tileHeight)) {
            this.x = oldX;
            break;
          } 
        }
      }

      this.y += this.dy;
      // check if collided with a wall on the y axis
      for(let i=0; i<this.room.tiles.length; i++) {
        for(let j=0; j<this.room.tiles[i].length; j++) {
          if(this.room.tiles[i][j] == 1 && collideRectRect(this.x, this.y, this.width, this.height, j*this.room.tileWidth+this.room.borderOffset, i*this.room.tileHeight+this.room.borderOffset, this.room.tileWidth, this.room.tileHeight)) {
            this.y = oldY;
            break;
          }
        }
      } 
      
      // check if colldied with an enemy 
      for(const enemy of enemies) {
        if(!this.invincible && collideRectRect(this.x, this.y, this.width, this.height, enemy.x, enemy.y, enemy.width, enemy.height)) {
          console.log(this.health);
          this.shot();
          this.invincible = true;
        }
      }


      //check if collided with a door
      for(const door of currentRoom.doors) {
        if(door.exists && door.available && collideRectRect(this.x, this.y, this.width, this.height, door.x, door.y, door.width, door.height) ) {
          moveRooms(door); //update canvas and new screen
          for(const door of currentRoom.doors) {
            if(door.exists && !door.available) {
              soundDoorClose.play();
            } 
          }
        }
      }

      // check if collided with a border on the x axis
      if(this.x < this.room.borderOffset || this.x + this.width > this.room.width-this.room.borderOffset) {
        this.x = oldX;
      }
      //check if collided with a border on the y axis
      if(this.y < this.room.borderOffset || this.y + this.height > this.room.height-this.room.borderOffset) {
        this.y = oldY;
      }
    }

    shoot(){
      soundPlayerShoot.play();
      let mouseVector = createVector(mouseX/3 - this.x-this.width/2, mouseY/3 - this.y-this.height/2);
      mouseVector.normalize();
      let dir = 180/PI * atan2(mouseVector.y, mouseVector.x);
      if(dir < 0) {
        dir = 360+dir;
      }

      if(dir < 45 || dir > 315) {
        this.shootingDirection = "right";
      } else if(dir > 45 && dir < 135) {
        this.shootingDirection = "down";
      } else if(dir > 135 && dir < 225) {
        this.shootingDirection = "left";
      } else {
        this.shootingDirection = "up";
      }
      let new_bullet = new Bullet(this.x + this.width/2, this.y + this.height/2, mouseVector.mult(4.5), 0);
      bullets.push(new_bullet);
    }

    //remove health if shot
    shot(){
      this.health--;
      window.updatePlayerHearts();
       //check if game ended
       if(this.health < 1)
          gameOver();
    }

    setSprite() {
      let sprite = '';
      
      if(this.shooting) {
        sprite = this.shootingDirection;
      } else if(this.dy == 1) {
        sprite = 'down';
      } else if(this.dy == -1) {
        sprite = 'up';
      } else if(this.dx == 1) {
        sprite = 'right';
      } else if(this.dx == -1) {
        sprite = 'left';
      } else {
        sprite = 'idle';
      }

      //setting sprite based on direction
      if(sprite == 'idle') {
        this.frame = 0;
      } else if(this.sprite == sprite) {
        this.sprite = sprite;
        this.frame = this.frame + 1 >= 25? 5: this.frame+1;
      } else {
        this.sprite = sprite;
        this.frame = 4;
      }
    }
  }

class Player {
    constructor(x, y, room) {
      this.x = x;
      this.y = y;
      this.dx = 0;
      this.dy = 0;
      this.width = 10;
      this.height = 10;
      this.room = currentRoom;
      this.sprite = 'right'; //
      this.frame = 0;
    }
  
    update() {
      getKeyboardInput();
      this.move();
      this.display();
      this.dx = 0;
      this.dy = 0;
    }
  
    display() {
      let sprite = '';
      // direction moved
      if(this.dy == 1) {
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

      // check if colldied with an enemy on x axis
      for(const enemy of enemies) {
        if(collideRectRect(this.x, this.y, this.width, this.height, enemy.x, enemy.y, enemy.width, enemy.height)) {
          this.x = oldX;
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
      
      // check if colldied with an enemy on y axis
      for(const enemy of enemies) {
        if(collideRectRect(this.x, this.y, this.width, this.height, enemy.x, enemy.y, enemy.width, enemy.height)) {
          this.y = oldY;
        }
      }


      //check if collided with a door
      for(const door of currentRoom.doors) {
        if(door.available && collideRectRect(this.x, this.y, this.width, this.height, door.x, door.y, door.width, door.height) ) {
          moveRooms(door); //update canvas and new screen
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
      let mouseVector = createVector(mouseX/3 - this.x-this.width/2, mouseY/3 - this.y-this.height/2);
      mouseVector.normalize();

      let new_bullet = new Bullet(this.x + this.width/2, this.y + this.height/2, mouseVector.mult(4.5), 0);
      bullets.push(new_bullet);
    }
  }

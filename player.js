class Player {
    constructor(x, y, room) {
      this.x = x;
      this.y = y;
      this.dx = 0;
      this.dy = 0;
      this.width = 10;
      this.height = 10;
      this.room = currentRoom;
    }
  
    update() {
      getKeyboardInput();
      this.move();
      this.display();
      this.dx = 0;
      this.dy = 0;
    }
  
    display() {
      fill(0, 0, 255);
      canvasBuffer.rect(this.x, this.y, this.width, this.height);
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
      
      //check if collided with a door
      for(const door of this.room.doors) {
        if( door.available && collideRectRect(this.x, this.y, this.width, this.height, door.x, door.y, door.width, door.height) ) {
          currentRoom = getRoom(currentRoom.id, door.direction); //change current room

          this.x = door.spawn_x;
          this.y = door.spawn_y;
          this.room = currentRoom; // update player view of the room
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
      let mouseVector = createVector(mouseX/3 - this.x-4, mouseY/3 - this.y-4);
      mouseVector.normalize();

      let new_bullet = new Bullet(this.x + 5, this.y + 5, mouseVector.mult(4.5));
      bullets.push(new_bullet);
    }
  }
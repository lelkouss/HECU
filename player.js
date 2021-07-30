class Player {
    constructor(x, y, room) {
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 10;
      this.room = room;
    }
  
    update() {
      this.move();
      this.display();
    }
  
    display() {
      fill(0, 0, 255);
      canvasBuffer.rect(this.x, this.y, this.width, this.height);
    }
  
    move() {
      let oldX = this.x;
      let oldY = this.y;
  
      if (keyIsDown(LEFT_ARROW)) {
        this.x -= 1;
      } if (keyIsDown(RIGHT_ARROW)) {
        this.x += 1;
      } 
      
      for(let i=0; i<this.room.tiles.length; i++) {
        for(let j=0; j<this.room.tiles[i].length; j++) {
          if(this.room.tiles[i][j] == 1 && collideRectRect(this.x, this.y, this.width, this.height, j*this.room.tileWidth+this.room.borderOffset, i*this.room.tileHeight+this.room.borderOffset, this.room.tileWidth, this.room.tileHeight)) {
            this.x = oldX;
            break;
          } 
        }
      }
  
      if(this.x < this.room.borderOffset || this.x + this.width > this.room.width-this.room.borderOffset) {
        this.x = oldX;
      }
      
      if (keyIsDown(UP_ARROW)) {
        this.y -= 1;
      } if (keyIsDown(DOWN_ARROW)) {
        this.y += 1;
      }
  
      for(let i=0; i<this.room.tiles.length; i++) {
        for(let j=0; j<this.room.tiles[i].length; j++) {
          if(this.room.tiles[i][j] == 1 && collideRectRect(this.x, this.y, this.width, this.height, j*this.room.tileWidth+this.room.borderOffset, i*this.room.tileHeight+this.room.borderOffset, this.room.tileWidth, this.room.tileHeight)) {
            this.y = oldY;
            break;
          }
        }
      }
  
  
      if(this.y < this.room.borderOffset || this.y + this.height > this.room.height-this.room.borderOffset) {
        this.y = oldY;
      }
    }
  }
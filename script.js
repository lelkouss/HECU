let room, tiles, player;
let spriteFloor, spriteWall;
let spriteBorderBottom, spriteBorderTop, spriteBorderRight, spriteBorderLeft; 

function setup() {
  width = 400;
  height = 400;
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  spriteFloor = loadImage("/assets/tile.png");
  spriteWall = loadImage("/assets/wall.png");
  spriteBorderBottom = loadImage("/assets/borderbottom.png");
  spriteBorderTop = loadImage("/assets/bordertop.png");
  spriteBorderRight = loadImage("/assets/borderright.png");
  spriteBorderLeft = loadImage("/assets/borderleft.png");

  //init room
  tiles = [ [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0] ];
  room = new Room(tiles);

  //init player
  player = new Player(25*3, 20*6, room);

  // setting up canvas
}

function draw() {
  background(0);
  image(spriteBorderBottom, 0, 0, 219, 184);
  image(spriteBorderTop, 0, 0, 219, 184);
  image(spriteBorderRight, 0, 0, 219, 184);
  image(spriteBorderLeft, 0, 0, 219, 184);
  room.display();
  player.update();
}

class Room {
  constructor(tiles) {
    this.tiles = tiles;
    this.tileWidth = 25;
    this.tileHeight = 20;
    this.width = 219;
    this.height = 184;
    this.tileSprites = {0: spriteFloor, 1: spriteWall};
    this.borderOffset = 22;
  }

  display() {
    for(let i=0; i<this.tiles.length; i++) {
      for(let j=0; j<this.tiles[i].length; j++) {
        let sprite = this.tileSprites[this.tiles[i][j]];
        image(sprite, j*this.tileWidth+this.borderOffset, i*this.tileHeight+this.borderOffset, this.tileWidth, this.tileHeight);
      }
    }
  }
}


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
    rect(this.x, this.y, this.width, this.height);
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
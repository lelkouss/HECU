let room, tiles, player;
let spriteFloor, spriteWall;

function setup() {
  width = 25*7;
  height = 20*7;
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  spriteFloor = loadImage("/assets/tile.png");
  spriteWall = loadImage("/assets/wall.png");

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
  room.display();
  player.update();
}

class Room {
  constructor(tiles) {
    this.tiles = tiles;
    this.tileWidth = 25;
    this.tileHeight = 20;
    this.tileSprites = {0: spriteFloor, 1: spriteWall};
  }

  display() {
    for(let i=0; i<this.tiles.length; i++) {
      for(let j=0; j<this.tiles[i].length; j++) {
        let sprite = this.tileSprites[this.tiles[i][j]];
        image(sprite, j*this.tileWidth, i*this.tileHeight, this.tileWidth, this.tileHeight);
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
        if(this.room.tiles[i][j] == 1 && collideRectRect(this.x, this.y, this.width, this.height, j*this.room.tileWidth, i*this.room.tileHeight, this.room.tileWidth, this.room.tileHeight)) {
          this.x = oldX;
          break;
        }
      }
    }
    
    
    if (keyIsDown(UP_ARROW)) {
      this.y -= 1;
    } if (keyIsDown(DOWN_ARROW)) {
      this.y += 1;
    }

    for(let i=0; i<this.room.tiles.length; i++) {
      for(let j=0; j<this.room.tiles[i].length; j++) {
        if(this.room.tiles[i][j] == 1 && collideRectRect(this.x, this.y, this.width, this.height, j*this.room.tileWidth, i*this.room.tileHeight, this.room.tileWidth, this.room.tileHeight)) {
          this.y = oldY;
          break;
        }
      }
    }
  }
}
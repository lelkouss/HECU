class Room {
    constructor(tiles, id) {
      this.tiles = tiles;
      this.tileWidth = 25;
      this.tileHeight = 20;
      this.width = 219;
      this.height = 184;
      this.tileSprites = {0: spriteFloor, 1: spriteWall};
      this.borderOffset = 22;
      this.roomID = id;
    }
  
    display() {
      for(let i=0; i<this.tiles.length; i++) {
        for(let j=0; j<this.tiles[i].length; j++) {
          let sprite = this.tileSprites[this.tiles[i][j]];
          canvasBuffer.image(sprite, j*this.tileWidth+this.borderOffset, i*this.tileHeight+this.borderOffset, this.tileWidth, this.tileHeight);
        }
      }
    }
  }
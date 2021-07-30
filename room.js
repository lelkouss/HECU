
class Room {
    constructor(id, tiles, borders) {
      this.id = id;
      this.tiles = tiles;
      this.borders = borders;
      this.doors = createDoors(this.borders);

      // dimensions
      this.tileWidth = 25;
      this.tileHeight = 20;
      this.width = 219;
      this.height = 184; 
      this.borderOffset = 22;
    }

    display() {
      // display borders
      for(const border of this.borders) {
        let sprite = SPRITE_BORDERS[border];
        canvasBuffer.image(sprite, 0, 0, 219, 184);
      }
      // display tiles
      for(let i=0; i<this.tiles.length; i++) {
        for(let j=0; j<this.tiles[i].length; j++) {
          let sprite = SPRITE_TILES[this.tiles[i][j]];
          canvasBuffer.image(sprite, j*this.tileWidth+this.borderOffset, i*this.tileHeight+this.borderOffset, this.tileWidth, this.tileHeight);
        }
      }
    }
  }
class Room {
    constructor(id, tiles, borders) {
      this.id = id;
      this.tiles = tiles;
      this.borders = borders;

      // sprite maps for tiles and borders
      this.tileSprites = {0: spriteFloor, 1: spriteWall};
      this.borderSprites = {"A_1": spriteBorderTop, "B_1": spriteBorderRight, "C_1": spriteBorderBottom, "D_1": spriteBorderLeft};

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
        let sprite = this.borderSprites[border];
        canvasBuffer.image(sprite, 0, 0, 219, 184);
      }
      // display tiles
      for(let i=0; i<this.tiles.length; i++) {
        for(let j=0; j<this.tiles[i].length; j++) {
          let sprite = this.tileSprites[this.tiles[i][j]];
          canvasBuffer.image(sprite, j*this.tileWidth+this.borderOffset, i*this.tileHeight+this.borderOffset, this.tileWidth, this.tileHeight);
        }
      }
    }
  }
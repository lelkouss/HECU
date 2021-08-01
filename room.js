
class Room {

    constructor(id, tiles, borders, spawner_info = []) {
      this.id = id;
      this.tiles = tiles;
      this.doors = createDoors(this.borders);
      this.spawners = [];

      //initialize the rooms spawners
      let initSpawners = (_info) => {
        _info.forEach((num_enemies) => {
          let new_spawner = new Spawner(num_enemies);
          this.spawners.push(new_spawner);
        });
      }
      this.info = spawner_info;
      initSpawners(this.info);

      // dimensions
      this.tileWidth = 25;
      this.tileHeight = 20;
      this.width = 219;
      this.height = 184; 
      this.borderOffset = 22;
    }

    display() {
      // display borders
      for(const door of this.doors) {
        door.update();
        let sprite = SPRITE_BORDERS[door.sprite];
        console.log(sprite);
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
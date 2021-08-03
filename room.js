
class Room {
    constructor(id, tiles, borders, spawner_info = -1) {
      this.id = id;
      this.tiles = tiles;
      this.doors = createDoors(borders);
      this.spawners = [];
      this.spawner_info = spawner_info;
      this.visited = false; //for map

      if(this.spawner_info != -1)
        this.spawners = initSpawners(this.spawner_info);

      this.spawner_info = spawner_info;

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


function initSpawners(spawner_info){
  let obj_spawners = [];
    Object.keys(spawner_info).forEach((wave) =>{
      let new_spawner = new Spawner(spawner_info[`${wave}`]);
      obj_spawners.push(new_spawner);
    })
    return obj_spawners;
}
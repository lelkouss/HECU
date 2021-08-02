class Spawner{
    constructor(enemies){
        this.enemies = enemies;
        this.cooldown = 60;
        this.enemyList = []; //enemies are initialize on room transitions (getRoom.js)

        this.timer = {
            count: 60,
            decrement: function(){
                this.count--;
            }
        }
    }
    tick(){
        this.timer.decrement();
        if(this.timer.count <= 0){ //when timer runs out, spawn enemies
            this.spawnEnemies();
        } else{
            this.draw(); //draw the spawning indicaiton if the timer isn't at 0
        }
        if(enemies.length == 0 && this.enemyList.length == 0){ // if all enemies are dead, remove the spawner from the spawners array
            spawners.splice(spawners.indexOf(this), 1);
        }
    }
    draw(){ //draw hitmarker at each enemies location
        for(const enemy of this.enemyList){
            canvasBuffer.image(spriteCrosshair, enemy.x, enemy.y, 10, 10);
        }
    }
    spawnEnemies(){
        for(let i = this.enemyList.length-1; i >= 0; i--){
            enemies.push(this.enemyList[i]);
            this.enemyList.pop();
        }
    }

}

//create enemies from object input
function initEnemies(enemies){
    let enemy_list = [], spawn_pos;
    let options = findOpenTiles();
    Object.keys(enemies).forEach((enemy) => {
        for(let i = 0; i < enemies[`${enemy}`].num; i++){
            let pos = enemies[`${enemy}`].positions[Math.min(enemies[`${enemy}`].positions.length-1, i)]
            if(pos == undefined){
                let index = Math.floor(random(0, options.length)); // find a place to put the enemy
                let spawn_placement = options[index];//chose a random empty tile to spawn the enemy
                spawn_pos = indexToPosition(Math.floor(spawn_placement/10%10), spawn_placement%10); //find the position of that tile
                options.splice(index, 1);
            } else{
                let tile_index = pos;
                if(currentRoom.tiles[Math.floor(tile_index/10%10)][tile_index%10] != 0){
                    console.log("YOU POSITIONED AN ENEMY ON A WALL IN initGAME() (spawn_info)");
                } else{
                    spawn_pos = indexToPosition(Math.floor(tile_index/10%10), tile_index%10);
                    options.splice(options.indexOf(tile_index), 1);
                }
            }
            let new_enemy = Reflect.construct(stringToFunction(enemy), [spawn_pos.x, spawn_pos.y])
            enemy_list.push(new_enemy);
        }
    })
    return enemy_list;
}

//find tiles with no walls
function findOpenTiles(){
    let tiles = currentRoom.tiles, open_tiles = [], j = 0; 
    for(const [i, tile_row] of tiles.entries()){
        tile_row.forEach((spot) => {
            if(spot == 0)
                open_tiles.push(i *10 + j);
            j++;
        })
        j = 0;
    }
    return open_tiles;
}

function indexToPosition(row, col){ 
    let pos = createVector(col*currentRoom.tileWidth + currentRoom.borderOffset + 7.5, row*currentRoom.tileHeight + currentRoom.borderOffset + 5);
    return pos;
}

function stringToFunction(type){
    switch(type){
        case "Roomba":
            return Roomba;
        case "Turret":
            return Turret;
        default:
            console.log(`Add ${type} to stringToFunction()`);
    }
}
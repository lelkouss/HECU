class Spawner{
    constructor(num_enemies){
        this.num_enemies = num_enemies;
        this.cooldown = 60;
        this.enemyList = [];

        let initEnemies = () => { //find spawning position for enemies
            let options = findOpenTiles();
            while(this.num_enemies > 0){
                let index = Math.floor(random(0, options.length)); // find a place to put the enemy
                let spawn_placement = options[index];//chose a random empty tile to spawn the enemy
                let spawn_pos = indexToPosition(Math.floor(spawn_placement/10%10), spawn_placement%10); //find the position of that tile
                let new_enemy = new Enemy(spawn_pos.x, spawn_pos.y, 1);
                this.enemyList.push(new_enemy); 
                options.splice(index, 1); //prevent enemies from spawning on the same tile
                this.num_enemies--;
            }
        }
        initEnemies();
    }
    tick(){
        this.cooldown--;
        this.draw();
        if(this.cooldown <= 0){ //after 60 ticks
            this.spawnEnemies();
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

//find tiles with no walls
function findOpenTiles(){
    let tiles = currentRoom.tiles; 
    let options = [];
    for(let i = 0; i < tiles.length; i++){//find spot that isn't a wall for the enemies to spawn on
     for(let j = 0; j < tiles[i].length; j++){
        if(tiles[i][j] == 0){ //if tile is free
            options.push(i*10+j) //push it to the options
        }
     }   
    }
    return options;
}

function indexToPosition(row, col){ 
    let pos = createVector(col*currentRoom.tileWidth + currentRoom.borderOffset + 7.5, row*currentRoom.tileHeight + currentRoom.borderOffset + 5);

    return pos;
}
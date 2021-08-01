class Spawner{
    constructor(num_enemies){
        this.num_enemies = num_enemies;
        this.cooldown = 60;
        this.enemyList = [];

        this.timer = {
            count: 60,
            decrement: function(){
                this.count--;
            }
        }

        /*
        let initEnemies = (enemies) =>{
            enemies.forEach((enemy) => {
                for(let i = 0; i < enemy.num; i++){
                    for(const pos of enemy.positions){
                        if(pos.length == 1 && pos == undefined)
                    }
                }
            let enemy_info = [posx, posy]
            let new_enemy = Reflect.construct(enemyType, enemy_info);
            })
        }
        */

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
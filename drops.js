class Drop{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    checkCollision(){
        if(collideRectRect(player.x, player.y, player.width, player.height, this.x, this.y, 10, 10)){
            if(collectDrop(this)){
                currentRoom.drops.splice(currentRoom.drops.indexOf(this), 1);
            }
        }
    }
}

class Syringe extends Drop{
    constructor(x, y){
        super(x, y);
    }
    update(){
        this.display();
        super.checkCollision();
    }
    display(){
        canvasBuffer.image(spriteSyringeDrop, this.x-(17-10)/2, this.y-(17-10)/2, 17, 17);
    }
}

class Core extends Drop{
    constructor(x, y){
        super(x, y);
    }
    update(){
        this.waitForSpawn();
    }
    display(){
        canvasBuffer.image(spriteCoreDrop, currentRoom.width/2 - 7.5, currentRoom.height/2 - 8, 15, 16);
    }
    waitForSpawn(){
        if(currentRoom.spawners <= 1){
            this.display();
            super.checkCollision();
        }
    }
}

class Ship extends Drop{
    constructor(x, y){
        super(x, y);
    }
    update(){
        this.display();
        if(activate_pod)
            super.checkCollision();
    }   
    display(){
        canvasBuffer.image(spriteEscapePod, this.x-(12-10)/2, this.y-(13-10)/2, 27, 18);
    }
}

function collectDrop(drop_type){ //Needs to be scaled for more drops
    if(drop_type instanceof Syringe && player.health < 10){ //collect drop and then delete it
        soundSyringePickup.play();
        player.health += Math.min(10 - player.health, 3);
        window.updatePlayerHearts();
        return true;
    } else if(drop_type instanceof Core){
        if(player.cores < 4){
            soundCorePickup.play();
            player.health = 10;
            player.cores++;
            window.updatePlayerHearts();
            window.updatePlayerCores();
            return true;
        }
    } else if(drop_type instanceof Ship){ //beat game after picking up the ship
        beatGame();
    }
    return false;
}


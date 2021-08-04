class Drop{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    checkCollision(){
        if(collideRectRect(player.x, player.y, player.width, player.height, this.x, this.y, 12, 12)){
            collectDrop(this);
            drops.splice(drops.indexOf(this), 1);
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
        canvasBuffer.image(spriteSyringeDrop, this.x, this.y, 12, 12);
    }
}

class Core extends Drop{
    constructor(x, y){
        super(x, y);
    }
    update(){
        this.display();
        super.checkCollision();
    }
    display(){
        canvasBuffer.image(spriteCoreDrop, this.x, this.y, 12, 13);
    }
}

function collectDrop(drop_type){ //Needs to be scaled for more drops
    if(drop_type instanceof Syringe){
        if(player.health < 10){
            player.health++;
            window.updatePlayerHearts();
        }
    } else{
        if(player.cores < 4){
            player.cores++;
            window.updatePlayerCores();
        }
    }
}
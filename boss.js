const ms_per_wave = 10000;

class Boss{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 20;

        this.spriteFrame = 0;
        
        this.spawner_wave = [];
        this.spawn_timer = 100;
        this.timer = {};

        this.isBeaming = false;
        this.beamFrame = 0;
        this.beamRound = 0;
        this.max_minions = 2;
        this.attack_types = ["createMissiles", "beam", "spray"],
        this.missiles = [];

        this.show_health_bar = false;
        
        this.frame = 0;
        this.attackType = 0;

        this.health = 100;
    }

    update(){
        if(this.frame++ > 300) {
            this.attackType++;
            this.createMinions();
            this.attack(this.attack_types[this.attackType % 3]);
            this.frame = 0;
        }
        
        if(this.isBeaming && this.beamFrame++ > 10) {
            this.beam();
            this.beamFrame = 0;
            if(this.beamRound++ > 7) {
                this.isBeaming = false;
                this.beamRound = 0;
            }
        }

        this.display();
        this.updateMissiles();
    }

    display(){
        canvasBuffer.fill(32, 250, 163);
        if(this.show_health_bar)
            canvasBuffer.rect(this.x - 50 + this.width/2, this.y - 15, this.health, 3);

        this.spriteFrame = (this.spriteFrame + 1) % 60
        let data = SPRITE_BOSS[floor(this.spriteFrame/15)];
        canvasBuffer.image(data[0], this.x-(data[1]-this.width)/2, this.y-(data[2]-this.height)/2, data[1], data[2]);
    }

    createMinions(){ //create boss wave
       let num_roombas = Math.floor(random(0, this.max_minions));
        let num_turrets = Math.floor(random(0, this.max_minions));
        let num_mantis = Math.floor(random(0, this.max_minions));

        this.spawner_wave = {
            wave_1:{
                Roomba: { num: num_roombas, positions: [] },
                Turret: { num: num_turrets, positions: [] },
                Mantis: { num: num_mantis, positions: [] },
                Drops: {hp_drop: Math.floor(random(5, 10)), core_drop: 0}
            },
        }
        this.spawner_wave = initSpawners(this.spawner_wave);
        for(let room_spawner of this.spawner_wave) //initialize the rooms enemies
            room_spawner.enemyList = initEnemies(room_spawner.enemies);
        spawners = this.spawner_wave;
    }

    attack(attack_type){
        switch(attack_type){
            case "createMissiles":
                for(let i = 0; i < 15; i++){
                    this.createMissiles();
                }
                break;
            case "beam":
                this.isBeaming = true;
                this.beam();
                break;
            case "spray":
                this.spray();
                break;
            default:
        }
    }

    createMissiles(){
        let new_missile = new Bullet(this.x+random(-3*this.width, 3*this.width), this.y+random(-3*this.height, 3*this.height), createVector(0, 0), 1);
        new_missile.tracking = true;
        bullets.push(new_missile);
        this.missiles.push(new_missile);
    }

    updateMissiles(){ //Need to delete the missile after collision, somehow link it to the global bullets array

        this.missiles.forEach((missile) => {
            if(missile.tracking){
                if(bullets.indexOf(missile) == -1){ //check if the missile has been deleted
                    this.missiles.splice(this.missiles.indexOf(missile), 1);
                }
                let to_player = createVector( (player.x+player.width/2) - (missile.x), (player.y+player.height/2) - (missile.y) ); //track the player
                to_player.mult(random(0.01, 0.02));
                if(dist(missile.x, missile.y, player.x, player.y) < 20 || missile.tracking){
                    missile.velX = to_player.x;
                    missile.velY = to_player.y;  
                    missile.tracking = false;
                }
            }
        });

    }

    beam(){ //shoot 3 bullets in a row
        //THIS MATH MAY BE WRONG
        let playerVector = createVector( (player.x+player.width/2) - (this.x+this.width/2), (player.y+player.height/2) - (this.y+this.height/2)); //track the player
        playerVector.normalize();
        
        let perpendicularVector = createVector(playerVector.y, -playerVector.x); //perpendicular to create row bullets
        perpendicularVector.mult(8);

        playerVector.mult(2);
        
        let bulletMiddle = new Bullet(this.x+this.width/2, this.y+this.height/2, playerVector, 1);
        let bulletSide1 = new Bullet(this.x+this.width/2+perpendicularVector.x, this.y+this.height/2+perpendicularVector.y, playerVector, 1);
        let bulletSide2 = new Bullet(this.x+this.width/2-perpendicularVector.x, this.y+this.height/2-perpendicularVector.y, playerVector, 1);
        
        bullets.push(bulletSide1);
        bullets.push(bulletSide2);
        bullets.push(bulletMiddle);
    }

    spray(){ //shoot 12 bullets in a circle
        for(let i=0; i<2*PI; i+=PI/6) {
            let vector = createVector(cos(i), sin(i));
            vector.normalize();
            let bullet = new Bullet(this.x+this.width/2, this.y+this.height/2, vector.mult(2), 1);
            bullets.push(bullet);
        }
    }

    shot(){
    
        this.show_health_bar = true;
        this.health -= 5;
        if(this.health <= 0) { //create drops and kill on death
            this.triggerDeath();
        }
    }

    triggerDeath(){ //call this when the boss dies
        console.log("I died");
        enemies = [];
        let new_ship = new Ship(this.x + 12.5 - 13.5, this.y + 12.5 - 9);
        currentRoom.drops.push(new_ship);
        boss = null;
    }
}

function startBossFight(){ //add the boss to the room and begin the physics fight, called at getRoom
    boss = new Boss(currentRoom.width/2-12.5, currentRoom.height/2-10); //-width/2, -height/2 of boss
}

function startBoss(){ //show the boss on the map, getMap
    show_boss_room = true;
}

class Waller{
    constructor(){
        
    }
}
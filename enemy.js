//move/health is dependent on inheritance - To be implemented

class Enemy {
  constructor(x, y) {
    this.x = x-5;
    this.y = y-5;
    this.width = 10;
    this.height = 10;
    this.health = 10; //needs to be dependent on type - inheritance
    this.max_health = 10;
    this.shootCoolDown = 120;
    this.show_health_bar = false;
    this.drops = {
      hp_drop: false,
      core_drop: false,
    }
    this.shootCoolDown = 0;
  }
    
  display(sprite) {
    let data = SPRITE_ENEMIES[sprite];
    canvasBuffer.image(data[0], this.x-(data[1]-this.width)/2, this.y-(data[2]-this.height)/2, data[1], data[2]);
    if(this.show_health_bar){
      canvasBuffer.fill(32, 250, 163);
      canvasBuffer.noStroke();
      canvasBuffer.rect(this.x  - this.max_health/2 + this.width/2, this.y-10, this.health, 3);
      canvasBuffer.stroke(0);
      canvasBuffer.noFill();
      canvasBuffer.rect(this.x  - this.max_health/2 + this.width/2, this.y-10, this.max_health, 3);
    }
  }

  shoot() {
    let playerVector = createVector( (player.x+player.width/2) - (this.x+this.width/2), (player.y+player.height/2) - (this.y+this.height/2));
    playerVector.normalize();

    let new_bullet = new Bullet(this.x+this.width/2, this.y+this.height/2, playerVector.mult(2), 1);
    bullets.push(new_bullet);
  }

  shot() {
    soundRoombaCollide.play();
    this.show_health_bar = true;
    this.health -= 5;
    if(this.health <= 0) { //create drops and kill on death
        
      for(const drop in this.drops){ 
        if(this.drops[`${drop}`]){
          let new_drop = Reflect.construct(stringToFunction(drop), [this.x, this.y]);
          currentRoom.drops.push(new_drop);
        }
        
      }
        enemies.splice(enemies.indexOf(this), 1);
    }
  }
}

class Roomba extends Enemy{
  constructor(x, y) {
      super(x, y);
      this.health = 15;
      this.max_health = 15;
      this.speedX = 1;
      this.speedY = 0;
      this.sprite = 'roomba';
      this.stuck = false;
    }

  update() {
    this.move();
    super.display(this.sprite);
    if(this.shootCoolDown++ > 120) {
      super.shoot();
      this.shootCoolDown = 0;
    }

}

    move() {
      let collided = false;
      let oldX = this.x;
      let oldY = this.y;
      
      this.x += this.speedX;
      
      // check if collided with a wall on the x axis
      for(let i=0; i<currentRoom.tiles.length; i++) {
        for(let j=0; j<currentRoom.tiles[i].length; j++) {
          if(currentRoom.tiles[i][j] == 1 && collideRectRect(this.x-(currentRoom.tileWidth-this.width)/2+1, this.y-(currentRoom.tileHeight-this.height)/2+1, currentRoom.tileWidth-2, currentRoom.tileHeight-2, j*currentRoom.tileWidth+currentRoom.borderOffset, i*currentRoom.tileHeight+currentRoom.borderOffset, currentRoom.tileWidth, currentRoom.tileHeight)) {
            this.x = oldX;
            collided = true;
            break;
          } 
        }
      }

      // check if collided with a border on the x axis
      if(this.x < currentRoom.borderOffset+(currentRoom.tileWidth-this.width)/2 || this.x > currentRoom.width-currentRoom.borderOffset-currentRoom.tileWidth+(currentRoom.tileWidth-this.width)/2) {
        this.x = oldX;
        collided = true;
      }


      this.y += this.speedY;

      // check if collided with a wall on the y axis
      for(let i=0; i<currentRoom.tiles.length; i++) {
        for(let j=0; j<currentRoom.tiles[i].length; j++) {
          if(currentRoom.tiles[i][j] == 1 && collideRectRect(this.x-(currentRoom.tileWidth-this.width)/2+1, this.y-(currentRoom.tileHeight-this.height)/2+1, currentRoom.tileWidth-2, currentRoom.tileHeight-2, j*currentRoom.tileWidth+currentRoom.borderOffset, i*currentRoom.tileHeight+currentRoom.borderOffset, currentRoom.tileWidth, currentRoom.tileHeight)) {
            this.y = oldY;
            collided = true;
            break;
          }
        }
      }

      //check if collided with a border on the y axis
      if(this.y < currentRoom.borderOffset+(currentRoom.tileHeight-this.height)/2 || this.y > currentRoom.height-currentRoom.borderOffset-currentRoom.tileHeight+(currentRoom.tileHeight-this.height)/2) {
        this.y = oldY;
        collided = true;
      }

      if(collided) {
        this.stuck = true;
        this.speedX = 0;
        this.speedY = 0;
        floor(random(2)) > 0? (this.speedX = floor(random(2)) > 0? 1 : -1): this.speedY = floor(random(2)) > 0? 1 : -1;
      } else if(this.stuck) {
        soundRoombaCollide.play();
        this.stuck = false;
      } else {
        this.stuck = false;
      }
      
    }

}
class Turret extends Enemy{
  constructor(x, y) {
    super(x, y);
    this.health = 25;
    this.max_health = 25;
    this.sprite = 'turret_closed';
    this.aimFrames = 0;
  }

  update() { //
    super.display(this.sprite);
    if(this.inLineOfSight()) {
      this.aimFrames++;
    } else {
      this.aimFrames = 0;
    }

    if(this.aimFrames > 15) {
      if(this.shootCoolDown++ > 40) {
        soundTurretShoot.play();
        super.shoot();
        this.shootCoolDown = 0;
      }
    }
  }

  //returns whether or not the player is in the line of sight
  inLineOfSight() {
    
    for(let i=0; i<currentRoom.tiles.length; i++) {
      for(let j=0; j<currentRoom.tiles[i].length; j++) {
        if(currentRoom.tiles[i][j] == 1 && collideLineRect(this.x+this.width/2, this.y+this.height/2, player.x+player.width/2, player.y+player.height/2, j*currentRoom.tileWidth+currentRoom.borderOffset, i*currentRoom.tileHeight+currentRoom.borderOffset, currentRoom.tileWidth, currentRoom.tileHeight)) {
          this.sprite = "turret_closed";
          return false;
        }
      }
    }

    this.sprite = "turret_static";
    return true;
  }
}


class Mantis extends Enemy{
  constructor(x, y) {
    super(x, y);
    this.max_health = 25;
    this.health = 25;
    this.sprite = 'mantis1';
    this.currentTileRow = floor((this.y-currentRoom.borderOffset) / currentRoom.tileHeight);
    this.currentTileCol = floor((this.x-currentRoom.borderOffset) / currentRoom.tileWidth);
    this.path = [];
    this.arrived = true;
    this.mantisTime = random(30, 90);
    this.spriteFrame = 0;
    this.spriteIndex = 1;
  }

  update() {
    this.spriteFrame = (this.spriteFrame+1) % 30;
    this.spriteIndex = (floor(this.spriteFrame/10) + 1);
    if (player.x > this.x) {this.spriteIndex = this.spriteIndex + 3;}
    this.sprite = "mantis" +this.spriteIndex;

    super.display(this.sprite);
    if(this.arrived) {
      this.updatePath();
      this.destination = this.path[1];
      this.arrived = false;
    }
    this.move();

    if(this.shootCoolDown++ > this.mantisTime) {
      soundMantisShoot.play();
      super.shoot();
      this.shootCoolDown = 0;
    }

  }

  updatePath() {
    let playerTileRow = floor((player.y-currentRoom.borderOffset) / currentRoom.tileHeight);
    let playerTileCol = floor((player.x-currentRoom.borderOffset) / currentRoom.tileWidth);
    this.currentTileRow = floor((this.y-currentRoom.borderOffset) / currentRoom.tileHeight);
    this.currentTileCol = floor((this.x-currentRoom.borderOffset) / currentRoom.tileWidth);

    let path = [this.currentTileRow * 7 + this.currentTileCol];
    let toVisit = [[this.currentTileRow*7+this.currentTileCol, path]];
    let visited = [];

    while(toVisit.length != 0) {
      let data = toVisit.shift();
      let tile = data[0], path = data[1];
      visited.push(tile);
      let neighbors = [];

      let diffs = [-7, 7, 1, -1];
      if(tile%7 == 0) {
        diffs = [-7, 7, 1];
      } else if(tile%7 == 6) {
        diffs = [-7, 7, -1];
      }
      for(const diff of diffs) {
        neighbors.push(tile + diff);
      }


      for(const neighbor of neighbors) {
        if(visited.indexOf(neighbor) == -1 && neighbor >= 0 && neighbor < 49 && currentRoom.tiles[floor(neighbor/7)][neighbor%7] != 1) {
          if(floor(neighbor/7) == playerTileRow && neighbor%7 == playerTileCol) {
            path.push(neighbor);
            this.path = path;
            return;
          }
          let newPath = [];
          for(let i=0; i<path.length; i++)
            newPath.push(path[i]);
          newPath.push(neighbor);
          toVisit.push([neighbor, newPath]);
        }
      }
    }
    return [];
  }

  move() {
    if(this.x == this.destination%7 * currentRoom.tileWidth + currentRoom.tileWidth/2 + currentRoom.borderOffset - 5 && this.y == floor(this.destination/7) * currentRoom.tileHeight + currentRoom.tileHeight/2 + currentRoom.borderOffset - 5) {
      this.arrived = true;
      return;
    }
    let dx = 0;
    let dy = 0;
    if(this.x > this.destination%7 * currentRoom.tileWidth + currentRoom.tileWidth/2 + currentRoom.borderOffset - 5) {
      dx--;
    } else if(this.x < this.destination%7 * currentRoom.tileWidth + currentRoom.tileWidth/2 + currentRoom.borderOffset - 5) {
      dx++;
    }

    if(this.y > floor(this.destination/7) * currentRoom.tileHeight + currentRoom.tileHeight/2 + currentRoom.borderOffset - 5) {
      dy--;
    } else if(this.y < floor(this.destination/7) * currentRoom.tileHeight + currentRoom.tileHeight/2 + currentRoom.borderOffset - 5) {
      dy++;
    }

    this.x += dx; this.y += dy;
  }
  
}

class Drone extends Enemy{
  constructor(x, y) {
    super(x, y);
    this.max_health = 50;
    this.health = 50;
    this.sprite = 'drone';
    this.destinationX = this.x;
    this.destinationY = this.y;
    this.arrived = true;
    this.waitFrames = 0;
    this.warmedUp = false;
    this.warmFrames = 0;
  }


  update() {

    canvasBuffer.image(spriteCrosshair, this.destinationX+5-25/2, this.destinationY+5-20/2, 25, 20);
    super.display(this.sprite);
    if(this.arrived == true) {
      this.updatePath();
      if(this.waitFrames == 0 && this.warmedUp) {
        soundDroneShoot.play();
        this.shoot_drone();  
      }

      if(this.waitFrames++ > 20) {
          this.arrived = false;
          this.waitFrames = 0;
      }
    }
    else {
      if(this.warmedUp)
        this.move();
    }

    if(this.warmFrames++ > 60) {
      this.warmedUp = true;
    }
  }

  updatePath() {
    let vector = createVector(player.x-this.destinationX, player.y-this.destinationY);
    vector.div(10);   
    this.destinationX += vector.x;
    this.destinationY += vector.y;
  }

  move() {
    if( abs(this.x-this.destinationX) < 5 && abs(this.y-this.destinationY) < 5) {
      this.arrived = true;
      return;
    }

    let to_player = createVector(this.destinationX - this.x, this.destinationY-this.y).mult(0.055);
    this.x += to_player.x;
    this.y += to_player.y;
  }

  shoot_drone() {
    let playerVector = createVector( (player.x+player.width/2) - (this.x+this.width/2), (player.y+player.height/2) - (this.y+this.height/2));
    playerVector.normalize();
    
    let sideVector = createVector(-playerVector.y, playerVector.x);
    sideVector.normalize();

    playerVector.mult(3);
    sideVector.mult(3**.5);

    let vectorMiddle = createVector(playerVector.x, playerVector.y);
    vectorMiddle.normalize();
    let vectorSide1 = createVector(playerVector.x + sideVector.x, playerVector.y + sideVector.y);
    vectorSide1.normalize();
    let vectorSide2 = createVector(playerVector.x - sideVector.x, playerVector.y - sideVector.y);
    vectorSide2.normalize();
    

    let middleBullet = new Bullet(this.x+this.width/2, this.y+this.height/2, vectorMiddle.mult(2), 1);
    let side1Bullet = new Bullet(this.x+this.width/2, this.y+this.height/2, vectorSide1.mult(2), 1);
    let side2Bullet = new Bullet(this.x+this.width/2, this.y+this.height/2, vectorSide2.mult(2), 1);
    
    bullets.push(side1Bullet);
    bullets.push(side2Bullet);
    bullets.push(middleBullet);
  }

}

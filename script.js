let currentRoom;
let player, rooms, spawners, enemies, bullets, doors;

//SPRITES
let spriteCrosshair
let spriteFloor, spriteWall;
let spriteBorderBottom, spriteBorderTop, spriteBorderRight, spriteBorderLeft;
let SPRITE_TILES, SPRITE_BORDERS;

// PRELOAD ALL SPRITES AND MUSIC
function preload() {
  //explode_sprite_sheet = loadSpriteSheet('assets/player', 171, 158, 11);

  spriteCrosshair = loadImage("/assets/crosshair.png");
  spriteFloor = loadImage("/assets/tile.png");
  spriteWall = loadImage("/assets/wall.png");
  spriteBorderBottom = loadImage("/assets/borderbottom.png");
  spriteBorderTop = loadImage("/assets/bordertop.png");
  spriteBorderRight = loadImage("/assets/borderright.png");
  spriteBorderLeft = loadImage("/assets/borderleft.png");
  SPRITE_TILES = {0: spriteFloor, 1: spriteWall};
  SPRITE_BORDERS = {"A_1": spriteBorderTop, "B_1": spriteBorderRight, "C_1": spriteBorderBottom, "D_1": spriteBorderLeft};
}


function setup() {
  displayScale = 3;
  width = 219 * displayScale;
  height = 184 * displayScale;
  let canvasDIV =   createCanvas(width, height);
  canvasDIV.parent("canvasDiv"); // connect to html div
  canvasBuffer = createGraphics(width,height);
  canvasBuffer.noSmooth();
  colorMode(HSB, 360, 100, 100);

  // set up the arrays for the current state of the game

  rooms = Array.from(Array(4), () => new Array(7)) //4 by 7 array
  initGame();

  currentRoom = rooms[0][0];
  enemies = [];
  spawners = []; //currentRoom.spawners; 

  //example of spawners
  //not intended to stay
  for(let i = 0; i < 4; i++){
    let new_spawner = new Spawner(i*2);
    spawners.push(new_spawner); //spawners[0]; 
  }
   // currentSpawner.enemies; 
  player = new Player(25*3, 20*6, currentRoom);
  bullets = [];
  doors = createDoors(currentRoom.borders);
}

function draw() {
  background(0);
  currentRoom.display();
  player.update();
  if(spawners.length > 0){
    spawners[0].tick();
  }
  //update enemies
  //update bullets
  for(const bullet of bullets){
    bullet.update();
  }
  for(const enemy of enemies) {
    enemy.update();
  }
  for(const door of doors) {
    door.checkAvailability();
  }
  
  scale(displayScale);
  image(canvasBuffer,0,0);
}
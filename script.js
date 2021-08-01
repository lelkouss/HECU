let currentRoom;
let player, rooms, spawners, enemies, bullets;

//SPRITES
let spriteCrosshair
let spriteTile, spriteWall;
let spriteBorderUpNone, spriteBorderUpBlocked, spriteBorderUpOpen;
let spriteBorderRightNone, spriteBorderRightBlocked, spriteBorderRightOpen;
let spriteBorderDownNone, spriteBorderDownBlocked, spriteBorderDownOpen;
let spriteBorderLeftNone, spriteBorderLeftBlocked, spriteBorderLeftOpen;

let SPRITE_TILES, SPRITE_BORDERS;

// PRELOAD ALL SPRITES AND MUSIC
function preload() {
  //explode_sprite_sheet = loadSpriteSheet('assets/player', 171, 158, 11);

  spriteCrosshair = loadImage("/assets/crosshair.png");
  spriteFloor = loadImage("/assets/tiile.png");
  spriteWall = loadImage("/assets/wall.png");
  
  spriteBorderUpNone = loadImage("/assets/border_top_none.png");
  spriteBorderUpBlocked = loadImage("/assets/border_top_closed.png");
  spriteBorderUpOpen = loadImage("/assets/border_top_open.png");

  spriteBorderRightNone = loadImage("/assets/border_right_none.png");
  spriteBorderRightBlocked = loadImage("/assets/border_right_closed.png");
  spriteBorderRightOpen = loadImage("/assets/border_right_open.png");

  spriteBorderDownNone = loadImage("/assets/border_bottom_none.png");
  spriteBorderDownBlocked = loadImage("/assets/border_bottom_closed.png");
  spriteBorderDownOpen = loadImage("/assets/border_bottom_open.png");

  spriteBorderLeftNone = loadImage("/assets/border_left_none.png");
  spriteBorderLeftBlocked = loadImage("/assets/border_left_closed.png");
  spriteBorderLeftOpen = loadImage("/assets/border_left_open.png");


  SPRITE_TILES = {0: spriteFloor, 1: spriteWall};
  SPRITE_BORDERS = {  "up_NONE": spriteBorderUpNone, "up_BLOCKED": spriteBorderUpBlocked, "up_OPEN": spriteBorderUpOpen,
                      "right_NONE": spriteBorderRightNone, "right_BLOCKED": spriteBorderRightBlocked, "right_OPEN": spriteBorderRightOpen, 
                      "down_NONE": spriteBorderDownNone, "down_BLOCKED": spriteBorderDownBlocked, "down_OPEN": spriteBorderDownOpen,
                      "left_NONE": spriteBorderLeftNone, "left_BLOCKED": spriteBorderLeftBlocked, "left_OPEN": spriteBorderLeftOpen, }
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
  
  scale(displayScale);
  image(canvasBuffer,0,0);
}
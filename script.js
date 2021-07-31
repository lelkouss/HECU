let currentRoom;
let player, rooms, spawners, enemies, bullets;

//SPRITES
let spriteFloor, spriteWall;
let spriteBorderBottom, spriteBorderTop, spriteBorderRight, spriteBorderLeft;
let SPRITE_TILES, SPRITE_BORDERS;

// PRELOAD ALL SPRITES AND MUSIC
function preload() {
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
  createCanvas(width, height);
  canvasBuffer = createGraphics(width,height);
  canvasBuffer.noSmooth();
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);

  // set up the arrays for the current state of the game

  rooms = Array.from(Array(4), () => new Array(7)) //4 by 7 array
  initGame();

  currentRoom = rooms[0][0];
  spawners = []; //currentRoom.spawners; 
  //currentSpawner = spawners[0]; 
  //enemies = currentSpawner.enemies; 
  player = new Player(25*3, 20*6, currentRoom);
  bullets = [];
}

function draw() {
  background(0);
  currentRoom.display();
  player.update();
  //update enemies
  //update bullets
  for(const bullet of bullets){
    bullet.update();
  }
  
  scale(displayScale);
  image(canvasBuffer,0,0);
}
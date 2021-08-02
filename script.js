let currentRoom;
let player, rooms, spawners, enemies, bullets;

//SPRITES
let spriteCrosshair
let spriteTile, spriteWall;

let spriteBorderUpNone, spriteBorderUpBlocked, spriteBorderUpOpen;  //BORDER SPRITES
let spriteBorderRightNone, spriteBorderRightBlocked, spriteBorderRightOpen;
let spriteBorderDownNone, spriteBorderDownBlocked, spriteBorderDownOpen;
let spriteBorderLeftNone, spriteBorderLeftBlocked, spriteBorderLeftOpen;

let spritePlayerUp, spritePlayerRight, spritePlayerDown, spritePlayerLeft;  //PLAYER ANIMATIONS
let spriteTurretStatic, spriteTurretClosed //TURRET SPRITES
let spriteBulletPlayer, spriteBulletEnemy; //BULLET ANIMATIONS

let SPRITE_TILES, SPRITE_BORDERS, SPRITE_PLAYER, SPRITE_ENEMIES, SPRITE_BULLETS; //SPRITE MAPS

// PRELOAD ALL SPRITES AND MUSIC
function preload() {

  spriteCrosshair = loadImage("/assets/crosshair.png");
  spriteFloor = loadImage("/assets/tiile.png");
  spriteWall = loadImage("/assets/wall.png");
  
  spriteBorderUpNone = loadImage("/assets/border_top_none.png");    //BORDER IMAGES
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

  spritePlayerUp = loadImage("/assets/player_up_anim.png");     //PLAYER ANIMATIONS
  spritePlayerRight = loadImage("/assets/player_right_anim.png");
  spritePlayerDown = loadImage("/assets/player_down_anim.png");
  spritePlayerLeft = loadImage("/assets/player_left_anim.png");

  spriteTurretStatic = loadImage("/assets/turret_static.png"); //TURRET SPRITES
  spriteTurretClosed = loadImage("/assets/turret_closed.png");

  spriteBulletPlayer = loadImage("/assets/bullet_player_anim.png");//BULLET ANIMATIONS
  spriteBulletEnemy = loadImage("/assets/bullet_enemy_anim.png");


  SPRITE_TILES = {    0: spriteFloor, 1: spriteWall};
  SPRITE_BORDERS = {  "up_NONE": spriteBorderUpNone, "up_BLOCKED": spriteBorderUpBlocked, "up_OPEN": spriteBorderUpOpen,
                      "right_NONE": spriteBorderRightNone, "right_BLOCKED": spriteBorderRightBlocked, "right_OPEN": spriteBorderRightOpen, 
                      "down_NONE": spriteBorderDownNone, "down_BLOCKED": spriteBorderDownBlocked, "down_OPEN": spriteBorderDownOpen,
                      "left_NONE": spriteBorderLeftNone, "left_BLOCKED": spriteBorderLeftBlocked, "left_OPEN": spriteBorderLeftOpen };
  SPRITE_PLAYER = {   "up": [spritePlayerUp, 13, 22], "right": [spritePlayerRight, 18, 22], "down": [spritePlayerDown, 13, 22], "left": [spritePlayerLeft, 18, 22]};
  SPRITE_ENEMIES = {  "turret_static": spriteTurretStatic};
  SPRITE_BULLETS = {   0: [spriteBulletPlayer, 8, 8], 1: [spriteBulletEnemy, 8, 8] };
}

function setup() {
  displayScale = 3;
  width = 219 * displayScale;
  height = 184 * displayScale;
  let canvasDIV =  createCanvas(width, height);
  canvasDIV.parent("canvas_div"); // connect to html div
  canvasBuffer = createGraphics(width,height);
  canvasBuffer.noSmooth();
  frameRate(60);
  colorMode(HSB, 360, 100, 100);

  // set up the arrays for the current state of the game

  rooms = Array.from(Array(4), () => new Array(7)) //4 by 7 array
  initGame();

  currentRoom = rooms[0][0];
  enemies = [];
  spawners = []; //currentRoom.spawners; 

   // currentSpawner.enemies; 
  player = new Player(25*3, 20*6, currentRoom);
  bullets = [];

  window.updatePlayerHearts();
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
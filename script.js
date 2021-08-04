let currentRoom;
let player, rooms, spawners, enemies, bullets;
let display_map = false, game_over = false, run_game = false;
let boss = null;

const volume_ = 0.03;

//SPRITES
let spriteCrosshair;
let spriteTile0, spriteTile1, spriteTile2, spriteTile3, spriteTile4, spriteTile5;

let spriteBorderUpNone, spriteBorderUpBlocked, spriteBorderUpOpen;  //BORDER SPRITES
let spriteBorderRightNone, spriteBorderRightBlocked, spriteBorderRightOpen;
let spriteBorderDownNone, spriteBorderDownBlocked, spriteBorderDownOpen;
let spriteBorderLeftNone, spriteBorderLeftBlocked, spriteBorderLeftOpen;

let spritePlayerUp, spritePlayerRight, spritePlayerDown, spritePlayerLeft, spritePlayerIcon;  //PLAYER ANIMATIONS
let spriteTurretStatic, spriteTurretClosed, spriteRoomba, spriteMantis; //ENEMY SPRITES
let spriteBulletPlayer, spriteBulletEnemy; //BULLET ANIMATIONS

let SPRITE_TILES, SPRITE_BORDERS, SPRITE_PLAYER, SPRITE_ENEMIES, SPRITE_BULLETS; //SPRITE MAPS

//SOUNDS
let soundPlayerShoot, soundPlayerFootstep, soundRoombaCollide, soundTurretShoot;
let soundDoorOpen, soundDoorClose;
let soundBANGER;


// PRELOAD ALL SPRITES AND MUSIC
function preload() {

  spriteCrosshair = loadImage("/assets/crosshair.png");
  spriteTile0 = loadImage("assets/tiles0.png");
  spriteTile1 = loadImage("assets/tiles1.png");
  spriteTile2 = loadImage("assets/tiles2.png");
  spriteTile3 = loadImage("assets/tiles3.png");
  spriteTile4 = loadImage("assets/tiles4.png");
  spriteTile5 = loadImage("assets/tiles5.png");
  
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

  spritePlayerIcon = loadImage("/assets/favicon.png");

  spriteTurretStatic = loadImage("/assets/turret_static.png"); //ENEMY SPRITES
  spriteTurretClosed = loadImage("/assets/turret_closed.png");
  spriteRoomba = loadImage("/assets/roomba.png");
  spriteMantis = loadImage("/assets/mantis.png");

  spriteBulletPlayer = loadImage("/assets/bullet_player_anim.png");//BULLET ANIMATIONS
  spriteBulletEnemy = loadImage("/assets/bullet_enemy_anim.png");

  spriteSyringeDrop = loadImage("/assets/syringe.png"); //DROPS
  spriteCoreDrop = loadImage("/assets/power_core.png");

  SPRITE_BORDERS = {  "up_NONE": spriteBorderUpNone, "up_BLOCKED": spriteBorderUpBlocked, "up_OPEN": spriteBorderUpOpen,
                      "right_NONE": spriteBorderRightNone, "right_BLOCKED": spriteBorderRightBlocked, "right_OPEN": spriteBorderRightOpen, 
                      "down_NONE": spriteBorderDownNone, "down_BLOCKED": spriteBorderDownBlocked, "down_OPEN": spriteBorderDownOpen,
                      "left_NONE": spriteBorderLeftNone, "left_BLOCKED": spriteBorderLeftBlocked, "left_OPEN": spriteBorderLeftOpen };
  SPRITE_PLAYER = {   "up": [spritePlayerUp, 13, 22], "right": [spritePlayerRight, 18, 22], "down": [spritePlayerDown, 13, 22], "left": [spritePlayerLeft, 18, 22]};
  SPRITE_ENEMIES = {  "turret_static": [spriteTurretStatic, 11, 13], "turret_closed": [spriteTurretClosed, 11, 13], "roomba": [spriteRoomba, 13, 14], 'mantis':[spriteMantis, 23, 24]};
  SPRITE_TILES = {0: spriteTile0, 1: spriteTile1, 2: spriteTile2, 3: spriteTile3, 4: spriteTile4, 5: spriteTile5};
  SPRITE_BULLETS = {   0: [spriteBulletPlayer, 8, 8], 1: [spriteBulletEnemy, 8, 8] };


  // SOUNDS
  soundFormats('mp3');
  soundBANGER = loadSound("/assets/HECU_stage.mp3");
  soundBANGER.setVolume(volume_);
  soundPlayerShoot = loadSound("/assets/player_shoot.mp3");
  soundPlayerShoot.setVolume(volume_);
  soundPlayerFootstep = loadSound("/assets/footstep.mp3");
  soundPlayerFootstep.setVolume(3*volume_);
  soundRoombaCollide = loadSound("/assets/enemy_hit.mp3");
  soundRoombaCollide.setVolume(volume_);
  soundTurretShoot = loadSound("/assets/turret.mp3");
  soundTurretShoot.setVolume(volume_);
  soundDoorOpen = loadSound("/assets/door_open.mp3");
  soundDoorOpen.setVolume(volume_);
  soundDoorClose = loadSound("/assets/door_close.mp3");
  soundDoorClose.setVolume(volume_);
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

  //ABSOLUTE BANGER
  soundBANGER.setVolume(volume_);
  soundBANGER.loop();

  // set up the arrays for the current state of the game
  rooms = Array.from(Array(4), () => new Array(7)) //4 by 7 array
  initGame();

  currentRoom = rooms[0][2];
  currentRoom.visited = true;
  enemies = [];
  spawners = []; //currentRoom.spawners; 

  //startBossFight();

   // currentSpawner.enemies; 
  player = new Player(3*currentRoom.tileWidth + currentRoom.tileWidth/2, 6*currentRoom.tileHeight + currentRoom.tileHeight/2, currentRoom);
  bullets = [];

  //draw players initial hearts and cores
  window.updatePlayerHearts();
  window.updatePlayerCores();

  //ABSOLUTE BANGER
  soundBANGER.loop();
  
  //noLoop();
}

function draw() {
  if(!run_game)
    return;

  background(0);
  currentRoom.display();

  for(const drop of currentRoom.drops) 
    drop.update();

  player.update();
  if(spawners.length > 0){
    spawners[0].tick();
  }

  if(boss != null)
    boss.update();

  for(const bullet of bullets){
    bullet.update();
  }

  for(const enemy of enemies) {
    enemy.update();
  }

  
  scale(displayScale);
  image(canvasBuffer,0,0);

  if(display_map)
    drawMap(); 
}
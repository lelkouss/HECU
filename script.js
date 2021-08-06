let currentRoom;
let player, rooms, spawners, enemies, bullets;
let display_map = false, game_over = false, run_game = false, play_music = false, activate_pod = false;
let boss = null;
let visited_rooms = [], walkers = [];
let found_cores = 0;

const volume_ = 0.03;

//SPRITES
let spriteCrosshair;
let spriteTile0, spriteTile1, spriteTile2, spriteTile3, spriteTile4, spriteTile5;
let spriteAltTile0, spriteAltTile1, spriteAltTile2, spriteAltTile3, spriteAltTile4, spriteAltTile5;

let spriteBorderUpNone, spriteBorderUpBlocked, spriteBorderUpOpen;  //BORDER SPRITES
let spriteBorderRightNone, spriteBorderRightBlocked, spriteBorderRightOpen;
let spriteBorderDownNone, spriteBorderDownBlocked, spriteBorderDownOpen;
let spriteBorderLeftNone, spriteBorderLeftBlocked, spriteBorderLeftOpen;

let spritePlayerUp, spritePlayerRight, spritePlayerDown, spritePlayerLeft, spritePlayerIcon;  //PLAYER ANIMATIONS
let spriteTurretStatic, spriteTurretClosed, spriteRoomba, spriteMantis, spriteDrone; //ENEMY SPRITES
let spriteBulletPlayer, spriteBulletEnemy; //BULLET ANIMATIONS
let spriteBoss0, spriteBoss1, spriteBoss2, spriteBoss3; //BOSS ANIMATIONS

let SPRITE_TILES, SPRITE_BORDERS, SPRITE_PLAYER, SPRITE_ENEMIES, SPRITE_BULLETS; //SPRITE MAPS

let spriteBossIcon; //boss map icon
let spriteEscapePod; //escape pod

//SOUNDS
let soundPlayerShoot, soundPlayerShot, soundPlayerFootstep, soundRoombaCollide, soundTurretShoot;
let soundDoorOpen, soundDoorClose;
let soundSyringePickup, soundCorePickup;
let soundBANGER, soundBANGER2;
let soundMantisShoot, soundDroneShoot, soundBossShoot;


// PRELOAD ALL SPRITES AND MUSIC
function preload() {

  spriteCrosshair = loadImage("/assets/crosshair.png");
  spriteTile0 = loadImage("assets/tiles0.png");
  spriteTile1 = loadImage("assets/tiles1.png");
  spriteTile2 = loadImage("assets/tiles2.png");
  spriteTile3 = loadImage("assets/tiles3.png");
  spriteTile4 = loadImage("assets/tiles4.png");
  spriteTile5 = loadImage("assets/tiles5.png");

  spriteAltTile0 = loadImage("assets/tiles_alt0.png");
  spriteAltTile1 = loadImage("assets/tiles_alt1.png");
  spriteAltTile2 = loadImage("assets/tiles_alt2.png");
  spriteAltTile3 = loadImage("assets/tiles_alt3.png");
  spriteAltTile4 = loadImage("assets/tiles_alt4.png");
  spriteAltTile5 = loadImage("assets/tiles_alt5.png");
  
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

  spriteBossIcon = loadImage("/assets/boss_icon.png");

  spriteEscapePod = loadImage("/assets/escape_pod.png");

  spriteTurretStatic = loadImage("/assets/turret_static.png"); //ENEMY SPRITES
  spriteTurretClosed = loadImage("/assets/turret_closed.png");
  spriteRoomba = loadImage("/assets/roomba.png");
  spriteMantis = loadImage("/assets/mantis.png");
  spriteDrone = loadImage("/assets/drone.png");

  spriteBulletPlayer0 = loadImage("/assets/bullet_player_1.png"); //BULLET ANIMATIONS
  spriteBulletPlayer1 = loadImage("/assets/bullet_player_2.png");
  spriteBulletPlayer2 = loadImage("/assets/bullet_player_3.png");
  spriteBulletPlayer3 = loadImage("/assets/bullet_player_4.png");
  spriteBulletEnemy0 = loadImage("/assets/bullet_enemy_1.png");
  spriteBulletEnemy1 = loadImage("/assets/bullet_enemy_2.png");
  spriteBulletEnemy2 = loadImage("/assets/bullet_enemy_3.png");
  spriteBulletEnemy3 = loadImage("/assets/bullet_enemy_4.png");
  spriteBulletBoss0 = loadImage("/assets/bullet_boss_1.png");
  spriteBulletBoss1 = loadImage("/assets/bullet_boss_2.png");
  spriteBulletBoss2 = loadImage("/assets/bullet_boss_3.png");
  spriteBulletBoss3 = loadImage("/assets/bullet_boss_4.png");

  spriteSyringeDrop = loadImage("/assets/syringe.png"); //DROPS
  spriteCoreDrop = loadImage("/assets/power_core.png");

  spriteBoss0 = loadImage("/assets/boss_1.png");
  spriteBoss1 = loadImage("/assets/boss_2.png");
  spriteBoss2 = loadImage("/assets/boss_3.png");
  spriteBoss3 = loadImage("/assets/boss_4.png");

  SPRITE_BORDERS = {  "up_NONE": spriteBorderUpNone, "up_BLOCKED": spriteBorderUpBlocked, "up_OPEN": spriteBorderUpOpen,
                      "right_NONE": spriteBorderRightNone, "right_BLOCKED": spriteBorderRightBlocked, "right_OPEN": spriteBorderRightOpen, 
                      "down_NONE": spriteBorderDownNone, "down_BLOCKED": spriteBorderDownBlocked, "down_OPEN": spriteBorderDownOpen,
                      "left_NONE": spriteBorderLeftNone, "left_BLOCKED": spriteBorderLeftBlocked, "left_OPEN": spriteBorderLeftOpen };
  SPRITE_PLAYER = {   "up": [spritePlayerUp, 13, 22], "right": [spritePlayerRight, 18, 22], "down": [spritePlayerDown, 13, 22], "left": [spritePlayerLeft, 18, 22]};
  SPRITE_ENEMIES = {  "turret_static": [spriteTurretStatic, 11, 13], "turret_closed": [spriteTurretClosed, 11, 13], "roomba": [spriteRoomba, 13, 14], 'mantis':[spriteMantis, 23, 24], 'drone':[spriteDrone, 14, 18]};
  SPRITE_TILES = {0: spriteTile0, 1: spriteTile1, 2: spriteTile2, 3: spriteTile3, 4: spriteTile4, 5: spriteTile5};
  SPRITE_ALT_TILES = {0: spriteAltTile0, 1: spriteAltTile1, 2: spriteAltTile2, 3: spriteAltTile3, 4: spriteAltTile4, 5: spriteAltTile5};
  SPRITE_BULLETS = {  "00": [spriteBulletPlayer0, 8, 8], "01": [spriteBulletPlayer1, 8, 8], "02": [spriteBulletPlayer2, 8, 8], "03": [spriteBulletPlayer3, 8, 8],
                      "10": [spriteBulletEnemy0, 8, 8], "11": [spriteBulletEnemy1, 8, 8], "12": [spriteBulletEnemy2, 8, 8], "13": [spriteBulletEnemy3, 8, 8],
                      "20": [spriteBulletBoss0, 8, 8], "21": [spriteBulletBoss1, 8, 8], "22": [spriteBulletBoss2, 8, 8], "23": [spriteBulletBoss3, 8, 8] };
  SPRITE_BOSS = {0: [spriteBoss0, 25, 35], 1:[spriteBoss1, 25, 35], 2:[spriteBoss2, 25, 35], 3:[spriteBoss3, 25, 35]};


  // SOUNDS
  soundFormats('mp3');
  soundBANGER = loadSound("/assets/HECU_stage.mp3");
  soundBANGER.setVolume(volume_);
  soundBANGER2 = loadSound("/assets/parasite.mp3");
  soundBANGER2.setVolume(volume_);
  soundPlayerShoot = loadSound("/assets/player_shoot.mp3");
  soundPlayerShoot.setVolume(volume_);
  soundPlayerShot = loadSound("/assets/player_hit.mp3");
  soundPlayerShot.setVolume(volume_);
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
  soundSyringePickup = loadSound("/assets/hp_pickup.mp3");
  soundSyringePickup.setVolume(volume_);
  soundCorePickup = loadSound("/assets/key_pickup.mp3");
  soundCorePickup.setVolume(volume_);
  soundMantisShoot = loadSound("/assets/mantis.mp3");
  soundMantisShoot.setVolume(volume_);
  soundDroneShoot = loadSound("/assets/drone.mp3");
  soundDroneShoot.setVolume(volume_);
  soundBossShoot = loadSound("/assets/boss.mp3");
  soundBossShoot.setVolume(volume_);
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
  if(!play_music){
    soundBANGER.setVolume(1.5*volume_);
    soundBANGER.loop();
    play_music = true;
  }

  // set up the arrays for the current state of the game
  rooms = Array.from(Array(4), () => new Array(7)) //4 by 7 array
  initGame();

  currentRoom = rooms[0][2];
  currentRoom.visited = true;
  enemies = [];
  spawners = []; //currentRoom.spawners; 
  console.log(visited_rooms);
  for(let i = 0; i < visited_rooms.length; i++){ //if room has been visited, remove its spawners
    console.log(visited_rooms[i]);
    for(let j = 0; j < rooms.length; j++){
      for(let k = 0; k < rooms[j].length; k++){
        if(visited_rooms[i].id == rooms[j][k].id){
          console.log('Similar rooms');
          rooms[j][k].spawners = [];
          rooms[j][k].enemyList = [];
          console.log(visited_rooms[i],rooms[j][k]);
        }
      }
    }
  }

   // currentSpawner.enemies; 
  player = new Player(3*currentRoom.tileWidth + currentRoom.tileWidth/2, 6*currentRoom.tileHeight + currentRoom.tileHeight/2, currentRoom);
  bullets = [];
  player.cores = found_cores;

  //draw players initial hearts and cores
  window.updatePlayerHearts();
  window.updatePlayerCores();

  //ABSOLUTE BANGER
  soundBANGER.loop();
}

function draw() {
  if(!run_game)
    return;

  background(0);
  currentRoom.display();

  
  for(const walker of walkers){ //only active during the boss fight
    walker.update();
  }
  for(const drop of currentRoom.drops) 
    drop.update();

  
  if(spawners.length > 0){
    spawners[0].tick();
  }

  for(const bullet of bullets){
    bullet.update();
  }
  for(const enemy of enemies) {
    enemy.update();
  }

  if(boss != null)
      boss.update();
  player.update();

  scale(displayScale);
  image(canvasBuffer,0,0);

  if(display_map)
    drawMap(); 
}
let currentRoom, tiles0, borders0;
let player, rooms, spawners, enemies, bullets;

//SPRITES
let spriteFloor, spriteWall;
let spriteBorderBottom, spriteBorderTop, spriteBorderRight, spriteBorderLeft; 

// PRELOAD ALL SPRITES AND MUSIC
function preload() {
  spriteFloor = loadImage("/assets/tile.png");
  spriteWall = loadImage("/assets/wall.png");
  spriteBorderBottom = loadImage("/assets/borderbottom.png");
  spriteBorderTop = loadImage("/assets/bordertop.png");
  spriteBorderRight = loadImage("/assets/borderright.png");
  spriteBorderLeft = loadImage("/assets/borderleft.png");
}


function setup() {
  displayScale = 3;
  width = 219*displayScale;
  height = 184*displayScale;
  createCanvas(width, height);
  canvasBuffer = createGraphics(width,height);
  canvasBuffer.noSmooth();
  colorMode(HSB, 360, 100, 100);
  
  // THIS WILL BE MOVED TO A DIFFERENT CLASS LATER
  tiles0 = [  [0, 0, 0, 0, 0, 0, 0],
              [0, 1, 0, 0, 0, 1, 0],
              [0, 0, 0, 1, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0],
              [0, 0, 0, 1, 0, 0, 0],
              [0, 1, 0, 0, 0, 1, 0],
              [0, 0, 0, 0, 0, 0, 0] ];
  borders0 =  ["A_1", "B_1", "C_1", "D_1"];

  
  // set up the arrays for the current state of the game
  rooms = [new Room(0, tiles0, borders0)];
  currentRoom = rooms[0];
  spawners = []; //currentRoom.spawners;
  //currentSpawner = spawners[0];
  enemies = []; //currentSpawner.enemies;
  player = new Player(25*3, 20*6, currentRoom);
  bullets = [];
}

function draw() {
  background(0);
  currentRoom.display();
  player.update();
  //update enemies
  //update bullets


  scale(displayScale);
  image(canvasBuffer,0,0);
}

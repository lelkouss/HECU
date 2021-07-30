let currentRoom, tiles0, borders0;
let player, rooms, spawners, enemies;

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
  
  rooms = [];
  spawners = [];
  enemies = [];
  //init room
  tiles0 = [ [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0] ];
  borders0 = ["A_1", "B_1", "C_1", "D_1"];

  //sets up Levels (individual rooms included in a single array)
  rooms.push(new Room(0, tiles0, borders0));
  currentRoom = rooms[0];
  
  //init player
  player = new Player(25*3, 20*6, currentRoom);
}

function draw() {
  background(0);
  currentRoom.display();
  player.update();
  scale(displayScale);
  image(canvasBuffer,0,0);
}

let room, tiles, player, rooms;
let spriteFloor, spriteWall;
let spriteBorderBottom, spriteBorderTop, spriteBorderRight, spriteBorderLeft; 

function setup() {
  displayScale = 3;
  width = 219*displayScale;
  height = 184*displayScale;
  createCanvas(width, height);
  canvasBuffer = createGraphics(width,height);
  canvasBuffer.noSmooth();
  colorMode(HSB, 360, 100, 100);
  
  spriteFloor = loadImage("/assets/tile.png");
  spriteWall = loadImage("/assets/wall.png");
  spriteBorderBottom = loadImage("/assets/borderbottom.png");
  spriteBorderTop = loadImage("/assets/bordertop.png");
  spriteBorderRight = loadImage("/assets/borderright.png");
  spriteBorderLeft = loadImage("/assets/borderleft.png");

  //init room
  tiles = [ [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0] ];

  tiles2 = [ [0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0, 0] ];

  //sets up Levels (individual rooms included in a single array)
  level = [new Room(tiles, 0), new Room(tiles, 1)];

  //init player
  player = new Player(25*3, 20*6, room);

  // setting up canvas
}
/*collisionX (x_current, x_destination) {
  return x_out
}*/

function draw() {
  background(0);
  canvasBuffer.image(spriteBorderBottom, 0, 0, 219, 184);
  canvasBuffer.image(spriteBorderTop, 0, 0, 219, 184);
  canvasBuffer.image(spriteBorderRight, 0, 0, 219, 184);
  canvasBuffer.image(spriteBorderLeft, 0, 0, 219, 184);
  room.display();
  player.update();
  scale(displayScale);
  image(canvasBuffer,0,0);
}

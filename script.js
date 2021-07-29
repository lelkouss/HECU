// Add all built-in functions and variables used from p5 libraries
// to the global comment for glitch to recognize the code:
//lena
/* global
 * createCanvas, background, colorMode, HSB, random, width, height,
 * windowWidth, windowHeight, noStroke, fill, ellipse, floor, rect, circle, keyCode, key, color, LEFT_ARROW, RIGHT_ARROW, keyIsDown
 * overflow, bg_color, score, grid_height, collideRectCircle, strokeWeight, stroke, text, textSize
 */

// Add all custom variables you create to a 'let' call:
//lena
let bricks, paddles, balls, paddleBlueX, paddleRedX, red = 0, blue = 1, score_red = 0, score_blue = 0, start, victory, color_red, color_blue, game_start;
let game_start_perma, scores_record_red, scores_record_blue, record_time, concat_red, concat_blue, concat_time;

function setup() {
  // JJ
  width = 500+25 // I chose a window width with a multiple of 100 because it always evenly divides by 25
  height = 500//windowHeight - 20;
  // If width is not a multiple of 25 the grid of bricks will have a space at the end
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  fill(30,100,100);
  bg_color = color(0, 0, 10);
  game_start = false;
  game_start_perma = false;
  victory = -1;
  color_red = color(0,80,80);
  color_blue = color(240,80,80);
  
  bricks = [];
  paddles = [];
  balls = [];
  
  // Testing if can use notepad++ to directly send edits to github
  // Testing again if I can use VSC to send edits to github
  // Testing if I can make edits
  
  time = 0;
  
  scores_record_red = [];
  scores_record_blue = [];
  record_time = [];
  
  overflow = floor(width/50)+1; // width of a block is 25 pixels
  grid_height = 8; // grid height
  //JJ
  // INITIALIZING BRICKS
  for(let i = 0; i < overflow*grid_height; i++) {
    var in_x = (25*2*(i%overflow));
    var in_y = (height/2 + 10 - 10*2*(grid_height/2) + 10 * 2 * Math.floor(i/overflow));
    var in_active = 1//floor(random(0,2));
    bricks.push(new Brick(in_x,in_y,in_active));
  }
  // INITIALIZING PADDLES
  for (let i = 0; i < 2; i++) {
    var in_x = width/2-20;               // SPAWNS IN MIDDLE OF SCREEN
    if (i == 0) {in_y = height-40;}          // PLAYER 0 IS STARTS ON THE LEFT
    else if (i == 1) {in_y = 0+40;}     // PLAYER 1 STARTS ON THE RIGHT
    var in_color = color(0,0,50);     // COLOR IS GRAY BY DEFAULT
    if (i == 0) {in_color = color_red}          // PLAYER 0 IS RED
    else if (i == 1) {in_color = color_blue}   // PLAYER 1 IS BLUE
    paddles.push(new Paddle(in_x, in_y, in_color, i));
  }
  // INITIALIZING BALLS
  for (let i = 0; i < 2; i++) {
    var in_x = width/2;               // SPAWNS IN MIDDLE OF SCREEN
    if (i == 0) {in_y = height-120;}          // PLAYER 0 IS STARTS ON THE LEFT
    else if (i == 1) {in_y = 0+120;}     // PLAYER 1 STARTS ON THE RIGHT
    var in_color = color(0,0,50);     // COLOR IS GRAY BY DEFAULT
    //if (i == 0) {in_color = color_red}        // RED
    //else if (i == 1) {in_color = color_blue} // BLUE
    balls.push(new Ball(in_x,in_y,in_color,-1));}
  // JJ
}

function draw() {
  // JJ
  background(bg_color);
  // MANAGING BRICKS
  for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];
    if (brick.active) {
      brick.display();
    }
  }
  // MANAGING PADDLES
  for (let i = 0; i < paddles.length; i++) {
    const paddle = paddles[i];
    paddle.display();
    paddle.paddleBounce();
  }
  movePaddles();
  // MANAGING BALLS
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    ball.display();
    ball.move();
    ball.wallBounce();
    ball.collideBrick();
  }
  
  //JJ
  // PRE-GAME STATE
  if (!game_start) {
      fill(90);
      textSize(30);
      text("CLICK TO START",140,200);
      text("GOAL: "+str(32),180,260);
  }
  if (game_start) {time++;}
  // VICTORY STATE
  if (victory != -1) {
      textSize(30);
      if (victory == red) {fill(color_red); text("RED WINS!",140,200);}
      if (victory == blue) {fill(color_blue); text("BLUE WINS!",140,200);}
      fill(color(90));
      text("CLICK TO RESTART",140,250);
      scores_record_red.push(score_red);
      scores_record_blue.push(score_blue);
      record_time.push(floor(time/60));
      time = 0;
      gameReset();
  }
  displayScores();
  if (score_red >= 32 && victory == -1) {victory = red;}
  if (score_blue >= 32 && victory == -1) {victory = blue;}
}

//JJ
function mouseClicked() {

  if (!game_start_perma) {
    gameReset();
    game_start_perma = true;
  } else {
    concat_red = "";
    concat_blue = "";
    concat_time = "";
    for (var i = 0; i < scores_record_red.length; i++) {
      concat_red += str(scores_record_red[i])+", ";
      concat_blue += str(scores_record_blue[i])+", ";
      concat_time += str(record_time[i])+", ";
    }
    console.log("Red scores: "+concat_red);
    console.log("Blue scores: "+concat_blue);
    console.log("Times: "+concat_time);
  }
  
}

function gameReset() {
  if (!game_start || victory != -1) {
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      ball.x = width/2;
      ball.x_speed = (1-2*floor(random(0,2)))*random(2,3);
      ball.y_speed = -1*4;
      ball.colorID = -1;
      ball.color = color(0,0,50);
      if (i == 0) {ball.y = height-120;}
      else if (i == 1) {
        ball.y = 0+120;
        ball.x_speed *= -1;
        ball.y_speed *= -1;
      }
    }
    for (let i = 0; i < paddles.length; i++) {
      const paddle = paddles[i];
      paddle.x = width/2-20;
      if (i == 0) {paddle.x -= 60}
      else if (i == 1) {paddle.x += 60}
    }
    for(let i = 0; i < overflow*grid_height; i++) {
      const brick = bricks[i];
      if (victory != -1) {
        brick.active = 1//floor(random(0,2));
      }
      
    }
    game_start = true;
    victory = -1;
    score_red = 0;
    score_blue = 0;
  }
}


//creates brick blocks with (x, y, width, height, color, and "active" - broken or unbroken)
//lena
class Brick{
  constructor(x, y, active){
    this.x = x;
    this.y = y;
    this.w = 25;
    this.h = 10;
    this.color = 300;
    this.active = active;
  }
  //lena & JJ
  display(){
    fill(this.color, 50, 50);
    strokeWeight(1);
    stroke(bg_color);
    rect(this.x, this.y, this.w, this.h);
  }
}

//creates bouncing balls with variables (x, y, radius, base speeds, variable speeds, color, color ID for differentiation, cooldown for paddle, and out of bounds detection for ball escape)
//JJ
class Ball {
  constructor(x,y,color,colorID) {
    this.x = x;
    this.y = y;
    this.rad = 15;
    this.x_base_speed = 1;
    this.y_base_speed = 1;
    this.x_goal = -1;
    this.y_goal = -1;
    this.x_speed = 0;
    this.y_speed = 0;
    this.color = color;
    this.colorID = colorID;
    this.cooldown = 0;
    this.outOfBounds = false;
    this.move_cooldown = 0;
  }
  //JJ
  display() {
    fill(this.color);
    circle(this.x,this.y,this.rad);
    if (this.cooldown > 0) {this.cooldown--;}
  }
  //checks for collision with each brick constantly, if brick collides, then velocity reverses and increments scoreboard
  //JJ
  collideBrick() {
    if (this.move_cooldown <= 0) {
    for (var i = 0; i < bricks.length; i++) {
      var inst = bricks[i];
      if (inst.active == true && collideRectCircle(inst.x,inst.y,inst.w,inst.h, this.x, this.y, 10)) {
        inst.active = false;
        this.x_speed *= -random(1.25,1.4);
        if (abs(this.x_speed) > 5*this.x_base_speed) {
          this.x_speed = 5*this.x_base_speed * Math.sign(this.x_speed);
        }
        this.y_speed *= -1;
        if (this.colorID == red) {score_red++;}
        if (this.colorID == blue) {score_blue++;}
        
        //score++;
        
        // add bouncing here
        
      }
    }
    }
  }
  
  //movement for dot, creates initial speed
  //JJ
  move(){
      if (this.move_cooldown <= 0) {
        // move the dot
      this.x += this.x_speed;
      //this.y += this.y_speed;
      if (this.colorID == red) {
        this.y += this.y_speed * (0.5 + 0.5*(this.y)/height);
      } else if (this.colorID == blue) {
        this.y += this.y_speed * (0.5 + 0.5*(height-this.y)/height);
      } else {
        this.y += this.y_speed;
      }
    
    /*
      if (this.colorID == red && this.y < height/2 || this.colorID == blue && this.y > height/2) {
        this.y += this.y_speed*0.5;
      } else {
        this.y += this.y_speed;
      }
      */

      if (this.x + this.r > width) {
        this.x_speed = -1 * this.x_base_speed;
      } if (this.x - this.r < 0) {
        this.x_speed = this.x_base_speed;
      } if (this.y + this.r > height) {
        this.y_speed = -1 * this.y_base_speed;
      } if (this.y - this.r < 0) {
        this.y_speed = this.y_base_speed;
      }
    
      if (this.x > width) {this.x = width-5; this.x_speed = -this.x_base_speed*4;}
      if (this.x < 0) {this.x = 5; this.x_speed = this.x_base_speed*4;}
      } else {
        this.move_cooldown--;
        if (this.x_goal != -1 || this.y_goal != -1) {
          this.x = (this.x*10+this.x_goal)/11;
          this.y = (this.y*10+this.y_goal)/11;
        }
        if (this.move_cooldown == 0) {
          this.x = this.x_goal;
          this.y = this.y_goal;
          this.x_goal = -1;
          this.y_goal = -1;
        }
      }
      
  }
  
  //creates wall bounce mechanic and detects left, right, and top walls and creates bounce, as well as sets out of bounds to true if ball goes below paddles
  //lena & JJ
  wallBounce() {
  if (this.x < 0) {
    this.x_speed *= -1
  }  
  if (this.x > width) {
    this.x_speed *= -1
  }  
    /*
  if (this.y < 0) {
    this.y_speed *= -1
  }
  */
  if(this.y > height && victory == -1) {
    //this.outOfBounds = true;
    //this.y_speed *= -1;
    if (this.colorID != -1) {this.y_goal = 0+120; this.y_speed *= 1;}
    else {this.y_goal = height-120; this.y_speed *= -1;}
    this.x_goal = width/2;
    this.move_cooldown = 60;
    this.color = color(0,0,50);
    this.colorID = -1;
    //victory = blue;
  }
  if(this.y < 0 && victory == -1) {
    //this.y_speed *= -1;
    if (this.colorID != -1) {this.y_goal = height-120; this.y_speed *= 1;}
    else {this.y_goal = 0+120; this.y_speed *= -1;}
    this.x_goal = width/2;
    this.move_cooldown = 60;
    this.color = color(0,0,50);
    this.colorID = -1;
    //victory = red;
  }
}
  
}


//creates paddle with x, y, width, height, and color as well as colorID variables
//lena
class Paddle{
  constructor(x, y, color, colorID){
    this.x = x;
    this.y = y;
    this.w = 48;
    this.h = 9;
    this.color = color;
    this.colorID = colorID;
  }
  //lena
  display(){
      // draw the dot
    fill(this.color, 80, 70);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
}
  //paddle bounce method allows for detection of interaction of balls with respective paddles exclusively(red or blue), as well as takes into account cooldown for paddle interaction and reverses speed if enough time has passed 
  //lena & JJ
  paddleBounce() {
    /*
    if(balls[red].cooldown <= 0 && collideRectCircle(this.x,this.y,this.w,this.h, balls[red].x, balls[red].y, 24)){
      balls[red].y_speed *=-1;
      balls[red].x_speed *=random(0.7,0.9);
      balls[red].cooldown = 20;
    }
    if(balls[blue].cooldown <= 0 && collideRectCircle(this.x,this.y,this.w,this.h, balls[blue].x, balls[blue].y, 24)){
      balls[blue].y_speed *=-1;
      balls[blue].x_speed *=random(0.7,0.9);
      balls[blue].cooldown = 20;
    }
    */
    for (var i = 0; i < 2; i++) {
    if(balls[i].cooldown <= 0 && collideRectCircle(this.x,this.y,this.w,this.h, balls[i].x, balls[i].y, 24)){
      balls[i].y_speed *=-1;
      balls[i].x_speed *=random(0.7,0.9);
      balls[i].colorID = this.colorID;
      balls[i].color = this.color;
      balls[i].cooldown = 20;
    }
    }
    
  }
  
}

//move paddles allows for use of a and d arrow keys for red paddle, and left and right for blue arrow key by incrememnting based on speed. also takes into account game start and end
function movePaddles() {
  // lena + JJ
  if (game_start && victory == -1) {
    //paddles[red].x = mouseX;
    
    redDist = abs(paddles[red].y-balls[red].y);
    blueDist = abs(paddles[red].y-balls[blue].y);
    
    if (blueDist < redDist) {
      paddles[red].x = (paddles[red].x*(max(2,blueDist/15))+balls[blue].x)/(max(2,blueDist/15)+1);
    } else {
      paddles[red].x = (paddles[red].x*(max(1,redDist/15))+balls[red].x)/(max(1,redDist/15)+1);
    }
    
    /*
    if (blueDist < redDist) {
      paddles[red].x = balls[blue].x-20;
    } else {
      paddles[red].x = balls[red].x-20;
    }
    */
    
    
    
    redDist = abs(paddles[blue].y-balls[red].y);
    blueDist = abs(paddles[blue].y-balls[blue].y);
    if (redDist < blueDist) {
      paddles[blue].x = (paddles[blue].x*(max(2,redDist/15))+balls[red].x)/(max(2,redDist/15)+1);
    } else {
      paddles[blue].x = (paddles[blue].x*(max(1,blueDist/15))+balls[blue].x)/(max(1,blueDist/15)+1);
    }
    
    
    /*
    redDist = abs(paddles[blue].y-balls[red].y);
    blueDist = abs(paddles[blue].y-balls[blue].y);
    if (redDist < blueDist) {
      paddles[blue].x = balls[red].x-20;
    } else {
      paddles[blue].x = balls[blue].x-20;
    }
    */
    
           
    /*
    if (keyIsDown(LEFT_ARROW) && paddles[blue].x > 0) {paddles[blue].x -= 10;} 
    if (keyIsDown(RIGHT_ARROW) && paddles[blue].x < width-55) {paddles[blue].x += 10;}
    if (keyIsDown(65) && paddles[red].x > 0) {paddles[red].x -= 10;} 
    if (keyIsDown(68) && paddles[red].x < width-55) {paddles[red].x += 10;}
    */
  }
}

function getDist(x1,y1,x2,y2) {
  return Math.sqrt((x2-x1)**2+(y2-y1)**2);
}

//function displays scores on the bottom of the screen, based on amount of bricks broken
//lena & JJ
function displayScores() {
  textSize(20);
  fill(0);
  
  // Display Score
  fill(color_red);
  text(`Score: ${score_red}`, 10, height-10);
  fill(color_blue);
  text(`Score: ${score_blue}`, width-100, height-10)
}


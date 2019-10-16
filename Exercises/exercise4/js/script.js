"use strict";

// Co-OPong
// by Asa Perlman (kind of) & Pippin Barr
//
// A "simple" implementation of Pong themed loosely around the sometimes fine
// between (co)operation and conflict. Every time a player is scored on, their
// defense is automatically enhanced via an ever-growing wall. Eventually,
// it is no longer possible to score on ones opponent, raising the question:
// who is the winner? Is it the player that cause the other to build the wall?
// or is the the player who may now never be scored on.
//
// There is, however, a twist! By pressing SHIFT or "2" respectively, on eplayer,
//or both can choose to dismantle their walls, allowing for the brick chucking fun
//to continue indefinetely.

//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle, SHIFT and "2" dismantle the walls.

// Whether the game has started
let playing = false;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, last point status, giftkey identifier and score
let leftPaddle = {
  x: 0,
  y: 0,
  w: 40,
  h: 90,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  score: 0,
  wonLastPoint: false,
  giftKey: 50
}

// Basic definition of the left paddle's defense wall, which grows whenever it is scored on.
let leftPaddleWall = {
  topX: 0,
  topY: 0,
  topWidth: 20,
  topHeight: 0,

  bottomX: 0,
  bottomY: 480,
  bottomWidth: 20,
  bottomHeight: 480
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, last point status, giftkey identifier and score
let rightPaddle = {
  x: 0,
  y: 0,
  w: 40,
  h: 90,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  score: 0,
  wonLastPoint: true,
  giftKey: 16
}

// Basic definition of the left paddles defense wall, which grows whenever it is scored on.
let rightPaddleWall = {
  topX: 640,
  topY: 0,
  topWidth: 620,
  topHeight: 0,

  bottomX: 640,
  bottomY: 480,
  bottomWidth: 620,
  bottomHeight: 480
}
//rate at which paddle walls grow whenever they are passed
let paddleWallGrowthRate = 20;

// Variables to hold the various sounds we'll be playing
let wallSound;
let paddleSound;
let defenseWallSound;
let pointSound;
// Variables to hold the images of the paddles and ball
let ballImage;
let paddleImage;

// preload()
//
// Loads the sound and image files
function preload() {
  wallSound = new Audio("assets/sounds/wallSound.wav");
  paddleSound = new Audio("assets/sounds/paddleSound.wav");
  defenseWallSound = new Audio("assets/sounds/defenseWallSound.wav");
  pointSound = new Audio("assets/sounds/pointSound.wav");

  ballImage = loadImage("assets/images/ballImage.png");
  paddleImage = loadImage("assets/images/paddle.png")
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);
  imageMode(CENTER);
  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?! <--- probably looked tidier before :-S
function draw() {
  // Fill the background
  background(bgColor);

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle, leftPaddleWall);
    handleInput(rightPaddle, rightPaddleWall);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();
    displayBall();
    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    //Draws the defense walls for the paddles
    drawPaddleDefenseWalls();

    //checks to see if the ball has hit the edge of the defense wall
    checkBallDefenseWallCollision(leftPaddleWall, 10);
    checkBallDefenseWallCollision(rightPaddleWall, width - 10);

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // I did this in ballIsOutOfBounds(), is there a reason it would be better
      // to do it here?
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
  } else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }

  // We always display the paddles (sometimes ball) so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);

}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively. Also checks to see if the players
// are tearing down their walls to make space for the game to continue
function handleInput(paddle, tearDownTheWall) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
  //prevent the paddle from moving off of the screen
  paddle.y = constrain(paddle.y, paddle.h / 2, height - paddle.h / 2);

  //if respective gift keys are being pressed, tear down your wall one pixel at a time.
  if (keyIsDown(paddle.giftKey)) {
    tearDownTheWall.topHeight -= 1;
    tearDownTheWall.bottomHeight += 1;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off on left side of screen: if so, add one
  //point to right paddle's score, make their opponents defense wall bigger,
  //and set the boolean stating if they have won the last point to true, setting
  //the opponent's to false, play the sound of cashing in on another point.....
  //though we can never really be sure who is winning... kind of like life?
  if (ball.x < 0) {
    rightPaddle.score += 1;
    leftPaddleWall.topHeight += paddleWallGrowthRate;
    leftPaddleWall.bottomHeight += -paddleWallGrowthRate;
    rightPaddle.wonLastPoint = true;
    leftPaddle.wonLastPoint = false;
    pointSound.currentTime = 0;
    pointSound.play();
    return true;
  }
  // same as above ^^^ but for opposite side.
  else if (ball.x > width) {
    leftPaddle.score += 1;
    rightPaddleWall.topHeight += paddleWallGrowthRate;
    rightPaddleWall.bottomHeight += -paddleWallGrowthRate;
    rightPaddle.wonLastPoint = false;
    leftPaddle.wonLastPoint = true;
    pointSound.currentTime = 0;
    pointSound.play();
    return true;
  } else {
    return false;
  }
}
//drawPaddleDefenseWalls()
//
//draws the two defense walls for the paddles. via four rectangles.
function drawPaddleDefenseWalls() {
  push();
  rectMode(CORNERS);
  fill(color(152, 97, 60));
  //constrain the defense walls to within the scope of the edge of the screen, and half way up/down
  leftPaddleWall.topHeight = constrain(leftPaddleWall.topHeight, 0, height / 2);
  leftPaddleWall.bottomHeight = constrain(leftPaddleWall.bottomHeight, height / 2, height);
  rightPaddleWall.topHeight = constrain(rightPaddleWall.topHeight, 0, height / 2);
  rightPaddleWall.bottomHeight = constrain(rightPaddleWall.bottomHeight, height / 2, height);
  //draw the defense walls
  rect(leftPaddleWall.topX, leftPaddleWall.topY, leftPaddleWall.topWidth, leftPaddleWall.topHeight);
  rect(leftPaddleWall.bottomX, leftPaddleWall.bottomY, leftPaddleWall.bottomWidth, leftPaddleWall.bottomHeight);
  rect(rightPaddleWall.topX, rightPaddleWall.topY, rightPaddleWall.topWidth, rightPaddleWall.topHeight);
  rect(rightPaddleWall.bottomX, rightPaddleWall.bottomY, rightPaddleWall.bottomWidth, rightPaddleWall.bottomHeight);
  pop();
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our wall collision sound
    wallSound.currentTime = 0;
    wallSound.play();
  }
}

//checkBallDefenseWallCollision()
//
//checks for collision between the defense wall of each specified paddle.
function checkBallDefenseWallCollision(defenseWall, boundry) {
  //Checks to see if the ball is within the verticle range, of the defense wall && at the edge of the screen.
  if ((ball.y < defenseWall.topHeight) && (ball.x === boundry) ||
    (ball.y > defenseWall.bottomHeight) && (ball.x === boundry)) {
    //If so, treats the defense wall like the paddle, returning the ball.
    //Also playing the terrible sound of your wall under attack
    ball.vx = -ball.vx;
    defenseWallSound.currentTime = 0;
    defenseWallSound.play();
  }
}
// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      paddleSound.currentTime = 0;
      paddleSound.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles as an image of beautiful driftwood
  image(paddleImage, paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a sinister brick
function displayBall() {
  // Draw the ball
  image(ballImage, ball.x, ball.y, ball.size, ball.size);
}

// resetBall()
//
// Sets the starting position and velocity of the ball, depending on which player has won the last point
function resetBall() {
  // Initialise the ball's position and velocity
  ball.x = width / 2;
  // set the ball to start off at a random point on the Y axis, to make things
  // a bit more interesting
  ball.y = random(5, height);
  if (rightPaddle.wonLastPoint === true) {
    ball.vx = ball.speed;
    ball.vy = ball.speed;
  } else if (leftPaddle.wonLastPoint === true) {
    ball.vx = -ball.speed;
    ball.vy = -ball.speed;
  }

}

// displayStartMessage()
//
// Shows a message about the controls, and how to start the game
//(but conspicously, nothing about how to win.....)
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Welcome To Co-OPong \n" +
    "Right Paddle: Arrow Keys\n" +
    "Left Paddle: 'S' 'W'\n" +
    "(shift & 2 break down the walls)\n" +
    "CLICK TO CHUCK A BRICK", width / 2, height / 2);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
}

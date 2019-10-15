"use strict";

// Pong
// by Pippin Barr
//
// A "simple" implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

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
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, last point status, and score
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  score: 0,
  wonLastPoint: false,
  giftKey:50
}

// Basic definition of the left paddle's defense wall, which grows whenever it is scored on.
let leftPaddleWall = {
  topX: 0,
  topY: 0,
  topWidth: 10,
  topHeight: 0,

  bottomX: 0,
  bottomY: 480,
  bottomWidth: 10,
  bottomHeight: 480
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, speed, last point status, and score
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
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
  topWidth: 630,
  topHeight: 0,

  bottomX: 640,
  bottomY: 480,
  bottomWidth: 630,
  bottomHeight: 480
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;
//let screenHeight;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  //screenHeight = height;
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
// See how tidy it looks?!
function draw() {
  // Fill the background
  background(bgColor);

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle,leftPaddleWall);
    handleInput(rightPaddle,rightPaddleWall);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);
    //Draw the defense walls for the paddles
    drawPaddleDefenseWalls();

    checkBallDefenseWallCollision(leftPaddleWall, 10);
    checkBallDefenseWallCollision(rightPaddleWall, width -10);

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }
  }
  else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }

  // We always display the paddles and ball so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);      // beepSFX.currentTime = 0;
      // beepSFX.play();
  displayBall();
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively. Also check to see if the players
// are tearing down their walls to make space for the game to continue
function handleInput(paddle,tearDownTheWall) {
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
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
  //prevent the paddle from moving off of the screen
  paddle.y = constrain(paddle.y,paddle.h/2,height -paddle.h/2);

  //if respective gift keys are being pressed, tear down your wall one pixel at a time.
  if(keyIsDown(paddle.giftKey)){
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
  //and set the boolean stating if they have won the last point to true, setting the opponent's to false
  if (ball.x < 0){
    rightPaddle.score += 1;
    leftPaddleWall.topHeight += 10;
    leftPaddleWall.bottomHeight += -10;
    rightPaddle.wonLastPoint = true;
    leftPaddle.wonLastPoint = false;
    return true;
  }
    // Check for ball going off on right side of screen: if so, add one
    //point to left paddle's score, make their opponents defense wall bigger,
    //and set the boolean stating if they have won the last point to true, setting the opponent's to false
    else if (ball.x > width) {
    leftPaddle.score += 1;
    rightPaddleWall.topHeight += 10;
    rightPaddleWall.bottomHeight += -10;
    rightPaddle.wonLastPoint = false;
    leftPaddle.wonLastPoint = true;
    return true;
  }
  else {
    return false;
  }
}
//drawPaddleDefenseWalls()
//
//draws the two defense walls for the paddles. via four rectangles.
function drawPaddleDefenseWalls(){
  push();
  rectMode(CORNERS);
  //constrain the defense walls to within the scope of the edge of the screen, and half way up/down
  leftPaddleWall.topHeight = constrain(leftPaddleWall.topHeight,0,height/2);
  leftPaddleWall.bottomHeight = constrain(leftPaddleWall.bottomHeight, height/2, height);
  rightPaddleWall.topHeight = constrain(rightPaddleWall.topHeight,0,height/2);
  rightPaddleWall.bottomHeight = constrain(rightPaddleWall.bottomHeight, height/2, height);
  //draw the defense walls
  rect(leftPaddleWall.topX,leftPaddleWall.topY,leftPaddleWall.topWidth,leftPaddleWall.topHeight);
  rect(leftPaddleWall.bottomX,leftPaddleWall.bottomY,leftPaddleWall.bottomWidth,leftPaddleWall.bottomHeight);
  rect(rightPaddleWall.topX,rightPaddleWall.topY,rightPaddleWall.topWidth,rightPaddleWall.topHeight);
  rect(rightPaddleWall.bottomX, rightPaddleWall.bottomY,rightPaddleWall.bottomWidth,rightPaddleWall.bottomHeight);
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
    // Play our bouncing sound effect by rewinding and then playing
    // beepSFX.currentTime = 0;
    // beepSFX.play();
  }
}

//checkBallDefenseWallCollision()
//
//checks for collision between the defense wall of each specified paddle.
function checkBallDefenseWallCollision(defenseWall, boundry){
  //Checks to see if the ball is within the verticle range, of the defense wall && at the edge of the screen.
  if ( (ball.y < defenseWall.topHeight) && (ball.x === boundry) ||
  (ball.y > defenseWall.bottomHeight) && (ball.x === boundry) ){
    //If so, treats the defense wall like the paddle, returning the ball.
    ball.vx = -ball.vx;
    // beepSFX.currentTime = 0;
    // beepSFX.play();
    console.log("BOUNCE");
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
      // beepSFX.currentTime = 0;
      // beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  rect(ball.x, ball.y, ball.size, ball.size);
}

// resetBall()
//
// Sets the starting position and velocity of the ball, depending on which player has won the last point
function resetBall() {
  // Initialise the ball's position and velocity
  ball.x = width / 2;
  ball.y = random(5, height);
  if (rightPaddle.wonLastPoint === true){
  ball.vx = ball.speed;
  ball.vy = ball.speed;
} else if (leftPaddle.wonLastPoint === true){
  ball.vx = -ball.speed;
  ball.vy = -ball.speed;
}

}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CLICK TO START", width / 2, height / 2);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
}

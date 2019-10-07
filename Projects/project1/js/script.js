"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/
// Track whether the game is over
let gameOver = false;

//Player IMAGE
let playerImage;
// Player position, size, velocity
let playerX;
let playerY;
let playerSize = 100;
let playerVX = 0;
let playerVY = 0;
let playerNormalSpeed = 2;
let playerMaxSpeed = 10;
// Player health
let playerHealth;
let playerMaxHealth = 255;
//colour of player health bar
let healthColour = 0;
//player stamina
let playerStamina;
let playerMaxStamina = 255;
//Colour of stamina health bar
let staminaColour = 0;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
//Array holding all of the prey images
let preyImages = [];
//Variable to assign current prey
let currentPrey;

let preyX;
let preyY;
let preySize = 50;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
let preyTX = 0;
let preyTY = 100;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

function preload() {
  playerImage = loadImage("assets/images/trash.png");
  preyImages[0] = loadImage("assets/images/prey0.png");
  preyImages[1] = loadImage("assets/images/prey1.png");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(windowWidth,windowHeight);

  noStroke();
  // We're using simple functions to separate code out
  setupPrey();
  currentPrey = 0;
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
  playerStamina = playerMaxStamina;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  console.log(preyEaten);
  background(100, 100, 200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    drawHealth();
    updateStamina();
    drawStamina();
    checkEating();

    drawPrey(preyImages[currentPrey]);
    drawPlayer();
  } else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerNormalSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerNormalSpeed;
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerNormalSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerNormalSpeed;
  } else {
    playerVY = 0;
  }
  //Check to see if shift is held down, and increase player speed to sprint
  if (keyIsDown(SHIFT)) {
    playerNormalSpeed = playerMaxSpeed;
    playerStamina += -2;
  } else {
    playerNormalSpeed = 2;
    playerStamina = playerStamina;
  }
}

//Reduce stamina level if player is sprinting
function updateStamina(){
  // Reduce player health
  playerStamina += 0.2;
  // Constrain the result to a sensible range
  playerStamina = constrain(playerStamina, 0, playerMaxStamina);

  if (playerStamina < 5){
    playerMaxSpeed = 2;
  } else{
    playerMaxSpeed = 4;
  }
}
//Draw the stamina health bar
function drawStamina(){
  fill(staminaColour,0,0);
  noStroke();
  rect(0,height,50, -playerStamina);
  //if player health is getting low, turn health bar red
  if (playerStamina < playerMaxStamina/3){
    staminaColour = 255;
  } else{
    staminaColour = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.2;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

function drawHealth(){
  fill(healthColour,0,0);
  noStroke();
  rect(width-50,height,width-50, -playerHealth);
  if (playerHealth < playerMaxHealth/3){
    healthColour = 255;
  } else{
    healthColour = 0;
  }
}



// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerSize + preySize - 100) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);


    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      //change the current prey to th enext in the array
      currentPrey +=1;
      //if we gave eaten all the prey in the array, start the cycle again
      if (currentPrey >= 2){
        currentPrey = 0;
      }

    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
    // Use map() to convert from the 0-1 range of the noise() function
    // to the appropriate range of velocities for the prey
    preyVX = map(noise(preyTX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyVY = map(noise(preyTY), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyTX += .01;
    preyTY += .01;

  //}

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as the current image assigned from the variable
function drawPrey(img){
  image(img, preyX, preyY, preySize, preySize);
}

// drawPlayer()
//
// Draw the player as a trash can with alpha value based on health
function drawPlayer() {
  image(playerImage, playerX, playerY, playerSize, playerSize);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "you picked up " + preyEaten + " pieces of trash\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

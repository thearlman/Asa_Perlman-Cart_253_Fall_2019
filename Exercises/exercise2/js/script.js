/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// Conditional to see if player has lost or not
let gameOver = false;

//colour of text in game over screen

let textFill = 255;

 //colour of lives text
let livesCol = 0;

//player Lives

let lives = 3;

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 50;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 50;

// The speed and velocity of our enemy circle
let enemySpeed = 10;
let enemyVX = 5;

// How many dodges the player has made
let dodges = 0;

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(windowWidth,windowHeight);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(255,220,220);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }


  if (gameOver === false){
    // Move the avatar according to its calculated velocity
    avatarX = avatarX + avatarVX;
    avatarY = avatarY + avatarVY;

    // The enemy always moves at enemySpeed
    enemyVX = enemySpeed;
    // Update the enemy's position based on its velocity
    enemyX = enemyX + enemyVX;

    // The player is black
    fill(0);
    // Draw the player as a circle
    ellipse(avatarX,avatarY,avatarSize,avatarSize);
    // The enemy is red
    fill(255,0,0);
    // Draw the enemy as a circle
    ellipse(enemyX,enemyY,enemySize,enemySize);

    // Check if the enemy and avatar overlap - if they do the player loses
    // We do this by checking if the distance between the centre of the enemy
    // and the centre of the avatar is less that their combined radii
    if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
      lives = lives -1;
      // Reset the enemy's position
      enemyX = 0;
      enemyY = random(0,height);
      // Reset the avatar's position
      avatarX = width/2;
      avatarY = height/2;
    }

    // Check if the avatar has gone off the screen (cheating!)
    if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
      // If they went off the screen they lose a life in the same way as above.
      lives = lives -1;
      enemyX = 0;
      enemyY = random(0,height);
      avatarX = width/2;
      avatarY = height/2;
    }
    // If player is on their last life, turn lives text colour red.
    if (lives === 0){
      livesCol = 255;
    }
    else{
      livesCol = 0;
    }

    // Check if the enemy has moved all the way across the screen
    if (enemyX > width) {
      // This means the player dodged so update its dodge statistic
      dodges = dodges + 1;
      //increase emeny's size by 5;
      enemySize += 10;
      // Reset the enemy's position to the left at a random height
      enemyX = 0;
      enemyY = random(0,height);
    }
    //If the enemy's size is too big to be fair, reset it to the original,
    //but increase it's speed
    if (enemySize === 200){
      enemySpeed = enemySpeed + 1;
      enemySize = 50;
    }
    }
    // if player is out of lives, change game over conditional to
    //true
    if (lives < 0){
      gameOver = true;
  }
  //Display number of dodges and number of lives remaining
  textFont('Courier')
  textSize(32);
  textAlign(LEFT);
  fill(0);
  text("Score = " + dodges, 10, 40);
  fill(livesCol,0,0);
  text("Lives = " + lives, 10, 80);
  console.log(enemyVX);

  // If the
  if (gameOver === true){
    background(0);
    textFont('Courier')
    textSize(32);
    textAlign(CENTER);
    fill(255,0,0);
    text("GAME OVER", width/2, height/2);
    text("HIGHTSCORE: "+highscore, width/2, height/2+60);
    rectMode(CENTER);
    rect(width/2,height/2+60, width, 50);
    fill(textFill);
    text("Click To Play Again", width/2, height/2+70);
      if (dist(mouseY,mouseY,height/2+60,height/2+60)<50){
       textFill = 255;
        if(mouseIsPressed){
          lives = 3;
          enemySize = 50;
          gameOver = false;
          dodges = 0;
          enemyX = 0;
          enemySpeed = 10;
        }
      }
      else{
        textFill = 0;
        enemyX = 0;
      }
    }
}

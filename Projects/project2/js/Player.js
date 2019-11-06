// Player
//
// A class that represents the games player as a set of crosshairs
// The player is controlled using the Arrow Keys
// When the spacebar is pressed, [see script.js:player.handleTarget()]
// if the enemy objects have been targeted correctly, they will lose health

class Player {

  // constructor
  //
  // Sets the initial values for the Player's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, size, img) {
    // Position
    this.x = x;
    this.y = y;
    //image of player
    this.img = img;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = 1.5 * height / 100;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerHit = 30 * this.maxHealth / 100;

    //Phazer charge properties
    this.maxCharge = 1.5 * height / 100;
    this.charge = this.maxCharge;
    this.chargeEmpty = false;

    // Display properties
    this.fillColor = fillColor;
    this.size = size;
    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;

  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the player's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    //increase shield health slowly, constraining it within max and min
    this.health += .01;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the player has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom (using 75% value to account for obstructed view by cockpit)
    if (this.y < 0) {
      this.y += height * 75 / 100;
    } else if (this.y > height * 75 / 100) {
      this.y = 0;
    }
  }


  // Update health()
  //
  //
  //updates the player's health only on event
  updateHealth() {
    this.health = this.health - this.healthLossPerHit;
    this.health = constrain(this.health, 0, this.maxHealth);
    //console.log(this.health);
  }

  //Displays the health of the player, along with the seconds remining before reaching planet
  //cheacks for gameOver
  displayHealth() {
    //console.log(this.health);
    push();
    textAlign(CENTER, CENTER);
    textSize(width * 1 / 100);
    fill(210, 255, 255);
    text("SHIELD", width / 2 - 37.5, height * 120 / 100 - this.health * 30 - 10);
    rectMode(CORNERS);
    fill(210, 255, 255, 150);
    strokeWeight(7);
    stroke(210, 255, 255, 150);
    rect(width / 2 - 25, height, width / 2 - 50, height * 120 / 100 - this.health * 30);
    noStroke();
    fill(0, 255, 255, 150);
    rectMode(CENTER);
    rect(width/2, height - 32.5*height/100, 18*width/100, 6*height/100);
    textSize(width*2 / 100)
    fill(0, 0, 0, 150);
    text("t-"+secondsRemaining+" to landing", width/2, height - 32.5*height/100);
    pop();
  }

  //displayCharge()
  //
  //
  //Displays's and updates player's phazer charge level, as wellas monitoring
  //if the player has run out of charge, requiring them to wait until full again
  displayCharge() {
    push();
    if (this.chargeEmpty === true) {
      this.charge += .5 * this.maxCharge / 100;
      this.charge = constrain(this.charge, 0, this.maxCharge);
      laserCharging.playMode('untilDone');
      laserCharging.play();
    }
    if (this.charge === this.maxCharge) {
      this.chargeEmpty = false;
      laserCharging.stop();
    }

    textAlign(CENTER, CENTER);
    textSize(width * 1 / 100);
    fill(100, 255, 255);
    text("CHARGE", width / 2 + 37.5, height * 120 / 100 - this.charge * 30 - 10);
    rectMode(CORNERS);
    fill(100, 255, 255, 150);
    strokeWeight(7);
    stroke(100, 255, 255, 150);
    rect(width / 2 + 25, height, width / 2 + 50, height * 120 / 100 - this.charge * 30);
    pop();
  }

  //updatCharge()
  //
  //
  //is executed whenever a phazer is fired
  updateCharge() {
    this.charge += -25 * this.maxCharge / 100;
    if (this.charge <= 25 * this.maxCharge / 100) {
      this.chargeEmpty = true;
    }

  }

  // handleTarget
  //
  // Takes an Enemy object as an argument and checks if the player's crosshairs
  // overlap it. If so, reduces the enemy's health.
  handleTarget(target) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, target.x, target.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < target.size) {
      // Decrease the enmy health
      target.health = 0;
      //add one to the kill counter
      killCount++;
    }
  }

  // display
  //
  // Draw the player's icon as crosshairs on the canvas
  display() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size)
    pop();
  }
}

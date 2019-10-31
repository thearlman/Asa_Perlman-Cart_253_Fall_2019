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
    this.maxHealth = size;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 20;
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
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  //
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Handle wrapping
    this.handleWrapping();
  }

  // Update health()
  //
  //
  //updates the player's health on event
  updateHealth(){
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);

  }

  // handleWrapping
  //
  // Checks if the player has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom (using 75% value to account for obstructed view by cockpit)
    if (this.y < 0) {
      this.y += height*75/100;
    }
    else if (this.y > height*75/100) {
      this.y = 0;
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
    if (d < target.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      target.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
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

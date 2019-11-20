// Boss
//
// A class that represents the boss  It  moves around on screen based on the
// noise() function, with varying speeds based on which stage, gets bigger and smaller
// to simulate it coming towards you, and running away.
// and throws boxes at you. It can be targeted, and (eventually) destroyed by the player.

class Boss {

  // constructor
  //
  // Sets the initial values for the boss' properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, startingSize) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.startingSpeed = speed;
    this.speed = this.baseSpeed;
    // Time properties for noise() function
    this.tx = random(0, 100); // To make x and y noise different
    this.ty = random(0, 100); // we use random starting values
    // Size properties
    this.startingSize = startingSize;
    this.size = startingSize;
    this.maxsize = 15 * height / 100;
    //healthProperties
    this.hitCount = 0;
    this.maxHitcount = bossImage.length;
    // Display properties
      //**The enemies image is stored in an array, and iterates through based
      //on its hitCount
  }

  //================================//
  //            move()
  //================================//
  // Sets velocity based on the noise() function and the boss' speed
  // Moves based on the resulting velocity and handles wrapping
  // Grows in size, or "moves" closer to the player
  // Checks how many times it has been hit, and changes its image accordingly
  move() {
    this.speed = this.startingSpeed * (this.hitCount+1);
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    //increases enemy's size every frame,
    this.size += this.speed / 10;
    this.size = constrain(this.size, 0, this.maxsize);
    // Handle wrapping
    this.handleWrapping();
  }

  //================================//
  //      handleWrapping()
  //================================//
  // Checks if the boss has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    //Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom (wrapps at 75%)
    if (this.y < 0) {
      this.y += cockpitVerticalMask;
    } else if (this.y > cockpitVerticalMask) {
      this.y = 0;
    }
  }

  //================================//
  //            display()
  //================================//
  // draws the boss on the screen
  display() {
    push();
    imageMode(CENTER)
    image(bossImage[this.hitCount], this.x, this.y, this.size * 2, this.size * 2);
    pop();
  }
}

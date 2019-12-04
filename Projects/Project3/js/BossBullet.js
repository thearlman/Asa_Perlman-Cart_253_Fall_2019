// BossBullet()
//
// A class that represents a boss "bullet"
// It can move around on screen based on the noise() function, and gets bigger
// to simulate it coming towards you. It can be targeted, and destroyed by the
//  player.

class BossBullet {

  // constructor
  //
  // Sets the initial values for the enemy's properties
  // Either sets default values or uses the arguments provided
  constructor(img, x, y, speed, startingSize) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 100); // To make x and y noise different
    this.ty = random(0, 100); // we use random starting values
    // Size properties
    this.startingSize = startingSize;
    this.size = startingSize;
    //healthProperties
    this.hitCount = 0;
    this.maxHitcount = 1;
    // Display properties
    this.bulletImg = img;
  }

  //================================//
  //              move()
  //================================//
  // Sets velocity based on the noise() function and the enemy's speed
  // Moves based on the resulting velocity and handles wrapping
  // Grows in size, or "moves" closer to the player
  move() {
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
    this.size += this.speed / 5;
    // Handle wrapping
    this.handleWrapping();
  }

  //================================//
  //        handleWrapping()
  //================================//
  // Checks if the bullet has gone off the canvas and
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
  // Draw the bullet as a piece of amazon space trash on the canvas
  display() {
    push();
    imageMode(CENTER)
    image(this.bulletImg, this.x, this.y, this.size * 2, this.size * 2);
    pop();
  }
}

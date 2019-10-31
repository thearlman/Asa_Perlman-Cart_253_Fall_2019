// Prey
//
// A class that represents the enemy (woah that sounded kind of problematic)
// It can move around on screen based on a noise() function, and gets bigger
// to simulate it coming towards you. It can be targeted, and destroyed by the
//  player.

class Enemy {

  // constructor
  //
  // Sets the initial values for the enemy's properties
  // Either sets default values or uses the arguments provided
  constructor(img, x, y, speed, startingHealth) {
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
    // Health properties
    this.startingHealth = startingHealth;
    this.health = startingHealth;
    // Display properties
    this.img = img;
    this.size = this.health;
  }

  // move
  //
  // Sets velocity based on the noise() function and the enemy's speed
  // Moves based on the resulting velocity and handles wrapping
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
    // Handle wrapping
    this.handleWrapping();
  }
  //collisionDetect()
  //
  //Checks to see is enemy cas collided with player
  collisionDetect(){
    console.log(this.size);
    if (this.size > 200){

      if(this.x > width*25/100 && this.x < width*75/100){
        console.log("crashed");
        this.reset();
      }
      else{
        console.log("escaped");
        this.reset();
      }
    }
  }


  // handleWrapping
  //
  // Checks if the enemy has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    //Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom (wrapps at 75%)
    if (this.y < 0) {
      this.y += height*75/100;
    }
    else if (this.y > height*75/100) {
      this.y = 0;
    }
    //~~~~~~~~~~~try and do this later: have enemies stay within screen~~~~~~~~~
      // if (this.x <= 0 || this.x >= width){
      //   this.speed = -this.speed;
      //   this.vx = -this.vx
      // }
      //
      // if (this.y <= 0 || this.y >= width*75/100){
      //   this.speed = -this.speed;
      //   this.vy = -this.vy
      // }
    // this.x = constrain(this.x, 0, width);
    // this.y = constrain(this.y, 0, height*75/100);
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  }

  // updateHealth()
  //
  //increases enemy's health (and size) everyframe,
  //resets enemy in health reaches zero
  updateHealth(){
    this.health += .2;
    if (this.health <= 0) {
      let newEnemy = new Enemy(enemyImg, random(0, width), random(0, cockpitMask), 5, 1);
      enemies.push(newEnemy);
      this.reset();
  }
}

  // display
  //  box-sizing: border-box;
  // Draw the enemy as an ellipse on the canvas
  // with a size the same as its current health.
  display() {
    push();
    imageMode(CENTER)
    this.size = this.health;
    image(this.img, this.x, this.y, this.size * 2, this.size *2);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.startingHealth;
  }
}

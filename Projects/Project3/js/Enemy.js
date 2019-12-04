//=================
// ~~~~~Enemy~~~~~~
//=================
// A class that represents an enemy (woah that sounded kind of problematic)
// It can move around on screen based on a noise() function, and gets bigger
// to simulate it coming towards you. It can be targeted, and destroyed by the
//  player.
//
class Enemy {
  //================================//
  //        constructor()
  //================================//
  // Sets the initial values for the enemy's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, startingSize) {
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
    this.maxHitcount = enemyImage.length;
    // Display properties
    //**The enemy's images are stored in an array (script.js), and iterates through based
    //on its hitCount
    this.image;
  }

  //================================//
  //            move()
  //================================//
  // Sets velocity based on the noise() function and the enemy's speed
  // Moves based on the resulting velocity and handles wrapping
  // Grows in size, or "moves" closer to the player
  // Checks how many times it has been hit, and changes its image accordingly
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);

    if (this.x + this.vx < 0 + this.size / 2 || this.x + this.vx > width - this.size / 2) {
      this.vx = -this.vx;
    }

    if (this.y + this.vy < 0 + this.size || this.y + this.vy > cockpitVerticalMask - this.size) {
      //this.speed = -this.speed;
      this.vy = -this.vy;
    }

    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    //increases enemy's size every frame,
    this.size += this.speed / 10;
    //constrain enemies on screen
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height * 75 / 100);
  }


  //================================//
  //           display()
  //================================//
  // Draw the enemy as a sinister amazon death delivery space drone on the canvas
  display() {
    push();
    this.image = enemyImage[this.hitCount]
    imageMode(CENTER)
    image(this.image, this.x, this.y, this.size * 2, this.size * 2);
    pop();
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//   EnemyExplosion()
//
// This class simply displays the explosion gif when the enemy has reached it's
// max hitcount. (see script.js:handlePhasers())
class EnemyExplosion {
  constructor(x, y, size) {
    this.image = explosionGif;
    this.x = x;
    this.y = y;
    this.size = size;
    this.currentFrame;
  }

  //================================//
  //           display()
  //================================//
  // Displays the gif, and keeps track as to which frame it is on.
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y, this.size * 2, this.size * 2);
    this.currentFrame = this.image.getCurrentFrame();
    pop();
  }
}

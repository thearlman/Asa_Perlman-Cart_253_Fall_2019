// Player
//
//This class handles the displaying of the players visual components (crosshairs,
//ship, health and phaser charge status)
//It also checks for collisions between the player and the enemy objects, calling
//a game over when the player's shield health is critically low.

class Player {

  // constructor
  //
  // Sets the initial values for the Player's properties
  // Either sets default values or uses the arguments provided
  constructor(crosshairs, cockpit, x, y, speed, fillColor, size) {
    // Position
    this.x = x;
    this.y = y;
    //the players crosshairs, and ship
    this.crosshairs = crosshairs;
    this.cockpit = cockpit;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;

    // Shield Health properties
    this.maxShieldHealth = 25 * height / 100;
    this.shieldHealth = this.maxShieldHealth;
    this.healthLossPerHit = 25 * this.maxShieldHealth / 100;

    //Phazer charge properties
    this.maxCharge = 25 * height / 100;
    this.charge = this.maxCharge;
    this.chargeEmpty = false;

    // Display properties
    this.fillColor = fillColor;
    this.size = size;
    this.shieldHealthyColor = 210;
    this.shieldDamagedColor = 0;
    this.shieldColor = this.shieldHealthyColor;
    this.shieldIndcatorColor = this.shieldHealthyColor;
    this.shieldAnimation;
    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;
  }

  //================================//
  //        handleInput
  //================================//
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

  //================================//
  //            move()
  //================================//
  //
  // Updates the position according to velocity, handles screen wrapping
  // Increases sield health.. cause the shield is powered by.... movement?
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    //increase shield health slowly, constraining it within max and min
    this.shieldHealth += .05*this.maxShieldHealth/100;
    this.shieldHealth = constrain(this.shieldHealth, 0, this.maxShieldHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  //================================//
  //       handleWrapping()
  //================================//
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

  //================================//
  //      detectCollision()
  //================================//
  //
  //Checks to see if an enemy has collided with player,
  detectCollision() {
    //cycle through all enemies
    for (let e = 0; e < enemies.length; e++){
      //if size is greater than 25% of viewport
      if (enemies[e].size > 25*height/100) {
        //and enemy is within the masking range of cockpit window
        if (enemies[e].x > width * 10 / 100 && enemies[e].x < width * 90 / 100) {
          //play crashing sound, and remove enemy from array
          crash.playMode('untilDone');
          crash.play();
          enemies.splice(e, 1);
          //change the shield color
          this.shieldColor = this.shieldDamagedColor;
          this.shieldAnimation = setTimeout(playerShieldRecover, 1000);
          console.log('crash');
          this.updateHealth();
        } else {
          enemies.splice(e, 1);
          spawnNewEnemy();
        }
      }
    }
  }


  //================================//
  //        Update health()
  //================================//
  //
  //updates the player's health only on event
  //temporarily changes the shield color to red
  updateHealth() {
    this.shieldHealth = this.shieldHealth - this.healthLossPerHit;
    this.shieldHealth = constrain(this.shieldHealth, 0, this.maxShieldHealth);
    //if shields have reached 0, chgange gameState to gameOver
    if(this.shieldHealth === 0){
      gameState = "gameOver";
      resetGame();
    }
  }


  //================================//
  //       displayHealth()
  //================================//
  //
  //Displays the shield health of the player
  //Displays the seconds remining before reaching planet Amazon
  displayHealth() {
    push();
    //shield level
    textAlign(CENTER, CENTER);
    textSize(width * 1 / 100);
    fill(this.shieldIndicatorColor, 255, 255);
    text("SHIELD", width / 2 - 37.5, height - this.shieldHealth - 10);
    rectMode(CORNERS);
    fill(this.shieldIndicatorColor, 255, 255, 150);
    strokeWeight(7);
    stroke(this.shieldIndcatorColor, 255, 255, 150);
    rect(width / 2 - 25, height, width / 2 - 50, height - this.shieldHealth);

      if (this.shieldHealth < 25*this.maxShieldHealth/100){
        this.shieldIndicatorColor = this.shieldDamagedColor
      } else {
        this.shieldIndicatorColor = this.shieldHealthyColor;
      }
    pop();

    push();
    //seconds to planet
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0, 255, 255, 150);
    rectMode(CENTER);
    rect(width / 2, height - 32.5 * height / 100, 18 * width / 100, 6 * height / 100);
    textSize(width * 2 / 100)
    fill(0, 0, 0, 150);
    text("t-" + secondsToArrival + " to landing", width / 2, height - 32.5 * height / 100);
    pop();
  }

  //================================//
  //        displayCharge()
  //================================//
  //
  //Displays's and updates player's phazer charge level, as well as monitoring
  //if the player has run out of charge, requiring them to wait until full again
  //controls the corresponding sound effect
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
    text("CHARGE", width / 2 + 37.5, height - this.charge - 10);
    rectMode(CORNERS);
    fill(100, 255, 255, 150);
    strokeWeight(7);
    stroke(100, 255, 255, 150);
    rect(width / 2 + 25, height, width / 2 + 50, height - this.charge);
    pop();
  }

  //================================//
  //        updateCharge()
  //================================//
  //
  //is executed whenever a phazer is fired
  //returns a boolean telling the keyPressed() function id draw if the phazer charge is empty
  updateCharge() {
    this.charge += -5 * this.maxCharge / 100;
    if (this.charge <= 50 * this.maxCharge / 100) {
      this.chargeEmpty = true;
    }
  }

  //================================//
  //         firePhazer()
  //================================//
  //
  //puts a new phazer object out into the world (in the appropriate array of course)
  //and play thelaser blasting sound. update the amount of charge left in current laser "clip"
  firePhazer(){
    if (this.chargeEmpty === false){
      let newPhazer = new Phazers();
      player.updateCharge();
      phazers.push(newPhazer);
      laserBlast.play();
    }

    //if the player tries to fire the phaser while charge is empty, play the empty battery sound
    else{
    lowCharge.playMode('untilDone');
    lowCharge.play();
    }
  }

  //================================//
  //          display()
  //================================//
  //
  // Draw the player's icon as crosshairs on the canvas
  // Draw the cockpit
  display() {
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    noStroke();
    //transucent shield which toggles to red on impact
    fill(this.shieldColor, 255, 255, 75);
    rect(width/2, height/2, width, height);
    //crosshairs
    image(this.crosshairs, this.x, this.y, this.size, this.size);
    //cockpit
    image(this.cockpit, width/2, height/2, width, height);
    pop();
    this.displayHealth();
    this.displayCharge();
  }
}

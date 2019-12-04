// Player
//
//This class handles the display of the players visual components (crosshairs,
//ship, health and phaser charge status)
//It also checks for collisions between the player and the enemy objects, calling
//a game over when the player's shield health is critically low.

class Player {

  // constructor
  //
  // Sets the initial values for the Player's properties
  // Either sets default values or uses the arguments provided
  constructor(crosshairs, cockpit, x, y, fillColor, size) {
    // Position
    this.x = mouseX;
    this.y = mouseY;
    //the players crosshairs, and ship
    this.crosshairs = crosshairs;
    this.cockpit = cockpit;

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
    //***INPUT IS HANDLLED BY THE MOUSE,
    // with the spacebar triggering the phazer fire
  }

  //================================//
  //            move()
  //================================//
  //
  // Updates the position according to mouse position,
  // Increases sield health.. cause the shield is powered by.... movement?
  move() {
    //update position based on mouse
    this.x = mouseX;
    this.y = mouseY;
    //prevent the crosshairs from going off the edge of the screen (or past the vertical mask)
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, cockpitVerticalMask);
    //increase shield health slowly, constraining it within max and min
    this.shieldHealth += .09 * this.maxShieldHealth / 100;
    this.shieldHealth = constrain(this.shieldHealth, 0, this.maxShieldHealth);

  }


  //================================//
  //      detectCollision()
  //================================//
  //
  //Checks to see if an enemy has collided with player,
  detectCollision() {
    //cycle through all enemies
    for (let e = 0; e < enemies.length; e++) {
      //if size is greater than 25% of viewport
      if (enemies[e].size > 25 * height / 100) {
        //if enemy is within the masking range of cockpit window (first and last 10%)
        if (enemies[e].x > width * 10 / 100 && enemies[e].x < width * 90 / 100) {
          //play crashing sound, and remove enemy from array
          crash.playMode('untilDone');
          crash.play();
          enemies.splice(e, 1);
          //change the shield color
          this.shieldColor = this.shieldDamagedColor;
          this.shieldAnimation = setTimeout(playerShieldRecover, 1000);
          this.updateHealth();
          //if the enemy is not within the masking range, remove it from the array
          //spawn a new one just for fun
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
  //updates the player's health on event called in detect collision.
  updateHealth() {
    this.shieldHealth = this.shieldHealth - this.healthLossPerHit;
    this.shieldHealth = constrain(this.shieldHealth, 0, this.maxShieldHealth);
    //if shields have reached 0, chgange gameState to gameOver
    if (this.shieldHealth === 0) {
      resetGame();
      gameState = "gameOver";
    }
  }


  //================================//
  //       displayHealth()
  //================================//
  //
  //Displays the shield health of the player
  //Displays the seconds remining before reaching planet Amazon
  displayHealth() {
    //shield level
    push();
    textAlign(CENTER, CENTER);
    textSize(width * 1 / 100);
    fill(this.shieldIndicatorColor, 255, 255);
    text("SHIELD", width / 2 - 37.5, height - this.shieldHealth - 10);
    rectMode(CORNERS);
    fill(this.shieldIndicatorColor, 255, 255, 150);
    stroke(this.shieldIndcatorColor, 255, 255, 150);
    strokeWeight(7);
    rect(width / 2 - 25, height, width / 2 - 50, height - this.shieldHealth);
    //while shield level is below 25% of max, display indicator as red
    if (this.shieldHealth < 25 * this.maxShieldHealth / 100) {
      this.shieldIndicatorColor = this.shieldDamagedColor
    } else {
      this.shieldIndicatorColor = this.shieldHealthyColor;
    }

    pop();

    //seconds to planet
    push();
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
  //returns a boolean telling the keyPressed() function if the phazer charge is empty
  updateCharge() {
    this.charge += -5 * this.maxCharge / 100;
    if (this.charge <= 5 * this.maxCharge / 100) {
      this.chargeEmpty = true;
    }
  }

  //================================//
  //         firePhazer()
  //================================//
  //
  //puts a new phazer object out into the world (in the appropriate array of course)
  //and play thelaser blasting sound. updates the amount of charge left in current laser "clip"
  firePhazer() {
    if (this.chargeEmpty === false) {
      let newPhazer = new Phazers();
      player.updateCharge();
      phazers.push(newPhazer);
      laserBlast.play();
    }
    //if the player tries to fire the phaser while charge is empty, play the empty battery sound
    else {
      lowCharge.playMode('untilDone');
      lowCharge.play();
    }
  }

  //================================//
  //          display()
  //================================//
  //
  // Draw the player's as crosshairs on the canvas
  // Draw the cockpit
  // The display properties for the health and chrge are included here to clean up
  // draw() (just a little)
  display() {
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    noStroke();
    //transucent shield which toggles to red on impact
    fill(this.shieldColor, 255, 255, 75);
    rect(width / 2, height / 2, width, height);
    //crosshairs
    image(this.crosshairs, this.x, this.y, this.size, this.size);
    //cockpit
    image(this.cockpit, width / 2, height / 2, width, height);
    pop();
    this.displayHealth();
    this.displayCharge();
  }
}

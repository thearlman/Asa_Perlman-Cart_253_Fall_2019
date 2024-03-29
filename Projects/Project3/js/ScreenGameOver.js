// ScreenGameOver
//
//gameOverScreen
//Pretty self explanitory
class ScreenGameOver {
  constructor(bgImg, buttonX, buttonY, buttonWidth, buttonHeight) {
    this.bgImg = bgImg;
    this.buttonX = buttonX;
    this.buttonY = buttonY;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.buttonStart = "NEVER!!!\nSEE YOU IN HELL!!!";
    this.buttonBrightness;
    this.d;
  }

  //================================//
  //          display()
  //================================//
  //plays the sad game over bells
  //displays the background image and the button to reset the game
  //checks to see if the button is being hovered over, changing the fill brightness
  display() {
    background(this.bgImg);
    push()
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(220, 255, this.buttonBrightness, 200);
    strokeWeight(7);
    stroke(220, 255, 255, 100);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    noStroke();
    fill(255);
    textSize(width * 1 / 100);
    text(this.buttonStart, this.buttonX, this.buttonY);
    //Checks to see if the mouse is hovering over the button, and changes
    //text fill color accordingly.
    this.d = dist(this.buttonX, this.buttonY, mouseX, mouseY);
    if (this.d < this.buttonWidth && this.d < this.buttonHeight) {
      this.buttonBrightness = 255;
    } else {
      this.buttonBrightness = 200;
    }
    pop()
  }

  //================================//
  //        mousePressed()
  //================================//
  // Is called when the mouse is pressed, & checks to see if the mouse and button are overlapping.
  mousePressed() {
    if (this.d < this.buttonWidth && this.d < this.buttonHeight && gameState === "gameOver") {
      //fade out and stop the bells
      gameOverBells.fade(0, 3);
      gameOverBells.stop(3);
      //loop back around to the getaway screen
      gameState = "intro2";
    }
  }
}

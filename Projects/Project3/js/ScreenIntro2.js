//Intro1()
//
//
// A class that class to display the second intro screen
// It displays text, and images, plays sounds, and can detect
// when its button has been pressed.

class ScreenIntro2 {

  constructor(bgImg, buttonX, buttonY, buttonWidth, buttonHeight) {
    this.bgImg = bgImg;
    this.buttonX = buttonX;
    this.buttonY = buttonY;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.buttonStart = "Fuck That:\nTo The Moon!";
    this.buttonHover = "LET'S GO!!!!";
    this.buttonBrightness;
    this.d;
  }

  //display()
  //
  //displays  the background image and the button to advance to the next screen.
  //and checks to see if the button is being hovered ove,r changing the fill brightness
  display() {
    // play the ambient sound effect
    ambience.playMode('untilDone');
    ambience.play();
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
    text(this.buttonStart, width / 2 + 12, height - height * 15 / 100)
    //Checks to see if the mouse is hovering over the button, and changes
    //fill color accordingly.
    this.d = dist(this.buttonX, this.buttonY, mouseX, mouseY);
    if (this.d < this.buttonWidth && this.d < this.buttonHeight) {
      //text(this.buttonHover, width / 2 + 12, height - height * 15 / 100);
      this.buttonBrightness = 255;
    } else {
      this.buttonBrightness = 200;
    }
    pop()
  }

  //mousePressed()
  //
  //
  // Is called when the mouse is pressed, & checks to see if the mouse and button are overlapping.
  mousePressed(){
    if (this.d < this.buttonWidth && this.d < this.buttonHeight) {
      gameState = "playing";
      console.log(gameState);
}

  }


}

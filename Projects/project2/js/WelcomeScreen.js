//WelocmeScreen1()
//displays the first welcome screen: a sinister-looking border seperating the publicly
//owned earth (now in ruins) and the private relams of space
class WelcomeScreen {
  constructor(backgroundImg, buttonX, buttonY, buttonWidth, buttonHeight) {
    this.backgroundImg = backgroundImg;
    this.buttonX = buttonX;
    this.buttonY = buttonY;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.buttonStart = "Fuck That:\nTo The Moon!";
    this.buttonHover = "LET'S GO!!!!";
  }

  //display()
  //
  //displays  the background image and the button to start the game
  //and checks to see if the button is pressed
  display() {
    background(startScreenPart1Img);
    push()
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(220, 255, 255, 200);
    strokeWeight(7);
    stroke(220, 255, 255, 100);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    noStroke();
    fill(255);
    textSize(width * 1 / 100);
    //Checks to see if the mouse is hovering over the button, and changes
    //text inside accordingly.
    let d = dist(this.buttonX, this.buttonY, mouseX, mouseY);
    if (d < this.buttonWidth && d < this.buttonHeight) {
      text(this.buttonHover, width / 2 + 12, height - height * 15 / 100);
      //if the mouse is pressed while hovering over button, make the start variable
      //false, beginning the game.
      if(mouseIsPressed){
        phase1 = false;
      }

    } else {
        text(this.buttonStart, width / 2 + 12, height - height * 15 / 100);
    }
    pop()
}

displayInstructions(){
  console.log("it's going");
  setTimeout(this.wipeInstructions, 5000);
  push()
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(220, 255, 255, 200);
  strokeWeight(7);
  stroke(220, 255, 255, 100);
  rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
  noStroke();
  fill(255);
  textSize(width * 1 / 100);
  text("ARROW KEYS BLAH BLAH BLAH", width / 2 + 12, height - height * 15 / 100);
  pop();

}

wipeInstructions(){
  clearTimeout(showInstructions);
  console.log("it's done");
}
}

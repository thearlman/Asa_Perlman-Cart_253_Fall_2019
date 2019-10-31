//PlanetAmazon()
//
// A class which defines Planet Amazon, the destination for the game.
// Takes an image, X and Y coordinates, a Y velocity, a size, and a growSpeed
class PlanetAmazon {
  constructor(img, x, y, vy, size, growSpeed) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.size = size;
    this.growSpeed = growSpeed;
  }

  //PlanetAmazon.display()
  //
  // Displays the planet, growing in size, and moving down to create a sense of motion
  display(){
    push();
    this.size += this.growSpeed;
    this.y += this.vy;
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size);
    pop()
  }

}

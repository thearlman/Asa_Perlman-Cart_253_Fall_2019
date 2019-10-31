
//A class to create visuals for the phazers to be stored and then immediately
//deleted from an array
class Phazers {
  constructor(x, y, diameter) {
    this.x = player.x;
    this.y = player.y;
    this.diameter = player.size;
  }
//display()
//
//
//displays the phazer as transulect blue circle
  display() {
    push()
    noStroke()
    fill(0, 0, 255, 100);
    ellipse(this.x, this.y, this.diameter);
    pop();
    this.diameter = this.diameter -2;
  }
}

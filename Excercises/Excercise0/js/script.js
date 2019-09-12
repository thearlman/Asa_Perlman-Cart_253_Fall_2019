/*****************

Mr potato head
Asa Perlman

This is a mr potato head. It represents me best as I can figure.
**********************************
RESOURCES THAT HELPED ME WITH THIS:
Daniel Shiffman - the coding train
Abe Pazos: https://www.youtube.com/watch?v=72Ej8JRj6jk
*****************************************************
******************/

// preload()
//
// Description of preload

function preload() {

}

let obj;

let head = {
  x:320,
  y:350,
  highlight: 1,
  display: function() {
    stroke(255);
    strokeWeight(this.highlight);
    fill(255,150,200);
    ellipse(this.x,this.y,360,460);
  }
}

let hat = {
  x:320,
  y:140,
  highlight:0,
  display: function() {
    fill(0);
    noStroke();
    ellipse(this.x,this.y,250,30);
    stroke(255);
    strokeWeight(this.highlight);
    ellipse(this.x,this.y-5,250,30);
    ellipse(this.x,this.y-15,10,30)
  },
  detect: function(){
    if ((dist(hat.x,hat.y,mouseX,mouseY) < 20)){
      cursor(HAND);
      hat.highlight = 2;
      if(mouseIsPressed){
        dragging = true;
        hat.x = mouseX;
        hat.y = mouseY;
      }

    else{
      hat.highlight =1;
      dragging = false;
    }
  }
}
}

let leftEye = {
  x:250,
  y:270,
  highlight:1,
  display: function() {
    stroke(255);
    strokeWeight(this.highlight);
    fill(0,0,255);
    ellipse(this.x,this.y,60,30);
    fill(0)
    ellipse(this.x,this.y,30)
  },
  detect: function(){
    if ((dist(leftEye.x,leftEye.y,mouseX,mouseY) < 20)){
      cursor(HAND);
      leftEye.highlight = 2;
      if(mouseIsPressed){
        dragging = true;
        leftEye.x = mouseX;
        leftEye.y = mouseY;
      }

    else{
      dragging = false;
    }
    }
    else{
      leftEye.highlight = 1;
    }
  }
}
let leftBrow = {
  x: 250,
  y: 240,
  highlight: 0,
  display: function() {
    stroke(255);
    strokeWeight(this.highlight);
    fill(0);
    ellipse(this.x-25,this.y,10);
    ellipse(this.x-20,this.y,10);
    ellipse(this.x-15,this.y,10);
    ellipse(this.x-10,this.y,10);
    ellipse(this.x-5,this.y,10);
    ellipse(this.x,this.y,10);
    ellipse(this.x+5,this.y,10);
    ellipse(this.x+10,this.y,10);
    ellipse(this.x+15,this.y,10);
    ellipse(this.x+20,this.y,10);
    ellipse(this.x+25,this.y,10);
  },
  detect: function(){
    if ((dist(leftBrow.x,leftBrow.y,mouseX,mouseY) < 20)){
      cursor(HAND);
      leftBrow.highlight = 1;
      if(mouseIsPressed){
        dragging = true;
        leftBrow.x = mouseX;
        leftBrow.y = mouseY;
      }

      else{
        dragging = false;
      }
      }
      else {
        leftBrow.highlight = 0;

      }
    }
  }

let rightEye = {
  x: 390,
  y: 270,
  highlight: 1,
  display: function() {
    stroke(255);
    strokeWeight(this.highlight);
    fill(0,0,255);
    ellipse(this.x,this.y,60,30);
    fill(0)
    ellipse(this.x,this.y,30)
    },
    detect: function(){
      if ((dist(rightEye.x,rightEye.y,mouseX,mouseY) < 20)){
        cursor(HAND);
        rightEye.highlight = 2;
        if(mouseIsPressed){
          dragging = true;
          rightEye.x = mouseX;
          rightEye.y = mouseY;
        }

      else{
        dragging = false;
      }
      }
      else {
        rightEye.highlight = 1;

      }
    }
  }
  let rightBrow = {
    x: 390,
    y: 240,
    highlight: 0,
    display: function() {
      stroke(255);
      strokeWeight(this.highlight);
      fill(0);
      ellipse(this.x-25,this.y,10);
      ellipse(this.x-20,this.y,10);
      ellipse(this.x-15,this.y,10);
      ellipse(this.x-10,this.y,10);
      ellipse(this.x-5,this.y,10);
      ellipse(this.x,this.y,10);
      ellipse(this.x+5,this.y,10);
      ellipse(this.x+10,this.y,10);
      ellipse(this.x+15,this.y,10);
      ellipse(this.x+20,this.y,10);
      ellipse(this.x+25,this.y,10);
    },
    detect: function(){
      if ((dist(rightBrow.x,rightBrow.y,mouseX,mouseY) < 20)){
        cursor(HAND);
        rightBrow.highlight = 1;
        if(mouseIsPressed){
          dragging = true;
          rightBrow.x = mouseX;
          rightBrow.y = mouseY;
        }

        else{
          dragging = false;
        }
        }
        else{
          rightBrow.highlight = 0;

        }
      }
    }

  let nose = {
    x: 320,
    y: 350,
    highlight: 1,
    display: function() {
      stroke(255);
      strokeWeight(this.highlight);
      fill(150,75,0);
      ellipse(this.x+15,this.y+30,30);
      ellipse(this.x-15,this.y+30,30);
      ellipse(this.x,this.y,30, 90);
      noStroke();
      fill(0);
      ellipse(this.x+17,this.y+42,10,3);
      ellipse(this.x-17,this.y+42,10,3);
    },
    detect: function(){
      if ((dist(nose.x,nose.y,mouseX,mouseY) < 20)){
        cursor(HAND);
        nose.highlight = 2;
        if(mouseIsPressed){
          dragging = true;
          nose.x = mouseX;
          nose.y = mouseY;
        }

      else{
        dragging = false;
      }
      }
      else{
        nose.highlight = 1;

      }
    }
  }

    let mouth = {
      x: 320,
      y: 470,
      highlight: 1,
      display: function() {
        stroke(255);
        strokeWeight(this.highlight);
        fill(250,75,0);
        ellipse(this.x,this.y,90,30)
        line(this.x-45,this.y,this.x+45,this.y)
      },
      detect: function(){
        if ((dist(mouth.x,mouth.y,mouseX,mouseY) < 20)){
          cursor(HAND);
          mouth.highlight = 2;
          if(mouseIsPressed){
            dragging = true;
            mouth.x = mouseX;
            mouth.y = mouseY;
          }

        else{
          dragging = false;
        }
        }
        else{
          mouth.highlight = 1;

        }
      }
    }
    let moustache = {
      x: 320,
      y: 410,
      highlight: 0,
      display: function() {
        stroke(255);
        strokeWeight(this.highlight);
        fill(0);
        ellipse(this.x-40,this.y+5,20);
        ellipse(this.x-30,this.y+5,20);
        ellipse(this.x-20,this.y+5,20);
        ellipse(this.x-10,this.y+10,20);
        ellipse(this.x,this.y,20);
        ellipse(this.x+10,this.y+10,20);
        ellipse(this.x+20,this.y+5,20);
        ellipse(this.x+30,this.y+5,20);
        ellipse(this.x+40,this.y+5,20);
      },
      detect: function(){
        if ((dist(moustache.x,moustache.y,mouseX,mouseY) < 20)){
          cursor(HAND);
          moustache.highlight = 2;
          if(mouseIsPressed){
            dragging = true;
            moustache.x = mouseX;
            moustache.y = mouseY;
          }

        else{
          dragging = false;
        }
        }
        else{
          moustache.highlight = 0;

        }
      }
    }

// draw()
//
// Initializes the dragging conditional.
let dragging = false;
let textCol ={
  r: 0,
  g: 0,
  b: 0,
  randval: function(){
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

}


// setup()
//
// Simply defines the size of the canvas.
function setup() {
  createCanvas(720,720);
}

function draw() {

  background(127);
  head.display();
  leftEye.display();
  leftEye.detect();
  leftBrow.display();
  leftBrow.detect();
  rightBrow.display();
  rightBrow.detect();
  rightEye.display();
  rightEye.detect();
  nose.display();
  nose.detect();
  mouth.display();
  mouth.detect();
  moustache.display();
  moustache.detect();
  hat.display();
  hat.detect();

  textSize(32);
  fill(textCol.r,textCol.g,textCol.b);
  noStroke();
  text("Hello, mess with my face plz.",10,610);
  text("Backspace to reset.",10,650);
  cursor(ARROW);
  console.log(dragging);

}
function keyPressed() {
  if (keyCode == BACKSPACE){
    textCol.randval();
    hat.x=320;
    hat.y=140;
    leftBrow.x=250;
    leftBrow.y=240;
    leftEye.x=250;
    leftEye.y=270;
    rightBrow.x=390;
    rightBrow.y=240;
    rightEye.x=390;
    rightEye.y=270;
    nose.x=320;
    nose.y=350;
    moustache.x=320;
    moustache.y=410;
    mouth.x=320;
    mouth.y=470;
    console.log("pressed");
  }
}

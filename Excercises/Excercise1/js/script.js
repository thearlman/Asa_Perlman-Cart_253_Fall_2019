/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  frameRate(1);
  createCanvas(640,480);
}

// draw()
//
// Description of draw()
let seconds = 0;
function draw() {



  console.log(seconds + " seconds have passed");
  seconds = seconds + 1;
}

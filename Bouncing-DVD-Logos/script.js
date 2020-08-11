/* global createCanvas, background, ellipse, rect, strokeWeight, color, stroke, noFill, image, loadImage, width, height, tint, random, filter, INVERT*/

// refactoring: change code but end result is the same

let num2, dvdImage, x, xVelocity, y, yVelocity, logoWidth, logoHeight, r, g, b; // declaring a variable (let or var), defining at top so refer anywhere

function setup() { // code runs once
  createCanvas(800, 600);
  
  do {
    var num = prompt("Hi! How many logos do you want? Please pick a number between 1 and 10");
    num2 = parseInt(num);
  } while (num2 < 1 || num2 > 10);
  
  dvdImage = [];
  
  x = [];
  xVelocity = [];
  
  y = [];
  yVelocity = [];
  
  r = [];
  g = [];
  b = [];
  
  logoWidth = 100;
  logoHeight = 75;
  
  for(var i = 0; i < num2; i++) {
    dvdImage[i] = loadImage("https://cdn.glitch.com/cac1122d-de8c-4087-86f0-262d9c687700%2Fdvd.jpeg?v=1594143991742"); //gets the image URL from the assets
    x[i] = random(0, width - logoWidth);
    y[i] = random(0, height - logoHeight);
    xVelocity[i] = 5;
    yVelocity[i] = 5;
  }
  
}

function draw() { // runs continuously 
  background(0, 0, 0); // default 220
    
  for(var l = 0; l < num2; l++) { 
  // update the x position
  x[l] += xVelocity[l];

  // update the y position    
  y[l] += yVelocity[l];

  // bounce off the side if on the edge
  if (x[l] >= width - logoWidth || x[l] <= 0) { // width = canvas width
    xVelocity[l] *= -1;
    randomizeColor(l);
    //console.log(xVelocity); //debugging
  }

  // bounce off the top/bottom if on the edge
  if (y[l] >= height - logoHeight || y[l] <= 0) { // height = canvas height
    yVelocity[l] *= -1;
    randomizeColor(l);
  } 

  // Draw the logo at the new position. position is defined by top left corner
  tint(r[l], g[l], b[l], 220);
  image(dvdImage[l], x[l], y[l], logoWidth, logoHeight); // image, x, y, width, height
  }
}

function randomizeColor(l) {
  r[l] = random(0, 256);
  g[l] = random(0, 256);
  b[l] = random(0, 256);
}
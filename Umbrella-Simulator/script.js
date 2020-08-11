/* global keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, arc,PI, TWO_PI, HALF_PI, PI, QUARTER_PI, noFill */

let drops, numDrops, umb, umbColor, handleColor;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  numDrops = 400;
  
  // creates drop objects
  drops = [];
  for(var i = 0; i < numDrops; i++) {
    drops.push(new RainDrop());
  }
  
  // creates umbrella object
  umbColor = color(268, 100, 100);
  handleColor = color(0, 75, 26);
  umb = new Umbrella(umbColor, handleColor);
}

function draw() {
  background(211, 80, 80);
  
  umb.show(); // displays umbrella
  
  for(var i = 0; i < numDrops; i++) { // displays drops
    drops[i].update();
    drops[i].show();
  }
}

class RainDrop {
  constructor() { // builds new objects in this class
    this.x = random(width);
    this.y = 0;
    this.d = random(5, 10);
    this.fallSpeed = random(3, 5);
  }
  
  show() {
    noStroke();
    fill(64, 0, 100);
    ellipse(this.x, this.y, this.d);
  }
  
  update() {
    this.y += this.fallSpeed;
    
    if(this.y > height) {
      this.y = 0;
      this.x = random(width);
      this.d = random(5, 10);
    }
    
    if ((mouseX-50 < this.x) && (this.x < mouseX+50) && (this.y > mouseY-90)) {
      this.y = 0;
      this.x = random(width);
      this.d = random(5, 10);
    }
  }
}

class Umbrella {
  constructor(umbColor, handleColor) {
    this.umbColor = umbColor;
    this.handleColor = handleColor;
  }
  
  show() {
    fill(this.umbColor);
    arc(mouseX, mouseY - 45, 100, 90, PI, TWO_PI);
    
    fill(this.handleColor);
    rect(mouseX - 4, mouseY - 45, 8, 50);   
  }
  
} 
/* global createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, mouseIsPressed, pmouseX, pmouseY, key, keyCode, BACKSPACE, SPACEBAR, textSize, createGraphics, image*/

// We'll use variables for most of our colors in this code-along.
let backgroundColor,
  color1,
  color2,
  textColor,
  brushHue,
  strokeDelta,
  strokeW,
  pg;

function setup() {
  // Canvas & color settings
  createCanvas(660, 500);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  background(95);

  strokeDelta = 1;
  strokeW = 5;

  createInstructionGraphic(); // creates a graphic for the instructions
}

function draw() {
  image(pg, 0, 0, 160, 500);

  chooseColors();
  strokeWeight(strokeW);

  // line mode
  if (key == "a") {
    if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }

  // calligraphy mode
  if (key === "b") {
    if (mouseIsPressed) {
      strokeW += strokeDelta;

      if (strokeW == 20 || strokeW == 5) {
        strokeDelta *= -1;
      }

      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
}

function createInstructionGraphic() {
  var s = "     Instructions";
  var s2 = 'Press "backspace" to clear the screen';
  var s3 = 'Type "a" for line mode';
  var s4 = 'Type "b" for calligraphy mode';

  pg = createGraphics(150, 500);
  pg.background(255, 255, 255);
  pg.textSize(15);

  pg.text(s, 5, 10, 150, 20);
  pg.text(s2, 5, 50, 150, 110);
  pg.text(s3, 5, 150, 150, 180);
  pg.text(s4, 5, 250, 150, 280);
}

function keyPressed() {
  // note: p5.js calls keyPressed but user defines what goes in keyPressed
  // clears the screen
  if (keyCode === BACKSPACE) {
    background(95);
  }
}

function chooseColors() {
  // colors cycle through
  if (brushHue % 360 == 0) {
    brushHue = 0;
  }

  brushHue += 1;
  stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
}

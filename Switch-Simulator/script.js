/* global createCanvas, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

// We'll use variables for most of our colors in this code-along.
let backgroundColor,
  color1,
  color2,
  textColor,
  globalBrightness,
  globalSaturation;

function setup() {
  // Canvas & color settings
  createCanvas(600, 500);
  colorMode(HSB, 360, 100, 100);
  noStroke(); // no edges drawn

  globalBrightness = 80;
  globalSaturation = 100;

  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  dayMode();
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.

  // Suggested saturation,brightness settings:
  // 50, 100: pastel
  // 100,100: neon
  // 100, 50: bold
  // 80, 80: neutral
}

function draw() {
  background(backgroundColor);

  // draws the lines seperating the switches
  drawCenterLines();

  // The red and blue circles:
  fill(color(111, globalSaturation, globalBrightness));
  ellipse(width / 4, height / 2, 50);
  fill(color(6, globalSaturation, globalBrightness));
  ellipse((3 * width) / 4, height / 2, 50);

  // changes lighting when mouse is over switch
  if (mouseX < width / 2 && mouseY > height / 2) {
    nightMode4(); //darkest
  } else if (mouseX > width / 2 && mouseY > height / 2) {
    nightMode3(); // second darkest
  } else if (mouseX > width / 2 && mouseY < height / 2) {
    nightMode2(); // third darkest
  } else {
    dayMode(); // brightest
  }

  // The grey circle and the text:
  fill(textColor);
  ellipse(mouseX, mouseY, 50);
  text('Flip the "switches"', 20, 20);
}

function drawCenterLines() {
  // This function will turn stroke on, draw the line, and then turn stroke
  // back off.
  // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
  stroke(textColor);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
  noStroke();
}

function nightMode4() {
  backgroundColor = color(111, 20, 0);
  textColor = color(95);
  globalBrightness = 10;
}

function nightMode3() {
  backgroundColor = color(30);
  textColor = color(95);
  globalBrightness = 30;
}

function nightMode2() {
  backgroundColor = color(60);
  textColor = color(95);
  globalBrightness = 50;
}

function dayMode() {
  backgroundColor = color(95);
  textColor = color(20);
  globalBrightness = 80;
}

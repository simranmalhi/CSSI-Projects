/*made with @christinawong and @kristynhan*/
/* global createCanvas, background, circle, key, rect, arc, strokeWeight, color, stroke, noFill, loadImage, image, tint, width, height, fill, colorMode, HSB, ellipse, random, noStroke, PI, text, textSize, textStyle, BOLD, textFont */

let gravity,
  startingX,
  startingY,
  yPosition,
  initialB,
  initialH,
  initialA,
  initialJ,
  topPipesX,
  topPipesHeight,
  bottomPipesX,
  bottomPipesHeight,
  endGame = false,
  startGame = false;

function setup() {
  colorMode(HSB, 360, 100, 100);

  initialH = 460;
  initialJ = 350;

  startingX = 100;
  startingY = height / 2;
  yPosition = startingY;

  gravity = 0;

  createCanvas(800, 600);

  // Creates pipes at the top and bottom
  topPipesX = [];
  topPipesHeight = [];
  bottomPipesX = [];
  bottomPipesHeight = [];

  for (var i = 0; i <= 9; i++) {
    topPipesX[i] = width + i * 100;
    topPipesHeight[i] = random(height / 7, height / 2);

    bottomPipesX[i] = width + i * 100;
    bottomPipesHeight[i] = random(height / 7, height / 3);
  }
}

function draw() {
  background(200, 40, 100);
  backgroundLayer();

  if (startGame && !endGame) {
    fill(0, 0, 0);
    textSize(20);
    textFont("Courier New");
    textStyle(BOLD);
    text("Use the up arrow to fly!", width / 3, 100);

    generatePipes();

    if (gravity < 10) {
      gravity++;
    }

    yPosition += gravity;

    if (yPosition >= (5 / 6) * height - 10) {
      yPosition = (5 / 6) * height - 10;
      endGame = true;
    }

    fill(60, 100, 100);
    circle(startingX, yPosition, 10);
  } else if (startGame == false) {
    fill(0, 0, 0);
    textSize(32);
    textFont("Courier New");
    textStyle(BOLD);
    text('Click to Start "Flappy Bird"!', width / 6, 100);

    fill(60, 100, 100);
    circle(startingX, yPosition, 10);
  } else if (startGame && endGame) {
    fill(0, 0, 0);
    textSize(32);
    textFont("Courier New");
    textStyle(BOLD);
    text("Game Over!", width / 3, 100);

    fill(60, 100, 100);
    circle(startingX, yPosition, 10);
  }
}

function keyPressed() {
  if (key == "ArrowUp" && gravity >= 0 && !endGame && startGame) {
    gravity *= -1;
    yPosition -= 40;
  }
}

function mousePressed() {
  startGame = true;
}

function backgroundLayer() {
  noStroke();

  
  //clouds
  fill(130, 5, 100);
  rect(0, height/2, width, height/3)
  clouds();
  
  //buildings
  fill(128, 8, 93);
  stroke(129, 8, 89);
  // buildings();
  var cluster = -50;
  for (var w = width; w > 0; w /= 8) {
    buildings(cluster);
    cluster += 250;
  }
  
  //bushes
  fill(128,30,96);
  rect(0, height - height/4, width, height/4);
  stroke(128, 30, 92);
  strokeWeight(4);
  
  var count = 30;
  for (var w = width; w > 0; w /= 8) {
    bushes(count);
    count += 120;
  }
  
  noStroke();
  fill(41, 22, 100);
  rect(0, height - height/6, width, height/6);
  
  fill(120, 100, 88);
  rect(0, height - height/6 - 10, width, 10);

}

function bushes(initialB) {
      //bush 1
      arc(initialB - 20, initialH - 15, 60, 60, PI, 2*PI);
      //bush 2
      arc(initialB + 30, initialH - 20, 60, 60, PI, 2*PI);
      //bush3
      arc(initialB - 35, initialH, 50, 40, PI, 2*PI);
      //bush 4
      arc(initialB + 35, initialH, 60, 60, PI, 2*PI);
      //bush5
      arc(initialB, initialH, 80, 80, PI, 2*PI);
}

function clouds() {
  ellipse(60, 275, 175, 175);
  ellipse(190, 330, 120, 120);
  ellipse(320, 300, 150, 150);
  ellipse(450, 275, 200, 200);
  ellipse(600, 250, 200, 200);
  ellipse(730, 300, 150, 150);
}

function buildings(initialA) {
  //building1
  rect(initialA + 25, initialJ - 20, 100, 200);  
  //building2
  rect(initialA, initialJ, 75, 200);
  //building3
  rect(initialA + 55, initialJ + 50, 50, 100);
  //building4
  rect(initialA + 125, initialJ - 10, 100, 200);
  //building5
  rect(initialA + 90, initialJ - 50, 100, 200);
}

function generatePipes() {
  fill(120, 100, 88);

  //print pipes at the top
  for (var i = 0; i <= 9; i++) {
    if (topPipesX[i] <= 0) {
      topPipesX[i] = width;
      topPipesHeight[i] = random(height / 7, height / 2);
    }

    rect(topPipesX[i], 0, 60, topPipesHeight[i]);
    topPipesX[i] -= 2;
    
    // checks to see if the bird hit the pipes and if yes, ends game
    if (yPosition <= topPipesHeight[i] && startingX >= topPipesX[i] && startingX <= (topPipesX[i] + 60)){
      endGame = true;
    }
  }

  // Print pipes at the bottom
  for (var i = 0; i <= 9; i++) {
    if (bottomPipesX[i] <= 0 ) {
      bottomPipesX[i] = width;
      bottomPipesHeight[i] = random(height / 7, height / 3);
    }
    
    rect(bottomPipesX[i], height, 60, -bottomPipesHeight[i]);
    bottomPipesX[i] -= 2;
    
    // checks to see if the bird hit the pipes and if yes, ends game
    if (yPosition >= (height - bottomPipesHeight[i]) && startingX >= bottomPipesX[i] && startingX <= (bottomPipesX[i] + 60)){
      endGame = true;
    }
  }
}
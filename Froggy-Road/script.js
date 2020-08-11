/* global keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectRect, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, ENTER, loadImage, image, key, textFont */

let backgroundColor,
  frog1,
  frog2,
  cars,
  score,
  lives,
  gameIsOver,
  barHeight,
  startGame;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500); // defines the canvas
  colorMode(HSB, 360, 100, 100); // sets the color mode to HSB
  backgroundColor = color(20, 20, 0); // defines the background color

  // gameplay variable initializations
  score = 0;
  lives = 3;
  gameIsOver = false;
  barHeight = 60;
  startGame = false;

  //set up frogs
  frog1 = new Frog(width / 4, loadImage("https://cdn.glitch.com/bc89f1b4-3a7c-4be0-b42a-2193a0dc5c55%2Ffrog.png?v=1595106017785"), 'w', 's', 'a', 'd');
  frog2 = new Frog(width / 2, loadImage("https://cdn.glitch.com/bc89f1b4-3a7c-4be0-b42a-2193a0dc5c55%2Ffrog%202.png?v=1595106459057"), UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW);

  // set up cars
  setUpCars();
}

function draw() {
  if (startGame == true) {
    // code for creating road and yellow rectangle
    createBackground();

    // Code to display frogs
    frog1.display();
    frog2.display();

    // code to display cars
    for (var i = 0; i < cars.length; i++) {
      cars[i].update();
      cars[i].display();
    }

    checkCollisions();
    checkWin();
    displayScores();
  } else {
    welcomePage();
  }
}

class Frog {
  constructor(x, img, forward, backward, left, right) {
    this.x = x;
    this.y = height / 50;
    this.v = 12;
    this.img = img;
    this.forward = forward;
    this.backward = backward;
    this.left = left;
    this.right = right;
  }

  display() {
    image(this.img, this.x, this.y, 50, 50);
  }
}

class Car {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.v = 2;
  }

  display() {
    image(this.img, this.x, this.y, 70, 70);
  }

  update() {
    this.x += this.v;
    if (this.x > width) {
      this.x = -20;
    }
  }
}

function welcomePage() {
  textFont("Georgia");
  text("Hello! Welcome to Froggy Road 2!", width / 3, 10);
  text("Your team score points by crossing the screen to the yellow rectangle.", width / 6, 40);
  text("Both players need to be touching the yellow rectangle to get a point.", width / 6, 70);
  text("Your team has 3 lives and you lose one if either of you gets hit by a car.", width / 6, 100);
  text("If a player gets hit by a car, both players move back to the starting point.", width / 6, 130);
  text("To move the green frog: type W (forward), S (backwards), A (left), and D (right)", width / 6, 160);
  text("To move the blue frog: use the arrow keys", width / 6, 190);
  text("!!!!Clarification: downward means towards the yellow road!!!!", width / 6, 220);
  text("Have fun! Press enter to start.", width / 3, 250);

  if (keyCode == ENTER) {
    startGame = true;
  }
}

function createBackground() {
  // code for creating road and lanes
  background(backgroundColor);
  fill(60, 0, 80);
  var xVal = 0;
  var yVal = 70;
  for (var c = 0; c < 4; c++) {
    for (var r = 0; r < 9; r++) {
      rect(xVal, yVal, 30, 10);
      xVal += 60;
    }
    yVal += 90;
    xVal = 0;
  }

  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, height - barHeight, width, height);
}

function setUpCars() {
  cars = [];
  var xPos = -10;
  var yPos = 80;

  for (var i = 0; i < 4; i++) {
    var carNum = random(2, 3);
    for (var l = 0; l < carNum; l++) {
      var carType = random(0, 4);
      if (carType <= 1) {
        cars.push(new Car(xPos, yPos, loadImage("https://cdn.glitch.com/bc89f1b4-3a7c-4be0-b42a-2193a0dc5c55%2Fcar1.png?v=1595124998954")));
      } else if (carType > 1 && carType <= 2) {
        cars.push(new Car(xPos, yPos, loadImage("https://cdn.glitch.com/bc89f1b4-3a7c-4be0-b42a-2193a0dc5c55%2Fcar2.png?v=1595125005405")));
      } else if (carType > 2 && carType <= 3) {
        cars.push(new Car(xPos, yPos, loadImage("https://cdn.glitch.com/bc89f1b4-3a7c-4be0-b42a-2193a0dc5c55%2Fcar3.png?v=1595125010785")));
      } else {
        cars.push(new Car(xPos, yPos, loadImage("https://cdn.glitch.com/bc89f1b4-3a7c-4be0-b42a-2193a0dc5c55%2Fcar4.png?v=1595125022912")));
      }
      xPos -= random(100, 200);
    } // end of inner loop
    xPos = -150;
    yPos += 90;
  } // end of outer loop
}

function keyPressed() {
  // ensures frogs can't move if game is over
  if (gameIsOver) {
    return;
  }

  // controls for frog 1
  if (key === frog1.forward) {
    frog1.y -= frog1.v;
  } else if (key === frog1.backward) {
    frog1.y += frog1.v;
  } else if (key === frog1.left) {
    frog1.x -= frog1.v;
  } else if (key === frog1.right) {
    frog1.x += frog1.v;
  }

  // controls for frog 2
  if (keyCode === frog2.forward) {
    frog2.y -= frog2.v;
  } else if (keyCode === frog2.backward) {
    frog2.y += frog2.v;
  } else if (keyCode === frog2.left) {
    frog2.x -= frog2.v;
  } else if (keyCode === frog2.right) {
    frog2.x += frog2.v;
  }
}

function displayScores() {
  textSize(12);
  fill(20, 0, 100);

  // Display Lives
  text(`Lives: ${lives}`, 10, 20);

  // Display Score
  text(`Score: ${score}`, 10, 40);

  // Display game over message if the game is over
  if (gameIsOver) {
    textSize(42);
    text("GAME OVER!", width / 5, height / 2);
    textSize(20);
    text("Refresh to play again :)", width / 4, height / 2 + 50);
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score, move frog back, set up cars again
  if (frog1.y + 45 > height - barHeight && frog2.y + 45 > height - barHeight) {
    score++;
    frog1.x = width / 4;
    frog1.y = height / 50;
    frog2.x = width / 2;
    frog2.y = height / 50;
    setUpCars();
  }
}

function checkCollisions() {
  // If a frog collides with the car, reset the frogs and subtract a life.
  for (var i = 0; i < cars.length; i++) {
    var hit1 = collideRectRect(cars[i].x + 15, cars[i].y + 30, 10, 10, frog1.x, frog1.y, 40, 40);
    var hit2 = collideRectRect(cars[i].x + 15, cars[i].y + 30, 10, 10, frog2.x, frog2.y, 40, 40);
    if (hit1 == true || hit2 == true) {
      frog1.x = width / 4;
      frog1.y = height / 50;
      frog2.x = width / 2;
      frog2.y = height / 50;
      lives--;
    }
    // if the frog has no more lives, game over
    if (lives == 0) {
      gameIsOver = true;
    }
  }
}

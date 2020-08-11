/* global collideCircleCircle, random, mouseIsPressed, clear, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, key, keyCode, ENTER*/

let backgroundColor, coinX, coinY, score, time, gameIsOver, hit;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  randomizeCoinPosition();
  time = 1000;
  gameIsOver = false;
  score = 0;
}

function draw() {
  if (key === "r") {
    background(backgroundColor);
    fill(58, 100, 80);
    ellipse(coinX, coinY, 20);
    ellipse(mouseX, mouseY, 20);

    fill(58, 100, 0);
    text(`Time remaining: ${time}`, 20, 40); // ` for string with variable ${} in it
    text(`Score: ${score}`, 20, 60);

    handleTime();
    handleCollision();

    if (gameIsOver == true) {
      text('Game Over! Type "r" to play again!', width / 4, height / 2);
    }
  } else {
    background(backgroundColor);
    text('Hello! Welcome to Coin Catch :)', width / 4, height / 5);
    text('Your goal is to catch as many coins as you can within the time range.', 15, height / 4);
    text('To catch a coin, touch the coin with your cursor and your score will increase', 0, height / 3);
    text('Type "r" to start and press any other key to return to this screen. Good luck!', 0, height / 2);
  }
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20); // returns true or false

  // randomize new coin position and increment score
  if (hit == true && gameIsOver == false) { // or !gameIsOver
    randomizeCoinPosition();
    score++;
  }
}

function randomizeCoinPosition() {
  coinX = random(width);
  coinY = random(height);
}

// restarts game
function keyTyped() {
  if (key === "r") {
    time = 1000;
    score = 0;
    randomizeCoinPosition();
    gameIsOver = false;
  }
}

function handleTime() {
  // We'll write code to handle the time.
  if (time > 0) {
    time--;
  } else {
    gameIsOver = true;
  }
}

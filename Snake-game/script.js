/* global collideRectRect, frameRate, noFill, round, sqrt, windowWidth, windowHeight, keyCode, keyIsDown, keyIsPressed, SHIFT, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, key, ENTER */

let backgroundColor, playerSnake, currentApple, score, lives, gameIsOver, introScreen;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(12);
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
  lives = 5;
  gameIsOver = false;
  introScreen = true;
}

function draw() {
  if(introScreen) {
    displayIntroScreen();
  } else {
    background(backgroundColor);
    playerSnake.moveSelf();
    playerSnake.showSelf();
    playerSnake.checkApples();
    playerSnake.checkTailCollision();
    currentApple.showSelf();
    displayScore();
    gameOver();
  }
}

function displayIntroScreen() {
  text("Hello! Welcome to a simplified version of 'Snake'.", width / 90, height / 6);
  text("Collect apples to increase your score.", width / 90, height / 6 + 20);
  text("Don't touch your tail! I mean that.", width / 90, height / 6 + 40);
  text("You have 5 lives, and you lose one each time the snake touches the wall.", width / 90, height / 6 + 60);
  text("Have fun! Press enter to start :)", width / 90, height / 6 + 80);
  
  if(keyCode === ENTER) {
    introScreen = false;
  }
}

function displayScore() {
  fill(0);
  text(`Lives: ${lives}`, 20, 20);
  text(`Score: ${score}`, 20, 35);
  noFill();
}

class Snake {
  constructor() {
    this.size = 12;
    this.x = width / 2;
    this.y = height - 22;
    this.direction = "N";
    this.speed = 12;
    this.tail = [new TailSegment(this.x, this.y)];
  }

  moveSelf() {
    if (gameIsOver) {
      return;
    }

    if (this.checkWallCollisions()) {
      this.x = width / 2;
      this.y = height - 22;
      this.direction = "N";
    }

    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    }
    
    // move the tail
    this.tail.unshift(new TailSegment(this.x, this.y));
    this.tail.pop();
  }

  showSelf() {
    stroke(138, 100, 43);
    fill(119, 80, 80);
    rect(this.x, this.y, this.size, this.size);
    for (var i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
    noStroke();
  }

  checkApples() {
    // see if we're colliding with an apple
    let hit = collideRectRect(this.x, this.y, this.size, this.size, currentApple.x, currentApple.y, currentApple.size, currentApple.size);
    if (hit) {
      // increment the score
      score++;
      // make a new random apple
      currentApple = new Apple();
      // extend the tail
      this.extendTail();
    }
  }

  checkWallCollisions() {
    // checks to see if snake hit wall
    if (this.x <= 0 || this.x >= width - 10 || this.y >= height || this.y <= 0) {
      lives--;
      currentApple = new Apple();
      return true;
    }
  }

  checkTailCollision() {
    // checks to see if snake hit itself
    if (this.tail.length > 2) {
      for (var i = 1; i < this.tail.length; i++) {
        if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
          gameIsOver = true;
        }
      }
    }
  }

  extendTail() {
    // create a new segment
    let lastTailSegment = this.tail[this.tail.length - 1];
    
    // add it to the array---- push a new tail segment to the end, using same positon as current last segment
    this.tail.push(new TailSegment(lastTailSegment.x, lastTailSegment.y));
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 12;
    this.color = color(119, 80, 80);
  }

  showSelf() {
    stroke(138, 100, 43);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);    
    noStroke();
  }
}

class Apple {
  constructor() {
    this.size = 10;
    this.x = random(width - 12);
    this.y = random(height - 12);
    this.color = color(0, 80, 80);
  }

  showSelf() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    noFill();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else if (keyCode === SHIFT) {
    playerSnake.extendTail();
  }
}

function restartGame() {
  if (key === "r" || key === "R") {
    gameIsOver = false;
    lives = 5;
    score = 0;
    playerSnake = new Snake();
    currentApple = new Apple();
  }
}

function gameOver() {
  if (lives == 0 || gameIsOver == true) {
    gameIsOver = true;
    endScreen();
    restartGame();
  }
}

function endScreen() {
  fill(0);
  textSize(40);
  text("Game Over!", width / 4, height / 3);
  textSize(24);
  text("Type r to play again!", width / 4, height / 2);
  textSize(12);
  noFill();
}

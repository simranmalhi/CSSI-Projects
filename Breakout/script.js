/* global createCanvas, background, rect, fill, colorMode, HSB, noFill, random, width, height, keyCode, ellipse, collideRectCircle, collideLineCircle, noStroke, mouseX, mouseY, color, text, PI, tan, round, textSize, textFont, ENTER, UP_ARROW, DOWN_ARROW, createInput, button, createButton, windowWidth, windowHeight*/
// created with dawnmai

let blocks,
  score,
  lives,
  playerPaddle,
  playerBall,
  gameIsOver,
  backgroundColor,
  level,
  startGame,
  loadInstructions,
  inp,
  username;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);

  // initializes variables at the beginning of the game
  score = 0;
  lives = 3;
  level = 1;
  startGame = false;
  gameIsOver = false;
  loadInstructions = false;
  backgroundColor = color(0, 0, 95);
  playerPaddle = new Paddle();
  playerBall = new Ball();
  inp = createInput("");
  button = createButton("submit");
  username = "";

  setUpBlocks(); // sets up the blocks at the beginning of the game
}

function draw() {
  background(backgroundColor);
  if (startGame == true && gameIsOver == false) {
    // run the game
    displayText();

    // displays all of the blocks in the array
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].show();
    }

    // game operations
    playerPaddle.show();
    playerBall.show();
    playerBall.move();
    playerBall.checkBlockCollision();
    playerBall.checkPaddleCollision();
    playerBall.checkWallCollision();

    checkNextLevel(); // if all of the blocks are eliminated from the screen, the player reaches the next level and the blocks are re-set
    isGameOver(); // checks to see if the game is over
  } else if (startGame == false && loadInstructions == false && gameIsOver == false) {
    welcomePage(); // displays opening screen
  } else if (startGame == false && loadInstructions == true && gameIsOver == false) {
    instructionsPage(); // displays instructions
  } else if (gameIsOver == true) {
    gameOverPage(); // displays game over page if game is over
  }
}

function welcomePage() {
  textSize(45);
  textFont("Georgia");
  text("Hello! Welcome to Breakout!!", width / 3 - 60, height / 5);
  
  // displays text box for user to type in name, which will be displayed at the end
  textSize(30);
  text("Please enter your username here:", width / 3, height / 3 + 60);
  inp.position(width / 3 + 70, height / 3 + 105);
  inp.size(300, 30);

  // displays button so that when clicked, the value typed in the input box is saved
  button.position(inp.x + inp.width, inp.y);
  button.size(90, 30);
  button.mousePressed(saveName);

  // confirms username with user in case they change it
  text(`Your username is: ${username}`, width / 3 + 20, height / 3 + 190);
  
  // moves to the instructions page
  text("Press Enter to continue to the instructions.", width / 4 + 60, height / 2 + 200);
  if (keyCode == ENTER) {
    loadInstructions = true;
  }
}

function saveName() {
  username = inp.value();
}

function instructionsPage() {
  // removes the text box and button
  inp.remove();
  button.remove();
  
  // prints the instructions
  textSize(45);
  text("Instructions:", width / 3 + 60, 70);
  textSize(25);
  text("The goal of the game is to destroy the blocks on the screen.", width / 10, 180);
  text("The blocks on the screen are eliminated when the ball hits them.", width / 10, 270);
  text("Move the paddle with your mouse to ensure that the ball doesn't touch the bottom of the screen.", width / 10, 340);
  text("You lose lives when the ball touches the bottom of the screen.", width / 10, 410);
  
  // moves to the game screen
  text("Have fun! Press the Up Arrow to start the game :)", width / 10, 480);
  if (keyCode == UP_ARROW) {
    startGame = true;
  }
}

function gameOverPage() {
  // displays player stats at the end of the game
  textSize(45);
  text(`Game Over, ${username}!`, width / 3 + 30, height / 3);
  textSize(30);
  text(`Summary: Level ${level}; ${score} Points`, width / 4 + 160, height / 3 + 100);
  text("Press the Down Arrow or refresh to play again", width / 4 + 70, height / 3 + 200);

  // resets the game if the down arrow is pressed
  if (keyCode == DOWN_ARROW) {
    startGame = false;
    loadInstructions = false;
    gameIsOver = false;
    setUpBlocks();
    score = 0;
    lives = 3;
    level = 1;
    playerPaddle = new Paddle();
    playerBall = new Ball();
    inp = createInput("");
    button = createButton("submit");
    username = "";
  }
}

function displayText() {
  textSize(25);
  text(`Level: ${level}`, 5, 20);
  text(`Score: ${score}`, 5, 50);
  text(`Lives: ${lives}`, 5, 80);
}

function setUpBlocks() {
  blocks = []; // an array to contain objects of Block
  var xPos = 5;
  var yPos = 90;
  var counter = 0;
  var rows = random(5, 8);

  // creates blocks and puts them in an array
  for (var i = 0; i < rows; i++) {
    if (xPos >= width - 55) {
      xPos = 5;
      yPos += 35;
    }

    do {
      blocks.push(new Block(xPos, yPos));
      xPos += blocks[counter].width + 3;
      counter++;
    } while (xPos <= width - 45);
  } // end of for loop
}

function checkNextLevel() {
  // increases and sets up the level if the player destroys all of the blocks
  let counter = 0;
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].color == backgroundColor) {
      counter++;
    }
  }
  
  // if all blocks are cleared, the player levels up and the ball goes faster
  if (counter == blocks.length) {
    level++;
    setUpBlocks();
    playerBall = new Ball();
    playerPaddle = new Paddle();
  }
}

function isGameOver() {
  if (lives == 0) {
    gameIsOver = true;
  }
}

// Ball class
class Ball {
  // constructor
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight - windowHeight / 6, windowHeight - 10);

    // increases the velocity of the ball as the levels increase
    if (level == 1) {
      this.velocity = 5;
    } else if (level == 2) {
      this.velocity = 7;
    } else if (level == 3) {
      this.velocity = 9;
    } else {
      this.velocity = 11;
    }

    // initializes the starting angle for the ball to launch from
    this.angle = random(0, PI);
    // sets the size of the ball
    this.size = 20;
  }
  
  // methods
  show() {
    fill(0, 100, 100);
    ellipse(this.x, this.y, this.size);
  }

  move() {
    // x position of the ball travels at the x component of the general velocity
    this.x += this.velocity * Math.cos(this.angle);
    // y position of the ball travels at the y component of the general velocity
    this.y -= this.velocity * Math.sin(this.angle);
  }

   // sets the angle of the ball's path to be between 0 and 180 degrees (upwards, left or right)
  randomMoveUp() {
    this.angle = random(0, PI);
  }
  
  // sets the angle of the ball's path to be between 180 and 360 degrees (downwards, left or right)
  randomMoveDown() {
    this.angle = random(-PI, 0);
  }
  
  // sets the angle of the ball's path to be between 90 and 180 degrees, plus or negative (up left or down left)
  randomMoveLeft() {
    this.angle = random([-1, 1]) * random(PI/2, PI);
  }
  
  // sets the angle of the ball's path to be between 270 and 90 degrees (up right or down right)
  randomMoveRight() {
    this.angle = random(-PI/2, PI/2);
  }
  
  // ball will move at a random angle if it hits the walls of the canvas
  checkWallCollision() {
    if (this.x <= 0) {
      this.randomMoveRight();
      
    } else if (this.x >= width) {
      this.randomMoveLeft();
    }

    if (this.y <= 90) {
      this.randomMoveDown();
    } 

  // player loses a life if the ball touches the bottom of the canvas (and the ball comes back)
    if (this.y > height) {
      lives--;
      playerBall = new Ball();
    }
  }

  checkBlockCollision() {
    for (var i = 0; i < blocks.length; i++) {
      let hit = collideRectCircle(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height, this.x, this.y, this.size);
      if (hit == true && blocks[i].color != backgroundColor) {
        score += 5;
        // determines the angle which the ball bounces based on where it hits the block
        if (this.y + this.size < blocks[i].y) {
          this.randomMoveUp();
        }
        else if (this.y + this.size > blocks[i].y + blocks[i].height) {
          this.randomMoveDown();
        }
        else if (this.x + this.size < blocks[i].x) {
          this.randomMoveLeft();
        }
        else if (this.x + this.size > blocks[i].x + blocks[i].width) {
          this.randomMoveRight();
        }
        // removes the block
        blocks[i].removeBlock();
      }
    }
  }

  checkPaddleCollision() {
    let hit2 = collideLineCircle(mouseX, playerPaddle.y, mouseX + playerPaddle.width, playerPaddle.y, this.x, this.y, this.size);
    // ball wil bounce back up if it hits the paddle
    if (hit2) {
        this.randomMoveUp();
    }
  }
}

// Paddle class
class Paddle {
  // constructor
  constructor() {
    this.x = random(width - 10);
    this.y = height - 20;
    this.width = 100;
    this.height = 20;
    this.velocity = 5;
  }
  // method
  show() {
    fill(270, 100, 100);
    rect(mouseX, height - this.height, this.width, this.height);
  }
}

// Block class
class Block {
  // constructor, takes in an x and y position
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = random(45, 85);
    this.height = 30;
    this.color = color(5, 100, 87);
  }
  // methods
  show() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    noFill();
  }

  // "removes" a block by changing its color to the background color
  removeBlock() {
    this.color = color(backgroundColor);
  }
}

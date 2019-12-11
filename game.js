var tileMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
////1 is wall
////0 is floor
var rows, cols;
var cellWidth, cellHeight;

var left, right, up, down;
var s;
var art;
var sheet;
var objects;
var combatArt;
var characterChoice;

var pickups = [];
var score;

var gameState;

const SKIN = 0;
const BOY = 3;
const GIRL = 6;
const BONE = 9;

const SLIME = 0;
const BAT = 3;
const GHOST = 6;
const SPIDER = 9;

var enemies = [];

var goal;

var gameTimer;
var maxTime, currentTime;
var timerStartCounting;

var eightBitFont;
var currentEnemy;

// import processing.sound.*;
var music;
var sfxPunch;
var sfxKick;
var sfxStare;
var sfxWalk;

var enemySounds = [];

function preload() {
  eightBitFont = loadFont("data/fonts/8-Bit-Madness.ttf");
  sheet = loadImage("data/images/characters2x.png");
  objects = loadImage("data/images/pickups.png");
  combatArt = loadImage("data/images/combat.png");
  characterChoice = loadImage("data/images/characterChoice.png");

  //sounds
  //sfx
  sfxPunch = loadSound("data/sounds/punch.mp3");
  sfxKick = loadSound("data/sounds/kick.mp3");
  sfxStare = loadSound("data/sounds/stare.mp3");
  sfxWalk = loadSound("data/sounds/walk.mp3");

  //monsters
  enemySounds[0] = loadSound("data/sounds/slime.mp3");
  enemySounds[1] = loadSound("data/sounds/bat.mp3");
  enemySounds[2] = loadSound("data/sounds/ghost.mp3");
  enemySounds[3] = loadSound("data/sounds/spider.mp3");

  //music
  music = loadSound("data/sounds/bitQuest.mp3");
  music.setLoop(true);
  //music.loop();

}

function setup() {
  createCanvas(640, 640);
  background(0);
  smooth();
  noStroke();
  rows = 20;
  cols = 20;
  cellWidth = 32;
  cellHeight = 32;
  s = new Sprite(BOY);
  //art = loadImage("mazeart.png");

  gameState = "START";

  //pickupType values
  //0 = coin
  //1 = gem
  // pickups = new Pickup[4];
  pickups[0] = new Pickup(1, 10 * 32, 7 * 32);
  pickups[1] = new Pickup(0, 12 * 32, 7 * 32);
  pickups[2] = new Pickup(1, 14 * 32, 7 * 32);
  pickups[3] = new Pickup(0, 16 * 32, 7 * 32);

  score = 0;

  goal = createVector(19 * cellWidth, 7 * cellHeight);

  gameTimer = new Timer(1000);
  maxTime = 100;
  currentTime = maxTime;
  timerStartCounting = false;

  //art type, x, y, collide with walls
  enemies[0] = new Enemy(SLIME, 4 * 32, 3 * 32, true);
  enemies[1] = new Enemy(BAT, 8 * 32, 3 * 32, false);
  enemies[2] = new Enemy(GHOST, 4 * 32, 18 * 32, false);
  enemies[3] = new Enemy(SPIDER, 15 * 32, 15 * 32, false);
  //REMOVE LATER
  //currentEnemy = enemies[0];
  // eightBitFont = createFont("data/fonts/8-Bit-Madness.ttf", 64);
  textFont(eightBitFont);

}

function draw() {
  textSize(24);
  if (gameState == "START") {
    stateStart();
  } else if (gameState == "PLAY") {
    statePlay();
  } else if (gameState == "WIN") {
    stateWin();
  } else if (gameState == "LOSE") {
    stateLose();
  } else if (gameState == "RESET") {
    stateReset();
  } else if (gameState == "COMBAT") {
    stateCombat(currentEnemy);
  } else {
    println("something went wrong with the state");
  }
}

function stateStart() {
  background(100, 100, 255);
  fill(255);
  textAlign(CENTER);
  textSize(48);
  text("Choose your Character", width / 2, height / 2 - 100);
  textAlign(LEFT);
  copy(characterChoice, 0, 0, 128, 128, 28, 300, 128, 128);
  copy(characterChoice, 128, 0, 128, 128, 180, 300, 128, 128);
  copy(characterChoice, 256, 0, 128, 128, 332, 300, 128, 128);
  copy(characterChoice, 384, 0, 128, 128, 484, 300, 128, 128);
  if (mouseIsPressed && boxMouseIntersect(28,300,128,128)) {
    characterToPlay(SKIN);
  }
  if (mouseIsPressed && boxMouseIntersect(180,300,128,128)) {
    characterToPlay(BOY);
  }
  if (mouseIsPressed && boxMouseIntersect(332,300,128,128)) {
    characterToPlay(GIRL);
  }
  if (mouseIsPressed && boxMouseIntersect(484,300,128,128)) {
    characterToPlay(BONE);
  }
}

function characterToPlay(characterType) {
  s = new Sprite(characterType);
  if (!music.isPlaying()) {
    // music.play();
  }
  gameState = "PLAY";
}

function statePlay() {
  //image(art,0,0);
  //clear background
  background(0);

  //draw the maze artwork
  renderMap();

  s.update();
  checkWallCollisions(s);
  s.display();

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();
    if (enemies[i].collider == true) {
      checkWallCollisions(enemies[i]);
    }
    if (rectangleIntersect(s, enemies[i]) == true) {
      currentEnemy = enemies[i];
      gameState = "COMBAT";
    }
    enemies[i].display();
  }

  if (dist(goal.x, goal.y, s.x, s.y) < 1) {
    gameState = "WIN";
  }

  for (var i = 0; i < pickups.length; i++) {
    pickups[i].display();
    if (rectangleIntersect(s, pickups[i]) == true) {
      score += pickups[i].scoreValue;
      pickups[i].hide();
    }
  }
  if (gameTimer.complete() && gameState == "PLAY" && timerStartCounting == true) {
    if (currentTime < 5) {
      background(255, 0, 0);
    }
    currentTime--;
    console.log("counting");
    if (currentTime > 0) {
      gameTimer.start();
    } else {
      gameState = "LOSE";
    }
  } else if (!timerStartCounting) {
    fill(0, 200);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER);
    text("Press any KEY to Begin", width / 2, height / 2);
    textAlign(LEFT);
  }

  //UI
  fill(255);
  textAlign(LEFT);
  text("Score: " + score, 32, 16);
  text("Time: " + currentTime, 32 * 6, 16);

  fill(255, 0, 0, 200);
  rect(goal.x, goal.y, cellWidth, cellHeight);
}

///////////////////////////////
function stateWin() {
  stopSFX();
  background(0, 255, 0);
  fill(255);
  textAlign(CENTER);
  text("Winner, Winner, Chicken Dinner", width / 2, height / 2 - 200);
  textAlign(LEFT);
  ellipse(width / 2, height / 2-100, 100, 100);
  if (mouseIsPressed && circleMouseIntersect(width / 2-100, height / 2, 50) ) {
    gameState = "RESET";
  }
}

function stateLose() {
  stopSFX();
  background(255, 0, 0);
  fill(255);
  textAlign(CENTER);
  text("Loser all day long", width / 2, height / 2 - 200);
  textAlign(LEFT);
  ellipse(width / 2, height / 2-100, 100, 100);
  if (mouseIsPressed && circleMouseIntersect(width / 2-100, height / 2, 50) ) {
    gameState = "RESET";
  }
}

function stateReset() {
  score = 0;
  s.reset();
  currentTime = maxTime;
  timerStartCounting = false;
  for (var i = 0; i < pickups.length; i++) {
    pickups[i].reset();
  }
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].reset();
  }
  gameState = "START";
}

function stopSFX() {
  sfxWalk.stop();
  for (var i = 0; i < enemySounds.length; i++) {
    enemySounds[i].stop();
  }
}



function renderMap() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      // noStroke();
      switch (tileMap[i][j]) {
        case 0:
          //floor
          fill(100, 200, 0, 255);
          rect(j * cellWidth, i * cellHeight, 64, 64);
          break;
        case 1:
          //wall
          fill(200, 100, 0, 255);
          rect(j * cellWidth, i * cellHeight, 64, 64);
          break;
        default:
          println("You did not make the map right.");
      }
    }
  }
}


function keyPressed() {
  if (gameState == "PLAY" && !timerStartCounting) {
    timerStartCounting = true;
  }

  switch (keyCode) {
    case 37: //left
      left = true;
      break;
    case 39: //right
      right = true;
      break;
    case 38: //up
      up = true;
      break;
    case 40: //down
      down = true;
      break;
  }
}

function keyReleased() {
  switch (keyCode) {
    case 37: //left
      left = false;
      break;
    case 39: //right
      right = false;
      break;
    case 38: //up
      up = false;
      break;
    case 40: //down
      down = false;
      break;
  }
}

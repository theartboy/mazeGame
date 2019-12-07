function Enemy(character, startX, startY, wall) {
  this.x = startX;
  this.y = startY;
  this.w = cellSize;
  this.h = cellSize;
  this.sx = 0;
  this.sy = 0;
  this.row = 0;
  this.vx = 0;
  this.vy = 0;
  //characters SLIME, BAT, GHOST, SPIDER
  this.type = character / 3; //new to store character type for audio
  this.offsetX = character * 32;
  this.offsetY = 4 * 32;
  this.totalFrames = 3;
  this.currentFrame = 0;

  this.delay = 4;
  this.hold = 0;

  this.collider = wall;

  this.moveLeft = false;
  this.moveUp = false;
  this.moveRight = false;
  this.moveDown = false;
  this.speed = 1;

  //actions[0] = "Rock";
  //actions[1] = "Paper";
  //actions[2] = "Scissors";
  this.dead = false;

  this.actions = [];

  switch (character) {
    case SLIME:
      this.actions[0] = "Acid Dissolve";
      this.actions[1] = "Suffocate";
      this.actions[2] = "Melt";
      break;

    case BAT:
      this.actions[0] = "Bite";
      this.actions[1] = "Wing Buffet";
      this.actions[2] = "Screech";
      break;

    case GHOST:
      this.actions[0] = "Scare";
      this.actions[1] = "Haunt";
      this.actions[2] = "Possess";
      break;

    case SPIDER:
      this.actions[0] = "Venom Bite";
      this.actions[1] = "Web Wrap";
      this.actions[2] = "Leg Crush";
      break;
  }

  this.hide = function() {
    this.x = 0;
    this.y = 0;
    this.dead = true;
  }
  this.update = function() {
    if (dist(s.x, s.y, this.x, this.y) < 200*cellSize/32 && !this.dead) {
      if (abs(s.x - this.x) < abs(s.y - this.y)) {
        //close y gap
        if (this.y < s.y) {
          this.moveUp = false;
          this.moveDown = true;
          // println("down");
        } else {
          this.moveUp = true;
          this.moveDown = false;
          // println("up");
        }
      } else {
        //close x gap
        if (this.x < s.x) {
          this.moveLeft = false;
          this.moveRight = true;
          // println("right");
        } else {
          this.moveLeft = true;
          this.moveRight = false;
          // println("left");
        }
      }
    } else {
      //not close so stop moving
      this.moveLeft = false;
      this.moveUp = false;
      this.moveRight = false;
      this.moveDown = false;
    }

    if (this.moveLeft && !this.moveRight) {
      this.vx = -1;
      this.row = 1;
    }
    if (this.moveRight && !this.moveLeft) {
      this.vx = 1;
      this.row = 2;
    }
    if (!this.moveLeft && !this.moveRight && !this.moveUp && !this.moveDown) {
      this.vx = 0;
      this.vy = 0;
      //row = 0;
      this.currentFrame = 1;
    }
    if (this.moveUp && !this.moveDown) {
      this.vy = -1;
      this.row = 3;
    }
    if (this.moveDown && !this.moveUp) {
      this.vy = 1;
      this.row = 0;
    }


    this.x += this.vx;
    this.y += this.vy;

    this.sx = this.currentFrame * 32;//this.w;
    this.sy = this.row * 32;//this.h;

    if (this.vx == 0 && this.vy == 0) {
      if (enemySounds[this.type].isPlaying()) {
        enemySounds[this.type].pause();
      }
    } else if (!enemySounds[this.type].isPlaying()) {
      enemySounds[this.type].loop();
    }
  }

  this.display = function() {
    copy(sheet, this.sx + this.offsetX, this.sy + this.offsetY, 32, 32, this.x, this.y, this.w, this.h);

    this.hold = (this.hold + 1) % this.delay;
    if (this.hold == 0) {
      this.currentFrame++;
      if (this.currentFrame == this.totalFrames) {
        this.currentFrame = 0;
      }
    }
  }
}

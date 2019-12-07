function Sprite(character) {
  this.x = width / 2;
  this.y = 320;
  this.w = cellSize;
  this.h = cellSize;
  this.sx = 0;
  this.sy = 0;
  this.row = 0;
  this.vx = 0;
  this.vy = 0;
  //characters SKIN, BOY, GIRL, BONE
  this.offsetX = character * 32;
  this.offsetY = 0 * 32;
  this.totalFrames = 3;
  this.currentFrame = 0;

  this.delay = 4;
  this.hold = 0;

  this.actions = [];
  this.actions[0] = "Punch";
  this.actions[1] = "Kick";
  this.actions[2] = "Wink";

  this.update = function() {
    if (left && !right && !up && !down) {
      this.vx = -2;
      this.row = 1;
    }

    if (right && !left && !up && !down) {
      this.vx = 2;
      this.row = 2;
    }

    if (!left && !right) {
      this.vx = 0;
    }

    if (!left && !right && !up && !down) {
      this.vx = 0;
      this.vy = 0;
      //row = 0;
      this.currentFrame = 1;
    }

    if (up && !down && !left && !right) {
      this.vy = -2;
      this.row = 3;
    }

    if (down && !up && !left && !right) {
      this.vy = 2;
      this.row = 0;
    }

    if (!up && !down) {
      this.vy = 0;
    }


    this.x += this.vx;
    this.y += this.vy;

    this.sx = this.currentFrame * 32;//this.w;
    this.sy = this.row * 32;//this.h;
    if (this.vx == 0 && this.vy == 0) {
      if (sfxWalk.isPlaying()) {
        sfxWalk.pause();
      }
    } else if (!sfxWalk.isPlaying()) {
      sfxWalk.loop();
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

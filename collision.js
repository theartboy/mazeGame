//sprite to wall collision
//sprite must have x,y,w,h
//wall must have cellWidth, cellHeight and the map rows, cols
function checkWallCollisions(s) {
  var collisionSide = "";
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      //check if the tile is a wall
      if (tileMap[i][j] == 1) {
        //determine the distance apart on the X axis
        var distX = floor((s.x + s.w / 2) - (j * cellWidth + cellWidth / 2));
        //determine the distance apart on the Y axis
        var distY = floor((s.y + s.h / 2) - (i * cellHeight + cellHeight / 2));
        //determine the sum of the half width of the object and the wall
        var combinedHalfWidths = floor(s.w / 2 + cellWidth / 2);
        //determine the sum of the half height and the wall
        var combinedHalfHeights = floor(s.h / 2 + cellHeight / 2);
        //check if they are overlapping on the X axis
        if (abs(distX) < combinedHalfWidths) {
          //check if they are overlapping on the Y axis
          //if so, a collision has occurred
          if (abs(distY) < combinedHalfHeights) {
            //compute the overlap of the object and the wall
            //on both the X and Y axes
            var overlapX = combinedHalfWidths - abs(distX);
            var overlapY = combinedHalfHeights - abs(distY);
            //the collision occurred on the axis with the smallest overlap
            if (overlapX >= overlapY) {
              //because distY is the object Y minus the wall Y
              //a positive value indicates the object started below
              //the wall and was moving up when the collision occurred
              //so it has hit its top into the wall
              if (distY > 0) {
                collisionSide = "TOPSIDE";
                //move the object down so it is no longer overlapping the wall
                s.y += overlapY;
              } else {
                collisionSide = "BOTTOMSIDE";
                //move the object up so it is no longer overlapping the wall
                s.y -= overlapY;
              }
            } else {
              //same logic as the Y axis collision
              if (distX > 0) {
                collisionSide = "LEFTSIDE";
                //move the object to the right so it is no longer overlapping the wall
                s.x += overlapX;
              } else {
                collisionSide = "RIGHTSIDE";
                //move the object to the left so it is no longer overlapping the wall
                s.x -= overlapX;
              }
            }
          } else {
            collisionSide = "NONE";
          }
        }
      }
    }
  }
}

/////////////////////////////
//box to box collision
//both objects must have x,y,w,h
function rectangleIntersect(r1, r2) {
  //what is the distance apart on x-axis
  var distanceX = (r1.x + r1.w / 2) - (r2.x + r2.w / 2);
  //what is the distance apart on y-axis
  var distanceY = (r1.y + r1.h / 2) - (r2.y + r2.h / 2);

  //what is the combined half-widths
  var combinedHalfW = r1.w / 2 + r2.w / 2;
  //what is the combined half-heights
  var combinedHalfH = r1.h / 2 + r2.h / 2;

  //check for intersection on x-axis
  if (abs(distanceX) < combinedHalfW) {
    //check for intersection on y-axis
    if (abs(distanceY) < combinedHalfH) {
      //huzzah they are intersecting
      return true;
    }
  }
  return false;
}

/////////////////////////////
//mouse to box collision
//box object must have x,y,w,h
function boxMouseIntersect(locX, locY, boxW, boxH) {
  if (mouseX > locX && mouseX < locX +boxW &&
    mouseY > locY && mouseY < locY + boxH) {
    return true;
  } else {
    console.log("click bad");
    return false;
  }

}

/////////////////////////////
//mouse to circle collision
//circle object must have x,y,r
function circleMouseIntersect(locX, locY, radius) {
  if (dist(mouseX, mouseY, locX, locY) < radius) {
    return true;
  } else {
    return false;
  }
}

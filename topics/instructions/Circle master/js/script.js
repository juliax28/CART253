/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {

}


const puck = {
    x: 350,
    y: 350,
    size: 100,
    fill: "#ff0000"
  };
  
  const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#000000"
  };
  
  /**
   * Create the canvas
   */
  function setup() {
    createCanvas(400, 400);
  }
  
  /**
   * Move the user circle, check for overlap, draw the two circles
   */
  function draw() {
    background("#aaaaaa");
    
    // Move user circle
    moveUser();
    movePuck();
    
    // Draw the user and puck
    drawUser();
    drawPuck();
  }
  
  /**
   * Sets the user position to the mouse position
   */
  function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
  }
  
  /**
   * Displays the user circle
   */
  function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
  }
  
  /**
   * Displays the puck circle
   */
  function drawPuck() {
    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);
    pop();
  }
  
  function MovePuck
  {
    const d = dist(user.x, user.y, puck.x, puck.y);
    const overlap = (d < user.size/ 2 + puck.size / 2);
    if (overlap) {
        const dx = user.x - puck.x;
        const dy = user.y - puck.y;
        if (abs (x) < abs(y)){
            //It's closer on x
            if (dx < 0){
                puck.x += 5;
            }
            else if (dx > 0){
                puck.x -= 5;
            }

        }
        else {
            if (dy < 0) {
                
            }
        }
    }
  }
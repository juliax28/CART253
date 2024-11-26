/**
 * VampWalk
 * Julia Axiuk
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";



/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
let state = "title"


const vampSprites = {
  left: undefined,
  right: undefined,
  up: undefined,
  down: undefined,
  idle: undefined,

};

function preload() {
  vampSprites.left = loadImage("assets/images/vampLeft.PNG")
  vampSprites.right = loadImage("assets/images/vampRight.PNG")
  vampSprites.up = loadImage("assets/images/vampUp.PNG")
  vampSprites.down = loadImage("assets/images/vampDown.PNG")
  vampSprites.idle = loadImage("assets/images/vampDown.PNG")
};

let vamp = {
  x: 200,
  y: 200,
  sprite: undefined,
  speed: 1,
  velocity: 4,
  size: 20,

};

let path = {
  x: 200,
  y: 200,
  width: 55,
  height: 55,
};




function setup() {
  createCanvas(580, 240);
  vamp.sprite = vampSprites.idle;
};


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/

function draw() {
  if (state === "title") {
    title();

  }
  if (state === "game")
    game();

  if (state === "gameOver") {
    gameOverHunger();

  }
}

//draw the vamp
function title() {
  background("#ad2222");
}

function mousePressed() {
  if (state === "title") {
    state = "game";
  }
}


function game() {
  background("#000000");
  drawPath();
  moveVamp();
  drawVamp();
  checkVampPathOverlap();

}
function drawVamp() {
  push();
  ellipse(vamp.x, vamp.y, vamp.size)
  fill("#FFFFFF");
  imageMode(CENTER);
  image(vamp.sprite, vamp.x, vamp.y);
  pop();

}



function drawPath() {
  push();
  fill("#807676");
  rectMode(CENTER);
  rect(path.x, path.y, path.height, path.width);
  pop();
}

//move the vamp

function moveVamp() {
  let animated = false;
  if (keyIsDown(LEFT_ARROW) === true) {
    vamp.x -= 1;
    vamp.sprite = vampSprites.left;
    animated = true;
  }


  if (keyIsDown(RIGHT_ARROW) === true) {
    vamp.x += 1;
    vamp.sprite = vampSprites.right;
    animated = true;
  }



  if (keyIsDown(UP_ARROW) === true) {
    vamp.y -= 1;
    vamp.sprite = vampSprites.up;
    animated = true;
  }

  if (keyIsDown(DOWN_ARROW) === true) {
    vamp.y += 1;
    vamp.sprite = vampSprites.down;
    animated = true;
  }
  if (animated === false) {
    resetSprite();
  }

}

function resetSprite() {
  vamp.sprite = vampSprites.idle;

}
function checkVampPathOverlap() {
  // First: is the right side of the user rect to the right or the left side of the target?
  const vampPathOverlap = (vamp.x + vamp.size / 2 > path.x - path.width / 2 &&
    // Second: is the left side of the user rect to the left of the right side of the target?
    vamp.x - vamp.size / 2 < path.x + path.width / 2 &&
    // Third: is the bottom of the user rect below the top of the target?
    vamp.y + vamp.size / 2 > path.y - path.height / 2 &&
    // Fourth: is the top of the user rect above the bottom of the target?
    vamp.y - vamp.size / 2 < path.y + path.height / 2);
  if (!vampPathOverlap) {

    vamp.y = vamp.y + vamp.velocity;
    console.log(vampPathOverlap);
  }

}



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


//Levels Dialogues


//Level 01 Dialogue

const level01Dialogue = [
  "Ahem...",
  "*cough* *cough* *cough*",
  "Sorry, sorry... here we go...",
  "Friends, Romans, countrymen, lend me your ears;",
  "I come to bury Caesar, not to praise him.",
  "The evil that men do lives after them;",
  "The good is oft interred with their bones;",
  "So let it be with Caesar. The noble Brutus",
  "Hath told you Caesar was ambitious:",
  "If it were so, it was a grievous fault,",
  "And grievously hath Caesar answer’d it.",
  "*cough* Thank you *cough*"
];


//dialogue index

let dialogueIndex = 0;
// Dialog box specification
let speechBox = {
  x: 50,
  y: 300,
  width: 300,
  height: 80,
  padding: 20,
  fontSize: 18
};

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
  height: 55,
  width: 300,
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


}

//draw the vamp
function title() {
  background("#ad2222");
}




function game() {
  background("#000000");
  drawPath();
  moveVamp();
  drawVamp();
  checkVampPathOverlap();
  showDialog();
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
  const vampPathOverlap = (vamp.x + vamp.size / 2 > path.x - path.height / 2 &&
    // Second: is the left side of the user rect to the left of the right side of the target?
    vamp.x - vamp.size / 2 < path.x + path.height / 2 &&
    // Third: is the bottom of the user rect below the top of the target?
    vamp.y + vamp.size / 2 > path.y - path.width / 2 &&
    // Fourth: is the top of the user rect above the bottom of the target?
    vamp.y - vamp.size / 2 < path.y + path.width / 2);
  if (!vampPathOverlap) {

    vamp.y = vamp.y + vamp.velocity;

  }

}

function showDialog() {
  // The background box
  push();
  fill(0);
  stroke(255);
  strokeWeight(3);
  rect(box.x, box.y, box.width, box.height);
  pop();

  // The text
  // Note how we're using extra arguments in text() to specify
  // the dimensions we want the text to wrap inside, including
  // using the padding of the dialog box
  push();
  fill(255);
  textSize(18);
  text(level01Dialogue[dialogueIndex], speechBox.x + speechBox.padding, speechBox.y + speechBox.padding, speechBox.width - 2 * speechBox.padding, speechBox.height - 2 * speechBox.padding);
  pop();
}

function mousePressed() {
  if (state === "title") {
    state = "game";
  }
  if (state === "game") {
    // Make sure we're not at the end of the speech aready
    if (dialogueIndex < level01Dialogue.length - 1) {
      // Advance the line
      dialogueIndex++;
    }
  }
}


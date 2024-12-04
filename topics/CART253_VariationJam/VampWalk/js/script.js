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
let state = "gamelv02"


//Levels Dialogues


//Level 01 Dialogue

const level01Dialogue = [
  "Ouch... my head...",
  "Wait... what is this place...?",
  "I must've fallen into the dungeon... I have to be careful.",

  "And... oh! A GEM!",
  "I should get to it...that's how it usually works, right?",
  "One must reach the shiny thing on the other end to get out...",

];

const level02Dialogue = [
  "HUH?",
  "Another room?!",
  // "Wait... what is this place...?",
  // "I must've fallen into the dungeon... I have to be careful.",

  // "And... oh! A GEM!",
  // "I should get to it...that's how it usually works, right?",
  // "One must reach the shiny thing on the other end to get out...",

];

let canvas = {
  height: 240,
  width: 580,
}
//dialogue index

let dialogueIndex = 0;
let showBox = false;
// Dialog box specification
let speechBox = {
  x: 50,
  y: 150,
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
  lv01Gem.sprite = loadImage("assets/images/gem01.png")
};

let vamp = {
  x: 10,
  y: 170,
  sprite: undefined,
  speed: 1,
  velocity: 4,
  size: 20,
  falling: false,

};


let lv01paths = [
  {
    x: 0,
    y: 100,
    height: 55,
    width: 200,
  },

  {
    x: 100,
    y: 150,
    height: 150,
    width: 10,
  },

  {
    x: 180,
    y: 100,
    height: 10,
    width: 110,
  },

  {
    x: 240,
    y: 50,
    height: 120,
    width: 10,
  },

  {
    x: 300,
    y: 121.5,
    height: 5,
    width: 153,
  },

  {
    x: 450,
    y: 200,
    height: 306,
    width: 5,
  },

]
let lv02paths = [
  {
    x: 0,
    y: 100,
    height: 55,
    width: 200,
  },

  {
    x: 100,
    y: 150,
    height: 150,
    width: 10,
  },

  {
    x: 180,
    y: 105,
    height: 10,
    width: 100,
  },

  {
    x: 225,
    y: 50,
    height: 100,
    width: 10,
  },

  {
    x: 325,
    y: 150,
    height: 10,
    width: 106,
  },

  {
    x: 450,
    y: 200,
    height: 250,
    width: 5,
  },

]


let lv02Barrier01 =
{
  x: 100,
  y: 100,
  height: 100,
  width: 10,
  velocity: 5,
  rVelocity: -5,
  maxX: 500,
}
let lv02Barrier02 =
{
  x: 100,
  y: 50,
  height: 110,
  width: 10,
  velocity: 10,
  rVelocity: -10,
  maxX: 500,
}



const lv01Gem = {
  x: 550,
  y: 195,
  size: 5,
  sprite: undefined,

}





function setup() {
  createCanvas(canvas.width, canvas.height);
  vamp.sprite = vampSprites.idle;
};


/**
 * Decides the state
*/

function draw() {
  if (state === "title") {
    title();

  }
  if (state === "gamelv01") {
    gamelv01();
  }
  if (state === "gamelv02") {
    gamelv02();
  }
  if (state === "GameOver") {
    GameOver();
  }
  checkTimer();
}

//draw the vamp
function title() {
  background("#ad2222");
}







function gamelv01() {
  background("#000000");
  moveVamp();


  if (vamp.falling === true) {
    drawVamp();
    drawPaths(lv01paths);
  }
  else {
    checklv01Paths(lv01paths)
    drawPaths(lv01paths);
    drawVamp();
  }

  drawGem(lv01Gem);
  checkVampGemOverlap(lv01Gem);
  checkGameOver();
}



function gamelv02() {
  background("#1f4391");
  moveVamp();


  if (vamp.falling === true) {
    drawVamp();
    drawPaths(lv02paths);
  }
  else {
    checklv01Paths(lv02paths)
    drawPaths(lv02paths);
    drawVamp();
  }
  drawBarriers(lv02Barrier01);
  moveBarriers(lv02Barrier01);
  drawBarriers(lv02Barrier02);
  moveBarriers(lv02Barrier02);

  checkGameOver();
};


function GameOver() {
  background("#ff36c8");
}


function drawVamp() {
  push();
  fill("#FFFFFF");
  imageMode(CENTER);

  image(vamp.sprite, vamp.x, vamp.y);
  pop();

}

function drawPaths(paths) {

  for (let path of paths) {
    push(); drawPaths
    fill("#807676");
    noStroke();
    rectMode(CENTER);
    rect(path.x, path.y, path.height, path.width);
    pop();
  }

}

function drawGem(gem) {
  ellipse(gem.x, gem.y, gem.size);
  image(gem.sprite, gem.x, gem.y);
  imageMode(CENTER);
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


  if (vamp.falling === false) {
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
  }
  else {
    vamp.y = vamp.y + vamp.velocity;


  }
  if (animated === false) {
    resetSprite();
  }

}

function resetSprite() {
  vamp.sprite = vampSprites.idle;

}


// Dialogue Box Code
// Detects when the box shows up and which dialogue to display
function checkTimer() {
  if (showBox === true && state === "gamelv01") {
    showDialog(level01Dialogue);
  }

  if (state === "gamelv02") {
    showTheDialog();
  }
  if (showBox === true && state === "gamelv02") {
    showDialog(level02Dialogue);
  }

}

// determines what the size and appearnce of the dialogue is plus the array
function showDialog(dialogue) {

  // The background box
  push();
  fill(0);
  stroke(255);
  strokeWeight(3);
  rect(speechBox.x, speechBox.y, speechBox.width, speechBox.height);
  pop();

  //the dialogue itself
  push();
  fill(255);
  textSize(18);
  text(dialogue[dialogueIndex], speechBox.x + speechBox.padding, speechBox.y + speechBox.padding, speechBox.width - 2 * speechBox.padding, speechBox.height - 2 * speechBox.padding);
  pop();
}


// Activates the start screen and also pushes dialogue through the array
function mousePressed() {
  if (state === "title") {
    state = "gamelv01";
    setTimeout(showTheDialog, 1000);
  }
  if (state === "gamelv01" && showBox === true) {
    dialogueIndex++;
    if (dialogueIndex === level01Dialogue.length) {
      showBox = false;
    }


  }
  if (state === "gamelv02" && showBox === true) {
    dialogueIndex++;
    if (dialogueIndex === level02Dialogue.length) {
      showBox = false;
    }



  }
}
// 
function showTheDialog() {
  showBox = true;
}





function checkVampGemOverlap(gem) {
  // Get distance from paw to candy
  const d = dist(vamp.x, vamp.y, gem.x, gem.y);
  // Check if it's an overlap
  const gemAquired = (d < vamp.size / 2 + gem.size / 2);
  if (gemAquired) {
    state = "gamelv02";
  }
}




function checklv01Paths(paths) {
  // Assume they are falling (we will try to "prove" they aren't)
  vamp.falling = true;
  // Go through *every* pTH
  for (let path of paths) {
    // Check if the player overlaps this path and aren't falling
    if (vamp.x + vamp.size / 2 > path.x - path.height / 2 &&
      // Second: is the left side of the user rect to the left of the right side of the target?
      vamp.x - vamp.size / 2 < path.x + path.height / 2 &&
      // Third: is the bottom of the user rect below the top of the target?
      vamp.y + vamp.size / 2 > path.y - path.width / 2 &&
      // Fourth: is the top of the user rect above the bottom of the target?
      vamp.y - vamp.size / 2 < path.y + path.width / 2) {
      // If they do overlap it, they are NOT falling
      vamp.falling = false;
      // Can stop the loop because we found one the player is standing on
      break;

    }
  }


}


function checkGameOver() {
  if (vamp.y > canvas.height) {
    state = "GameOver";

  }

}

//barriers to avoid in level 02

//draw the barriers in an array

function drawBarriers(barrier) {
  push(); drawPaths
  fill("#4edd1c");
  noStroke();
  rectMode(CENTER);
  rect(barrier.x, barrier.y, barrier.height, barrier.width);
  pop();


}
// Mve the barriers side to side
function moveBarriers(barrier) {
  barrier.x = barrier.x + barrier.velocity;
  if (barrier.x >= barrier.maxX) {
    barrier.x = barrier.x - barrier.velocity;
  }

}

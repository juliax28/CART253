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
  "Ouch... my head...",
  "Wait... what is this place...?",

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
  y: 100,
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
  x: 200,
  y: 200,
  sprite: undefined,
  speed: 1,
  velocity: 4,
  size: 20,
  falling: true,

};


let lv01paths = [
  {
    x: 200,
    y: 100,
    height: 55,
    width: 200,
  },

  {
    x: 200,
    y: 25,
    height: 300,
    width: 50,
  }
]


const lv01Gem = {
  x: 200,
  y: 150,
  size: 5,
  sprite: undefined,

}


let dialogueTimer = 0;



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
}

//draw the vamp
function title() {
  background("#ad2222");
}







function gamelv01() {
  background("#000000");
  moveVamp();
  checklv01Paths();

  if (vamp.falling) {
    drawVamp();
    drawlv01Paths();
  }
  else {
    drawlv01Paths();
    drawVamp();
  }
  // dialogCountUp();
  drawGem(lv01Gem);
  checkVampGemOverlap(lv01Gem);

  checkTimer();
  // showDialogue();
  //Check if vamp has fallen and died
  checkGameOver();
}



function gamelv02() {
  background("#1f4391");
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

function drawlv01Paths() {

  for (let lv01path of lv01paths) {
    push();
    fill("#807676");
    rectMode(CENTER);
    rect(lv01path.x, lv01path.y, lv01path.height, lv01path.width);
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




function checkTimer() {
  if (showBox === true && state === "gamelv01") {
    showDialog(level01Dialogue);
  }
}

function checkVampGemOverlap(gem) {
  // Get distance from paw to candy
  const d = dist(vamp.x, vamp.y, gem.x, gem.y);
  // Check if it's an overlap
  const gemAquired = (d < vamp.size / 2 + gem.size / 2);
  if (gemAquired) {
    state = "gamelv02";
    console.log();
  }
}




function checklv01Paths() {
  // Assume they are falling (we will try to "prove" they aren't)
  vamp.falling = true;
  // Go through *every* pTH
  for (let lv01path of lv01paths) {
    // Check if the player overlaps this path and aren't falling
    if (vamp.x + vamp.size / 2 > lv01path.x - lv01path.height / 2 &&
      // Second: is the left side of the user rect to the left of the right side of the target?
      vamp.x - vamp.size / 2 < lv01path.x + lv01path.height / 2 &&
      // Third: is the bottom of the user rect below the top of the target?
      vamp.y + vamp.size / 2 > lv01path.y - lv01path.width / 2 &&
      // Fourth: is the top of the user rect above the bottom of the target?
      vamp.y - vamp.size / 2 < lv01path.y + lv01path.width / 2) {
      // If they do overlap it, they are NOT falling
      vamp.falling = false;
      // Can stop the loop because we found one the player is standing on
      break;

    }
  }

  if (vamp.falling === true) {
    vamp.y = vamp.y + vamp.velocity;
  }

}


function checkGameOver() {
  if (vamp.y > canvas.height) {
    state = "GameOver";

  }

}


function showDialog(dialogue) {

  // The background box
  push();
  fill(0);
  stroke(255);
  strokeWeight(3);
  rect(speechBox.x, speechBox.y, speechBox.width, speechBox.height);
  pop();

  // The text
  // Note how we're using extra arguments in text() to specify
  // the dimensions we want the text to wrap inside, including
  // using the padding of the dialog box
  push();
  fill(255);
  textSize(18);
  text(dialogue[dialogueIndex], speechBox.x + speechBox.padding, speechBox.y + speechBox.padding, speechBox.width - 2 * speechBox.padding, speechBox.height - 2 * speechBox.padding);
  pop();
}

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


}

function showTheDialog() {
  showBox = true;
}





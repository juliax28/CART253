/**
 * Cycle
 * Julia Axiuk
 *
 * Oh no! You've fallen into the dungeons with seemingly no way out. But this is a video game, after all, 
 * and videogames come with a way out, right? As an immortal vampire, navigate through the perilous dungeon paths on your journey out, all without ever truly dying.
 * Spoiler alert, there is no way out. The game restarts, bringing you back to the start after hitting rock bottom again and again. How many times
 * will you try to escape before giving up? HINT: this isn't just about vampires and dungeons. 

 */

"use strict";



/**
 * 
*/

//Starting State
let state = "title"



//Level 01 Dialogue
//Arrays that will be put into the dialogue functions

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
  "I guess... I gotta try again and get the gem",
  "But I just had it...",

];
const level03Dialogue = [
  "...",
  "What?",
  "Nowhere to go but down...",

];

//Canvas dimensions, put here for more felxibility in the program
let canvas = {
  height: 240,
  width: 580,
}

const screenSprites = {
  titleScreenSprite: undefined,
  restartScreenSprite: undefined,

}

//dialogue index, what will determine which line of dialogue is shown, gets reset when the vamp touches the gem or falls

let dialogueIndex = 0;
//showbox determines when the dialogue box will be shown when set to true
let showBox = false;

// Dialog box specification, taken from the 'Romans' example 
let speechBox = {
  x: 50,
  y: 150,
  width: 300,
  height: 80,
  padding: 20,
  fontSize: 18
};
//Will determine which images are shown of the vamp when different keys are pressed
const vampSprites = {
  left: undefined,
  right: undefined,
  up: undefined,
  down: undefined,
  idle: undefined,

};
//preloading sprites of vamp and the gems
function preload() {
  screenSprites.titleScreenSprite = loadImage("assets/images/titlescreensprite.PNG")
  screenSprites.restartScreenSprite = loadImage("assets/images/restartscreensprite.PNG")
  vampSprites.left = loadImage("assets/images/vampLeft.PNG")
  vampSprites.right = loadImage("assets/images/vampRight.PNG")
  vampSprites.up = loadImage("assets/images/vampUp.PNG")
  vampSprites.down = loadImage("assets/images/vampDown.PNG")
  vampSprites.idle = loadImage("assets/images/vampDown.PNG")
  lv01Gem.sprite = loadImage("assets/images/gem01.png")
  lv02Gem.sprite = loadImage("assets/images/gem01.png")
};

//vampire attributes
let vamp = {
  x: 10,
  y: 170,
  sprite: undefined,
  //speed the vamp falls at
  velocity: 4,
  size: 20,
  //determines when the vamp is falling when set to true
  falling: false,

};

// path dimensions in an array that will each be checked cyclically to determine if the vamp is overlapping (and therefore not falling)
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
//Level 02 paths
let lv02paths = [
  {
    x: 0,
    y: 100,
    height: 55,
    width: 200,
  },
  {
    x: 358,
    y: 150,
    height: 55,
    width: 50,
  },

  {
    x: 132,
    y: 150,
    height: 100,
    width: 10,
  },


  {
    x: 225,
    y: 30,
    height: 100,
    width: 10,
  },
  {
    x: 230,
    y: 15,
    height: 300,
    width: 10,
  },
  {
    x: 500,
    y: 30,
    height: 100,
    width: 10,
  },

  {
    x: 550,
    y: 113,
    height: 10,
    width: 176,
  },

  {
    x: 450,
    y: 113,
    height: 10,
    width: 176,
  },

  {
    x: 550,
    y: 200,
    height: 100,
    width: 5,
  },
  {
    x: 305,
    y: 200,
    height: 300,
    width: 10,
  },

  {
    x: 270,
    y: 113,
    height: 10,
    width: 176,
  },
  {
    x: 380,
    y: 70,
    height: 10,
    width: 120,
  },

  {
    x: 179,
    y: 95,
    height: 8,
    width: 120,
  },
  {
    x: 85,
    y: 83,
    height: 10,
    width: 144,
  },

]

//level 03 paths
let lv03paths = [
  {
    x: 0,
    y: 100,
    height: 55,
    width: 200,
  },
  {
    x: 358,
    y: 150,
    height: 55,
    width: 50,
  },
]


// moving barriers in level 02
let lv02Barrier01 =
{
  x: 100,
  y: 100,
  height: 100,
  width: 10,
  velocity: 0.5,
  rVelocity: -0.5,
  maxX: 500,
  minX: 100
}
let lv02Barrier02 =
{
  x: 100,
  y: 50,
  height: 110,
  width: 10,
  velocity: 1,
  rVelocity: -1,
  maxX: 500,
  minX: 100
}


//Gem dimensions
const lv01Gem = {
  x: 550,
  y: 195,
  size: 5,
  sprite: undefined,

}

const lv02Gem = {
  x: 358,
  y: 150,
  size: 5,
  sprite: undefined,

}




// SETUP: create the canvas and preload the idle vamp sprite.
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
  if (state === "gamelv03") {
    gamelv03();
  }
  if (state === "GameOver") {
    GameOver();
  }

}

//Title screen
function title() {
  background("#6f217d");
  push();
  imageMode(CENTER);
  image(screenSprites.titleScreenSprite, width / 2, height / 2);
  pop();
}





// functions for level 01

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
  checkTimer();
  drawGem(lv01Gem);
  checkVampGemOverlap(lv01Gem);
  checkGameOver();
}


// functions for level 02
function gamelv02() {
  background("#1f4391");
  moveVamp();

  // determines if the vamp is drawn in front of of in back of the paths to prevent him from 'refalling' onto the path
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
  checkBarrierOverlap(lv02Barrier01);
  checkBarrierOverlap(lv02Barrier02);
  drawGem(lv02Gem);
  //seperate gem ovverlap function to differentiate between the one that would bring the vamp from level 01 --> 02 and level 02 --> 03.
  //not ideal but it works this way without any bugs
  checkVampGemOverlap02(lv02Gem);
  checkGameOver();
  //activates the dialogue that doesn't use the timer in level 02 and 03
  dialogueOnStateChange();
};


// functions for level 03
function gamelv03() {
  background("#d29e1c");
  drawVamp();
  moveVamp();
  // determines if the vamp is drawn in front of of in back of the paths to prevent him from 'refalling' onto the path
  if (vamp.falling === true) {
    drawVamp();
    drawPaths(lv03paths);
  }
  else {
    //checks for the overlap of vamp and paths
    checklv01Paths(lv03paths)
    drawPaths(lv03paths);
    drawVamp();

  }
  //quick fix for an issue, had to make a seperate game over function, otherwise it would loop back to the 'Game Over' state even if specified otherwise
  checkGameOver02();
  //activates the dialogue that doesn't use the timer in level 02 and 03
  dialogueOnStateChange();
}



//'lose' screen. Not really dead because of course vampires don't die, they're immortal!
function GameOver() {
  background("#6f217d");
  push();
  imageMode(CENTER);
  image(screenSprites.restartScreenSprite, width / 2, height / 2);
  pop();
}

//draws our vampire
function drawVamp() {
  push();
  fill("#FFFFFF");
  imageMode(CENTER);

  image(vamp.sprite, vamp.x, vamp.y);
  pop();

}
//draws the paths in a for loop
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
//draws the gems 
function drawGem(gem) {
  ellipse(gem.x, gem.y, gem.size);
  image(gem.sprite, gem.x, gem.y);
  imageMode(CENTER);
}

//move the vamp with the arrow keys 
//animated variable determines if the vampire is moving or not, if not it defaults back to the 'idle' sprite

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
// resets the vamp back to the idle sprite when not moving
function resetSprite() {
  vamp.sprite = vampSprites.idle;

}


// Dialogue Box Code
// Detects when the box shows up and which dialogue to display

//showbox ---> variable that determies if the conditions ar eright to display dialogue
function showTheDialog() {
  showBox = true;
}
// in the first level, the dialogue box is timed after a moment's of hesitation from our poor esitential vampire. This
//check determines when he is done thinking
function checkTimer() {
  if (showBox === true && state === "gamelv01") {
    showDialog(level01Dialogue);
  }

}
// separate dialogue function that is separate from the timer
function dialogueOnStateChange() {

  if (state === "gamelv02" && showBox === true) {
    showDialog(level02Dialogue);
  }
  if (state === "gamelv03" && showBox === true) {
    showDialog(level03Dialogue);
  }
}

// determines what the size and appearnce of the dialogue is plus the array, again taken from the 'Romans' example 
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


// Activates the start screen and also pushes dialogue through the array. Once the array is done, showbox will go back to false and the text and box will stop being drawn
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
  if (state === "gamelv02") {
    dialogueIndex++;
    if (dialogueIndex === level02Dialogue.length) {
      showBox = false;

    }



  }
  if (state === "gamelv03") {
    dialogueIndex++;
    if (dialogueIndex === level03Dialogue.length) {
      showBox = false;

    }



  }
}




// Gem interaction. The gems bring the player to the next level. the dialogue index is also reset when this happens.

function checkVampGemOverlap(gem) {
  // Get distance from vamp to gem
  const d = dist(vamp.x, vamp.y, gem.x, gem.y);
  // Check if it's an overlap
  const gemAquired = (d < vamp.size / 2 + gem.size / 2);
  if (gemAquired && state === "gamelv01") {
    state = "gamelv02";
    dialogueIndex = 0;
    showTheDialog();
  }

}
// For some reason I was having some issues with just setting that if state === currentstate, then when the gem is overlapped the state changes.
//For some reason the program would get confused and not work. To fix this quickly I made another functiion,
//again, not ideal but it works.
function checkVampGemOverlap02(gem) {
  // Get distance from vamp to gem
  const d = dist(vamp.x, vamp.y, gem.x, gem.y);
  // Check if it's an overlap
  const gemAquired = (d < vamp.size / 2 + gem.size / 2);
  if (gemAquired && state === "gamelv02") {
    state = "gamelv03";
    dialogueIndex = 0;
    showTheDialog();
  }
}


// Taken from the overlapping rectangles in class example, but changed to include the Vamp's circle
function checklv01Paths(paths) {
  // Assume they are falling (we will try to "prove" they aren't)
  // Code altered later by Pippin and addded vamp.falling to prove the player isn't already falling 
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

//Game over settings --> what happens wehn the player falls

//Regualr game over, brings the player to the game over screen
function checkGameOver() {
  if (vamp.y > canvas.height) {
    state = "GameOver";
    dialogueIndex = 0;
  }

}
// level 03 game over which resets us to the first level (a never ending loop...)
function checkGameOver02() {
  if (vamp.y > canvas.height) {
    state = "title";
    resetVamp();
    dialogueIndex = 0;
  }
}
// resets the vamp at level 03 so that he re-appears in the right place in level 01 when the game restarts
function resetVamp() {
  vamp.x = 10;
  vamp.y = 170;
  vamp.falling = false;
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
// M0ve the barriers side to side

function moveBarriers(barrier) {
  barrier.x += barrier.velocity;
  if (barrier.x > barrier.maxX) {
    barrier.velocity = -barrier.velocity;
  }
  // brings the barrier back the oppsoite way
  else if (barrier.x < barrier.minX) {
    barrier.velocity = -barrier.velocity
  }

}

// Vamp interacts with the barrier
// almost the exact same code as the overlapping paths

function checkBarrierOverlap(barrier) {
  if (vamp.x + vamp.size / 2 > barrier.x - barrier.height / 2 &&
    // Second: is the left side of the user rect to the left of the right side of the target?
    vamp.x - vamp.size / 2 < barrier.x + barrier.height / 2 &&
    // Third: is the bottom of the user rect below the top of the target?
    vamp.y + vamp.size / 2 > barrier.y - barrier.width / 2 &&
    // Fourth: is the top of the user rect above the bottom of the target?
    vamp.y - vamp.size / 2 < barrier.y + barrier.width / 2) {
    // except this time if he DOES touch the barrier, falling = true 
    vamp.falling = true;
  }
}

// That's it

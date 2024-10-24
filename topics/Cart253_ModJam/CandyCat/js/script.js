/**
 * CandyCat
 * Pippin Barr/Modified by Julia Axiuk
 * 
 * A game of catching candy and finding balance to not get caught
 * 
 * Instructions:
 *
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our cat
const cat = {
    // The cat's body has a position and size
    body: {
        x: 320,
        y: 480,
        size: 150
    },
    // The cat's paw has a position, size, speed, and state
    paw: {
        x: undefined,
        y: 480,
        size: 40,
        speed: 20,
        // Determines how the paw moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Candy
// Has a position, size, and speed of horizontal movement
const blueCandy = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

const OrangeCandy = {
    x: 0,
    y: 200, // Will be random
    size: 15,
    speed: 8
};

//score variabel
let score = 0;
//timer
let timer = {
    counter: 5,
    max: 5,
    min: 0,
};
// the current State
let state = "title"; // Can be "Tie" or "Game"

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetBlueCandy();
    resetOrangeCandy();
}

function draw() {
    if (state === "title") {
        title();

    }
    if (state === "game")
        game();

    if (state === "gameOverHunger"){
        gameOverHunger();
    }
    if (state === "GameOverFat"){
        GameOverFat();
    }

}

function title() {
    background("#6f217d");
    text("Candy Cat", 100, 100);

}
function gameOverHunger(){
    background("#6f217d");
    text ("Game Over, Too Slow and still hungry!", 100,100)

}
function game() {

    background("#ff9043");
    moveBlueCandy();
    drawBlueCandy();
    moveOrangeCandy();
    drawOrangeCandy();
    movecat();
    movepaw();
    drawcat();
    checkpawFlyBlueCandyOverlap();
    checkpawFlyOrangeCandyOverlap();
    drawScore();
    checkTimer();
    drawTimer();
    countDown();
}
/**
 * Moves the candy according to its speed
 * Resets the candy if it gets all the way to the right
 */
function moveBlueCandy() {
    // Move the Blue Candy
    blueCandy.x += blueCandy.speed;
    // Handle the fly going off the canvas
    if (blueCandy.x > width) {
        resetBlueCandy();
    }
}
function moveOrangeCandy() {
    // Move the Blue Candy
    OrangeCandy.x += OrangeCandy.speed;
    // Handle the fly going off the canvas
    if (OrangeCandy.x > width) {
        resetOrangeCandy();
    }
}

/**
 * Draws the candy as a blue or Orange circle
 */
function drawBlueCandy() {
    push();
    noStroke();
    fill("#5db5ff");
    ellipse(blueCandy.x, blueCandy.y, blueCandy.size);
    pop();
}
function drawOrangeCandy() {
    push();
    noStroke();
    fill("#ffa94e");
    ellipse(OrangeCandy.x, OrangeCandy.y, OrangeCandy.size);
    pop();
}

//draw score in top right corner
function drawScore() {
    push();
    textAlign(RIGHT, TOP);
    text(score, width, 0);
    pop();

}


/**
 * Resets the fly to the left with a random y
 */
function resetBlueCandy() {
    blueCandy.x = 0;
    blueCandy.y = random(0, 300);
}
function resetOrangeCandy() {
    OrangeCandy.x = 0;
    OrangeCandy.y = random(0, 300);
}
/**
 * Moves the cat to the mouse position on x
 */
function movecat() {
    cat.body.x = mouseX;
}

/**
 * Handles moving the paw based on its state
 */
function movepaw() {
    // paw matches the cat's x
    cat.paw.x = cat.body.x;
    // If the paw is idle, it doesn't do anything
    if (cat.paw.state === "idle") {
        // Do nothing
    }
    // If the paw is outbound, it moves up
    else if (cat.paw.state === "outbound") {
        cat.paw.y += -cat.paw.speed;
        // The paw bounces back if it hits the top
        if (cat.paw.y <= 0) {
            cat.paw.state = "inbound";
        }
    }
    // If the paw is inbound, it moves down
    else if (cat.paw.state === "inbound") {
        cat.paw.y += cat.paw.speed;
        // The paw stops if it hits the bottom
        if (cat.paw.y >= height) {
            cat.paw.state = "idle";
        }
    }
}

/**
 * Displays the paw (tip and line connection) and the cat (body)
 */
function drawcat() {


    // Draw the rest of the paw
    push();
    stroke("#222222");
    strokeWeight(cat.paw.size);
    line(cat.paw.x + 50, cat.paw.y, cat.body.x + 50, cat.body.y);
    pop();
    // Draw the paw tip
    push();
    fill("#ffffff");
    noStroke();
    ellipse(cat.body.x + 50, cat.paw.y, cat.paw.size);
    pop();

    // Draw the cat's body
    push();
    fill("#222222");
    noStroke();
    ellipse(cat.body.x, cat.body.y, cat.body.size);
    pop();
}

/**
 * Handles the paw overlapping the fly
 */
function checkpawFlyBlueCandyOverlap() {
    // Get distance from paw to fly
    const d = dist(cat.paw.x + 50, cat.paw.y, blueCandy.x, blueCandy.y);
    // Check if it's an overlap
    const eaten = (d < cat.paw.size / 2 + blueCandy.size / 2);
    if (eaten) {
        // increse the score
        score = score + 1;
        //increase cat size
        cat.body.size = cat.body.size + 10;
        // Reset the fly
        resetBlueCandy();
        // Bring back the paw
        cat.paw.state = "inbound";
    }
}
function checkpawFlyOrangeCandyOverlap() {
    // Get distance from paw to fly
    const d = dist(cat.paw.x, cat.paw.y + 50, OrangeCandy.x, OrangeCandy.y);
    // Check if it's an overlap
    const eaten = (d < cat.paw.size / 2 + OrangeCandy.size / 2);
    if (eaten) {
        // increse the score
        score = score + 5;
        //increase cat size
        cat.body.size = cat.body.size + 20;
        // Reset the fly
        resetOrangeCandy();
        // Bring back the paw
        cat.paw.state = "inbound";
    }
}

/**
 * Launch the paw on click (if it's not launched yet)
 */
function mousePressed() {
    if (state === "title") {
        state = "game";
    }
    else if (state === "game") {
        if (cat.paw.state === "idle") {
            cat.paw.state = "outbound";
        }
    }
}

//Functions that check for the timer ending and which losing screen to give

//Show the timer on the screen

function countDown(){
    timer.counter -= 1/(frameRate());
}

function drawTimer(){
    push();
    textAlign(CENTER, TOP);
    textSize(100);
    text(floor(timer.counter), 100,100);
    pop();
}
//When the timer reaches 0, this will choos wich reasult will happen
function checkTimer() {
if (timer.counter <= 0){
    if (cat.body.size >= 250){
        state = "GameOverFat";
    }
    if (score <= 20){
        state = "gameOverHunger";
    }
}
}

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
        y: 520,
        size: 150
    },
    // The cat's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
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

const redCandy = {
    x: 0,
    y: 200, // Will be random
    size: 15,
    speed: 8
};

//score variabel
let score = 0;
// the current State
let state = "title"; // Can be "Tie" or "Game"

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetBlueCandy();
    resetRedCandy();
}

function draw() {
    if (state === "title") {
        title();

    }
    else if (state === "game")
        game();

}

function title() {
    background("pink");
    text("Candy Cat", 100, 100);

}

function game() {

    background("#87ceeb");
    moveBlueCandy();
    drawBlueCandy();
    moveRedCandy();
    drawRedCandy();
    movecat();
    moveTongue();
    drawcat();
    checkTongueFlyBlueCandyOverlap();
    checkTongueFlyRedCandyOverlap();
    drawScore();
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
function moveRedCandy() {
    // Move the Blue Candy
    redCandy.x += redCandy.speed;
    // Handle the fly going off the canvas
    if (redCandy.x > width) {
        resetRedCandy();
    }
}

/**
 * Draws the candy as a blue or red circle
 */
function drawBlueCandy() {
    push();
    noStroke();
    fill("#5db5ff");
    ellipse(blueCandy.x, blueCandy.y, blueCandy.size);
    pop();
}
function drawRedCandy() {
    push();
    noStroke();
    fill("#fd4040");
    ellipse(redCandy.x, redCandy.y, redCandy.size);
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
function resetRedCandy() {
    redCandy.x = 0;
    redCandy.y = random(0, 300);
}
/**
 * Moves the cat to the mouse position on x
 */
function movecat() {
    cat.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the cat's x
    cat.tongue.x = cat.body.x;
    // If the tongue is idle, it doesn't do anything
    if (cat.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (cat.tongue.state === "outbound") {
        cat.tongue.y += -cat.tongue.speed;
        // The tongue bounces back if it hits the top
        if (cat.tongue.y <= 0) {
            cat.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (cat.tongue.state === "inbound") {
        cat.tongue.y += cat.tongue.speed;
        // The tongue stops if it hits the bottom
        if (cat.tongue.y >= height) {
            cat.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the cat (body)
 */
function drawcat() {
    // Draw the tongue tip
    push();
    fill("#ffffff");
    noStroke();
    ellipse(cat.body.x + 30, cat.tongue.y, cat.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#222222");
    strokeWeight(cat.tongue.size);
    line(cat.tongue.x + 30, cat.tongue.y, cat.body.x + 30, cat.body.y);
    pop();

    // Draw the cat's body
    push();
    fill("#222222");
    noStroke();
    ellipse(cat.body.x, cat.body.y, cat.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyBlueCandyOverlap() {
    // Get distance from tongue to fly
    const d = dist(cat.tongue.x, cat.tongue.y, blueCandy.x, blueCandy.y);
    // Check if it's an overlap
    const eaten = (d < cat.tongue.size / 2 + blueCandy.size / 2);
    if (eaten) {
        // increse the score
        score = score + 1;
        //increase cat size
        cat.body.size = cat.body.size + 10;
        // Reset the fly
        resetBlueCandy();
        // Bring back the tongue
        cat.tongue.state = "inbound";
    }
}
function checkTongueFlyRedCandyOverlap() {
    // Get distance from tongue to fly
    const d = dist(cat.tongue.x, cat.tongue.y, redCandy.x, redCandy.y);
    // Check if it's an overlap
    const eaten = (d < cat.tongue.size / 2 + redCandy.size / 2);
    if (eaten) {
        // increse the score
        score = score + 5;
        //increase cat size
        cat.body.size = cat.body.size + 20;
        // Reset the fly
        resetRedCandy();
        // Bring back the tongue
        cat.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (state === "title") {
        state = "game";
    }
    else if (state === "game") {
        if (cat.tongue.state === "idle") {
            cat.tongue.state = "outbound";
        }
    }
}

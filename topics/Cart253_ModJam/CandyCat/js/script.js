/**
 * CandyCat
 * Pippin Barr/Modified by Julia Axiuk
 * 
 * A game of catching candy and finding balance to not get caught
 * 
 * Instructions:
 *Click to begin the game and click to launch your paw in order to catch the candy!
 The different colored candies have different amount of points assigned, and you get fatter the more candy you eat!
 But is this game about catching as much as you can being time runs out, or is it trying to teach you
 a lesson? SPOILER! The only way to win is to find a good balance of candy to eat. There are three
 possible outcomes.
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our cat

const cat = {
    // The cat's body has a position, size and sprite
    body: {
        x: 320,
        y: 480,
        size: 150,
        sprite: undefined,
    },
    // The cat's paw has a position, size, speed, and state
    paw: {
        x: undefined + 50,
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
    speed: 3,
    fill: "#57d3e5",
    points: 1,
};

const OrangeCandy = {
    x: 0,
    y: 200, // Will be random
    size: 15,
    speed: 5,
    fill: "#ffa94e",
    points: 5,
};
// 'medicine' that will decrease your weight and take off points
const medicineCandy = {
    x: 0,
    y: 200, // Will be random
    size: 15,
    speed: 10,
    fill: "#ea221b",
    points: -10,
}



//score variabel
let score = 0;
//timer
let timer = {
    counter: 30,
    max: 30,
    min: 0,
};

//State Sprites

const screenSprites = {
    titleScreenSprite: undefined,
    fatScreenSprite: undefined,
    hungerScreenSprite: undefined,
    winScreenSprite: undefined,
}
// the current State
let state = "title";

//preload function for all images
function preload() {
    cat.body.sprite = loadImage("assets/images/CC_CatSprite.PNG")
    screenSprites.titleScreenSprite = loadImage("assets/images/CC_Title.PNG")
    screenSprites.fatScreenSprite = loadImage("assets/images/CC_Fat.PNG")
    screenSprites.hungerScreenSprite = loadImage("assets/images/CC_Hungry.PNG")
    screenSprites.winScreenSprite = loadImage("assets/images/CC_Win.PNG")
}

/**
 * Creates the canvas and initializes the candy
 */
function setup() {
    createCanvas(640, 480);

    // Give the candy their first random positions
    resetCandy(blueCandy);
    resetCandy(OrangeCandy);

}
//sets all the different possible states 
function draw() {
    if (state === "title") {
        title();

    }
    if (state === "game")
        game();

    if (state === "gameOverHunger") {
        gameOverHunger();
    }
    if (state === "GameOverFat") {
        GameOverFat();
    }
    if (state === "gameOverWin") {
        gameOverWin();
    }

}
//Title State and image
function title() {
    background("#6f217d");
    push();
    imageMode(CENTER);
    image(screenSprites.titleScreenSprite, width / 2, height / 2);
    pop();

}
//Defining all the Ending states and their assigned images
function gameOverHunger() {
    background("#6f217d");
    push();
    imageMode(CENTER);
    image(screenSprites.hungerScreenSprite, width / 2, height / 2);
    pop();


}
function gameOverWin() {
    background("#99f977");
    push();
    imageMode(CENTER);
    image(screenSprites.winScreenSprite, width / 2, height / 2);
    pop();

}
function GameOverFat() {
    background("#6f217d");
    push();
    imageMode(CENTER);
    image(screenSprites.fatScreenSprite, width / 2, height / 2);
    pop();

}
//Functions that are run when in 'game' state
function game() {

    background("#ff9043");
    //Blue Candy
    moveCandy(blueCandy);
    drawCandy(blueCandy);
    checkPawCandyOverlap(blueCandy);

    //Orange Candy
    moveCandy(OrangeCandy);
    drawCandy(OrangeCandy);
    checkPawCandyOverlap(OrangeCandy);
    //medicine candy
    moveCandy(medicineCandy);
    drawCandy(medicineCandy);
    checkPawCandyOverlap(medicineCandy);
    //cat
    movecat();
    movepaw();
    drawcat();
    //timers and score
    drawScore();
    checkTimer();
    drawTimer();
    countDown();
}

//Refacotred - move Candy

function moveCandy(candy) {

    candy.x += candy.speed;
    // Handle the candy going off the canvas
    if (candy.x > width) {
        resetCandy(candy);
    }
}


/**
 * Draws the candy as a blue or Orange circle
 */

function drawCandy(candy) {
    push();
    noStroke();
    fill(candy.fill);
    ellipse(candy.x, candy.y, candy.size);
    pop();
}


//draw score in top right corner
function drawScore() {

    push();
    textAlign(RIGHT, TOP);
    textSize(100);
    text(score, width, 0);
    pop();

}


/**
 * Resets the candy to the left with a random y
 */


function resetCandy(candy) {
    candy.x = 0;
    candy.y = random(0, 300);
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
    line(cat.paw.x, cat.paw.y, cat.paw.x + 50, cat.body.y);
    pop();
    // Draw the paw tip
    push();
    fill("#ffffff");
    noStroke();
    ellipse(cat.paw.x, cat.paw.y, cat.paw.size);
    pop();

    // Draw the cat's body, it has a size, position and an associated sprite

    push();
    imageMode(CENTER);
    image(cat.body.sprite, cat.body.x, cat.body.y, cat.body.size)
    pop();



}

/**
 * Handles the paw overlapping the candy
 */

function checkPawCandyOverlap(candy) {
    // Get distance from paw to candy
    const d = dist(cat.paw.x, cat.paw.y, candy.x, candy.y);
    // Check if it's an overlap
    const eaten = (d < cat.paw.size / 2 + candy.size / 2);
    if (eaten) {
        // increase the score
        score = score + candy.points;
        //increase cat size
        cat.body.size = map(score, 0, 100, 150, 400);
        // cat.body.size = cat.body.size + 20;
        // Reset the candy
        resetCandy(candy);
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
    if (state === "gameOverHunger" || state === "GameOverFat" || state === "gameOverWin") {
        reset();
    }
}



//Shows the timer on the screen
// sets the counter
function countDown() {
    timer.counter -= 1 / (frameRate());
}
// displays the timer
function drawTimer() {
    push();
    textAlign(CENTER, TOP);
    textSize(100);
    text(floor(timer.counter), 100, 100);
    pop();
}
//When the timer reaches 0, this will choose which reasult will happen
function checkTimer() {
    if (timer.counter <= 0) {
        //if the cat is too fat...
        if (cat.body.size >= 300) {
            state = "GameOverFat";
        }
        //if you didn't eat enough and are unsatisfied...
        if (score < 50) {
            state = "gameOverHunger";
        }
        // you found the right balance!
        if (cat.body.size < 300 && score >= 50) {
            state = "gameOverWin"
        }

    }
}
//resets the game after recieving one of the possible endings on a clickm bringing the player back to the Title screen
function reset() {
    state = "title";
    score = 0;
    timer.counter = 30;
    cat.body.size = 150;
}


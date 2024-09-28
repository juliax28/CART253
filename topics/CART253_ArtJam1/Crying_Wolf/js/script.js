/**
 * Crying Wolf
 * Julia Axiuk
 * 
 * Click too many times and the sheep will no longer trust you, risking the chance of being eaten
 */

"use strict";

//sheep attributes
let sheep =
{
    shape:
    {
        x: undefined,
        y: undefined,
        size: 50
    },
    fills:
    {
        alive: "#FFF",
        dead: "#FF4433"
    },
    trust:
    {
        trust: 0,
    },

}
//timer
//let timer = 0;

//wolf attributes
//TBD


/**
 * canvas creation
*/
function setup() {
    createCanvas(400, 400);
}
//draw background
function draw() {
    background("#B6E853");
    moveSheep();
    drawSheep();
    checkSheepTrust();
}
//sheep follows mouse
function moveSheep() {
    sheep.shape.x = mouseX;
    sheep.shape.y = mouseY;
}

//draw the sheep
function drawSheep() {
    push();
    fill(sheep.fills.alive);
    noStroke();
    ellipse(sheep.shape.x + 15, sheep.shape.y + 15, sheep.shape.size);
    pop();

}
// Check to see if the mouse is clicked,  lose trust points.
//Sheep will be stop following the mouse if all trust is lost.
function checkSheepTrust() {
    if (mouseIsClicked) {
        trust = (trust + 5);

    }
}



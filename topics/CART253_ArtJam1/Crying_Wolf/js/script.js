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
    trust: 0,


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
    drawSheepTrust();

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
// Check to see if the mouse is clicked,  trust points gp up.
//Sheep will be stop following the mouse if trsut limit is reached.
function drawSheepTrust() {
    if (mouseIsPressed) sheep.trust = sheep.trust + 5;
    if (sheep.trust > 25) {
        sheep.shape.x = pmouseX;
        sheep.shape.y = pmouseY;
        console.log(sheep.trust);
    }

}





// make the sheep jump when the mouse is clicked
//function sheepJump() {
//if (mouseIsPressed) {
//  sheep.shape.y = (mouseY + 5)
// };
//      else { sheep.shape.y = mouseY }
//}


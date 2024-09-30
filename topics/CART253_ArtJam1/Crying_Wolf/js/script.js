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
    fill: "FFFFF",

    fills:
    {
        alive: "#FFFFFF",
        dead: "#CF352B",
    },
    trust: 0,
    following: true,
    lossOfTrust: 100,


};
//wolf attributes
let wolf =
{
    shape:
    {
        x: 400,
        y: -150,
        size: 55,

    },
    velocity: {
        x: 1,
        y: 2,
    },
};
//timer, this will dictate when the wolf is drawn and also how fast night falls
let timer = 0;


/**
 * canvas creation
*/
function setup() {
    createCanvas(400, 400);
}
//draw background
function draw() {
    //Background mapped to the timer
    timer += 1;
    const shade = map(timer, 0, 500, 255, 0);

    background(shade);
    //as night falls, the wolf will appear
    if (timer > 500) {
        drawWolf();
    }

    //sheep
    moveSheep();
    drawSheep();
    drawSheepTrust();

    //wolf attributes
    wolfInteract();



}


//draw the sheep
function drawSheep() {
    push();
    fill(sheep.fill);
    noStroke();
    ellipse(sheep.shape.x, sheep.shape.y, sheep.shape.size);
    pop();

    //Sheep fur "bubbles"
    //top right
    push();
    fill(sheep.fill);
    noStroke();
    ellipse(sheep.shape.x + 15, sheep.shape.y - 20, 20);
    pop();
    // top left
    push();
    fill(sheep.fill);
    noStroke();
    ellipse(sheep.shape.x - 15, sheep.shape.y - 21, 20);
    pop();
    //bottom left
    push();
    fill(sheep.fill);
    noStroke();
    ellipse(sheep.shape.x - 15, sheep.shape.y + 21, 15);
    pop();

    push();
    fill(sheep.fill);
    noStroke();
    ellipse(sheep.shape.x - 16, sheep.shape.y + 22, 10);
    pop();

    //sheep eye R
    push();
    fill("#ef4766")
    stroke("#AFFF");
    ellipse(sheep.shape.x + 10, sheep.shape.y, 10);
    pop();
    //sheep eye L
    push();
    fill("#ef4766")
    stroke("#AFFF");
    ellipse(sheep.shape.x - 10, sheep.shape.y, 10);
    pop();
    //sheep nose
    push();
    fill("#000000")
    noStroke();
    ellipse(sheep.shape.x, sheep.shape.y + 6, 3);
    pop();

}
// Check to see if the mouse is clicked,  trust points go up.
//Sheep will be stop following the mouse if trust limit is reached.
function drawSheepTrust() {
    if (mouseIsPressed) sheep.trust += 5;
    if (sheep.trust > sheep.lossOfTrust) {
        //sheep stops following
        sheep.following = false;
    }

}
function drawWolf() {


    //wolf appearance
    push();
    fill("#647275");
    noStroke();
    ellipse(wolf.shape.x, wolf.shape.y, wolf.shape.size);
    pop();
    //motion on the wolf
    wolf.shape.x = wolf.shape.x - wolf.velocity.x;
    wolf.shape.y = wolf.shape.y + wolf.velocity.y;




};

// Wehn the wolf overlaps the sheep, the sheep will be attcked and turn red!
function wolfInteract() {
    const distance = dist(sheep.shape.x, sheep.shape.y, wolf.shape.x, wolf.shape.y);
    const wolfOverlapsSheep = (distance < sheep.shape.size / 4);
    if (wolfOverlapsSheep) {
        sheep.fill = sheep.fills.dead;
        sheep.following = false;
    }


}
//sheep follows mouse
function moveSheep() {
    if (!sheep.following) {
        return;
    }
    sheep.shape.x = mouseX + 15;
    sheep.shape.y = mouseY + 15;
}




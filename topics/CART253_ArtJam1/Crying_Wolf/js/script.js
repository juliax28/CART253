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
    lossOfTrust: 200,


};

let wolf =
{
    shape:
    {
        x: 200,
        y: 10,
        size: 55,

    },
};
//timer
//let timer = 0;


/**
 * canvas creation
*/
function setup() {
    createCanvas(400, 400);
}
//draw background
function draw() {
    background("#B6E853");
    //sheep
    moveSheep();
    drawSheep();
    drawSheepTrust();
    //wolf
    drawWolf();
    //wolf attributes
    wolfInteract();

}


//draw the sheep
function drawSheep() {
    push();
    fill(sheep.fill);
    noStroke();
    ellipse(sheep.shape.x + 15, sheep.shape.y + 15, sheep.shape.size);
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


    //wolfappearance
    push();
    fill("#647275");
    noStroke();
    ellipse(wolf.shape.x, wolf.shape.y, wolf.shape.size);
    pop();
    //motion on the wolf
    wolf.shape.x = wolf.shape.x - 1;
    wolf.shape.y = wolf.shape.x + 1;




};


function wolfInteract() {
    const distance = dist(sheep.shape.x, sheep.shape.y, wolf.shape.x, wolf.shape.y);
    const wolfOverlapsSheep = (distance < wolf.shape.size / 2);
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
    sheep.shape.x = mouseX;
    sheep.shape.y = mouseY;
}




// make the sheep jump when the mouse is clicked
//function sheepJump() {
//if (mouseIsPressed) {
//  sheep.shape.y = (mouseY + 5)
// };
//      else { sheep.shape.y = mouseY }
//}


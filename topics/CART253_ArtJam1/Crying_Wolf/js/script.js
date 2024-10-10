/**
 * Crying Wolf
 * Julia Axiuk
 * 
 * A simple simulation of the 'crying wolf' exppression. Clicking on the sheep you're leading around will startle it, causing it's trust threshold to go up. 
 * Clikc too many times and the sheep will no longer trust you, causing it to stop heeding your guidance! But be careful, if this happens the chances of being eaten 
 * by the wolf when night falls are much higher. If the sheep trusts you because you didn't scare it, though, you can easily save your sheep and avoid the wolf!
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
        eyeDefault: "#8997FF",
        eyeBlue: "#8997FF",
        eyeScared: "EF4766",
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

    //sheep attributes
    moveSheep();
    drawSheep();
    drawSheepTrust();

    //wolf Elements
    wolfInteract();



}


//draw the sheep
function drawSheep() {
    push();
    fill(sheep.fill);
    noStroke();
    ellipse(sheep.shape.x, sheep.shape.y, sheep.shape.size);
    pop();

    //Sheep ears
    //top right
    push();
    fill(sheep.fill);
    noStroke();
    ellipse(sheep.shape.x + 15, sheep.shape.y - 21, 20);
    pop();
    // top left
    push();
    fill(sheep.fill);
    noStroke();
    ellipse(sheep.shape.x - 15, sheep.shape.y - 21, 20);
    pop();


    //sheep eye R
    push();
    fill(sheep.fills.eyeDefault)
    stroke("#AFFF");
    ellipse(sheep.shape.x + 10, sheep.shape.y, 10);
    pop();
    //sheep eye L
    push();
    fill(sheep.fills.eyeDefault)
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
    //eyes blink when scared/trust is lost
    if (!sheep.following) {
        return;
    }
    if (mouseIsPressed) {

        sheep.fills.eyeDefault = sheep.fills.eyeScared;
    }
    else {
        sheep.fills.eyeDefault = sheep.fills.eyeBlue;
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

function drawWolf() {


    //wolf appearance
    push();
    fill("#647275");
    noStroke();
    ellipse(wolf.shape.x, wolf.shape.y, wolf.shape.size);
    pop();


    //wolf ears
    //right ear
    push();
    fill("#647275");
    noStroke();
    rect(wolf.shape.x + 5, wolf.shape.y - 28, 20, 25);
    pop();
    //Left Ear
    push();
    fill("#647275");
    noStroke();
    rect(wolf.shape.x - 25, wolf.shape.y - 28, 20, 25);
    pop();


    // wolf Eyes
    //right eye
    push();
    fill("#EE3434");
    stroke("#FFFFFF");
    ellipse(wolf.shape.x + 10, wolf.shape.y, 10);
    pop();

    //Left eye
    push();
    fill("#EE3434");
    stroke("#FFFFFF");
    ellipse(wolf.shape.x - 10, wolf.shape.y, 10);
    pop();

    //nose
    push();
    fill("#000000");
    noStroke();
    ellipse(wolf.shape.x, wolf.shape.y + 12, 10);
    pop();
    //motion on the wolf
    wolf.shape.x = wolf.shape.x - wolf.velocity.x;
    wolf.shape.y = wolf.shape.y + wolf.velocity.y;




};

// When the wolf overlaps the sheep, the sheep will be attacked and turn red!
function wolfInteract() {
    const distance = dist(sheep.shape.x, sheep.shape.y, wolf.shape.x, wolf.shape.y);
    const wolfOverlapsSheep = (distance < sheep.shape.size);
    if (wolfOverlapsSheep) {
        //If the wolf touches the sheep, the sheep will turn red and stop interacting with the mouse
        sheep.fill = sheep.fills.dead;
        sheep.following = false;
    }


}





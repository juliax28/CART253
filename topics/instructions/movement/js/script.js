/**
 * Movement
 * Julia Axiuk
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let bird = {
    x: 120.
    y: 180,
    size: 50
};

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640, 480);
};


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);
    //move the bird
    bird.x = bird.x + 1;
    bird.y = bird.y - 2;
    //draw the bird
    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(bird.x, bird.y, bird.size)
    pop();
};
/**
 * Creating Variables
 * Julia Axiuk
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";
let holeSize = 180;
let holeShade = 0;
let holeX = 140;
let holeY = 175;

let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;
/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(480, 480);

}


/**
 * hole in piece of cheese
*/
function draw() {
    //the cheese
    background(cheeseBlue, cheeseGreen, cheeseRed);
    //the hole
    push();
    noStroke();
    fill(holeShade);
    ellipse(holeX, holeY, holeSize);
    pop();
}
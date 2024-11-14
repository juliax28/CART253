/**
 * VampWalk
 * Julia Axiuk
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";



/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/


const vamp = {
    x: undefined,
    y:undefined,
    sprite: undefined,
    speed: 1,
    velocity: 4
    
    };

const vampSprites = {
    left:undefined,
    right:undefined,
    up:undefined,
    down:undefined
}

function preload() {
    vampSprites.left = loadImage("assets/images/vampLeft.PNG")
    vampSprites.right = loadImage("assets/images/vampRight.PNG")
    vampSprites.up = loadImage("assets/images/vampUp.PNG")
    vampSprites.down = loadImage("assets/images/vampDown.PNG")
}


function setup() {
createCanvas(580,240);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#000000");
    

}
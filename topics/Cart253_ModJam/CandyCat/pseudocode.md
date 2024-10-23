# Pseudocode for CandyCat


WHAT I NEED:
Opening state with the witch leaving image 
Change the frog to a cat
Change flies to candy
Have two - three diff types of candy
Make cat interact with candy
Have a timer that counts down, eventually leading to witch being back (play sound + countdown)
Which in turn triggers the win or lose screens depending on the states of candy eaten + cat weight
Win if: right ratio of candy to weight basically


REMEMBER- ESTABLISH ALL THE VARIABLES
//I AM EXCLUDING AESTHETIC CHANGES IN THE PSEUDOCODE

WE GOT

blueCandy {
    size height
    size width
    speed
    point number
    (repeat for red candy but make points in the negatives)
}

witchTimer = 

Cat
{
    width
    height
}



gameStart = state one
state one {
display start image
}

if mouse clicked then state = GameState

GameState{

EVEYRTHING TO DO WITH THE GAME BUT...
//change flies to candy and add extra

{

function moveBlueCandy() {
    // Move the blueCandy
    blueCandy.x += BlueCandy.speed;
    // Handle the Candy going off the canvas
    if (blueCandy.x > width) {
        resetblue Candy();
    }
}

REPEAT WITH

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}
Obviously chnage this to whatever I want the candy to look likeb and replace all 'flies' with either Red or Blue candy

}


Function checkTimer
{
if timer ends {
    and cat is X size = triggers 'lose' state (fat)
    or points are X many (too little), triggers 'lose' state (unhappy cat)
}
else if {
    cat width and height is X big and has between this  and this many points --- state = WIN state!
}


}


function drawScore(){
    push();
    textAlign(RIGHT, TOP);
    text(score, width, 0);
    pop();

}

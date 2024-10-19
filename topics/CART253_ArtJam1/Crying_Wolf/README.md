# Template p5 Project

Julia Axiuk

Exercise code link: https://github.com/juliax28/CART253/tree/3a5c19e737a3544af34ce1fbea507b39bfd7dd74/topics/CART253_ArtJam1

Working Web Link: https://juliax28.github.io/CART253/topics/CART253_ArtJam1/Crying_Wolf/

Link to repository (just in case): https://github.com/juliax28/CART253.git


## Description

A simple simulation of the 'crying wolf' exppression. Clicking on the sheep you're leading around with the mouse will startle it (this is shown as it flinches with a little blink), causing it's trust threshold to go up.  Click too many times and the sheep will no longer trust you, causing it to stop heeding your guidance! But be careful, if this happens the chances of being eaten by the wolf when night falls are much higher. If the sheep trusts you because you didn't scare it, though, you can easily save your sheep and avoid the wolf!

Being touched by the wolf at night will cause your sheep to turn red and die.

## Credits
This project uses [p5.js](https://p5js.org).



## Attribution

Although I did alter the code slightly, I used a portion of code from an in-class discussion after I asked about mapping.
The code that was sent to me via discord:

let timer = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  timer += 1;

  const shade = map(timer, 0, 500, 255, 0);
  
  background(shade);
  
  if (timer > 500) {
    ellipse(100, 100, 100);
  }
}


The code I used:

function draw() 
    {
    //Background mapped to the timer
    timer += 1;
    const shade = map(timer, 0, 500, 255, 0);

    background(shade);
    //as night falls, the wolf will appear
    if (timer > 500) {
        drawWolf();
    }
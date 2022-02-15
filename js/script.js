const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

//function that gives us a random amount of time between moles popping up
function randomTime(min, max) {
    return Math.round(Math.random() * (max-min) + min);
}

//function that picks a random hole for the mole to pop up from
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    //this statement prevents the same hole being picked twice in a row
    if(hole === lastHole) {
        randomHole(holes);
    }

    lastHole = hole;
    return hole;
}

//make moles pop up
function peep() {
    const time = randomTime(200,1000);
    const hole = randomHole(holes);

    hole.classList.add("up");

    //make them go away after the random amount of time
    setTimeout(() => {
        hole.classList.remove("up");
        if(!timeUp) peep(); //this line make the function run again until the time is up
    }, time);
}

//start the game
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

//bonks mole on the head when you click on it
function bonk(e) {
    if (!e.isTrusted) return; 
    score++;
    this.classList.remove("up");
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", bonk));
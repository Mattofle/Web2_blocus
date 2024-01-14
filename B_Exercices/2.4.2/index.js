const greenDiv = document.querySelector('.green');
const orangeDiv = document.querySelector('.orange');
const redDiv = document.querySelector('.red');

let tour = 0;

let greenColored = false;
let orangeColored = false;
let redColored = false

var intervalId;
clock();

function clock() {
    intervalId = setInterval(switchColor, 2000)
}

function switchColor() {
    if (orangeColored == false && greenColored == false && redColored == false){
        greenDiv.style.backgroundColor = 'green';
        greenColored = true;
    }
    if ( greenColored == false && orangeColored == true && tour == 0){
        greenDiv.style.backgroundColor = 'green';
        orangeDiv.style.backgroundColor = 'white'
        greenColored = true;
        orangeColored = false;
        tour = 0;
    } else if (greenColored == true && tour == 0){
        orangeDiv.style.backgroundColor = 'orange';
        greenDiv.style.backgroundColor = 'white';
        greenColored = false;
        orangeColored = true;
        tour = 1;
    } else if (redColored == true && tour == 1){
        orangeDiv.style.backgroundColor = 'orange';
        redDiv.style.backgroundColor = 'white';
        orangeColored = true;
        redColored = false;
        tour = 0;
    } else if ( redColored == false && orangeColored == true && tour == 1 ){
        redDiv.style.backgroundColor = 'red';
        orangeDiv.style.backgroundColor = 'white';
        redColored = true;
        orangeColored = false;
        tour = 1;
    }
}
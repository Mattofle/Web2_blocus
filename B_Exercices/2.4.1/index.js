const btn = document.querySelector('#game');
const msg = document.querySelector('#message');

let count = 0;

let timeoutID;
const delayEnSec = 5
const delay = delayEnSec * 1000; 

btn.addEventListener('mouseover', startTimer);

btn.addEventListener('click', () => {
    count++;
    if (count == 10) clearTimer()
})

function startTimer() {
    timeoutID = setTimeout(() => {
        msg.innerHTML = "Tu click pas assez vite kho, 10x en 5 sec c'est trql normalement"
    },delay);
}

function clearTimer() {
    clearTimeout(timeoutID);
    msg.innerHTML = "Respect le fraté, tu l'a fait"
}
const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.getElementById('time-left');
let score = document.getElementById('score');

let result = 0;
let currentTime = timeLeft.textContent;

function randomSquare() {
    // removing mole class from all squares
    square.forEach(className => {
        className.classList.remove('mole');
    });

    // selecting random square and assign the mole class to it
    let randomPosition = square[Math.floor(Math.random() * 9)];
    // add the mole only when it's not gameover
    if (currentTime !== 0) randomPosition.classList.add('mole')

    // assign the id of the randomPosition to hitPosition
    hitPosition = randomPosition.id
};

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition) {
            result += 1;
            score.textContent = result;
        };
    });
});

function moveMole() {
    let timerId = null;
    timerId = setInterval(randomSquare, 700);
}

moveMole();

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        alert(`GAME OVER! Your Final Score Is: ${result}`)
    }
}


let timerId = setInterval(countDown, 700);
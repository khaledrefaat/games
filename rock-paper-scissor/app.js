// Variables
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');


let userScore = 0;
let computerScore = 0;

// functions

function getComputerChoice() {
	const choices = ['rock', 'paper', 'scissors'];
	const random = Math.floor(Math.random() * choices.length);
	return choices[random];
}
// getComputerChoice();

function win(userChoice, computerChoice) {
	const userChoice_div = document.getElementById(userChoice);
	userScore++;
	userScore_span.innerText = userScore;
	computerScore_span.innerText = computerScore;
	result_p.innerHTML = `${userChoice} beats ${computerChoice}. User Wins!`;
	userChoice_div.classList.add('green-glow');
	setTimeout(() => userChoice_div.classList.remove('green-glow'), 500);
}

function lose(userChoice, computerChoice) {
	const userChoice_div = document.getElementById(userChoice);
	computerScore++;
	userScore_span.innerText = userScore;
	computerScore_span.innerText = computerScore;
	result_p.innerHTML = `${computerChoice} beats ${userChoice}. Computer Wins!`;
	userChoice_div.classList.add('red-glow');
	setTimeout(() => userChoice_div.classList.remove('red-glow'), 500);
}

function draw(userChoice) {
	const userChoice_div = document.getElementById(userChoice);
	userScore_span.innerText = userScore;
	computerScore_span.innerText = computerScore;
	result_p.innerHTML = `Draw!`;
	userChoice_div.classList.add('grey-glow');
	setTimeout(() => userChoice_div.classList.remove('grey-glow'), 500);
}

function game(userChoice) {
	const computerChoice = getComputerChoice();

	// who wins
	switch (userChoice + ' ' + computerChoice) {
		// User Win Cases
		case 'rock scissors':
		case 'scissors paper':
		case 'paper rock':
			win(userChoice, computerChoice);
			break;
			// Computer Win Cases
		case 'rock paper':
		case 'scissors rock':
		case 'paper scissors':
			lose(userChoice, computerChoice);
			break;
			// Draw Cases
		case 'rock rock':
		case 'scissors scissors':
		case 'paper paper':
			draw(userChoice);
	}
}

function main() {
	rock_div.addEventListener('click', () => game('rock'));
	paper_div.addEventListener('click', () => game('paper'));
	scissors_div.addEventListener('click', () => game('scissors'));
}

main();
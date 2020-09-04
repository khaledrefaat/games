let origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
	// this is all win posibilities
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 6, 4, 2 ]
];
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector('.endgame').classList.remove('endgame--appear');
	origBoard = Array.from(Array(9).keys());
	cells.forEach((cur) => {
		cur.innerText = '';
		cur.style.removeProperty('background-color');
		cur.addEventListener('click', turnClick);
	});
}

function turnClick(square) {
	if (typeof origBoard[square.target.id] === 'number') {
		turn(square.target.id, huPlayer);
		if (!checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
	let gameWon = null;
	for (let [ index, win ] of winCombos.entries()) {
		if (win.every((elem) => plays.indexOf(elem) > -1)) {
			gameWon = { index: index, player: player };
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? '#74b9ff' : '#ff7675';
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick);
	}
	declareWinner(gameWon.player === huPlayer ? 'You Win!' : 'You Lose!');
}
//  declare who wins the game and write it on the endgame box
function declareWinner(who) {
	document.querySelector('.endgame').classList.add('endgame--appear');
	document.querySelector('.endgame .text').innerText = who;
}

// returns array of table empty boards
function emptySquares() {
	return origBoard.filter((s) => typeof s === 'number');
}
// returns table first emprty board
function bestSpot() {
	// return emptySquares()[0];
	return minimax(origBoard, aiPlayer).index;
}

// checking if the game is draw
function checkTie() {
	if (emptySquares().length === 0) {
		for (let i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = '#00b894';
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner('Tie Game!');
		return true;
	}
	return false;
}
// minimax algorithm article(https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37)

// minimax function

function minimax(newBoard, player) {
	let availSpots = emptySquares(newBoard);

	if (checkWin(newBoard, huPlayer)) {
		return { score: -10 };
	} else if (checkWin(newBoard, aiPlayer)) {
		return { score: 10 };
	} else if (availSpots.length === 0) {
		return { score: 0 };
	}

	let moves = [];
	for (let i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player === aiPlayer) {
			let result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			let result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	let bestMove, bestScore;
	if (player === aiPlayer) {
		bestScore = -10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		bestScore = 10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

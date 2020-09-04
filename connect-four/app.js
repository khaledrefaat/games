document.addEventListener('DOMContentLoaded', () => {
	const grid_div = document.querySelector('.grid');
	const squares_div = document.querySelectorAll('.grid>div');
	const gridSquare_div = document.querySelectorAll('.grid__square');
	const taken_div = document.querySelector('.taken');
	const result_h3 = document.getElementById('result');
	const currentPlayer_span = document.getElementById('current-player');
	const button = document.querySelector('.btn');

	const smallPlayerOneComp = "1".fontsize(3).sub();
	const smallPlayerTwoComp = "2".fontsize(3).sub();
	let currentPlayer = 1;

	for (let i = 0, len = squares_div.length; i < len; i++)
		(function (index) {
			// add an onclick to each square in your grid
			squares_div[i].onclick = function () {
				// if the square below your current square is taken go on top of it
				if (
					squares_div[index + 7].classList.contains('taken') &&
					result_h3.innerHTML !== `Red Player${smallPlayerOneComp} Wins!` &&
					result_h3.innerHTML !== `Blue Player${smallPlayerTwoComp} Wins!`
				) {
					if (currentPlayer === 1 && !squares_div[index].classList.contains('taken')) {
						squares_div[index].classList.add('taken');
						squares_div[index].children[0].classList.add('player-one');
						// change the player
						currentPlayer = 2;
						currentPlayer_span.innerHTML = currentPlayer;
					} else if (currentPlayer === 2 && !squares_div[index].classList.contains('taken')) {
						squares_div[index].classList.add('taken');
						squares_div[index].children[0].classList.add('player-two');
						// change the player
						currentPlayer = 1;
						currentPlayer_span.innerHTML = currentPlayer;
					}
				}
			};
		})(i);

	function checkBoard() {
		const winingMethod = [
			[0, 1, 2, 3],
			[41, 40, 39, 38],
			[7, 8, 9, 10],
			[34, 33, 32, 31],
			[14, 15, 16, 17],
			[27, 26, 25, 24],
			[21, 22, 23, 24],
			[20, 19, 18, 17],
			[28, 29, 30, 31],
			[13, 12, 11, 10],
			[35, 36, 37, 38],
			[6, 5, 4, 3],
			[0, 7, 14, 21],
			[41, 34, 27, 20],
			[1, 8, 15, 22],
			[40, 33, 26, 19],
			[2, 9, 16, 23],
			[39, 32, 25, 18],
			[3, 10, 17, 24],
			[38, 31, 24, 17],
			[4, 11, 18, 25],
			[37, 30, 23, 16],
			[5, 12, 19, 26],
			[36, 29, 22, 15],
			[6, 13, 20, 27],
			[35, 28, 21, 14],
			[0, 8, 16, 24],
			[41, 33, 25, 17],
			[7, 15, 23, 31],
			[34, 26, 18, 10],
			[14, 22, 30, 38],
			[27, 19, 11, 3],
			[35, 29, 23, 17],
			[6, 12, 18, 24],
			[28, 22, 16, 10],
			[13, 19, 25, 31],
			[21, 15, 9, 3],
			[20, 26, 32, 38],
			[36, 30, 24, 18],
			[5, 11, 17, 23],
			[37, 31, 25, 19],
			[4, 10, 16, 22],
			[2, 10, 18, 26],
			[39, 31, 23, 15],
			[1, 9, 17, 25],
			[40, 32, 24, 16],
			[9, 7, 25, 33],
			[8, 16, 24, 32],
			[11, 7, 23, 29],
			[12, 18, 24, 30],
			[1, 2, 3, 4],
			[5, 4, 3, 2],
			[8, 9, 10, 11],
			[12, 11, 10, 9],
			[15, 16, 17, 18],
			[19, 18, 17, 16],
			[22, 23, 24, 25],
			[26, 25, 24, 23],
			[29, 30, 31, 32],
			[33, 32, 31, 30],
			[36, 37, 38, 39],
			[40, 39, 38, 37],
			[7, 14, 21, 28],
			[8, 15, 22, 29],
			[9, 16, 23, 30],
			[10, 17, 24, 31],
			[11, 18, 25, 32],
			[12, 19, 26, 33],
			[13, 20, 27, 34]
		];

		const smallPlayerOneComp = "1".fontsize(3).sub();
		const smallPlayerTwoComp = "2".fontsize(3).sub();

		for (let i = 0; i < winingMethod.length; i++) {
			const square1 = squares_div[winingMethod[i][0]].children[0];
			const square2 = squares_div[winingMethod[i][1]].children[0];
			const square3 = squares_div[winingMethod[i][2]].children[0];
			const square4 = squares_div[winingMethod[i][3]].children[0];

			// check  those arrays if they have class of play-one
			if (
				square1.classList.contains('player-one') &&
				square2.classList.contains('player-one') &&
				square3.classList.contains('player-one') &&
				square4.classList.contains('player-one')
			) {
				result_h3.innerHTML = `Red Player${smallPlayerOneComp} Wins!`;
			} else if (
				square1.classList.contains('player-two') &&
				square2.classList.contains('player-two') &&
				square3.classList.contains('player-two') &&
				square4.classList.contains('player-two')
			)
				result_h3.innerHTML = `Blue Player${smallPlayerTwoComp} Wins!`;
		}
	}

	gridSquare_div.forEach((square) => square.addEventListener('click', checkBoard));
	button.onclick = function () {
		gridSquare_div.forEach(cur => {
			cur.classList.remove('taken')
			cur.children[0].classList.remove('player-one');
			cur.children[0].classList.remove('player-two');
			result_h3.innerHTML = '';
			currentPlayer = 1;
			currentPlayer_span.innerHTML = currentPlayer;
		})
	}
});